// Writing skill — Uzbek→English sentence construction prompts.
// One set per grammar/vocabulary level (1-14), reinforcing the same
// structure taught in grammar.js at that level. The learner types the
// English sentence; the answer is checked against a normalized list of
// accepted variants (case/punctuation-insensitive, a couple of common
// phrasings allowed per prompt). A short hint (first letters) is available
// if they get stuck, at a small XP discount.

export const writing = [
  {
    level: 1,
    title: 'To be: am / is / are',
    prompts: [
      { uz: 'Men talabaman.', accepted: ['i am a student', "i'm a student"] },
      { uz: 'U (ayol) baxtli.', accepted: ['she is happy', "she's happy"] },
      { uz: 'Biz do\'stmiz.', accepted: ['we are friends', "we're friends"] },
      { uz: 'Bu mening kitobim emas.', accepted: ['this is not my book', "this isn't my book"] },
      { uz: 'Ular maktabda.', accepted: ['they are at school', "they're at school"] },
      { uz: 'Men charchaganman.', accepted: ['i am tired', "i'm tired"] }
    ]
  },
  {
    level: 2,
    title: 'Otlar: birlik va ko\'plik',
    prompts: [
      { uz: 'Mening ikkita kitobim bor.', accepted: ['i have two books'] },
      { uz: 'Uchta quti bor.', accepted: ['there are three boxes'] },
      { uz: 'Bolalar o\'ynayapti.', accepted: ['the children are playing'] },
      { uz: 'Beshta shahar bor edi.', accepted: ['there were five cities'] },
      { uz: 'U bir nechta do\'stlarga ega.', accepted: ['he has some friends', 'she has some friends'] },
      { uz: 'Ikkita erkak keldi.', accepted: ['two men came'] }
    ]
  },
  {
    level: 3,
    title: 'Present Simple',
    prompts: [
      { uz: 'Men har kuni ishlayman.', accepted: ['i work every day'] },
      { uz: 'U (erkak) qahva ichadi.', accepted: ['he drinks coffee'] },
      { uz: 'Ular ingliz tilini o\'rganishadi.', accepted: ['they study english', 'they learn english'] },
      { uz: 'U (ayol) mashina haydamaydi.', accepted: ["she doesn't drive", 'she does not drive'] },
      { uz: 'Siz uni bilasizmi?', accepted: ['do you know him', 'do you know her'] },
      { uz: 'Quyosh sharqdan chiqadi.', accepted: ['the sun rises in the east'] }
    ]
  },
  {
    level: 4,
    title: 'Present Continuous',
    prompts: [
      { uz: 'Men hozir ovqatlanyapman.', accepted: ['i am eating now', "i'm eating now"] },
      { uz: 'U (ayol) kitob o\'qiyapti.', accepted: ['she is reading a book', "she's reading a book"] },
      { uz: 'Ular futbol o\'ynashyapti.', accepted: ["they're playing football", 'they are playing football'] },
      { uz: 'Yomg\'ir yog\'ayapti.', accepted: ["it's raining", 'it is raining'] },
      { uz: 'Nima qilyapsan?', accepted: ['what are you doing'] },
      { uz: 'Biz sizni kutyapmiz.', accepted: ["we're waiting for you", 'we are waiting for you'] }
    ]
  },
  {
    level: 5,
    title: 'Past Simple',
    prompts: [
      { uz: 'Men kecha bozorga bordim.', accepted: ['i went to the market yesterday'] },
      { uz: 'U (erkak) xat yozdi.', accepted: ['he wrote a letter'] },
      { uz: 'Biz filmni ko\'rmadik.', accepted: ["we didn't watch the movie", 'we did not watch the movie'] },
      { uz: 'Ular o\'tgan yili uylanishdi.', accepted: ['they got married last year'] },
      { uz: 'Siz bu yerga qachon keldingiz?', accepted: ['when did you come here', 'when did you arrive here'] },
      { uz: 'U (ayol) darsni tugatdi.', accepted: ['she finished the lesson'] }
    ]
  },
  {
    level: 6,
    title: 'Future: will / going to',
    prompts: [
      { uz: 'Men ertaga sizga qo\'ng\'iroq qilaman.', accepted: ['i will call you tomorrow', "i'll call you tomorrow"] },
      { uz: 'U (ayol) yangi mashina sotib olmoqchi.', accepted: ['she is going to buy a new car'] },
      { uz: 'Biz kelasi hafta safar qilamiz.', accepted: ['we will travel next week', "we'll travel next week"] },
      { uz: 'Yomg\'ir yog\'adi deb o\'ylayman.', accepted: ["i think it will rain", "i think it's going to rain"] },
      { uz: 'Ular uyni sotmoqchi emas.', accepted: ["they are not going to sell the house", "they aren't going to sell the house"] },
      { uz: 'Men bu ishni qilaman.', accepted: ['i will do this', "i'll do this"] }
    ]
  },
  {
    level: 7,
    title: 'Modal fe\'llar: can, must, should',
    prompts: [
      { uz: 'Men suzishni bilaman.', accepted: ['i can swim'] },
      { uz: 'Siz ko\'proq suv ichishingiz kerak.', accepted: ['you should drink more water'] },
      { uz: 'U (erkak) bugun ishlashi shart.', accepted: ['he must work today'] },
      { uz: 'Biz shovqin qilmasligimiz kerak.', accepted: ["we mustn't make noise", 'we must not make noise'] },
      { uz: 'Men yordam bera olamanmi?', accepted: ['can i help', 'can i help you'] },
      { uz: 'Sen erta uxlashing kerak.', accepted: ['you should sleep early'] }
    ]
  },
  {
    level: 8,
    title: 'Present Perfect',
    prompts: [
      { uz: 'Men bu filmni ko\'rganman.', accepted: ["i have seen this movie", "i've seen this movie"] },
      { uz: 'U (ayol) hech qachon Parijga bormagan.', accepted: ['she has never been to paris'] },
      { uz: 'Biz allaqachon tushlik qildik.', accepted: ["we have already had lunch", "we've already had lunch"] },
      { uz: 'Siz uy vazifasini tugatdingizmi?', accepted: ['have you finished your homework'] },
      { uz: 'Ular hali kelishmagan.', accepted: ["they haven't arrived yet", 'they have not arrived yet'] },
      { uz: 'Men bu kitobni uch marta o\'qiganman.', accepted: ['i have read this book three times'] }
    ]
  },
  {
    level: 9,
    title: 'Passive Voice (asosiy)',
    prompts: [
      { uz: 'Bu uy 1990 yilda qurilgan.', accepted: ['this house was built in 1990'] },
      { uz: 'Xat yozildi.', accepted: ['the letter was written'] },
      { uz: 'Ingliz tili butun dunyoda gapiriladi.', accepted: ['english is spoken all over the world', 'english is spoken around the world'] },
      { uz: 'Mashina ta\'mirlanmoqda.', accepted: ['the car is being repaired'] },
      { uz: 'Bu kitob millionlab odamlar tomonidan o\'qilgan.', accepted: ['this book has been read by millions of people'] },
      { uz: 'Ovqat allaqachon tayyorlangan.', accepted: ['the food has already been cooked', 'the food has already been prepared'] }
    ]
  },
  {
    level: 10,
    title: 'Relative Clauses (who / which / that)',
    prompts: [
      { uz: 'Bu doktor bo\'lgan odam.', accepted: ['this is the man who is a doctor'] },
      { uz: 'Men yozgan kitob mashhur.', accepted: ['the book that i wrote is famous', 'the book which i wrote is famous'] },
      { uz: 'Kecha ko\'rgan filmimiz zo\'r edi.', accepted: ['the movie that we watched yesterday was great', 'the movie which we watched yesterday was great'] },
      { uz: 'Bu yerda yashaydigan qiz mening singlim.', accepted: ['the girl who lives here is my sister'] },
      { uz: 'U menga sotib olgan uy chiroyli.', accepted: ['the house that he bought me is beautiful', 'the house which he bought me is beautiful'] },
      { uz: 'Bu mening onam ishlaydigan kompaniya.', accepted: ['this is the company where my mother works'] }
    ]
  },
  {
    level: 11,
    title: 'First Conditional',
    prompts: [
      { uz: 'Agar yomg\'ir yog\'sa, men uyda qolaman.', accepted: ['if it rains, i will stay home', "if it rains, i'll stay home"] },
      { uz: 'Agar sen mehnat qilsang, muvaffaqiyatga erishasan.', accepted: ['if you work hard, you will succeed', "if you work hard, you'll succeed"] },
      { uz: 'Agar u kelmasa, biz boshlaymiz.', accepted: ["if he doesn't come, we will start", "if he doesn't come, we'll start"] },
      { uz: 'Vaqtim bo\'lsa, senga qo\'ng\'iroq qilaman.', accepted: ['if i have time, i will call you', "if i have time, i'll call you"] },
      { uz: 'Agar ertaga havo yaxshi bo\'lsa, sayohat qilamiz.', accepted: ["if the weather is nice tomorrow, we will travel", "if the weather is nice tomorrow, we'll travel"] },
      { uz: 'Agar sen tez yugursang, poyezdga ulgurasan.', accepted: ["if you run fast, you will catch the train", "if you run fast, you'll catch the train"] }
    ]
  },
  {
    level: 12,
    title: 'Reported Speech',
    prompts: [
      { uz: '"Men charchadim" dedi u (ayol).', accepted: ['she said that she was tired', 'she said she was tired'] },
      { uz: '"Biz keramiz" deyishdi ular.', accepted: ['they said that they would come', 'they said they would come'] },
      { uz: 'U (erkak) menga ishlayotganini aytdi.', accepted: ['he told me that he was working', 'he told me he was working'] },
      { uz: 'U (ayol) meni sevishini aytdi.', accepted: ['she said that she loved me', 'she said she loved me'] },
      { uz: 'U (erkak) kechikkanini tushuntirdi.', accepted: ['he explained that he was late'] },
      { uz: 'Ular uyga ketishlarini aytishdi.', accepted: ['they said that they were going home', 'they said they were going home'] }
    ]
  },
  {
    level: 13,
    title: 'Second Conditional',
    prompts: [
      { uz: 'Agar men boy bo\'lsam, dunyo bo\'ylab sayohat qilardim.', accepted: ['if i were rich, i would travel around the world', "if i were rich, i'd travel around the world"] },
      { uz: 'Agar sen menda bo\'lsang, nima qilarding?', accepted: ['what would you do if you were me'] },
      { uz: 'Vaqtim bo\'lsa, ko\'proq kitob o\'qirdim.', accepted: ['if i had more time, i would read more books', "if i had more time, i'd read more books"] },
      { uz: 'Agar u yordam so\'rasa, men berardim.', accepted: ['if he asked for help, i would give it', 'if she asked for help, i would give it'] },
      { uz: 'Agar men uchishni bilsam, uchardim.', accepted: ['if i could fly, i would fly', "if i could fly, i'd fly"] },
      { uz: 'Agar biz Londonda yashasak, har kuni muzeyga borardik.', accepted: ["if we lived in london, we would visit the museum every day", "if we lived in london, we'd visit the museum every day"] }
    ]
  },
  {
    level: 14,
    title: 'Mixed Conditionals & Inversion',
    prompts: [
      { uz: 'Agar men ko\'proq o\'qigan bo\'lsam, hozir shifokor bo\'lardim.', accepted: ['if i had studied more, i would be a doctor now', "if i had studied more, i'd be a doctor now"] },
      { uz: 'Hech qachon bunday narsani ko\'rmaganman.', accepted: ['never have i seen such a thing'] },
      { uz: 'Agar sen ogohlantirmaganingda, biz adashib qolardik.', accepted: ["had you not warned us, we would have got lost", "had you not warned us, we would have gotten lost"] },
      { uz: 'Faqat keyin men haqiqatni tushundim.', accepted: ['only later did i understand the truth'] },
      { uz: 'Agar u pul tejagan bo\'lsa, hozir uyi bo\'lardi.', accepted: ['if he had saved money, he would have a house now'] },
      { uz: 'Zinhor bu haqda unutma.', accepted: ['never forget about this'] }
    ]
  }
]

// Normalizes text for lenient comparison: lowercase, strip punctuation
// (keeping apostrophes so contractions still match), collapse whitespace.
export function normalizeAnswer(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[.,!?;:"]/g, '')
    .replace(/\s+/g, ' ')
}

export function checkWritingAnswer(userText, accepted) {
  const norm = normalizeAnswer(userText)
  if (!norm) return false
  return accepted.some((a) => normalizeAnswer(a) === norm)
}
