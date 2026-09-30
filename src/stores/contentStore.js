import { defineStore } from 'pinia'
import { db } from '../firebase/config'
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
  serverTimestamp
} from 'firebase/firestore'
import { customWords as customWordsArray } from '../data/vocabulary.js'
import { stories as storiesArray } from '../data/stories.js'
import { grammar as grammarArray } from '../data/grammar.js'
import { listening as listeningArray } from '../data/listening.js'
import { writing as writingArray } from '../data/writing.js'
import {
  ieltsReadingPassages,
  ieltsListeningItems,
  ieltsWritingTask1s,
  ieltsWritingTasks,
  ieltsSpeakingSets
} from '../data/ielts.js'

const CUSTOM_STORY_ID_OFFSET = 10000
const COLLECTIONS = {
  words: 'customWords',
  grammar: 'customGrammar',
  listening: 'customListening',
  writing: 'customWriting',
  stories: 'customStories',
  ieltsReading: 'customIeltsReading',
  ieltsListening: 'customIeltsListening',
  ieltsTask1: 'customIeltsTask1',
  ieltsTask2: 'customIeltsTask2',
  ieltsSpeaking: 'customIeltsSpeaking'
}

function toDateStr(date) {
  return date.toISOString().slice(0, 10)
}
function daysAgoStr(n) {
  const d = new Date(); d.setDate(d.getDate() - n); return toDateStr(d)
}
function computeRetentionBands(docs) {
  const today = toDateStr(new Date())
  return [1, 7, 30].map((n) => {
    const cohortDate = daysAgoStr(n)
    const cohort = docs.filter((u) => {
      const created = u.createdAt?.toDate ? u.createdAt.toDate() : (u.createdAt ? new Date(u.createdAt) : null)
      return created && toDateStr(created) === cohortDate
    })
    const returned = cohort.filter((u) => u.lastActiveDate === today).length
    return { day: n, cohortSize: cohort.length, returned, percent: cohort.length ? Math.round((returned / cohort.length) * 100) : null }
  })
}

function mergeByCustomId(target, docs, mapper) {
  for (const d of docs) {
    if (!target.some((x) => x.__customId === d.id)) target.push(mapper(d))
  }
}
function replaceByCustomId(target, id, next) {
  const idx = target.findIndex((x) => x.__customId === id)
  if (idx !== -1) target[idx] = next
}
function removeByCustomId(target, id) {
  const idx = target.findIndex((x) => x.__customId === id)
  if (idx !== -1) target.splice(idx, 1)
}

export const useContentStore = defineStore('content', {
  state: () => ({
    loaded: false,
    customWordDocs: [],
    customGrammarDocs: [],
    customListeningDocs: [],
    customWritingDocs: [],
    customStoryDocs: [],
    customIeltsReadingDocs: [],
    customIeltsListeningDocs: [],
    customIeltsTask1Docs: [],
    customIeltsTask2Docs: [],
    customIeltsSpeakingDocs: [],
    userCount: null,
    totalXp: null,
    proCount: null,
    proConversionPercent: null,
    retention: [],
    statsLoading: false
  }),

  getters: {
    totalCustomContent: (state) => state.customWordDocs.length + state.customGrammarDocs.length + state.customListeningDocs.length + state.customWritingDocs.length + state.customStoryDocs.length + state.customIeltsReadingDocs.length + state.customIeltsListeningDocs.length + state.customIeltsTask1Docs.length + state.customIeltsTask2Docs.length + state.customIeltsSpeakingDocs.length
  },

  actions: {
    async fetchCustomContent(force = false) {
      if (this.loaded && !force) return
      try {
        const names = Object.values(COLLECTIONS)
        const snapshots = await Promise.all(names.map((name) => getDocs(collection(db, name))))
        const byName = Object.fromEntries(names.map((name, i) => [name, snapshots[i].docs.map((d) => ({ id: d.id, ...d.data() }))]))

        this.customWordDocs = byName.customWords || []
        for (const w of this.customWordDocs) if (!customWordsArray.some((x) => x.__customId === w.id)) customWordsArray.push({ ...w, __customId: w.id })

        this.customGrammarDocs = byName.customGrammar || []
        mergeByCustomId(grammarArray, this.customGrammarDocs, (d) => ({ ...d.grammar, __customId: d.id }))

        this.customListeningDocs = byName.customListening || []
        mergeByCustomId(listeningArray, this.customListeningDocs, (d) => ({ ...d.listening, __customId: d.id }))

        this.customWritingDocs = byName.customWriting || []
        mergeByCustomId(writingArray, this.customWritingDocs, (d) => ({ ...d.writing, __customId: d.id }))

        this.customStoryDocs = byName.customStories || []
        for (const s of this.customStoryDocs) if (!storiesArray.some((x) => x.id === s.numericId)) storiesArray.push({ ...s.story, id: s.numericId })

        this.customIeltsReadingDocs = byName.customIeltsReading || []
        mergeByCustomId(ieltsReadingPassages, this.customIeltsReadingDocs, (d) => ({ ...d.item, __customId: d.id }))
        this.customIeltsListeningDocs = byName.customIeltsListening || []
        mergeByCustomId(ieltsListeningItems, this.customIeltsListeningDocs, (d) => ({ ...d.item, __customId: d.id }))
        this.customIeltsTask1Docs = byName.customIeltsTask1 || []
        mergeByCustomId(ieltsWritingTask1s, this.customIeltsTask1Docs, (d) => ({ ...d.item, __customId: d.id }))
        this.customIeltsTask2Docs = byName.customIeltsTask2 || []
        mergeByCustomId(ieltsWritingTasks, this.customIeltsTask2Docs, (d) => ({ ...d.item, __customId: d.id }))
        this.customIeltsSpeakingDocs = byName.customIeltsSpeaking || []
        mergeByCustomId(ieltsSpeakingSets, this.customIeltsSpeakingDocs, (d) => ({ ...d.item, __customId: d.id }))

        this.loaded = true
      } catch (err) {
        console.error('Failed to load custom content', err)
      }
    },

    async addCustomWord(payload) {
      const data = { level: Number(payload.level), en: payload.en.trim(), uz: payload.uz.trim(), example: payload.example.trim(), exampleUz: payload.exampleUz.trim(), createdAt: serverTimestamp(), updatedAt: serverTimestamp() }
      const ref = await addDoc(collection(db, COLLECTIONS.words), data)
      const entry = { id: ref.id, ...data }
      this.customWordDocs.push(entry)
      customWordsArray.push({ ...entry, __customId: ref.id })
      return entry
    },
    async updateCustomWord(id, payload) {
      const data = { level: Number(payload.level), en: payload.en.trim(), uz: payload.uz.trim(), example: payload.example.trim(), exampleUz: payload.exampleUz.trim(), updatedAt: serverTimestamp() }
      await updateDoc(doc(db, COLLECTIONS.words, id), data)
      const idx = this.customWordDocs.findIndex((x) => x.id === id)
      if (idx !== -1) this.customWordDocs[idx] = { ...this.customWordDocs[idx], ...data }
      replaceByCustomId(customWordsArray, id, { ...data, __customId: id })
      return this.customWordDocs.find((x) => x.id === id)
    },
    async deleteCustomWord(id) {
      await deleteDoc(doc(db, COLLECTIONS.words, id))
      const entry = this.customWordDocs.find((x) => x.id === id)
      this.customWordDocs = this.customWordDocs.filter((x) => x.id !== id)
      if (entry) removeByCustomId(customWordsArray, id)
    },

    async addCustomGrammar(grammar) {
      const ref = await addDoc(collection(db, COLLECTIONS.grammar), { grammar, createdAt: serverTimestamp(), updatedAt: serverTimestamp() })
      const entry = { id: ref.id, grammar }
      this.customGrammarDocs.push(entry); grammarArray.push({ ...grammar, __customId: ref.id }); return entry
    },
    async updateCustomGrammar(id, grammar) {
      await updateDoc(doc(db, COLLECTIONS.grammar, id), { grammar, updatedAt: serverTimestamp() })
      const idx = this.customGrammarDocs.findIndex((x) => x.id === id); if (idx !== -1) this.customGrammarDocs[idx] = { ...this.customGrammarDocs[idx], grammar }
      replaceByCustomId(grammarArray, id, { ...grammar, __customId: id }); return grammar
    },
    async deleteCustomGrammar(id) {
      await deleteDoc(doc(db, COLLECTIONS.grammar, id)); this.customGrammarDocs = this.customGrammarDocs.filter((x) => x.id !== id); removeByCustomId(grammarArray, id)
    },

    async addCustomListening(listening) {
      const ref = await addDoc(collection(db, COLLECTIONS.listening), { listening, createdAt: serverTimestamp(), updatedAt: serverTimestamp() })
      const entry = { id: ref.id, listening }; this.customListeningDocs.push(entry); listeningArray.push({ ...listening, __customId: ref.id }); return entry
    },
    async updateCustomListening(id, listening) {
      await updateDoc(doc(db, COLLECTIONS.listening, id), { listening, updatedAt: serverTimestamp() })
      const idx = this.customListeningDocs.findIndex((x) => x.id === id); if (idx !== -1) this.customListeningDocs[idx] = { ...this.customListeningDocs[idx], listening }
      replaceByCustomId(listeningArray, id, { ...listening, __customId: id }); return listening
    },
    async deleteCustomListening(id) {
      await deleteDoc(doc(db, COLLECTIONS.listening, id)); this.customListeningDocs = this.customListeningDocs.filter((x) => x.id !== id); removeByCustomId(listeningArray, id)
    },

    async addCustomWriting(writing) {
      const ref = await addDoc(collection(db, COLLECTIONS.writing), { writing, createdAt: serverTimestamp(), updatedAt: serverTimestamp() })
      const entry = { id: ref.id, writing }; this.customWritingDocs.push(entry); writingArray.push({ ...writing, __customId: ref.id }); return entry
    },
    async updateCustomWriting(id, writing) {
      await updateDoc(doc(db, COLLECTIONS.writing, id), { writing, updatedAt: serverTimestamp() })
      const idx = this.customWritingDocs.findIndex((x) => x.id === id); if (idx !== -1) this.customWritingDocs[idx] = { ...this.customWritingDocs[idx], writing }
      replaceByCustomId(writingArray, id, { ...writing, __customId: id }); return writing
    },
    async deleteCustomWriting(id) {
      await deleteDoc(doc(db, COLLECTIONS.writing, id)); this.customWritingDocs = this.customWritingDocs.filter((x) => x.id !== id); removeByCustomId(writingArray, id)
    },

    async addCustomStory(story) {
      const numericId = CUSTOM_STORY_ID_OFFSET + this.customStoryDocs.length + 1
      const ref = await addDoc(collection(db, COLLECTIONS.stories), { numericId, story, createdAt: serverTimestamp(), updatedAt: serverTimestamp() })
      const entry = { id: ref.id, numericId, story }; this.customStoryDocs.push(entry); storiesArray.push({ ...story, id: numericId }); return entry
    },
    async updateCustomStory(id, story) {
      const existing = this.customStoryDocs.find((x) => x.id === id)
      await updateDoc(doc(db, COLLECTIONS.stories, id), { story, updatedAt: serverTimestamp() })
      const idx = this.customStoryDocs.findIndex((x) => x.id === id); if (idx !== -1) this.customStoryDocs[idx] = { ...this.customStoryDocs[idx], story }
      if (existing) { const sIdx = storiesArray.findIndex((x) => x.id === existing.numericId); if (sIdx !== -1) storiesArray[sIdx] = { ...story, id: existing.numericId } }
      return story
    },
    async deleteCustomStory(id) {
      await deleteDoc(doc(db, COLLECTIONS.stories, id)); const entry = this.customStoryDocs.find((x) => x.id === id); this.customStoryDocs = this.customStoryDocs.filter((x) => x.id !== id); if (entry) { const idx = storiesArray.findIndex((x) => x.id === entry.numericId); if (idx !== -1) storiesArray.splice(idx, 1) }
    },

    async addCustomIelts(type, item) {
      const collectionName = COLLECTIONS[type]
      if (!collectionName) throw new Error('Unknown IELTS collection')
      const ref = await addDoc(collection(db, collectionName), { item, createdAt: serverTimestamp(), updatedAt: serverTimestamp() })
      const entry = { id: ref.id, item }
      const key = type === 'ieltsReading' ? 'customIeltsReadingDocs' : type === 'ieltsListening' ? 'customIeltsListeningDocs' : type === 'ieltsTask1' ? 'customIeltsTask1Docs' : type === 'ieltsTask2' ? 'customIeltsTask2Docs' : 'customIeltsSpeakingDocs'
      this[key].push(entry)
      const target = type === 'ieltsReading' ? ieltsReadingPassages : type === 'ieltsListening' ? ieltsListeningItems : type === 'ieltsTask1' ? ieltsWritingTask1s : type === 'ieltsTask2' ? ieltsWritingTasks : ieltsSpeakingSets
      target.push({ ...item, __customId: ref.id }); return entry
    },
    async updateCustomIelts(type, id, item) {
      const collectionName = COLLECTIONS[type]; if (!collectionName) throw new Error('Unknown IELTS collection')
      await updateDoc(doc(db, collectionName, id), { item, updatedAt: serverTimestamp() })
      const key = type === 'ieltsReading' ? 'customIeltsReadingDocs' : type === 'ieltsListening' ? 'customIeltsListeningDocs' : type === 'ieltsTask1' ? 'customIeltsTask1Docs' : type === 'ieltsTask2' ? 'customIeltsTask2Docs' : 'customIeltsSpeakingDocs'
      const docs = this[key]; const idx = docs.findIndex((x) => x.id === id); if (idx !== -1) docs[idx] = { ...docs[idx], item }
      const target = type === 'ieltsReading' ? ieltsReadingPassages : type === 'ieltsListening' ? ieltsListeningItems : type === 'ieltsTask1' ? ieltsWritingTask1s : type === 'ieltsTask2' ? ieltsWritingTasks : ieltsSpeakingSets
      replaceByCustomId(target, id, { ...item, __customId: id }); return item
    },
    async deleteCustomIelts(type, id) {
      const collectionName = COLLECTIONS[type]; if (!collectionName) throw new Error('Unknown IELTS collection')
      await deleteDoc(doc(db, collectionName, id))
      const key = type === 'ieltsReading' ? 'customIeltsReadingDocs' : type === 'ieltsListening' ? 'customIeltsListeningDocs' : type === 'ieltsTask1' ? 'customIeltsTask1Docs' : type === 'ieltsTask2' ? 'customIeltsTask2Docs' : 'customIeltsSpeakingDocs'
      this[key] = this[key].filter((x) => x.id !== id)
      const target = type === 'ieltsReading' ? ieltsReadingPassages : type === 'ieltsListening' ? ieltsListeningItems : type === 'ieltsTask1' ? ieltsWritingTask1s : type === 'ieltsTask2' ? ieltsWritingTasks : ieltsSpeakingSets
      removeByCustomId(target, id)
    },

    async fetchStats() {
      this.statsLoading = true
      try {
        const snap = await getDocs(collection(db, 'users'))
        const docs = snap.docs.map((d) => d.data())
        this.userCount = snap.size
        this.totalXp = docs.reduce((sum, u) => sum + (u.xp || 0), 0)
        const proCount = docs.filter((u) => u.isPro).length
        this.proCount = proCount
        this.proConversionPercent = this.userCount ? Math.round((proCount / this.userCount) * 100) : 0
        this.retention = computeRetentionBands(docs)
      } catch (err) {
        console.error('Failed to load admin stats', err)
      } finally {
        this.statsLoading = false
      }
    }
  }
})
