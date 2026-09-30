// Thin wrapper around the browser's built-in SpeechSynthesis API.
// No external service or API key needed — works offline in modern browsers.
export function speakWord(text) {
  if (!('speechSynthesis' in window)) return false

  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'en-US'
  utterance.rate = 0.85
  window.speechSynthesis.speak(utterance)
  return true
}

export function isSpeechSupported() {
  return 'speechSynthesis' in window
}
