// Thin wrapper around the browser's SpeechRecognition (Web Speech API) for
// checking spoken pronunciation against a target English word/phrase.
// Works in Chrome/Edge/Safari; not supported in Firefox — callers should
// check isRecognitionSupported() and offer a graceful fallback.

function getRecognitionCtor() {
  return window.SpeechRecognition || window.webkitSpeechRecognition || null
}

export function isRecognitionSupported() {
  return !!getRecognitionCtor()
}

// Normalizes text for comparison: lowercase, strip punctuation, collapse spaces.
function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[.,!?;:'"]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

// Classic Levenshtein edit distance between two strings.
function levenshtein(a, b) {
  const m = a.length
  const n = b.length
  if (m === 0) return n
  if (n === 0) return m

  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0))
  for (let i = 0; i <= m; i++) dp[i][0] = i
  for (let j = 0; j <= n; j++) dp[0][j] = j

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1]
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
      }
    }
  }
  return dp[m][n]
}

// Returns a similarity score between 0 and 1 (1 = identical after normalizing).
export function pronunciationSimilarity(target, heard) {
  const t = normalize(target)
  const h = normalize(heard)
  if (!t || !h) return 0
  const distance = levenshtein(t, h)
  const maxLen = Math.max(t.length, h.length)
  return maxLen === 0 ? 1 : 1 - distance / maxLen
}

// Continuous recognition controller for longer, monologue-style speaking
// (e.g. answering an open speaking prompt for 30-90 seconds). Unlike
// listenAndCompare, this doesn't resolve until the caller calls stop() —
// it keeps accumulating transcript text as the learner talks, restarting
// itself automatically if the browser's recognizer times out mid-speech.
export function createContinuousRecognizer({ onTranscriptChange, onEnd, onError } = {}) {
  const Ctor = getRecognitionCtor()
  if (!Ctor) {
    return { supported: false, start() {}, stop() {} }
  }

  let recognition = null
  let finalText = ''
  let stoppedByUser = false

  function build() {
    const r = new Ctor()
    r.lang = 'en-US'
    r.interimResults = true
    r.continuous = true

    r.onresult = (event) => {
      let interim = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const chunk = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          finalText += (finalText ? ' ' : '') + chunk.trim()
        } else {
          interim += chunk
        }
      }
      if (onTranscriptChange) onTranscriptChange((finalText + ' ' + interim).trim())
    }

    r.onerror = (event) => {
      if (event.error === 'no-speech' || event.error === 'aborted') return
      if (onError) onError(event.error)
    }

    // Chrome auto-stops continuous recognition after a period of silence —
    // transparently restart unless the user explicitly stopped it.
    r.onend = () => {
      if (stoppedByUser) {
        if (onEnd) onEnd(finalText.trim())
      } else {
        try { recognition = build(); recognition.start() } catch { /* noop */ }
      }
    }

    return r
  }

  return {
    supported: true,
    start() {
      finalText = ''
      stoppedByUser = false
      recognition = build()
      try { recognition.start() } catch { /* noop */ }
    },
    stop() {
      stoppedByUser = true
      if (recognition) {
        try { recognition.stop() } catch { /* noop */ }
      }
    }
  }
}

// Starts listening once and resolves with { transcript, similarity, passed }.
// `target` is the expected English text. Rejects on error or no speech.
export function listenAndCompare(target, { timeoutMs = 6000 } = {}) {
  return new Promise((resolve, reject) => {
    const Ctor = getRecognitionCtor()
    if (!Ctor) {
      reject(new Error('unsupported'))
      return
    }

    const recognition = new Ctor()
    recognition.lang = 'en-US'
    recognition.interimResults = false
    recognition.maxAlternatives = 3
    recognition.continuous = false

    let settled = false
    const timer = setTimeout(() => {
      if (settled) return
      settled = true
      try { recognition.stop() } catch { /* noop */ }
      reject(new Error('timeout'))
    }, timeoutMs)

    recognition.onresult = (event) => {
      if (settled) return
      settled = true
      clearTimeout(timer)

      // Check all alternatives, keep the best-matching one.
      const alternatives = Array.from(event.results[0]).map((r) => r.transcript)
      let best = { transcript: alternatives[0] || '', similarity: 0 }
      for (const alt of alternatives) {
        const sim = pronunciationSimilarity(target, alt)
        if (sim > best.similarity) best = { transcript: alt, similarity: sim }
      }
      resolve({
        transcript: best.transcript,
        similarity: best.similarity,
        passed: best.similarity >= 0.72
      })
    }

    recognition.onerror = (event) => {
      if (settled) return
      settled = true
      clearTimeout(timer)
      reject(new Error(event.error || 'recognition-error'))
    }

    recognition.onend = () => {
      if (settled) return
      settled = true
      clearTimeout(timer)
      reject(new Error('no-speech'))
    }

    try {
      recognition.start()
    } catch (err) {
      settled = true
      clearTimeout(timer)
      reject(err)
    }
  })
}
