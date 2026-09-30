// Minimal pairs — words that differ by exactly one sound, grouped by the
// contrast they train. These are the sound confusions Uzbek-speaking
// learners run into most often (short/long vowels, θ/s, r/l, v/w, etc.).
// Used for a listen-and-choose ear-training exercise, separate from the
// speak-and-check shadowing exercise.

export const minimalPairGroups = [
  {
    id: 'ship-sheep',
    contrast: 'ɪ vs iː',
    label: "Qisqa 'i' va uzun 'i'",
    pairs: [
      { a: { en: 'ship', ipa: '/ʃɪp/', uz: 'kema' }, b: { en: 'sheep', ipa: '/ʃiːp/', uz: 'qo\'y' } },
      { a: { en: 'bit', ipa: '/bɪt/', uz: 'bir oz' }, b: { en: 'beat', ipa: '/biːt/', uz: 'urmoq' } },
      { a: { en: 'live', ipa: '/lɪv/', uz: 'yashamoq' }, b: { en: 'leave', ipa: '/liːv/', uz: 'ketmoq' } },
      { a: { en: 'sit', ipa: '/sɪt/', uz: 'o\'tirmoq' }, b: { en: 'seat', ipa: '/siːt/', uz: 'o\'rindiq' } },
      { a: { en: 'fill', ipa: '/fɪl/', uz: 'to\'ldirmoq' }, b: { en: 'feel', ipa: '/fiːl/', uz: 'his qilmoq' } }
    ]
  },
  {
    id: 'r-l',
    contrast: 'r vs l',
    label: "'r' va 'l' tovushlari",
    pairs: [
      { a: { en: 'right', ipa: '/raɪt/', uz: 'o\'ng / to\'g\'ri' }, b: { en: 'light', ipa: '/laɪt/', uz: 'yorug\'lik' } },
      { a: { en: 'rice', ipa: '/raɪs/', uz: 'guruch' }, b: { en: 'lice', ipa: '/laɪs/', uz: 'bit (hasharot)' } },
      { a: { en: 'road', ipa: '/roʊd/', uz: 'yo\'l' }, b: { en: 'load', ipa: '/loʊd/', uz: 'yuk' } },
      { a: { en: 'correct', ipa: '/kəˈrekt/', uz: 'to\'g\'ri' }, b: { en: 'collect', ipa: '/kəˈlekt/', uz: 'yig\'moq' } },
      { a: { en: 'play', ipa: '/pleɪ/', uz: 'o\'ynamoq' }, b: { en: 'pray', ipa: '/preɪ/', uz: 'ibodat qilmoq' } }
    ]
  },
  {
    id: 'v-w',
    contrast: 'v vs w',
    label: "'v' va 'w' tovushlari",
    pairs: [
      { a: { en: 'vine', ipa: '/vaɪn/', uz: 'uzum tokchasi' }, b: { en: 'wine', ipa: '/waɪn/', uz: 'sharob' } },
      { a: { en: 'vet', ipa: '/vet/', uz: 'veterinar' }, b: { en: 'wet', ipa: '/wet/', uz: 'nam' } },
      { a: { en: 'vest', ipa: '/vest/', uz: 'jilet' }, b: { en: 'west', ipa: '/west/', uz: 'g\'arb' } },
      { a: { en: 'video', ipa: '/ˈvɪdioʊ/', uz: 'video' }, b: { en: 'wide', ipa: '/waɪd/', uz: 'keng' } }
    ]
  },
  {
    id: 'th-s',
    contrast: 'θ vs s',
    label: "'th' va 's' tovushlari",
    pairs: [
      { a: { en: 'think', ipa: '/θɪŋk/', uz: 'o\'ylamoq' }, b: { en: 'sink', ipa: '/sɪŋk/', uz: 'cho\'kmoq / rakovina' } },
      { a: { en: 'thank', ipa: '/θæŋk/', uz: 'rahmat' }, b: { en: 'sank', ipa: '/sæŋk/', uz: 'cho\'kdi' } },
      { a: { en: 'mouth', ipa: '/maʊθ/', uz: 'og\'iz' }, b: { en: 'mouse', ipa: '/maʊs/', uz: 'sichqon' } },
      { a: { en: 'thick', ipa: '/θɪk/', uz: 'qalin' }, b: { en: 'sick', ipa: '/sɪk/', uz: 'kasal' } }
    ]
  },
  {
    id: 'ae-e',
    contrast: 'æ vs e',
    label: "'a' va 'e' tovushlari",
    pairs: [
      { a: { en: 'bad', ipa: '/bæd/', uz: 'yomon' }, b: { en: 'bed', ipa: '/bed/', uz: 'krovat' } },
      { a: { en: 'man', ipa: '/mæn/', uz: 'erkak' }, b: { en: 'men', ipa: '/men/', uz: 'erkaklar' } },
      { a: { en: 'sat', ipa: '/sæt/', uz: 'o\'tirdi' }, b: { en: 'set', ipa: '/set/', uz: 'qo\'ymoq' } },
      { a: { en: 'pan', ipa: '/pæn/', uz: 'tova' }, b: { en: 'pen', ipa: '/pen/', uz: 'ruchka' } }
    ]
  },
  {
    id: 'p-b',
    contrast: 'p vs b',
    label: "'p' va 'b' tovushlari (jarangsiz/jarangli)",
    pairs: [
      { a: { en: 'pig', ipa: '/pɪg/', uz: 'cho\'chqa' }, b: { en: 'big', ipa: '/bɪg/', uz: 'katta' } },
      { a: { en: 'pack', ipa: '/pæk/', uz: 'to\'plam' }, b: { en: 'back', ipa: '/bæk/', uz: 'orqa' } },
      { a: { en: 'pat', ipa: '/pæt/', uz: 'yengil urish' }, b: { en: 'bat', ipa: '/bæt/', uz: 'ko\'rshapalak' } }
    ]
  },
  {
    id: 'sh-ch',
    contrast: 'ʃ vs tʃ',
    label: "'sh' va 'ch' tovushlari",
    pairs: [
      { a: { en: 'ship', ipa: '/ʃɪp/', uz: 'kema' }, b: { en: 'chip', ipa: '/tʃɪp/', uz: 'chip / bo\'lak' } },
      { a: { en: 'sheep', ipa: '/ʃiːp/', uz: 'qo\'y' }, b: { en: 'cheap', ipa: '/tʃiːp/', uz: 'arzon' } },
      { a: { en: 'wash', ipa: '/wɒʃ/', uz: 'yuvmoq' }, b: { en: 'watch', ipa: '/wɒtʃ/', uz: 'soat / tomosha qilmoq' } },
      { a: { en: 'shoes', ipa: '/ʃuːz/', uz: 'poyabzal' }, b: { en: 'choose', ipa: '/tʃuːz/', uz: 'tanlamoq' } }
    ]
  },
  {
    id: 'short-long-u',
    contrast: 'ʊ vs uː',
    label: "Qisqa 'u' va uzun 'u'",
    pairs: [
      { a: { en: 'full', ipa: '/fʊl/', uz: 'to\'la' }, b: { en: 'fool', ipa: '/fuːl/', uz: 'ahmoq' } },
      { a: { en: 'pull', ipa: '/pʊl/', uz: 'tortmoq' }, b: { en: 'pool', ipa: '/puːl/', uz: 'hovuz' } },
      { a: { en: 'look', ipa: '/lʊk/', uz: 'qaramoq' }, b: { en: 'Luke', ipa: '/luːk/', uz: 'Luk (ism)' } },
      { a: { en: 'good', ipa: '/gʊd/', uz: 'yaxshi' }, b: { en: 'food', ipa: '/fuːd/', uz: 'ovqat' } }
    ]
  },
  {
    id: 'n-ng',
    contrast: 'n vs ŋ',
    label: "'n' va 'ng' tovushlari",
    pairs: [
      { a: { en: 'sin', ipa: '/sɪn/', uz: 'gunoh' }, b: { en: 'sing', ipa: '/sɪŋ/', uz: 'qo\'shiq aytmoq' } },
      { a: { en: 'thin', ipa: '/θɪn/', uz: 'ingichka' }, b: { en: 'thing', ipa: '/θɪŋ/', uz: 'narsa' } },
      { a: { en: 'ban', ipa: '/bæn/', uz: 'taqiqlamoq' }, b: { en: 'bang', ipa: '/bæŋ/', uz: 'portlash ovozi' } },
      { a: { en: 'run', ipa: '/rʌn/', uz: 'yugurmoq' }, b: { en: 'rung', ipa: '/rʌŋ/', uz: 'zina pog\'onasi' } }
    ]
  }
]

export function getAllMinimalPairs() {
  return minimalPairGroups.flatMap((g) => g.pairs.map((p) => ({ ...p, groupId: g.id, contrast: g.contrast })))
}
