// Grammar lessons — one short grammar topic per vocabulary level (1-14).
// Each topic has a short Uzbek explanation with rule bullets, a few
// English/Uzbek examples, and 8-10 scored practice exercises (fill-in-the-
// blank and error-correction style, multiple choice). Each correct exercise
// answer awards XP just like vocabulary exercises.

export const grammar = [
  {
    level: 1,
    title: 'To be: am / is / are',
    titleEn: 'Verb "to be"',
    points: [
      '"I" bilan doim "am" ishlatiladi: I am a student.',
      '"He / She / It" bilan "is" ishlatiladi: She is happy.',
      '"You / We / They" bilan "are" ishlatiladi: They are friends.',
      'Inkor uchun "not" qo\'shiladi: I am not tired. / She is not here.'
    ],
    examples: [
      { en: 'I am from Tashkent.', uz: 'Men Toshkentdanman.' },
      { en: 'He is a teacher.', uz: 'U o\'qituvchi.' },
      { en: 'We are hungry.', uz: 'Biz ochmiz.' }
    ],
    exercises: [
      { question: 'She ___ my sister.', options: ['am', 'is', 'are'], correct: 'is' },
      { question: 'They ___ at school.', options: ['am', 'is', 'are'], correct: 'are' },
      { question: 'I ___ happy today.', options: ['am', 'is', 'are'], correct: 'am' },
      { question: 'We ___ from Uzbekistan.', options: ['am', 'is', 'are'], correct: 'are' },
      { question: 'It ___ a big house.', options: ['am', 'is', 'are'], correct: 'is' },
      { question: 'Xato qaysi gapda? To\'g\'risini tanlang.', options: ['I is tired.', 'I am tired.', 'I are tired.'], correct: 'I am tired.' },
      { question: 'You ___ not late.', options: ['am', 'is', 'are'], correct: 'are' },
      { question: 'Xato qaysi gapda? To\'g\'risini tanlang.', options: ['She are a doctor.', 'She is a doctor.', 'She am a doctor.'], correct: 'She is a doctor.' },
      { question: 'My parents ___ at home.', options: ['am', 'is', 'are'], correct: 'are' },
      { question: 'This ___ my favorite book.', options: ['am', 'is', 'are'], correct: 'is' },
      { question: 'Xato qaysi gapda? To\'g\'risini tanlang.', options: ['We is students.', 'We are students.', 'We am students.'], correct: 'We are students.' },
      { question: 'The weather ___ nice today.', options: ['am', 'is', 'are'], correct: 'is' }
    ]
  },
  {
    level: 2,
    title: 'Otlar: birlik va ko\'plik',
    titleEn: 'Singular & Plural Nouns',
    points: [
      'Ko\'pchilik otlarga ko\'plik uchun "-s" qo\'shiladi: book → books.',
      '-s, -ss, -sh, -ch, -x bilan tugagan so\'zlarga "-es" qo\'shiladi: box → boxes.',
      'Undosh + y bilan tugasa, y → i + es: city → cities.',
      'Ba\'zi so\'zlar tartibsiz o\'zgaradi: man → men, child → children.'
    ],
    examples: [
      { en: 'I have two books.', uz: 'Mening ikkita kitobim bor.' },
      { en: 'There are three boxes.', uz: 'Uchta quti bor.' },
      { en: 'The children are playing.', uz: 'Bolalar o\'ynayapti.' }
    ],
    exercises: [
      { question: 'One city, two ___', options: ['citys', 'cities', 'cityes'], correct: 'cities' },
      { question: 'One child, two ___', options: ['childs', 'children', 'childes'], correct: 'children' },
      { question: 'One box, two ___', options: ['boxs', 'boxes', 'box'], correct: 'boxes' },
      { question: 'One book, two ___', options: ['bookes', 'books', 'bookis'], correct: 'books' },
      { question: 'One man, two ___', options: ['mans', 'men', 'manes'], correct: 'men' },
      { question: 'One country, two ___', options: ['countrys', 'countries', 'countryes'], correct: 'countries' },
      { question: 'Xato qaysi gapda? To\'g\'risini tanlang.', options: ['I have two dogs.', 'I have two dogies.', 'I have two dog.'], correct: 'I have two dogs.' },
      { question: 'One woman, two ___', options: ['womans', 'women', 'womens'], correct: 'women' },
      { question: 'One class, two ___', options: ['class', 'classes', 'classs'], correct: 'classes' },
      { question: 'One tooth, two ___', options: ['tooths', 'teeth', 'toothes'], correct: 'teeth' },
      { question: 'One foot, two ___', options: ['foots', 'feet', 'footes'], correct: 'feet' },
      { question: 'Xato qaysi gapda? To\'g\'risini tanlang.', options: ['I have three sheeps.', 'I have three sheep.', 'I have three sheepes.'], correct: 'I have three sheep.' }
    ]
  },
  {
    level: 3,
    title: 'Present Simple',
    titleEn: 'Present Simple Tense',
    points: [
      'Doimiy odat va haqiqatlar uchun ishlatiladi: I work every day.',
      'He/She/It bilan fe\'lga "-s" qo\'shiladi: She works. He goes.',
      'Inkor: don\'t / doesn\'t + fe\'l: I don\'t know. He doesn\'t like it.',
      'Savol: Do/Does + ega + fe\'l: Do you like tea? Does she work here?'
    ],
    examples: [
      { en: 'I go to school every day.', uz: 'Men har kuni maktabga boraman.' },
      { en: 'She doesn\'t drink coffee.', uz: 'U kofe ichmaydi.' },
      { en: 'Do you speak English?', uz: 'Siz inglizcha gapirasizmi?' }
    ],
    exercises: [
      { question: 'He ___ (work) every morning.', options: ['work', 'works', 'working'], correct: 'works' },
      { question: 'They ___ (not/like) fish.', options: ['don\'t like', 'doesn\'t like', 'not like'], correct: 'don\'t like' },
      { question: '___ she speak French?', options: ['Do', 'Does', 'Is'], correct: 'Does' },
      { question: 'My sister ___ (study) at university.', options: ['study', 'studies', 'studying'], correct: 'studies' },
      { question: 'I ___ (not/eat) meat.', options: ['don\'t eat', 'doesn\'t eat', 'not eat'], correct: 'don\'t eat' },
      { question: 'Xato qaysi gapda? To\'g\'risini tanlang.', options: ['He go to work by bus.', 'He goes to work by bus.', 'He going to work by bus.'], correct: 'He goes to work by bus.' },
      { question: '___ you like tea?', options: ['Do', 'Does', 'Are'], correct: 'Do' },
      { question: 'The sun ___ (rise) in the east.', options: ['rise', 'rises', 'rising'], correct: 'rises' },
      { question: 'Xato qaysi gapda? To\'g\'risini tanlang.', options: ['She don\'t like coffee.', 'She doesn\'t likes coffee.', 'She doesn\'t like coffee.'], correct: 'She doesn\'t like coffee.' },
      { question: 'We ___ (live) in Tashkent.', options: ['live', 'lives', 'living'], correct: 'live' },
      { question: '___ your brother play football?', options: ['Do', 'Does', 'Is'], correct: 'Does' },
      { question: 'Cats ___ (like) fish.', options: ['like', 'likes', 'liking'], correct: 'like' }
    ]
  },
  {
    level: 4,
    title: 'Present Continuous',
    titleEn: 'Present Continuous Tense',
    points: [
      'Hozir sodir bo\'layotgan harakatlar uchun: am/is/are + fe\'l+ing.',
      'I am reading a book right now.',
      'Rejalashtirilgan kelajak uchun ham ishlatiladi: We are meeting tomorrow.',
      'Inkor: am/is/are + not + fe\'l+ing: She is not sleeping.'
    ],
    examples: [
      { en: 'I am studying English now.', uz: 'Men hozir ingliz tilini o\'rganyapman.' },
      { en: 'They are watching a movie.', uz: 'Ular film tomosha qilishyapti.' },
      { en: 'We are leaving tomorrow morning.', uz: 'Biz ertaga ertalab jo\'naymiz.' }
    ],
    exercises: [
      { question: 'She ___ (cook) dinner right now.', options: ['cook', 'is cooking', 'cooks'], correct: 'is cooking' },
      { question: 'I ___ (not/work) today.', options: ['am not working', 'not working', 'don\'t working'], correct: 'am not working' },
      { question: '___ you listening to me?', options: ['Do', 'Are', 'Is'], correct: 'Are' },
      { question: 'They ___ (play) football now.', options: ['play', 'plays', 'are playing'], correct: 'are playing' },
      { question: 'He ___ (write) an email at the moment.', options: ['writes', 'is writing', 'write'], correct: 'is writing' },
      { question: 'Xato qaysi gapda? To\'g\'risini tanlang.', options: ['She is sleep now.', 'She is sleeping now.', 'She sleeping now.'], correct: 'She is sleeping now.' },
      { question: 'We ___ (meet) them tomorrow at 5.', options: ['meet', 'meets', 'are meeting'], correct: 'are meeting' },
      { question: 'The children ___ (not/study) right now.', options: ['are not studying', 'not studying', 'don\'t studying'], correct: 'are not studying' },
      { question: 'Xato qaysi gapda? To\'g\'risini tanlang.', options: ['I am reading a book now.', 'I reading a book now.', 'I is reading a book now.'], correct: 'I am reading a book now.' },
      { question: 'Why ___ (you/laugh)?', options: ['are you laughing', 'do you laugh', 'you are laughing'], correct: 'are you laughing' },
      { question: 'Look! It ___ (start) to rain.', options: ['starts', 'is starting', 'start'], correct: 'is starting' },
      { question: 'We ___ (not/watch) TV right now.', options: ['are not watching', 'don\'t watch', 'not watching'], correct: 'are not watching' }
    ]
  },
  {
    level: 5,
    title: 'Past Simple',
    titleEn: 'Past Simple Tense',
    points: [
      'O\'tgan zamonda tugagan harakatlar uchun: I worked yesterday.',
      'Muntazam fe\'llarga "-ed" qo\'shiladi: work → worked, play → played.',
      'Tartibsiz fe\'llar o\'zgacha shaklga ega: go → went, see → saw, have → had.',
      'Inkor/savol uchun "did" ishlatiladi: I didn\'t go. Did you see him?'
    ],
    examples: [
      { en: 'I visited my grandmother last week.', uz: 'Men o\'tgan hafta buvimni ko\'rgani bordim.' },
      { en: 'She didn\'t call me yesterday.', uz: 'U kecha menga qo\'ng\'iroq qilmadi.' },
      { en: 'Did you see that movie?', uz: 'Siz o\'sha filmni ko\'rdingizmi?' }
    ],
    exercises: [
      { question: 'Yesterday, I ___ (go) to the market.', options: ['go', 'goed', 'went'], correct: 'went' },
      { question: 'She ___ (not/finish) her homework.', options: ['didn\'t finish', 'not finished', 'doesn\'t finish'], correct: 'didn\'t finish' },
      { question: '___ they arrive on time?', options: ['Do', 'Does', 'Did'], correct: 'Did' },
      { question: 'We ___ (see) a great movie last night.', options: ['see', 'seen', 'saw'], correct: 'saw' },
      { question: 'He ___ (have) breakfast at 7 am.', options: ['have', 'had', 'haved'], correct: 'had' },
      { question: 'Xato qaysi gapda? To\'g\'risini tanlang.', options: ['I didn\'t went there.', 'I didn\'t go there.', 'I not went there.'], correct: 'I didn\'t go there.' },
      { question: 'They ___ (play) football yesterday.', options: ['play', 'played', 'plays'], correct: 'played' },
      { question: 'Xato qaysi gapda? To\'g\'risini tanlang.', options: ['Did you saw him?', 'Did you see him?', 'Did you seen him?'], correct: 'Did you see him?' },
      { question: 'I ___ (buy) a new phone last month.', options: ['buy', 'buyed', 'bought'], correct: 'bought' },
      { question: 'She ___ (write) a letter yesterday.', options: ['wrote', 'writed', 'writes'], correct: 'wrote' },
      { question: '___ he call you last night?', options: ['Do', 'Does', 'Did'], correct: 'Did' },
      { question: 'Xato qaysi gapda? To\'g\'risini tanlang.', options: ['We goed to the park.', 'We went to the park.', 'We go to the park yesterday.'], correct: 'We went to the park.' }
    ]
  },
  {
    level: 6,
    title: 'Future: will / going to',
    titleEn: 'Future Forms',
    points: [
      '"Will" — spontan qaror yoki bashorat uchun: I think it will rain.',
      '"Going to" — oldindan rejalashtirilgan narsalar uchun: I am going to visit Paris.',
      'Va\'da, taklif uchun ko\'proq "will" ishlatiladi: I will help you.',
      'Inkor: will not (won\'t) / is not going to.'
    ],
    examples: [
      { en: 'I will call you tonight.', uz: 'Men bugun kechqurun sizga qo\'ng\'iroq qilaman.' },
      { en: 'We are going to travel next summer.', uz: 'Biz kelasi yoz sayohat qilmoqchimiz.' },
      { en: 'It won\'t take long.', uz: 'Bu ko\'p vaqt olmaydi.' }
    ],
    exercises: [
      { question: 'I think it ___ rain tomorrow.', options: ['will', 'is going to', 'go'], correct: 'will' },
      { question: 'We already planned it — we ___ visit them next week.', options: ['will', 'are going to', 'go'], correct: 'are going to' },
      { question: 'She ___ not come to the party.', options: ['will', 'go', 'is'], correct: 'will' },
      { question: 'Look at those clouds! It ___ (rain).', options: ['will rain', 'is going to rain', 'rains'], correct: 'is going to rain' },
      { question: 'I promise I ___ (help) you tomorrow.', options: ['will help', 'am going to help', 'help'], correct: 'will help' },
      { question: 'Xato qaysi gapda? To\'g\'risini tanlang.', options: ['She will to call you.', 'She will calls you.', 'She will call you.'], correct: 'She will call you.' },
      { question: 'They ___ (get) married in June — it\'s already planned.', options: ['will get', 'are going to get', 'get'], correct: 'are going to get' },
      { question: 'It ___ (not/take) long, I promise.', options: ['won\'t take', 'not take', 'don\'t take'], correct: 'won\'t take' },
      { question: 'Xato qaysi gapda? To\'g\'risini tanlang.', options: ['I will going to help.', 'I am going to help.', 'I is going to help.'], correct: 'I am going to help.' },
      { question: 'I\'m sure she ___ (like) the gift.', options: ['will like', 'is going to like', 'likes'], correct: 'will like' },
      { question: 'We ___ (have) a party next Friday — it\'s all arranged.', options: ['will have', 'are going to have', 'have'], correct: 'are going to have' },
      { question: 'A: The phone is ringing. B: I ___ (get) it!', options: ['will get', 'am going to get', 'get'], correct: 'will get' }
    ]
  },
  {
    level: 7,
    title: 'Modal fe\'llar: can, must, should',
    titleEn: 'Modal Verbs',
    points: [
      '"Can" — qobiliyat/ruxsat: I can swim. Can I go out?',
      '"Must / Have to" — majburiyat: You must wear a seatbelt.',
      '"Should" — maslahat: You should see a doctor.',
      'Modal fe\'llardan keyin fe\'l asosiy shaklda keladi (to\'siqsiz): She can speak, not "can speaks".'
    ],
    examples: [
      { en: 'You should rest more.', uz: 'Siz ko\'proq dam olishingiz kerak.' },
      { en: 'We must finish this today.', uz: 'Biz buni bugun tugatishimiz shart.' },
      { en: 'Can you help me, please?', uz: 'Menga yordam bera olasizmi?' }
    ],
    exercises: [
      { question: 'You ___ smoke here. It is not allowed.', options: ['can', 'must not', 'should'], correct: 'must not' },
      { question: 'She ___ speak three languages.', options: ['can', 'cans', 'canning'], correct: 'can' },
      { question: 'You look tired. You ___ take a break.', options: ['must', 'should', 'can'], correct: 'should' },
      { question: '___ I open the window, please?', options: ['Must', 'Can', 'Should'], correct: 'Can' },
      { question: 'We ___ (have to) wear uniforms at school.', options: ['have to', 'has to', 'having to'], correct: 'have to' },
      { question: 'Xato qaysi gapda? To\'g\'risini tanlang.', options: ['She can speaks French.', 'She can speak French.', 'She cans speak French.'], correct: 'She can speak French.' },
      { question: 'You ___ see a doctor if you feel sick.', options: ['should', 'can', 'must not'], correct: 'should' },
      { question: 'He ___ (not/have to) come if he is busy.', options: ['doesn\'t have to', 'don\'t have to', 'not have to'], correct: 'doesn\'t have to' },
      { question: 'Xato qaysi gapda? To\'g\'risini tanlang.', options: ['You must to finish it.', 'You must finish it.', 'You musts finish it.'], correct: 'You must finish it.' },
      { question: 'Students ___ wear a uniform at this school.', options: ['must', 'can', 'should'], correct: 'must' },
      { question: 'You ___ worry, everything will be fine.', options: ['must not', 'don\'t have to', 'shouldn\'t'], correct: 'don\'t have to' },
      { question: '___ you play the piano?', options: ['Must', 'Can', 'Should'], correct: 'Can' }
    ]
  },
  {
    level: 8,
    title: 'Present Perfect',
    titleEn: 'Present Perfect Tense',
    points: [
      'have/has + Past Participle (V3): I have finished my work.',
      'O\'tmishda boshlangan, hozirgacha davom etayotgan yoki natijasi muhim harakatlar uchun.',
      '"Ever/never" bilan tajriba haqida so\'raladi: Have you ever been to London?',
      'Aniq vaqt ko\'rsatilmaydi (Past Simple dan farqi): I have lost my keys (hozir yo\'q).'
    ],
    examples: [
      { en: 'I have already eaten lunch.', uz: 'Men allaqachon tushlik qilib bo\'ldim.' },
      { en: 'She has never been to Japan.', uz: 'U hech qachon Yaponiyada bo\'lmagan.' },
      { en: 'They have just arrived.', uz: 'Ular hozirgina yetib kelishdi.' }
    ],
    exercises: [
      { question: 'I ___ (finish) my homework already.', options: ['finish', 'have finished', 'finished'], correct: 'have finished' },
      { question: '___ you ever visited Korea?', options: ['Do', 'Have', 'Did'], correct: 'Have' },
      { question: 'She ___ (not/see) that movie yet.', options: ['hasn\'t seen', 'didn\'t see', 'doesn\'t see'], correct: 'hasn\'t seen' },
      { question: 'They ___ (just/arrive) at the airport.', options: ['just arrived', 'have just arrived', 'just arrive'], correct: 'have just arrived' },
      { question: 'He ___ (never/eat) sushi before.', options: ['never ate', 'has never eaten', 'never eats'], correct: 'has never eaten' },
      { question: 'Xato qaysi gapda? To\'g\'risini tanlang.', options: ['I have saw that film.', 'I have seen that film.', 'I has seen that film.'], correct: 'I have seen that film.' },
      { question: 'We ___ (live) here since 2015.', options: ['live', 'have lived', 'lived'], correct: 'have lived' },
      { question: '___ she finished her project yet?', options: ['Did', 'Has', 'Does'], correct: 'Has' },
      { question: 'Xato qaysi gapda? To\'g\'risini tanlang.', options: ['She has never went there.', 'She has never gone there.', 'She have never gone there.'], correct: 'She has never gone there.' },
      { question: 'I ___ (lose) my keys — I can\'t find them.', options: ['lost', 'have lost', 'lose'], correct: 'have lost' },
      { question: 'How long ___ you (know) each other?', options: ['have', 'has', 'did'], correct: 'have' },
      { question: 'They ___ (not/finish) the project yet.', options: ['haven\'t finished', 'didn\'t finish', 'don\'t finish'], correct: 'haven\'t finished' }
    ]
  },
  {
    level: 9,
    title: 'Passive Voice (asosiy)',
    titleEn: 'Basic Passive Voice',
    points: [
      'Harakat qiluvchi emas, harakatning natijasi muhim bo\'lganda ishlatiladi.',
      'Shakli: be + Past Participle (V3): The letter was sent.',
      'Present Simple Passive: is/are + V3 — English is spoken here.',
      'Past Simple Passive: was/were + V3 — The house was built in 1990.'
    ],
    examples: [
      { en: 'The report was written by Aziz.', uz: 'Hisobot Aziz tomonidan yozilgan.' },
      { en: 'This bridge was built in 1980.', uz: 'Bu ko\'prik 1980-yilda qurilgan.' },
      { en: 'English is spoken all over the world.', uz: 'Ingliz tilida butun dunyoda gaplashishadi.' }
    ],
    exercises: [
      { question: 'The cake ___ (make) by my mother.', options: ['made', 'is made', 'make'], correct: 'is made' },
      { question: 'This book ___ (write) in 2005.', options: ['was written', 'is written', 'wrote'], correct: 'was written' },
      { question: 'The windows ___ (clean) every week.', options: ['are cleaned', 'clean', 'cleaned'], correct: 'are cleaned' },
      { question: 'This car ___ (make) in Germany.', options: ['is made', 'make', 'made'], correct: 'is made' },
      { question: 'The letter ___ (send) yesterday.', options: ['is sent', 'was sent', 'sent'], correct: 'was sent' },
      { question: 'Xato qaysi gapda? To\'g\'risini tanlang.', options: ['The house was build in 1990.', 'The house was built in 1990.', 'The house is built in 1990 (kecha).'], correct: 'The house was built in 1990.' },
      { question: 'Rice ___ (grow) in many countries.', options: ['is grown', 'grow', 'grew'], correct: 'is grown' },
      { question: 'The movie ___ (direct) by a famous director.', options: ['is directed', 'direct', 'directs'], correct: 'is directed' },
      { question: 'Xato qaysi gapda? To\'g\'risini tanlang.', options: ['English is speaking here.', 'English speaks here.', 'English is spoken here.'], correct: 'English is spoken here.' },
      { question: 'The museum ___ (visit) by thousands every year.', options: ['is visited', 'visits', 'visited'], correct: 'is visited' },
      { question: 'This song ___ (write) by a famous singer.', options: ['is written', 'was written', 'wrote'], correct: 'was written' },
      { question: 'Coffee ___ (grow) in Brazil.', options: ['is grown', 'grows', 'grew'], correct: 'is grown' }
    ]
  },
  {
    level: 10,
    title: 'Relative Clauses (who / which / that)',
    titleEn: 'Relative Clauses',
    points: [
      '"Who" — odamlar uchun: The man who called you is my brother.',
      '"Which" — narsalar uchun: The book which I read was interesting.',
      '"That" — odam yoki narsa uchun ishlatilishi mumkin (norasmiy): The car that I bought.',
      '"Where" — joy uchun: The city where I was born.'
    ],
    examples: [
      { en: 'This is the man who helped me.', uz: 'Bu menga yordam bergan odam.' },
      { en: 'I read the book which you gave me.', uz: 'Men siz bergan kitobni o\'qidim.' },
      { en: 'This is the house where I grew up.', uz: 'Bu men o\'sgan uy.' }
    ],
    exercises: [
      { question: 'She is the teacher ___ taught me English.', options: ['who', 'which', 'where'], correct: 'who' },
      { question: 'This is the city ___ I was born.', options: ['who', 'which', 'where'], correct: 'where' },
      { question: 'I lost the pen ___ you gave me.', options: ['who', 'which', 'where'], correct: 'which' },
      { question: 'The doctor ___ treated me was very kind.', options: ['who', 'which', 'where'], correct: 'who' },
      { question: 'This is the restaurant ___ we had dinner.', options: ['who', 'which', 'where'], correct: 'where' },
      { question: 'Xato qaysi gapda? To\'g\'risini tanlang.', options: ['The man which called me is here.', 'The man who called me is here.', 'The man where called me is here.'], correct: 'The man who called me is here.' },
      { question: 'The car ___ he bought is very expensive.', options: ['who', 'which', 'where'], correct: 'which' },
      { question: 'This is the house ___ I grew up.', options: ['who', 'which', 'where'], correct: 'where' },
      { question: 'Xato qaysi gapda? To\'g\'risini tanlang.', options: ['I read the book who you gave me.', 'I read the book which you gave me.', 'I read the book where you gave me.'], correct: 'I read the book which you gave me.' },
      { question: 'The woman ___ lives next door is a doctor.', options: ['who', 'which', 'where'], correct: 'who' },
      { question: 'I visited the school ___ I studied as a child.', options: ['who', 'which', 'where'], correct: 'where' },
      { question: 'The phone ___ I bought yesterday is already broken.', options: ['who', 'which', 'where'], correct: 'which' }
    ]
  },
  {
    level: 11,
    title: 'First Conditional',
    titleEn: 'First Conditional (if + will)',
    points: [
      'Kelajakda haqiqiy bo\'lishi mumkin bo\'lgan shartlar uchun ishlatiladi.',
      'Shakli: If + Present Simple, ... will + fe\'l.',
      'If it rains, we will stay home.',
      'Tartib almashtirilishi mumkin: We will stay home if it rains.'
    ],
    examples: [
      { en: 'If you study hard, you will pass the exam.', uz: 'Agar qattiq o\'qisangiz, imtihondan o\'tasiz.' },
      { en: 'If it rains tomorrow, we will cancel the trip.', uz: 'Agar ertaga yomg\'ir yog\'sa, sayohatni bekor qilamiz.' },
      { en: 'She will be happy if you call her.', uz: 'Agar unga qo\'ng\'iroq qilsangiz, u xursand bo\'ladi.' }
    ],
    exercises: [
      { question: 'If I have time, I ___ (help) you.', options: ['help', 'will help', 'helped'], correct: 'will help' },
      { question: 'If it ___ (rain), we will stay home.', options: ['rains', 'will rain', 'rained'], correct: 'rains' },
      { question: 'She will call you if she ___ (arrive) late.', options: ['arrives', 'will arrive', 'arrived'], correct: 'arrives' },
      { question: 'If you ___ (not/study), you will fail.', options: ['don\'t study', 'won\'t study', 'didn\'t study'], correct: 'don\'t study' },
      { question: 'If we hurry, we ___ (catch) the bus.', options: ['catch', 'will catch', 'caught'], correct: 'will catch' },
      { question: 'Xato qaysi gapda? To\'g\'risini tanlang.', options: ['If it rains, we will stayed home.', 'If it will rain, we will stay home.', 'If it rains, we will stay home.'], correct: 'If it rains, we will stay home.' },
      { question: 'If she ___ (ask), I will explain it.', options: ['asks', 'will ask', 'asked'], correct: 'asks' },
      { question: 'They will be upset if we ___ (be) late.', options: ['are', 'will be', 'were'], correct: 'are' },
      { question: 'Xato qaysi gapda? To\'g\'risini tanlang.', options: ['If you study hard, you will pass.', 'If you will study hard, you pass.', 'If you studied hard, you will pass.'], correct: 'If you study hard, you will pass.' },
      { question: 'If he ___ (miss) the bus, he will be late.', options: ['misses', 'will miss', 'missed'], correct: 'misses' },
      { question: 'You will get wet if you ___ (not/take) an umbrella.', options: ['don\'t take', 'won\'t take', 'didn\'t take'], correct: 'don\'t take' },
      { question: 'If they win, they ___ (celebrate) all night.', options: ['celebrate', 'will celebrate', 'celebrated'], correct: 'will celebrate' }
    ]
  },
  {
    level: 12,
    title: 'Reported Speech',
    titleEn: 'Reported Speech',
    points: [
      'Boshqa birovning gapini qayta aytib berishda ishlatiladi.',
      'Zamon bir bosqich orqaga suriladi: "I am tired" → He said he was tired.',
      'Present Simple → Past Simple; Present Perfect → Past Perfect.',
      'Savollarda so\'roq so\'zi saqlanadi, lekin gap tartibi to\'g\'ridan-to\'g\'ri gapga aylanadi: "Where do you live?" → He asked where I lived.'
    ],
    examples: [
      { en: 'She said, "I am busy." → She said she was busy.', uz: 'U "Men bandman" dedi → U band ekanini aytdi.' },
      { en: 'He said, "I will call you." → He said he would call me.', uz: 'U "Men sizga qo\'ng\'iroq qilaman" dedi → U menga qo\'ng\'iroq qilishini aytdi.' },
      { en: 'They asked, "Where do you live?" → They asked where I lived.', uz: 'Ular "Siz qayerda yashaysiz?" deb so\'rashdi → Ular men qayerda yashashimni so\'rashdi.' }
    ],
    exercises: [
      { question: '"I am tired," she said. → She said she ___ tired.', options: ['is', 'was', 'will be'], correct: 'was' },
      { question: '"I will help," he said. → He said he ___ help.', options: ['will', 'would', 'can'], correct: 'would' },
      { question: '"I have finished," she said. → She said she ___ finished.', options: ['has', 'had', 'have'], correct: 'had' },
      { question: '"I like tea," he said. → He said he ___ tea.', options: ['likes', 'liked', 'like'], correct: 'liked' },
      { question: '"I can swim," she said. → She said she ___ swim.', options: ['can', 'could', 'will'], correct: 'could' },
      { question: 'Xato qaysi gapda? To\'g\'risini tanlang.', options: ['She said she is busy.', 'She said she was busy.', 'She said she busy.'], correct: 'She said she was busy.' },
      { question: '"I am working," he said. → He said he ___ working.', options: ['is', 'was', 'were'], correct: 'was' },
      { question: '"I saw him," she said. → She said she ___ him.', options: ['see', 'saw', 'had seen'], correct: 'had seen' },
      { question: 'Xato qaysi gapda? To\'g\'risini tanlang.', options: ['He said he would call me.', 'He said he will call me.', 'He said he calls me.'], correct: 'He said he would call me.' },
      { question: '"I am going home," he said. → He said he ___ going home.', options: ['is', 'was', 'were'], correct: 'was' },
      { question: '"We must leave," they said. → They said they ___ leave.', options: ['must', 'had to', 'have to'], correct: 'had to' },
      { question: '"I don\'t know," she said. → She said she ___ know.', options: ['doesn\'t', 'didn\'t', 'don\'t'], correct: 'didn\'t' }
    ]
  },
  {
    level: 13,
    title: 'Second Conditional',
    titleEn: 'Second Conditional',
    points: [
      'Hozirgi yoki kelajakdagi xayoliy, haqiqiy bo\'lmagan vaziyatlar uchun.',
      'Shakli: If + Past Simple, ... would + fe\'l.',
      'If I had more money, I would travel the world.',
      '"Be" fe\'li bilan ko\'pincha "were" ishlatiladi (barcha shaxslar uchun): If I were you...'
    ],
    examples: [
      { en: 'If I were you, I would apologize.', uz: 'Men sizning o\'rningizda bo\'lganimda, uzr so\'rar edim.' },
      { en: 'If she had more time, she would learn painting.', uz: 'Agar uning ko\'proq vaqti bo\'lganida, u rasm chizishni o\'rganardi.' },
      { en: 'What would you do if you won the lottery?', uz: 'Agar lotoreyada yutib olsangiz, nima qilardingiz?' }
    ],
    exercises: [
      { question: 'If I ___ (have) wings, I would fly.', options: ['have', 'had', 'will have'], correct: 'had' },
      { question: 'If she were rich, she ___ (buy) a big house.', options: ['will buy', 'would buy', 'buys'], correct: 'would buy' },
      { question: 'If I were you, I ___ (not/wait) any longer.', options: ['wouldn\'t wait', 'won\'t wait', 'don\'t wait'], correct: 'wouldn\'t wait' },
      { question: 'If he ___ (study) harder, he would pass.', options: ['study', 'studied', 'studies'], correct: 'studied' },
      { question: 'What would you do if you ___ (win) the lottery?', options: ['win', 'won', 'will win'], correct: 'won' },
      { question: 'Xato qaysi gapda? To\'g\'risini tanlang.', options: ['If I was you, I would apologize.', 'If I were you, I would apologize.', 'If I am you, I would apologize.'], correct: 'If I were you, I would apologize.' },
      { question: 'If they had more time, they ___ (travel) more.', options: ['travel', 'would travel', 'traveled'], correct: 'would travel' },
      { question: 'If it ___ (not/rain), we would go out.', options: ['didn\'t rain', 'doesn\'t rain', 'won\'t rain'], correct: 'didn\'t rain' },
      { question: 'Xato qaysi gapda? To\'g\'risini tanlang.', options: ['If I had money, I will travel.', 'If I have money, I would travel.', 'If I had money, I would travel.'], correct: 'If I had money, I would travel.' },
      { question: 'If I ___ (be) taller, I would join the team.', options: ['am', 'were', 'was'], correct: 'were' },
      { question: 'What would you say if he ___ (ask) you that?', options: ['asks', 'asked', 'ask'], correct: 'asked' },
      { question: 'If we ___ (live) closer, we would meet more often.', options: ['live', 'lived', 'will live'], correct: 'lived' }
    ]
  },
  {
    level: 14,
    title: 'Mixed Conditionals & Inversion',
    titleEn: 'Mixed Conditionals & Inversion',
    points: [
      'Mixed conditionals — o\'tmish va hozirgi zamonni bir gapda aralashtiradi: If I had studied harder, I would be a doctor now.',
      'Inversion — urg\'u berish uchun gap boshini o\'zgartirish: Not only did she win, but she also broke the record.',
      '"Rarely/Seldom/Never" bilan boshlanganda ega-kesim tartibi teskarilanadi: Rarely have I seen such talent.',
      'Bu strukturalar ko\'proq rasmiy yozma va yuqori darajadagi nutqda ishlatiladi.'
    ],
    examples: [
      { en: 'If I had taken that job, I would be living abroad now.', uz: 'Agar men o\'sha ishni olganimda, hozir chet elda yashagan bo\'lardim.' },
      { en: 'Not only did he apologize, but he also fixed the problem.', uz: 'U nafaqat uzr so\'radi, balki muammoni ham hal qildi.' },
      { en: 'Rarely have I seen such dedication.', uz: 'Men kamdan-kam bunday fidoyilikni ko\'rganman.' }
    ],
    exercises: [
      { question: 'If I had studied medicine, I ___ a doctor now.', options: ['would be', 'will be', 'am'], correct: 'would be' },
      { question: 'Not only ___ she late, but she also forgot the documents.', options: ['was', 'she was', 'is'], correct: 'was' },
      { question: 'Rarely ___ such kindness in a stranger.', options: ['I have seen', 'have I seen', 'I saw'], correct: 'have I seen' },
      { question: 'If she had taken that job, she ___ (live) abroad now.', options: ['would live', 'lives', 'will live'], correct: 'would live' },
      { question: 'Never ___ such a beautiful sunset before.', options: ['I had seen', 'had I seen', 'I have seen'], correct: 'had I seen' },
      { question: 'Xato qaysi gapda? To\'g\'risini tanlang.', options: ['Not only did she win, but also she broke the record.', 'Not only she won, but she also broke the record.', 'Not only did she win, but she also broke the record.'], correct: 'Not only did she win, but she also broke the record.' },
      { question: 'If I had left earlier, I ___ (not/miss) the train now.', options: ['wouldn\'t miss', 'don\'t miss', 'won\'t miss'], correct: 'wouldn\'t miss' },
      { question: 'Seldom ___ such dedication in a young player.', options: ['we have seen', 'have we seen', 'we saw'], correct: 'have we seen' },
      { question: 'Xato qaysi gapda? To\'g\'risini tanlang.', options: ['Rarely I have seen such talent.', 'Rarely have I seen such talent.', 'Rarely I saw such talent.'], correct: 'Rarely have I seen such talent.' },
      { question: 'If she had left earlier, she ___ (not/miss) the flight now.', options: ['wouldn\'t miss', 'won\'t miss', 'doesn\'t miss'], correct: 'wouldn\'t miss' },
      { question: 'No sooner ___ he arrived than the meeting started.', options: ['had', 'has', 'did'], correct: 'had' },
      { question: 'Little ___ she know how much trouble was coming.', options: ['did', 'she did', 'does'], correct: 'did' }
    ]
  }
]

export function getGrammarForLevel(levelNum) {
  const topics = grammar.filter((g) => g.level === Number(levelNum))
  if (!topics.length) return null
  if (topics.length === 1) return topics[0]
  return {
    ...topics[0],
    points: topics.flatMap((g) => g.points || []),
    examples: topics.flatMap((g) => g.examples || []),
    exercises: topics.flatMap((g) => g.exercises || [])
  }
}
