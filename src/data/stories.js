// Reading Stories data — short graded readers for English learners.
// Each story is read sentence-by-sentence (tap to reveal Uzbek translation),
// then finishes with a few comprehension questions, similar in spirit to
// Duolingo Stories.

export const STORY_XP = {
  perSentence: 2,
  correctAnswer: 8,
  perfectBonus: 20
}

export const stories = [
  {
    id: 1,
    level: 1,
    cefr: 'A1',
    title: 'Bozorga sayohat',
    titleEn: 'A Trip to the Market',
    minutes: 3,
    icon: 'ti-basket',
    sentences: [
      { en: 'Aziz wakes up early on Saturday morning.', uz: 'Aziz shanba kuni ertalab erta uyg\'onadi.' },
      { en: 'He wants to buy fresh fruit and vegetables.', uz: 'U yangi meva va sabzavot sotib olmoqchi.' },
      { en: 'The market is not far from his house.', uz: 'Bozor uning uyidan unchalik uzoq emas.' },
      { en: 'He sees red apples, yellow bananas, and green cucumbers.', uz: 'U qizil olma, sariq banan va yashil bodring ko\'radi.' },
      { en: 'Aziz asks the seller, "How much are the apples?"', uz: 'Aziz sotuvchidan so\'raydi: "Olmalar qancha turadi?"' },
      { en: 'The seller says the apples are cheap today.', uz: 'Sotuvchi bugun olmalar arzon ekanini aytadi.' },
      { en: 'Aziz buys a lot of fruit for his family.', uz: 'Aziz oilasi uchun ko\'p meva sotib oladi.' },
      { en: 'He walks home happily with his bags.', uz: 'U sumkalari bilan xursand holda uyga qaytadi.' }
    ],
    questions: [
      {
        question: 'When does Aziz wake up?',
        options: ['Late at night', 'Early on Saturday', 'On Sunday evening', 'At noon'],
        correct: 'Early on Saturday'
      },
      {
        question: 'What does Aziz want to buy?',
        options: ['Clothes', 'Books', 'Fruit and vegetables', 'Furniture'],
        correct: 'Fruit and vegetables'
      },
      {
        question: 'How does Aziz feel walking home?',
        options: ['Tired', 'Angry', 'Happy', 'Sad'],
        correct: 'Happy'
      }
    ]
  },
  {
    id: 2,
    level: 1,
    cefr: 'A1',
    title: 'Yangi do\'st',
    titleEn: 'A New Friend',
    minutes: 3,
    icon: 'ti-users',
    sentences: [
      { en: 'Malika starts a new school this week.', uz: 'Malika bu hafta yangi maktabda o\'qishni boshlaydi.' },
      { en: 'She feels a little nervous on the first day.', uz: 'Birinchi kuni u biroz hayajonlanadi.' },
      { en: 'In class, a girl named Nilufar sits next to her.', uz: 'Sinfda Nilufar ismli qiz uning yonida o\'tiradi.' },
      { en: 'Nilufar smiles and says, "Hello, my name is Nilufar."', uz: 'Nilufar tabassum qilib: "Salom, mening ismim Nilufar," deydi.' },
      { en: 'Malika smiles back and introduces herself too.', uz: 'Malika ham tabassum qilib o\'zini tanishtiradi.' },
      { en: 'They talk about their favorite subjects and hobbies.', uz: 'Ular sevimli fanlari va sevimli mashg\'ulotlari haqida gaplashadilar.' },
      { en: 'By the end of the day, they are already good friends.', uz: 'Kun oxiriga kelib, ular allaqachon yaxshi do\'st bo\'lib qolishadi.' }
    ],
    questions: [
      {
        question: 'How does Malika feel on the first day?',
        options: ['Bored', 'A little nervous', 'Very angry', 'Sleepy'],
        correct: 'A little nervous'
      },
      {
        question: 'Who sits next to Malika?',
        options: ['A teacher', 'Nilufar', 'Her mother', 'No one'],
        correct: 'Nilufar'
      },
      {
        question: 'What happens by the end of the day?',
        options: ['They become good friends', 'They fight', 'Malika goes home early', 'Nilufar moves away'],
        correct: 'They become good friends'
      }
    ]
  },
  {
    id: 3,
    level: 2,
    cefr: 'A1',
    title: 'Kafedagi kutilmagan kun',
    titleEn: 'A Surprise at the Café',
    minutes: 4,
    icon: 'ti-coffee',
    sentences: [
      { en: 'Sardor works as a waiter at a small café downtown.', uz: 'Sardor shahar markazidagi kichik kafeda ofitsiant bo\'lib ishlaydi.' },
      { en: 'One morning, the café is busier than usual.', uz: 'Bir kuni ertalab kafe odatdagidan gavjumroq bo\'ladi.' },
      { en: 'A famous singer walks in and orders a coffee.', uz: 'Mashhur qo\'shiqchi kirib, kofe buyurtma qiladi.' },
      { en: 'Sardor cannot believe his eyes at first.', uz: 'Dastlab Sardor ko\'zlariga ishonmaydi.' },
      { en: 'He tries to stay calm and serve the coffee carefully.', uz: 'U xotirjam bo\'lishga va kofeni ehtiyotkorlik bilan berishga harakat qiladi.' },
      { en: 'The singer thanks him and leaves a big tip.', uz: 'Qo\'shiqchi unga rahmat aytadi va katta choy puli qoldiradi.' },
      { en: 'Sardor tells his friends about it after work.', uz: 'Ish tugagach, Sardor bu haqida do\'stlariga so\'zlab beradi.' },
      { en: 'It becomes the best day of his week.', uz: 'Bu uning haftasidagi eng yaxshi kuniga aylanadi.' }
    ],
    questions: [
      {
        question: 'Where does Sardor work?',
        options: ['A hospital', 'A café', 'A school', 'A bank'],
        correct: 'A café'
      },
      {
        question: 'Who walks into the café?',
        options: ['A famous singer', 'His boss', 'A police officer', 'His teacher'],
        correct: 'A famous singer'
      },
      {
        question: 'What does the singer leave for Sardor?',
        options: ['A book', 'Nothing', 'A big tip', 'A letter'],
        correct: 'A big tip'
      }
    ]
  }
  ,
  // ─── A1 (4 more, total 6 for A1) ─────────────────────────────────────────
  {
    id: 4,
    level: 1,
    cefr: 'A1',
    title: 'Oilaviy nonushta',
    titleEn: 'Family Breakfast',
    minutes: 3,
    icon: 'ti-cup',
    sentences: [
      { en: 'Every morning, the Karimov family eats breakfast together.', uz: 'Har ertalab Karimovlar oilasi birga nonushta qiladi.' },
      { en: 'The mother makes tea and puts bread on the table.', uz: 'Ona choy tayyorlaydi va stolga non qo\'yadi.' },
      { en: 'The father reads the news on his phone.', uz: 'Ota telefonida yangiliklarni o\'qiydi.' },
      { en: 'The children eat eggs and drink milk.', uz: 'Bolalar tuxum yeydi va sut ichadi.' },
      { en: 'They talk about their plans for the day.', uz: 'Ular kunlik rejalari haqida gaplashadi.' },
      { en: 'After breakfast, everyone goes to work or school.', uz: 'Nonushtadan keyin hamma ishga yoki maktabga boradi.' }
    ],
    questions: [
      { question: 'What does the family do every morning?', options: ['Sleep late', 'Eat breakfast together', 'Watch TV', 'Go shopping'], correct: 'Eat breakfast together' },
      { question: 'What does the father do at breakfast?', options: ['Cooks food', 'Reads the news', 'Sleeps', 'Cleans the table'], correct: 'Reads the news' },
      { question: 'Where do they go after breakfast?', options: ['To the park', 'Back to bed', 'Work or school', 'Nowhere'], correct: 'Work or school' }
    ]
  },
  {
    id: 5,
    level: 1,
    cefr: 'A1',
    title: 'Yomg\'irli kun',
    titleEn: 'A Rainy Day',
    minutes: 3,
    icon: 'ti-cloud-rain',
    sentences: [
      { en: 'It is raining today, so Dilnoza stays at home.', uz: 'Bugun yomg\'ir yog\'moqda, shuning uchun Dilnoza uyda qoladi.' },
      { en: 'She looks out the window and sees dark clouds.', uz: 'U derazadan tashqariga qarab, qora bulutlarni ko\'radi.' },
      { en: 'Dilnoza decides to read a book instead.', uz: 'Dilnoza buning o\'rniga kitob o\'qishga qaror qiladi.' },
      { en: 'Her little brother wants to play a game with her.', uz: 'Uning kichik ukasi u bilan o\'yin o\'ynashni xohlaydi.' },
      { en: 'They play cards and drink hot tea.', uz: 'Ular karta o\'ynaydilar va issiq choy ichadilar.' },
      { en: 'By evening, the rain stops and the sky is clear.', uz: 'Kechqurun yomg\'ir to\'xtaydi va osmon tiniq bo\'ladi.' }
    ],
    questions: [
      { question: 'Why does Dilnoza stay at home?', options: ['She is sick', 'It is raining', 'She has no money', 'It is late'], correct: 'It is raining' },
      { question: 'What does Dilnoza do instead of going out?', options: ['Sleeps all day', 'Reads a book', 'Cooks dinner', 'Cleans the house'], correct: 'Reads a book' },
      { question: 'What happens by evening?', options: ['It rains more', 'The rain stops', 'They go outside', 'The power goes out'], correct: 'The rain stops' }
    ]
  },
  {
    id: 6,
    level: 1,
    cefr: 'A1',
    title: 'Nonvoyxonada',
    titleEn: 'At the Bakery',
    minutes: 3,
    icon: 'ti-bread',
    sentences: [
      { en: 'Umid walks to the bakery near his house.', uz: 'Umid uyi yaqinidagi nonvoyxonaga piyoda boradi.' },
      { en: 'The bakery smells like fresh, warm bread.', uz: 'Nonvoyxonadan yangi, issiq non hidi kelib turadi.' },
      { en: 'He asks for two loaves of bread.', uz: 'U ikkita non so\'raydi.' },
      { en: 'The baker gives him the bread with a smile.', uz: 'Novvoy tabassum bilan unga nonni beradi.' },
      { en: 'Umid pays and says thank you.', uz: 'Umid pulini to\'laydi va rahmat aytadi.' },
      { en: 'He walks home with the warm bread in his bag.', uz: 'U issiq nonni sumkasiga solib uyga qaytadi.' }
    ],
    questions: [
      { question: 'Where does Umid go?', options: ['To school', 'To the bakery', 'To the park', 'To the hospital'], correct: 'To the bakery' },
      { question: 'How many loaves does he buy?', options: ['One', 'Two', 'Three', 'Four'], correct: 'Two' },
      { question: 'How does the baker give him the bread?', options: ['Angrily', 'With a smile', 'Silently', 'Slowly'], correct: 'With a smile' }
    ]
  },
  {
    id: 7,
    level: 2,
    cefr: 'A1',
    title: 'Yo\'qolgan mushuk',
    titleEn: 'The Lost Cat',
    minutes: 3,
    icon: 'ti-cat',
    sentences: [
      { en: 'Lola\'s cat, Pushok, does not come home one evening.', uz: 'Lolaning mushugi Pushok bir kuni kechqurun uyga kelmaydi.' },
      { en: 'She looks for him in the yard and the street.', uz: 'U uni hovlida va ko\'chada qidiradi.' },
      { en: 'Her neighbor says he saw a cat near the park.', uz: 'Qo\'shnisi park yaqinida bir mushuk ko\'rganini aytadi.' },
      { en: 'Lola runs to the park and calls his name.', uz: 'Lola parkka yugurib boradi va uning ismini chaqiradi.' },
      { en: 'She finds Pushok sleeping under a tree.', uz: 'U Pushokni daraxt ostida uxlayotgan holda topadi.' },
      { en: 'Lola happily carries him back home.', uz: 'Lola uni xursand bo\'lib uyga olib qaytadi.' }
    ],
    questions: [
      { question: 'What is the cat\'s name?', options: ['Pushok', 'Tom', 'Simba', 'Leo'], correct: 'Pushok' },
      { question: 'Who tells Lola where the cat might be?', options: ['Her teacher', 'Her neighbor', 'A police officer', 'Her brother'], correct: 'Her neighbor' },
      { question: 'Where does Lola find the cat?', options: ['In the kitchen', 'Under a tree', 'On the roof', 'In a shop'], correct: 'Under a tree' }
    ]
  },

  // ─── A2 (6 stories) ───────────────────────────────────────────────────────
  {
    id: 8,
    level: 3,
    cefr: 'A2',
    title: 'Ish suhbati',
    titleEn: 'The Job Interview',
    minutes: 4,
    icon: 'ti-briefcase',
    sentences: [
      { en: 'Feruza has a job interview at a big company today.', uz: 'Feruzaning bugun katta kompaniyada ish suhbati bor.' },
      { en: 'She wakes up early and chooses her best clothes.', uz: 'U erta uyg\'onadi va eng yaxshi kiyimini tanlaydi.' },
      { en: 'On the way, the bus is late, and she gets nervous.', uz: 'Yo\'lda avtobus kechikadi va u asabiylashadi.' },
      { en: 'Finally, she arrives just five minutes before the interview.', uz: 'Nihoyat, u suhbatdan besh daqiqa oldin yetib keladi.' },
      { en: 'The manager asks about her experience and skills.', uz: 'Menejer uning tajribasi va ko\'nikmalari haqida so\'raydi.' },
      { en: 'Feruza answers confidently and smiles the whole time.', uz: 'Feruza ishonch bilan javob beradi va doim tabassum qiladi.' },
      { en: 'A week later, she gets a call: she got the job!', uz: 'Bir hafta o\'tib, unga qo\'ng\'iroq qilishadi: u ishga qabul qilinadi!' }
    ],
    questions: [
      { question: 'Why does Feruza get nervous?', options: ['She forgets her documents', 'The bus is late', 'She is sick', 'She loses her phone'], correct: 'The bus is late' },
      { question: 'What does the manager ask about?', options: ['Her family', 'Her experience and skills', 'Her hobbies', 'Her age'], correct: 'Her experience and skills' },
      { question: 'What happens a week later?', options: ['She loses her job', 'She gets the job', 'She moves city', 'She quits'], correct: 'She gets the job' }
    ]
  },
  {
    id: 9,
    level: 3,
    cefr: 'A2',
    title: 'Poyezdda sayohat',
    titleEn: 'A Journey by Train',
    minutes: 4,
    icon: 'ti-train',
    sentences: [
      { en: 'Bekzod takes the night train to visit his grandmother.', uz: 'Bekzod buvisini ko\'rgani tungi poyezdda boradi.' },
      { en: 'He shares a compartment with three other passengers.', uz: 'U kupeni yana uch yo\'lovchi bilan bo\'lishadi.' },
      { en: 'An old man tells interesting stories about his youth.', uz: 'Bir keksa odam yoshligi haqida qiziq voqealar so\'zlab beradi.' },
      { en: 'Bekzod listens carefully and asks many questions.', uz: 'Bekzod diqqat bilan tinglaydi va ko\'p savol beradi.' },
      { en: 'The train stops at several small stations along the way.', uz: 'Poyezd yo\'l davomida bir necha kichik bekatlarda to\'xtaydi.' },
      { en: 'In the morning, he arrives and his grandmother hugs him.', uz: 'Ertalab u yetib keladi va buvisi uni quchoqlaydi.' }
    ],
    questions: [
      { question: 'Why does Bekzod take the train?', options: ['To go to work', 'To visit his grandmother', 'To go shopping', 'To go to school'], correct: 'To visit his grandmother' },
      { question: 'Who tells him stories?', options: ['A child', 'An old man', 'The conductor', 'His grandmother'], correct: 'An old man' },
      { question: 'What happens when he arrives?', options: ['No one meets him', 'His grandmother hugs him', 'He gets lost', 'The train breaks down'], correct: 'His grandmother hugs him' }
    ]
  },
  {
    id: 10,
    level: 3,
    cefr: 'A2',
    title: 'Yangi qo\'shni',
    titleEn: 'The New Neighbor',
    minutes: 4,
    icon: 'ti-home',
    sentences: [
      { en: 'A new family moves into the apartment next to Aziza\'s.', uz: 'Azizaning yonidagi kvartiraga yangi oila ko\'chib keladi.' },
      { en: 'Aziza sees boxes and furniture in the hallway.', uz: 'Aziza yo\'lakda quti va mebellarni ko\'radi.' },
      { en: 'She decides to bring them some homemade bread.', uz: 'U ularga uy sharoitida pishirilgan non olib borishga qaror qiladi.' },
      { en: 'The new neighbor, a young woman named Sitora, is very grateful.', uz: 'Yangi qo\'shni, Sitora ismli yosh ayol, juda minnatdor bo\'ladi.' },
      { en: 'They talk for an hour and find they have the same hobbies.', uz: 'Ular bir soat suhbatlashadilar va bir xil sevimli mashg\'ulotlari borligini bilib olishadi.' },
      { en: 'From that day, Aziza and Sitora become close friends.', uz: 'O\'sha kundan boshlab Aziza va Sitora yaqin do\'st bo\'lib qolishadi.' }
    ],
    questions: [
      { question: 'What does Aziza bring to the new neighbor?', options: ['Flowers', 'Homemade bread', 'A book', 'Money'], correct: 'Homemade bread' },
      { question: 'What is the new neighbor\'s name?', options: ['Aziza', 'Sitora', 'Malika', 'Nilufar'], correct: 'Sitora' },
      { question: 'What do they discover they have in common?', options: ['The same job', 'The same hobbies', 'The same age', 'The same car'], correct: 'The same hobbies' }
    ]
  },
  {
    id: 11,
    level: 4,
    cefr: 'A2',
    title: 'Restoranda kechqurun',
    titleEn: 'An Evening at the Restaurant',
    minutes: 4,
    icon: 'ti-tools-kitchen-2',
    sentences: [
      { en: 'Jasur invites his friends to a new restaurant downtown.', uz: 'Jasur do\'stlarini shahar markazidagi yangi restoranga taklif qiladi.' },
      { en: 'They look at the menu and cannot decide what to order.', uz: 'Ular menyuga qarab, nima buyurtma qilishni bila olmaydilar.' },
      { en: 'The waiter recommends the grilled chicken with vegetables.', uz: 'Ofitsiant sabzavotli grillangan tovuqni tavsiya qiladi.' },
      { en: 'Everyone agrees, and they also order fresh juice.', uz: 'Hamma rozi bo\'ladi va yana yangi sharbat ham buyurtma qiladi.' },
      { en: 'The food arrives quickly and tastes delicious.', uz: 'Ovqat tez keladi va juda mazali bo\'ladi.' },
      { en: 'They talk, laugh, and enjoy the whole evening together.', uz: 'Ular birga gaplashadi, kulishadi va kechani zavq bilan o\'tkazadilar.' }
    ],
    questions: [
      { question: 'What does the waiter recommend?', options: ['Pizza', 'Grilled chicken with vegetables', 'Soup', 'Fish'], correct: 'Grilled chicken with vegetables' },
      { question: 'What do they order to drink?', options: ['Tea', 'Coffee', 'Fresh juice', 'Water only'], correct: 'Fresh juice' },
      { question: 'How does the evening end?', options: ['They argue', 'They enjoy it together', 'They leave early', 'The food is bad'], correct: 'They enjoy it together' }
    ]
  },
  {
    id: 12,
    level: 4,
    cefr: 'A2',
    title: 'Futbol o\'yini',
    titleEn: 'The Football Match',
    minutes: 4,
    icon: 'ti-ball-football',
    sentences: [
      { en: 'Otabek\'s team plays an important match on Sunday.', uz: 'Otabekning jamoasi yakshanba kuni muhim o\'yin o\'tkazadi.' },
      { en: 'Many fans come to watch and cheer loudly.', uz: 'Ko\'plab muxlislar kelib, baland ovozda qo\'llab-quvvatlaydi.' },
      { en: 'In the first half, the other team scores first.', uz: 'Birinchi tayimda raqib jamoa birinchi bo\'lib gol uradi.' },
      { en: 'Otabek\'s team does not lose hope and keeps playing hard.', uz: 'Otabekning jamoasi umidini yo\'qotmasdan qattiq o\'ynashda davom etadi.' },
      { en: 'In the last minute, Otabek scores the winning goal.', uz: 'Oxirgi daqiqada Otabek g\'alaba golini uradi.' },
      { en: 'The whole stadium jumps up and celebrates together.', uz: 'Butun stadion sakrab, birga bayram qiladi.' }
    ],
    questions: [
      { question: 'What happens in the first half?', options: ['Otabek\'s team scores', 'The other team scores first', 'No one scores', 'The match stops'], correct: 'The other team scores first' },
      { question: 'Who scores the winning goal?', options: ['Otabek', 'A fan', 'The coach', 'No one'], correct: 'Otabek' },
      { question: 'How does the stadium react?', options: ['They leave sadly', 'They celebrate', 'They stay quiet', 'They argue'], correct: 'They celebrate' }
    ]
  },
  {
    id: 13,
    level: 4,
    cefr: 'A2',
    title: 'Tug\'ilgan kun ziyofati',
    titleEn: 'The Birthday Party',
    minutes: 4,
    icon: 'ti-cake',
    sentences: [
      { en: 'Madina is planning a surprise party for her sister.', uz: 'Madina singlisi uchun kutilmagan ziyofat rejalashtirmoqda.' },
      { en: 'She invites all their close friends and family.', uz: 'U barcha yaqin do\'stlari va oila a\'zolarini taklif qiladi.' },
      { en: 'They decorate the room with balloons and lights.', uz: 'Ular xonani sharlar va chiroqlar bilan bezaydi.' },
      { en: 'Madina orders a big chocolate cake for the celebration.', uz: 'Madina tantana uchun katta shokoladli tort buyurtma qiladi.' },
      { en: 'When her sister walks in, everyone shouts, "Surprise!"', uz: 'Singlisi kirib kelganda, hamma "Sarpiraz!" deb qichqiradi.' },
      { en: 'Her sister cries with joy and thanks everyone.', uz: 'Singlisi quvonchdan yig\'laydi va hammaga rahmat aytadi.' }
    ],
    questions: [
      { question: 'Who is the party for?', options: ['Madina', 'Madina\'s sister', 'A friend', 'Their mother'], correct: 'Madina\'s sister' },
      { question: 'What do they order for the party?', options: ['Pizza', 'A chocolate cake', 'Fruit', 'Bread'], correct: 'A chocolate cake' },
      { question: 'How does the sister react?', options: ['She is angry', 'She cries with joy', 'She leaves', 'She is bored'], correct: 'She cries with joy' }
    ]
  },

  // ─── B1 (6 stories) ───────────────────────────────────────────────────────
  {
    id: 14,
    level: 6,
    cefr: 'B1',
    title: 'Lavozimga ko\'tarilish',
    titleEn: 'The Promotion',
    minutes: 5,
    icon: 'ti-chart-line',
    sentences: [
      { en: 'After three years at the company, Rustam hopes for a promotion.', uz: 'Kompaniyada uch yil ishlagandan so\'ng, Rustam lavozim ko\'tarilishiga umid qiladi.' },
      { en: 'His manager tells him the decision depends on his next project.', uz: 'Uning menejeri qaror keyingi loyihasiga bog\'liqligini aytadi.' },
      { en: 'Rustam works late every night and takes the project seriously.', uz: 'Rustam har kecha kech vaqtgacha ishlaydi va loyihaga jiddiy yondashadi.' },
      { en: 'Despite some challenges, he manages to finish it ahead of schedule.', uz: 'Ba\'zi qiyinchiliklarga qaramay, u ishni muddatidan oldin tugatishga muvaffaq bo\'ladi.' },
      { en: 'The client is impressed and praises the whole team.', uz: 'Mijoz taassurot qoldiradi va butun jamoani maqtaydi.' },
      { en: 'A month later, Rustam is officially promoted to team leader.', uz: 'Bir oydan so\'ng, Rustam rasman jamoa boshlig\'i lavozimiga ko\'tariladi.' },
      { en: 'He thanks his colleagues for their support along the way.', uz: 'U yo\'l davomida ko\'rsatgan yordami uchun hamkasblariga minnatdorchilik bildiradi.' }
    ],
    questions: [
      { question: 'What does the promotion depend on?', options: ['His age', 'His next project', 'His salary', 'His vacation'], correct: 'His next project' },
      { question: 'How does Rustam finish the project?', options: ['Late and poorly', 'Ahead of schedule', 'He gives up', 'Someone else finishes it'], correct: 'Ahead of schedule' },
      { question: 'What is Rustam promoted to?', options: ['Manager of another company', 'Team leader', 'Director', 'He is not promoted'], correct: 'Team leader' }
    ]
  },
  {
    id: 15,
    level: 6,
    cefr: 'B1',
    title: 'Yangi shaharga ko\'chish',
    titleEn: 'Moving to a New City',
    minutes: 5,
    icon: 'ti-truck',
    sentences: [
      { en: 'Nodira accepts a new job offer in a different city.', uz: 'Nodira boshqa shahardagi yangi ish taklifini qabul qiladi.' },
      { en: 'She feels excited but also worried about leaving her friends.', uz: 'U hayajonlanadi, lekin do\'stlaridan ajralishdan ham xavotirlanadi.' },
      { en: 'The first weeks are difficult because she knows no one.', uz: 'Birinchi haftalar qiyin kechadi, chunki u hech kimni tanimaydi.' },
      { en: 'Slowly, she starts talking to her coworkers and neighbors.', uz: 'Asta-sekin u hamkasblari va qo\'shnilari bilan gaplasha boshlaydi.' },
      { en: 'One coworker invites her to a weekend hiking trip.', uz: 'Bir hamkasbi uni dam olish kunidagi tog\'ga sayohatga taklif qiladi.' },
      { en: 'By the end of the year, Nodira feels this city is her home.', uz: 'Yil oxiriga kelib, Nodira bu shaharni o\'z uyi deb his qiladi.' }
    ],
    questions: [
      { question: 'How does Nodira feel about moving at first?', options: ['Only happy', 'Excited but worried', 'Angry', 'Indifferent'], correct: 'Excited but worried' },
      { question: 'What makes the first weeks difficult?', options: ['Bad weather', 'She knows no one', 'She loses her job', 'She is sick'], correct: 'She knows no one' },
      { question: 'How does Nodira feel by the end of the year?', options: ['She wants to leave', 'The city feels like home', 'She is still lonely', 'She regrets moving'], correct: 'The city feels like home' }
    ]
  },
  {
    id: 16,
    level: 7,
    cefr: 'B1',
    title: 'Daryoni tozalash tashabbusi',
    titleEn: 'The River Cleanup',
    minutes: 5,
    icon: 'ti-recycle',
    sentences: [
      { en: 'Students at Sherzod\'s university notice the local river is full of trash.', uz: 'Sherzodning universitetidagi talabalar mahalliy daryo axlatga to\'la ekanini payqashadi.' },
      { en: 'They organize a cleanup event and invite the whole community.', uz: 'Ular tozalash tadbirini tashkil qilib, butun jamoatchilikni taklif qilishadi.' },
      { en: 'On Saturday morning, more than a hundred volunteers show up.', uz: 'Shanba kuni ertalab yuzdan ortiq ko\'ngilli ishtirokchi keladi.' },
      { en: 'They work for hours, collecting bags of plastic and glass.', uz: 'Ular soatlab ishlab, plastik va shisha to\'la qoplarni yig\'ishadi.' },
      { en: 'Local news stations arrive to report on the event.', uz: 'Mahalliy teleko\'rsatuvlar tadbir haqida xabar berish uchun keladi.' },
      { en: 'The mayor promises to support future environmental projects.', uz: 'Shahar hokimi kelajakdagi ekologik loyihalarni qo\'llab-quvvatlashga va\'da beradi.' },
      { en: 'Sherzod feels proud that a small idea created real change.', uz: 'Sherzod kichik g\'oya haqiqiy o\'zgarish yaratganidan faxrlanadi.' }
    ],
    questions: [
      { question: 'What do the students notice about the river?', options: ['It is dry', 'It is full of trash', 'It is too small', 'It has fish'], correct: 'It is full of trash' },
      { question: 'How many volunteers show up?', options: ['Ten', 'Fifty', 'More than a hundred', 'Only students'], correct: 'More than a hundred' },
      { question: 'What does the mayor promise?', options: ['To close the river', 'To support future projects', 'To fine the students', 'Nothing'], correct: 'To support future projects' }
    ]
  },
  {
    id: 17,
    level: 7,
    cefr: 'B1',
    title: 'Oshpazlikni o\'rganish',
    titleEn: 'Learning to Cook',
    minutes: 5,
    icon: 'ti-chef-hat',
    sentences: [
      { en: 'When Kamola moved away from home, she realized she could not cook.', uz: 'Kamola uydan uzoqlashganida, u pazandalik qila olmasligini angladi.' },
      { en: 'At first, she orders food or eats simple sandwiches.', uz: 'Dastlab u ovqat buyurtma qiladi yoki oddiy sendvich yeydi.' },
      { en: 'One day, she calls her mother and asks for a recipe.', uz: 'Bir kuni u onasiga qo\'ng\'iroq qilib, retsept so\'raydi.' },
      { en: 'Her first attempt at cooking plov is a complete disaster.', uz: 'Uning birinchi palov pishirish urinishi butunlay muvaffaqiyatsiz tugaydi.' },
      { en: 'She does not give up and practices every weekend.', uz: 'U taslim bo\'lmaydi va har dam olish kuni mashq qiladi.' },
      { en: 'After a few months, her friends say her cooking is excellent.', uz: 'Bir necha oydan so\'ng, do\'stlari uning pazandaligi a\'lo ekanini aytishadi.' },
      { en: 'Now Kamola even teaches her younger cousin how to cook.', uz: 'Endi Kamola hatto kichik amakivachchasiga pazandalikni o\'rgatadi.' }
    ],
    questions: [
      { question: 'Why does Kamola call her mother?', options: ['To say hello', 'To ask for a recipe', 'To ask for money', 'To complain'], correct: 'To ask for a recipe' },
      { question: 'How is her first attempt at cooking plov?', options: ['Perfect', 'A complete disaster', 'Just okay', 'She never tries'], correct: 'A complete disaster' },
      { question: 'What does Kamola do now?', options: ['She stops cooking', 'She teaches her cousin', 'She only orders food', 'She moves back home'], correct: 'She teaches her cousin' }
    ]
  },
  {
    id: 18,
    level: 7,
    cefr: 'B1',
    title: 'Ommaviy nutqdan qo\'rqishni yengish',
    titleEn: 'Overcoming Fear of Public Speaking',
    minutes: 5,
    icon: 'ti-microphone-2',
    sentences: [
      { en: 'Diyor has always been terrified of speaking in front of others.', uz: 'Diyor doim boshqalar oldida gapirishdan qattiq qo\'rqqan.' },
      { en: 'When his boss asks him to present at a conference, he panics.', uz: 'Boshlig\'i undan konferensiyada taqdimot qilishni so\'raganda, u vahimaga tushadi.' },
      { en: 'He decides to join a public speaking club to practice.', uz: 'U mashq qilish uchun ommaviy nutq klubiga qo\'shilishga qaror qiladi.' },
      { en: 'At the first meeting, his voice shakes and he forgets his words.', uz: 'Birinchi uchrashuvda uning ovozi titraydi va so\'zlarini unutadi.' },
      { en: 'With regular practice, he slowly becomes more confident.', uz: 'Muntazam mashq bilan u asta-sekin ko\'proq ishonchli bo\'lib boradi.' },
      { en: 'On the day of the conference, Diyor delivers a clear, strong speech.', uz: 'Konferensiya kuni Diyor aniq va kuchli nutq so\'zlaydi.' },
      { en: 'The audience applauds, and Diyor realizes fear can be overcome.', uz: 'Tomoshabinlar qarsak chaladi va Diyor qo\'rquvni yengib bo\'lishini anglaydi.' }
    ],
    questions: [
      { question: 'What is Diyor afraid of?', options: ['Flying', 'Speaking in public', 'Water', 'The dark'], correct: 'Speaking in public' },
      { question: 'What does he do to practice?', options: ['Nothing', 'Joins a public speaking club', 'Quits his job', 'Avoids the conference'], correct: 'Joins a public speaking club' },
      { question: 'How does the speech go at the conference?', options: ['He fails completely', 'He delivers it clearly and confidently', 'He does not show up', 'Someone else speaks'], correct: 'He delivers it clearly and confidently' }
    ]
  },
  {
    id: 19,
    level: 6,
    cefr: 'B1',
    title: 'Ko\'ngillilar tashkiloti',
    titleEn: 'The Volunteer Group',
    minutes: 5,
    icon: 'ti-heart-handshake',
    sentences: [
      { en: 'Every winter, Gulnora\'s group collects warm clothes for families in need.', uz: 'Har qish Gulnoraning guruhi ehtiyojmand oilalar uchun issiq kiyimlar yig\'adi.' },
      { en: 'This year, fewer people donate because of a difficult economy.', uz: 'Bu yil iqtisodiy qiyinchiliklar tufayli kamroq odam xayriya qiladi.' },
      { en: 'Gulnora decides to create a social media campaign to raise awareness.', uz: 'Gulnora xabardorlikni oshirish uchun ijtimoiy tarmoqda kampaniya yaratishga qaror qiladi.' },
      { en: 'She shares real stories from families the group has helped before.', uz: 'U guruh ilgari yordam bergan oilalarning haqiqiy hikoyalarini ulashadi.' },
      { en: 'The campaign spreads quickly, and donations start coming in.', uz: 'Kampaniya tez tarqaladi va xayriyalar kela boshlaydi.' },
      { en: 'By the end of the month, they collect more clothes than any previous year.', uz: 'Oy oxiriga kelib, ular oldingi yillarga qaraganda ko\'proq kiyim yig\'ib olishadi.' }
    ],
    questions: [
      { question: 'Why do fewer people donate this year?', options: ['They are lazy', 'A difficult economy', 'No one needs help', 'Bad weather'], correct: 'A difficult economy' },
      { question: 'What does Gulnora create?', options: ['A new charity', 'A social media campaign', 'A clothing store', 'A school'], correct: 'A social media campaign' },
      { question: 'What is the result at the end of the month?', options: ['They collect nothing', 'They collect more than any previous year', 'The group closes', 'They collect the same amount'], correct: 'They collect more than any previous year' }
    ]
  },

  // ─── B2 (6 stories) ───────────────────────────────────────────────────────
  {
    id: 20,
    level: 8,
    cefr: 'B2',
    title: 'Startap taqdimoti',
    titleEn: 'The Startup Pitch',
    minutes: 6,
    icon: 'ti-rocket',
    sentences: [
      { en: 'After two years of development, Anvar is ready to pitch his startup to investors.', uz: 'Ikki yillik rivojlanishdan so\'ng, Anvar startapini investorlarga taqdim etishga tayyor.' },
      { en: 'He has rehearsed his presentation dozens of times, anticipating every possible question.', uz: 'U taqdimotini o\'nlab marta mashq qilgan va har qanday savolni oldindan bashorat qilgan.' },
      { en: 'During the pitch, one investor challenges his revenue projections directly.', uz: 'Taqdimot davomida bir investor uning daromad prognozlariga bevosita e\'tiroz bildiradi.' },
      { en: 'Instead of getting defensive, Anvar calmly explains his data and reasoning.', uz: 'Himoyalanish o\'rniga, Anvar xotirjamlik bilan o\'z ma\'lumotlari va mantiqini tushuntiradi.' },
      { en: 'His transparency and confidence impress the panel more than the numbers themselves.', uz: 'Uning ochiqligi va ishonchi raqamlarning o\'zidan ko\'ra ko\'proq hay\'atga ta\'sir qiladi.' },
      { en: 'A week later, two investors express serious interest in funding the company.', uz: 'Bir hafta o\'tib, ikki investor kompaniyani moliyalashtirishga jiddiy qiziqish bildiradi.' },
      { en: 'Anvar realizes that honesty under pressure was his strongest asset.', uz: 'Anvar bosim ostida halollik uning eng kuchli fazilati bo\'lganini anglaydi.' }
    ],
    questions: [
      { question: 'What does the investor challenge?', options: ['His team', 'His revenue projections', 'His office location', 'His clothing'], correct: 'His revenue projections' },
      { question: 'How does Anvar respond to the challenge?', options: ['He gets angry', 'He calmly explains his reasoning', 'He leaves the room', 'He avoids the question'], correct: 'He calmly explains his reasoning' },
      { question: 'What does Anvar realize was his strongest asset?', options: ['His slides', 'His honesty under pressure', 'His office', 'His team size'], correct: 'His honesty under pressure' }
    ]
  },
  {
    id: 21,
    level: 8,
    cefr: 'B2',
    title: 'Shartnoma muzokarasi',
    titleEn: 'Negotiating the Contract',
    minutes: 6,
    icon: 'ti-file-text',
    sentences: [
      { en: 'Zarina\'s company is negotiating a major contract with an international supplier.', uz: 'Zarinaning kompaniyasi xalqaro yetkazib beruvchi bilan yirik shartnoma bo\'yicha muzokara olib bormoqda.' },
      { en: 'The supplier insists on terms that would limit her company\'s flexibility.', uz: 'Yetkazib beruvchi kompaniyaning moslashuvchanligini cheklaydigan shartlarni talab qiladi.' },
      { en: 'Zarina proposes a compromise: shorter contract terms with review periods.', uz: 'Zarina murosa taklif qiladi: qisqaroq shartnoma muddatlari va qayta ko\'rib chiqish davrlari bilan.' },
      { en: 'The negotiations stretch over several tense meetings.', uz: 'Muzokaralar bir necha keskin uchrashuvlarga cho\'zilib ketadi.' },
      { en: 'Eventually, both sides agree to a modified version of her proposal.', uz: 'Oxir-oqibat, ikkala tomon ham uning taklifining o\'zgartirilgan versiyasiga rozi bo\'ladi.' },
      { en: 'The deal strengthens the partnership without sacrificing her company\'s independence.', uz: 'Bitim kompaniyaning mustaqilligidan voz kechmasdan hamkorlikni mustahkamlaydi.' },
      { en: 'Her manager credits her patience and clear thinking for the successful outcome.', uz: 'Uning menejeri muvaffaqiyatli natija uchun uning sabr-toqati va aniq fikrlashini e\'tirof etadi.' }
    ],
    questions: [
      { question: 'What does the supplier initially insist on?', options: ['A lower price', 'Terms that limit flexibility', 'A shorter meeting', 'Nothing specific'], correct: 'Terms that limit flexibility' },
      { question: 'What does Zarina propose?', options: ['To cancel the deal', 'Shorter terms with review periods', 'A higher price', 'To sign immediately'], correct: 'Shorter terms with review periods' },
      { question: 'What does her manager credit for the success?', options: ['Luck', 'Her patience and clear thinking', 'The supplier\'s kindness', 'A lower budget'], correct: 'Her patience and clear thinking' }
    ]
  },
  {
    id: 22,
    level: 9,
    cefr: 'B2',
    title: 'Chet elda madaniy tafovut',
    titleEn: 'A Cultural Misunderstanding Abroad',
    minutes: 6,
    icon: 'ti-world',
    sentences: [
      { en: 'When Elyor moves abroad for work, he assumes his direct communication style will be fine.', uz: 'Elyor ish uchun chet elga ko\'chganida, uning to\'g\'ridan-to\'g\'ri muloqot uslubi yaxshi qabul qilinishini o\'ylaydi.' },
      { en: 'During his first team meeting, he openly criticizes a colleague\'s plan.', uz: 'Birinchi jamoa yig\'ilishida u ochiqchasiga hamkasbining rejasini tanqid qiladi.' },
      { en: 'The room goes silent, and he senses something has gone wrong.', uz: 'Xona jimib qoladi va u nimadir noto\'g\'ri bo\'lganini his qiladi.' },
      { en: 'A friendly coworker later explains that feedback there is usually given privately.', uz: 'Do\'stona hamkasbi keyinroq u yerda fikr-mulohaza odatda xususiy tarzda berilishini tushuntiradi.' },
      { en: 'Elyor apologizes to his colleague and adjusts his approach going forward.', uz: 'Elyor hamkasbidan uzr so\'raydi va bundan buyon yondashuvini o\'zgartiradi.' },
      { en: 'Over time, he learns to balance honesty with cultural sensitivity.', uz: 'Vaqt o\'tishi bilan u halollikni madaniy sezgirlik bilan muvozanatlashni o\'rganadi.' },
      { en: 'His colleagues eventually respect him for both his skill and his willingness to adapt.', uz: 'Hamkasblari oxir-oqibat uning mahorati va moslashishga tayyorligi uchun uni hurmat qiladi.' }
    ],
    questions: [
      { question: 'What mistake does Elyor make in the meeting?', options: ['He arrives late', 'He openly criticizes a colleague', 'He says nothing', 'He leaves early'], correct: 'He openly criticizes a colleague' },
      { question: 'What does the coworker explain?', options: ['Feedback is given publicly', 'Feedback is usually given privately', 'No feedback is allowed', 'Meetings are canceled'], correct: 'Feedback is usually given privately' },
      { question: 'What do colleagues eventually respect him for?', options: ['Only his skill', 'His skill and willingness to adapt', 'His accent', 'His salary'], correct: 'His skill and willingness to adapt' }
    ]
  },
  {
    id: 23,
    level: 9,
    cefr: 'B2',
    title: 'Iqlim o\'zgarishi bahsi',
    titleEn: 'The Climate Change Debate',
    minutes: 6,
    icon: 'ti-cloud',
    sentences: [
      { en: 'At the university debate club, Malika is assigned to argue for stricter environmental regulations.', uz: 'Universitet debat klubida Malikaga qattiqroq ekologik qoidalarni himoya qilish topshiriladi.' },
      { en: 'Her opponent argues that regulations could harm small businesses.', uz: 'Uning raqibi qoidalar kichik bizneslarga zarar yetkazishi mumkinligini ta\'kidlaydi.' },
      { en: 'Malika presents research showing long-term economic benefits of sustainable practices.', uz: 'Malika barqaror amaliyotlarning uzoq muddatli iqtisodiy foydalarini ko\'rsatuvchi tadqiqotni taqdim etadi.' },
      { en: 'The audience asks tough questions about implementation costs.', uz: 'Tomoshabinlar amalga oshirish xarajatlari haqida qiyin savollar berishadi.' },
      { en: 'Malika acknowledges the challenges but proposes a gradual transition plan.', uz: 'Malika qiyinchiliklarni tan oladi, lekin bosqichma-bosqich o\'tish rejasini taklif qiladi.' },
      { en: 'The judges praise both debaters for their well-researched arguments.', uz: 'Hakamlar ikkala debatchini ham puxta tadqiq qilingan dalillari uchun maqtaydi.' },
      { en: 'Malika leaves the debate more convinced than ever of her position, but respectful of the opposing view.', uz: 'Malika debatdan o\'z pozitsiyasiga ilgarigidan ham ko\'proq ishonch bilan, lekin qarama-qarshi qarashga hurmat bilan chiqadi.' }
    ],
    questions: [
      { question: 'What does Malika argue for?', options: ['Fewer regulations', 'Stricter environmental regulations', 'No regulations', 'Higher taxes only'], correct: 'Stricter environmental regulations' },
      { question: 'What does her opponent argue?', options: ['Regulations help everyone', 'Regulations could harm small businesses', 'Climate change is not real', 'Nothing'], correct: 'Regulations could harm small businesses' },
      { question: 'What does Malika propose after tough questions?', options: ['To give up', 'A gradual transition plan', 'Immediate full implementation', 'Ignoring the costs'], correct: 'A gradual transition plan' }
    ]
  },
  {
    id: 24,
    level: 10,
    cefr: 'B2',
    title: 'Kasb o\'zgartirish qarori',
    titleEn: 'The Career Change Decision',
    minutes: 6,
    icon: 'ti-switch-3',
    sentences: [
      { en: 'After ten years as an accountant, Farhod feels unfulfilled in his career.', uz: 'O\'n yil buxgalter bo\'lib ishlagandan so\'ng, Farhod o\'z kasbidan qoniqmaydi.' },
      { en: 'He has always been passionate about graphic design, but never pursued it professionally.', uz: 'U doim grafik dizaynga qiziqqan, lekin buni hech qachon professional tarzda amalga oshirmagan.' },
      { en: 'Switching careers would mean a significant pay cut and starting over.', uz: 'Kasbni o\'zgartirish katta maosh kamayishi va qaytadan boshlashni anglatadi.' },
      { en: 'His family worries about the financial risk, especially with a young child at home.', uz: 'Oilasi, ayniqsa uyda kichkina farzand borligi sababli, moliyaviy xavfdan xavotirlanadi.' },
      { en: 'Farhod decides to take evening design courses while keeping his current job.', uz: 'Farhod hozirgi ishini saqlab qolgan holda kechki dizayn kurslariga qatnashishga qaror qiladi.' },
      { en: 'After a year of studying and building a portfolio, he lands a junior design role.', uz: 'Bir yillik o\'qish va portfolio yaratishdan so\'ng, u kichik dizayner lavozimiga ega bo\'ladi.' },
      { en: 'The pay is lower at first, but Farhod feels genuinely excited about work again.', uz: 'Dastlab maosh kamroq, lekin Farhod ishga qayta chin dildan qiziqish bilan qaraydi.' }
    ],
    questions: [
      { question: 'What has Farhod always been passionate about?', options: ['Accounting', 'Graphic design', 'Cooking', 'Traveling'], correct: 'Graphic design' },
      { question: 'What does Farhod do while keeping his current job?', options: ['Nothing', 'Takes evening design courses', 'Quits immediately', 'Starts a business'], correct: 'Takes evening design courses' },
      { question: 'How does Farhod feel in his new role?', options: ['Regretful', 'Genuinely excited', 'Bored', 'Indifferent'], correct: 'Genuinely excited' }
    ]
  },
  {
    id: 25,
    level: 10,
    cefr: 'B2',
    title: 'Ishdagi ziddiyatni hal qilish',
    titleEn: 'Resolving a Workplace Conflict',
    minutes: 6,
    icon: 'ti-message-2',
    sentences: [
      { en: 'Two senior employees, Laziz and Kamron, disagree strongly on the project\'s direction.', uz: 'Ikki katta xodim, Laziz va Kamron, loyiha yo\'nalishi bo\'yicha keskin kelisha olmaydi.' },
      { en: 'Their disagreement starts affecting the morale of the entire team.', uz: 'Ularning kelishmovchiligi butun jamoaning ruhiyatiga ta\'sir qila boshlaydi.' },
      { en: 'Their manager arranges a private meeting to address the tension.', uz: 'Ularning menejeri keskinlikni hal qilish uchun xususiy uchrashuv tashkil qiladi.' },
      { en: 'Each person is asked to explain their perspective without interruption.', uz: 'Har biridan o\'z nuqtai nazarini uzilishsiz tushuntirish so\'raladi.' },
      { en: 'They realize both approaches actually share the same underlying goal.', uz: 'Ular ikkala yondashuv ham aslida bir xil asosiy maqsadga ega ekanini anglashadi.' },
      { en: 'Together, they design a hybrid plan that combines the strongest parts of each idea.', uz: 'Birgalikda ular har ikkala g\'oyaning eng kuchli qismlarini birlashtiruvchi gibrid reja tuzishadi.' },
      { en: 'The team notices the improved collaboration and the project moves forward smoothly.', uz: 'Jamoa yaxshilangan hamkorlikni sezadi va loyiha muammosiz oldinga siljiydi.' }
    ],
    questions: [
      { question: 'What starts affecting the team?', options: ['The budget', 'The disagreement between Laziz and Kamron', 'A lack of clients', 'The weather'], correct: 'The disagreement between Laziz and Kamron' },
      { question: 'What does the manager arrange?', options: ['A public argument', 'A private meeting', 'A firing', 'Nothing'], correct: 'A private meeting' },
      { question: 'What do they design together?', options: ['A new office', 'A hybrid plan', 'A resignation letter', 'A new team'], correct: 'A hybrid plan' }
    ]
  },

  // ─── C1 (6 stories) ───────────────────────────────────────────────────────
  {
    id: 26,
    level: 11,
    cefr: 'C1',
    title: 'Ishdagi axloqiy dilemma',
    titleEn: 'An Ethical Dilemma at Work',
    minutes: 7,
    icon: 'ti-scale',
    sentences: [
      { en: 'Sarvinoz discovers that her company\'s new product has a minor safety flaw that was never disclosed.', uz: 'Sarvinoz kompaniyasining yangi mahsulotida hech qachon oshkor qilinmagan kichik xavfsizlik nuqsoni borligini bilib qoladi.' },
      { en: 'Reporting it could delay the launch and damage the company\'s reputation.', uz: 'Buni xabar qilish chiqarishni kechiktirishi va kompaniya obro\'siga putur yetkazishi mumkin.' },
      { en: 'Staying silent, however, would mean knowingly putting customers at a small but real risk.', uz: 'Jim qolish esa mijozlarni kichik, lekin haqiqiy xavf ostida bila turib qoldirishni anglatadi.' },
      { en: 'She weighs her loyalty to colleagues against her responsibility to the public.', uz: 'U hamkasblariga sadoqatini jamoatchilik oldidagi mas\'uliyati bilan taqqoslaydi.' },
      { en: 'After a sleepless night, Sarvinoz decides to raise the issue directly with senior management.', uz: 'Uyqusiz tundan so\'ng, Sarvinoz masalani to\'g\'ridan-to\'g\'ri yuqori rahbariyatga ko\'tarishga qaror qiladi.' },
      { en: 'To her relief, the executives choose to delay the launch and fix the flaw.', uz: 'Uning yengil tortishiga sabab, rahbarlar chiqarishni kechiktirib, nuqsonni tuzatishga qaror qilishadi.' },
      { en: 'Sarvinoz\'s integrity ultimately earns her greater trust within the organization.', uz: 'Sarvinozning halolligi oxir-oqibat tashkilotda unga nisbatan katta ishonch qozonib beradi.' }
    ],
    questions: [
      { question: 'What does Sarvinoz discover?', options: ['A pricing error', 'An undisclosed safety flaw', 'A marketing mistake', 'Nothing important'], correct: 'An undisclosed safety flaw' },
      { question: 'What does she decide to do?', options: ['Stay silent forever', 'Raise the issue with senior management', 'Quit her job', 'Tell the media first'], correct: 'Raise the issue with senior management' },
      { question: 'What is the outcome?', options: ['She is fired', 'The company delays the launch and fixes it', 'Nothing changes', 'The product is canceled entirely'], correct: 'The company delays the launch and fixes it' }
    ]
  },
  {
    id: 27,
    level: 11,
    cefr: 'C1',
    title: 'Ilmiy kashfiyot e\'loni',
    titleEn: 'Announcing a Scientific Breakthrough',
    minutes: 7,
    icon: 'ti-flask',
    sentences: [
      { en: 'After five years of research, Dr. Aliyeva\'s team identifies a compound that could slow a rare disease.', uz: 'Besh yillik tadqiqotdan so\'ng, doktor Aliyeva jamoasi noyob kasallikni sekinlashtirishi mumkin bo\'lgan birikmani aniqlaydi.' },
      { en: 'Before publishing, she insists on repeating the experiments to rule out any error.', uz: 'Nashr etishdan oldin, u har qanday xatoni istisno qilish uchun tajribalarni takrorlashni talab qiladi.' },
      { en: 'A rival lab announces similar findings first, creating pressure to rush the publication.', uz: 'Raqib laboratoriya birinchi bo\'lib shunga o\'xshash natijalarni e\'lon qiladi va bu nashrni shoshiltirishga bosim yaratadi.' },
      { en: 'Dr. Aliyeva resists the temptation to cut corners and completes rigorous peer review.', uz: 'Doktor Aliyeva soddalashtirish vasvasasiga qarshi turadi va puxta hamkasblar tomonidan tekshiruvni yakunlaydi.' },
      { en: 'When the paper is finally published, other scientists confirm its results independently.', uz: 'Maqola nihoyat nashr etilganda, boshqa olimlar uning natijalarini mustaqil ravishda tasdiqlashadi.' },
      { en: 'The discovery eventually leads to clinical trials that could help thousands of patients.', uz: 'Kashfiyot oxir-oqibat minglab bemorlarga yordam berishi mumkin bo\'lgan klinik sinovlarga olib keladi.' },
      { en: 'Dr. Aliyeva credits her team\'s patience and rigor, not speed, for the discovery\'s lasting impact.', uz: 'Doktor Aliyeva kashfiyotning uzoq muddatli ta\'sirini tezlikka emas, balki jamoasining sabri va puxtaligiga bog\'laydi.' }
    ],
    questions: [
      { question: 'What does Dr. Aliyeva insist on before publishing?', options: ['Publishing immediately', 'Repeating the experiments', 'Hiring more staff', 'Changing labs'], correct: 'Repeating the experiments' },
      { question: 'What creates pressure to rush?', options: ['A funding deadline', 'A rival lab\'s announcement', 'A government order', 'Nothing'], correct: 'A rival lab\'s announcement' },
      { question: 'What does Dr. Aliyeva credit for the lasting impact?', options: ['Speed', 'Patience and rigor', 'Luck', 'Marketing'], correct: 'Patience and rigor' }
    ]
  },
  {
    id: 28,
    level: 12,
    cefr: 'C1',
    title: 'Siyosiy islohot bahsi',
    titleEn: 'The Policy Reform Debate',
    minutes: 7,
    icon: 'ti-building-bank',
    sentences: [
      { en: 'A proposed tax reform sparks fierce debate between economists and lawmakers.', uz: 'Taklif etilayotgan soliq islohoti iqtisodchilar va qonun chiqaruvchilar o\'rtasida qattiq bahs uyg\'otadi.' },
      { en: 'Supporters argue the reform would attract foreign investment and boost growth.', uz: 'Tarafdorlar islohot xorijiy investitsiyalarni jalb qilib, o\'sishni tezlashtirishini ta\'kidlaydilar.' },
      { en: 'Critics warn it would disproportionately burden low-income households.', uz: 'Tanqidchilar bu kam daromadli oilalarga nomutanosib yuk solishidan ogohlantiradilar.' },
      { en: 'An independent economist, Ms. Yusupova, is asked to analyze both projections.', uz: 'Mustaqil iqtisodchi, xonim Yusupovadan har ikkala prognozni tahlil qilish so\'raladi.' },
      { en: 'Her report finds merit in both arguments but recommends a phased approach with safeguards.', uz: 'Uning hisoboti har ikkala dalilda ham asos borligini topadi, lekin himoya choralari bilan bosqichma-bosqich yondashuvni tavsiya qiladi.' },
      { en: 'Lawmakers ultimately adopt a modified version of the reform, incorporating her recommendations.', uz: 'Qonun chiqaruvchilar oxir-oqibat uning tavsiyalarini o\'z ichiga olgan islohotning o\'zgartirilgan versiyasini qabul qiladilar.' },
      { en: 'The compromise satisfies neither side entirely, but most agree it is a reasonable outcome.', uz: 'Murosa hech bir tomonni to\'liq qanoatlantirmaydi, lekin ko\'pchilik buni oqilona natija deb hisoblaydi.' }
    ],
    questions: [
      { question: 'What do supporters of the reform argue?', options: ['It will hurt investment', 'It will attract investment and boost growth', 'It will do nothing', 'It will raise unemployment'], correct: 'It will attract investment and boost growth' },
      { question: 'What does Ms. Yusupova recommend?', options: ['Rejecting the reform entirely', 'A phased approach with safeguards', 'Immediate full implementation', 'No changes at all'], correct: 'A phased approach with safeguards' },
      { question: 'How do most lawmakers view the final compromise?', options: ['As a total failure', 'As a reasonable outcome', 'As perfect for everyone', 'As irrelevant'], correct: 'As a reasonable outcome' }
    ]
  },
  {
    id: 29,
    level: 12,
    cefr: 'C1',
    title: 'Tergov jurnalistikasi',
    titleEn: 'Investigative Journalism',
    minutes: 7,
    icon: 'ti-news',
    sentences: [
      { en: 'Journalist Otabek receives an anonymous tip about corruption in a local construction project.', uz: 'Jurnalist Otabek mahalliy qurilish loyihasidagi korrupsiya haqida noma\'lum manbadan xabar oladi.' },
      { en: 'Verifying the claims requires months of document requests and confidential interviews.', uz: 'Da\'volarni tasdiqlash uchun oylab hujjat so\'rash va maxfiy suhbatlar o\'tkazish kerak bo\'ladi.' },
      { en: 'Several sources withdraw their cooperation, fearing retaliation from powerful figures.', uz: 'Bir nechta manbalar ta\'sirli shaxslardan qasos olishdan qo\'rqib, hamkorlikdan voz kechishadi.' },
      { en: 'Otabek\'s editor questions whether the story is strong enough to publish safely.', uz: 'Otabekning muharriri hikoya xavfsiz nashr etish uchun yetarlicha kuchli ekanligiga shubha bilan qaraydi.' },
      { en: 'After finding a financial document that corroborates the original tip, they proceed with publication.', uz: 'Dastlabki xabarni tasdiqlovchi moliyaviy hujjat topilgandan so\'ng, ular nashr etishga kirishadilar.' },
      { en: 'The article triggers an official investigation into the construction contracts.', uz: 'Maqola qurilish shartnomalari bo\'yicha rasmiy tergovni boshlab yuboradi.' },
      { en: 'Otabek reflects that persistence, not certainty, is what made the investigation possible.', uz: 'Otabek tergovni imkon qilgan narsa ishonch emas, balki qat\'iyat ekanligini anglaydi.' }
    ],
    questions: [
      { question: 'What does Otabek receive at the start?', options: ['A job offer', 'An anonymous tip about corruption', 'A press award', 'A lawsuit'], correct: 'An anonymous tip about corruption' },
      { question: 'Why do several sources withdraw cooperation?', options: ['They are paid off', 'They fear retaliation', 'They lose interest', 'They move away'], correct: 'They fear retaliation' },
      { question: 'What does Otabek conclude was key to the investigation?', options: ['Luck', 'Persistence', 'Money', 'A powerful friend'], correct: 'Persistence' }
    ]
  },
  {
    id: 30,
    level: 13,
    cefr: 'C1',
    title: 'Baxt haqida falsafiy munozara',
    titleEn: 'A Philosophical Discussion on Happiness',
    minutes: 7,
    icon: 'ti-brain',
    sentences: [
      { en: 'At a university seminar, Professor Rashidov asks students to define what happiness truly means.', uz: 'Universitet seminarida professor Rashidov talabalardan baxtning haqiqiy ma\'nosini aniqlashni so\'raydi.' },
      { en: 'One student argues that happiness is primarily about achieving personal goals.', uz: 'Bir talaba baxt asosan shaxsiy maqsadlarga erishish bilan bog\'liqligini ta\'kidlaydi.' },
      { en: 'Another counters that lasting happiness comes from meaningful relationships, not achievement.', uz: 'Boshqasi doimiy baxt yutuqdan emas, balki mazmunli munosabatlardan kelib chiqishini bildiradi.' },
      { en: 'A third student introduces the idea that happiness fluctuates and should not be the ultimate goal at all.', uz: 'Uchinchi talaba baxt o\'zgaruvchan ekanligi va umuman yakuniy maqsad bo\'lmasligi kerakligi haqidagi g\'oyani kiritadi.' },
      { en: 'The discussion grows more nuanced as students bring in perspectives from different cultures and philosophies.', uz: 'Talabalar turli madaniyat va falsafalardan nuqtai nazarlarni kiritishi bilan muhokama yanada nozik tus oladi.' },
      { en: 'Professor Rashidov does not offer a final answer, but encourages continued reflection.', uz: 'Professor Rashidov yakuniy javob bermaydi, balki davomiy mulohaza yuritishga undaydi.' },
      { en: 'Students leave the seminar with more questions than answers, but a deeper appreciation for the complexity of the topic.', uz: 'Talabalar seminardan javoblardan ko\'ra ko\'proq savol bilan, lekin mavzu murakkabligini chuqurroq anglagan holda tarq bo\'lishadi.' }
    ],
    questions: [
      { question: 'What does the first student argue happiness is about?', options: ['Relationships', 'Achieving personal goals', 'Wealth', 'Luck'], correct: 'Achieving personal goals' },
      { question: 'What does the third student suggest?', options: ['Happiness never changes', 'Happiness should not be the ultimate goal', 'Happiness is unimportant', 'Everyone agrees on happiness'], correct: 'Happiness should not be the ultimate goal' },
      { question: 'How does the seminar end?', options: ['With a final, clear answer', 'With more questions than answers', 'In an argument', 'With no conclusion discussed'], correct: 'With more questions than answers' }
    ]
  },
  {
    id: 31,
    level: 13,
    cefr: 'C1',
    title: 'Ikki kompaniya o\'rtasidagi murakkab muzokara',
    titleEn: 'A Complex Negotiation Between Companies',
    minutes: 7,
    icon: 'ti-handshake',
    sentences: [
      { en: 'Two competing tech companies enter merger talks after years of rivalry.', uz: 'Ikkita raqobatchi texnologiya kompaniyasi yillar davomida davom etgan raqobatdan so\'ng birlashish muzokaralariga kirishadi.' },
      { en: 'Each side distrusts the other\'s valuation of their intellectual property.', uz: 'Har ikkala tomon ham bir-birining intellektual mulkini baholashiga ishonmaydi.' },
      { en: 'Lead negotiator Ms. Tosheva insists on an independent audit before any agreement is signed.', uz: 'Bosh muzokarachi xonim Tosheva har qanday shartnoma imzolanishidan oldin mustaqil audit o\'tkazishni talab qiladi.' },
      { en: 'The audit reveals discrepancies that nearly collapse the entire negotiation.', uz: 'Audit deyarli butun muzokarani barbod qiladigan tafovutlarni fosh qiladi.' },
      { en: 'Rather than walking away, both sides agree to renegotiate specific clauses transparently.', uz: 'Ikkala tomon ham voz kechish o\'rniga aniq bandlarni shaffof tarzda qayta muzokara qilishga rozi bo\'ladi.' },
      { en: 'After weeks of careful adjustments, a final agreement satisfies both boards of directors.', uz: 'Bir necha haftalik ehtiyotkorlik bilan o\'zgartirishlardan so\'ng, yakuniy kelishuv ikkala boshqaruv kengashini ham qanoatlantiradi.' },
      { en: 'Ms. Tosheva later notes that transparency, though painful at first, ultimately saved the deal.', uz: 'Xonim Tosheva keyinchalik shaffoflik dastlab og\'riqli bo\'lsa-da, oxir-oqibat bitimni saqlab qolganini ta\'kidlaydi.' }
    ],
    questions: [
      { question: 'What does Ms. Tosheva insist on?', options: ['Signing immediately', 'An independent audit', 'Canceling the deal', 'A public announcement'], correct: 'An independent audit' },
      { question: 'What does the audit nearly cause?', options: ['A quick agreement', 'The negotiation to collapse', 'A celebration', 'Nothing significant'], correct: 'The negotiation to collapse' },
      { question: 'What does Ms. Tosheva say ultimately saved the deal?', options: ['Speed', 'Transparency', 'Secrecy', 'Luck'], correct: 'Transparency' }
    ]
  },
  {
    id: 32,
    level: 4,
    cefr: 'A2',
    title: 'Yo\'qolgan sumka',
    titleEn: 'The Lost Bag',
    minutes: 4,
    icon: 'ti-briefcase',
    sentences: [
      { en: 'Diyora is traveling home on a crowded evening bus.', uz: 'Diyora kechqurun tirbandlashgan avtobusda uyga qaytmoqda.' },
      { en: 'When she gets off, she suddenly realizes her bag is not with her.', uz: 'U tushganida, birdan sumkasi yonida yo\'qligini payqaydi.' },
      { en: 'She feels panicked because her phone and keys are inside the bag.', uz: 'U vahima qiladi, chunki sumkada telefoni va kalitlari bor edi.' },
      { en: 'A kind stranger runs after the bus and waves at the driver.', uz: 'Mehribon notanish odam avtobus ortidan yugurib, haydovchiga qo\'l silkiydi.' },
      { en: 'The driver stops and checks the seats for the missing bag.', uz: 'Haydovchi to\'xtaydi va yo\'qolgan sumkani o\'rindiqlardan qidiradi.' },
      { en: 'Luckily, the bag is still there under Diyora\'s old seat.', uz: 'Yaxshiyamki, sumka hali ham Diyoraning eski o\'rindig\'i ostida turardi.' },
      { en: 'Diyora thanks the stranger and the driver again and again.', uz: 'Diyora notanish odam va haydovchiga qayta-qayta rahmat aytadi.' }
    ],
    questions: [
      { question: 'What does Diyora realize after getting off the bus?', options: ['She missed her stop', 'Her bag is missing', 'The bus is late', 'She lost her ticket'], correct: 'Her bag is missing' },
      { question: 'Who helps Diyora get the bus to stop?', options: ['A police officer', 'A kind stranger', 'Her friend', 'No one'], correct: 'A kind stranger' },
      { question: 'Where is the bag found?', options: ['At the market', 'Under her old seat', 'In the driver\'s hands', 'At home'], correct: 'Under her old seat' }
    ]
  },
  {
    id: 33,
    level: 7,
    cefr: 'B1',
    title: 'Birinchi ish kunidagi xato',
    titleEn: 'A Mistake on the First Day of Work',
    minutes: 5,
    icon: 'ti-briefcase-2',
    sentences: [
      { en: 'Jasur starts his very first office job on a Monday morning.', uz: 'Jasur o\'zining birinchi ofis ishini dushanba kuni ertalab boshlaydi.' },
      { en: 'His manager asks him to send an important email to a client.', uz: 'Uning menejeri undan mijozga muhim xat yuborishni so\'raydi.' },
      { en: 'Jasur accidentally sends the email to the wrong person in the company.', uz: 'Jasur bexosdan xatni kompaniyadagi noto\'g\'ri odamga yuboradi.' },
      { en: 'He feels embarrassed and does not know what to do next.', uz: 'U xijolat tortadi va keyin nima qilishni bilmaydi.' },
      { en: 'Instead of hiding the mistake, he tells his manager right away.', uz: 'Xatosini yashirish o\'rniga, u darhol menejeriga aytadi.' },
      { en: 'His manager appreciates his honesty and helps him fix the problem quickly.', uz: 'Menejeri uning halolligini qadrlaydi va muammoni tezda hal qilishga yordam beradi.' },
      { en: 'By the end of the day, Jasur learns that admitting mistakes builds trust.', uz: 'Kun oxiriga kelib, Jasur xatolarni tan olish ishonchni mustahkamlashini o\'rganadi.' }
    ],
    questions: [
      { question: 'What mistake does Jasur make?', options: ['He is late for work', 'He sends the email to the wrong person', 'He forgets his laptop', 'He misses a meeting'], correct: 'He sends the email to the wrong person' },
      { question: 'What does Jasur do about his mistake?', options: ['He hides it', 'He tells his manager immediately', 'He blames a colleague', 'He ignores it'], correct: 'He tells his manager immediately' },
      { question: 'What does Jasur learn by the end of the day?', options: ['To work faster', 'That admitting mistakes builds trust', 'To avoid emails', 'To change jobs'], correct: 'That admitting mistakes builds trust' }
    ]
  },
  {
    id: 34,
    level: 10,
    cefr: 'B2',
    title: 'Kichik shahardagi katta tanlov',
    titleEn: 'A Big Decision in a Small Town',
    minutes: 6,
    icon: 'ti-map-pin',
    sentences: [
      { en: 'After graduating, Nodira receives two very different job offers.', uz: 'Bitirgandan so\'ng, Nodiraga ikkita mutlaqo boshqacha ish taklifi keladi.' },
      { en: 'One offer is a well-paid position in a busy, expensive capital city.', uz: 'Bir taklif esa tirbandlashgan, qimmat poytaxt shahridagi yaxshi maoshli lavozim.' },
      { en: 'The other is a modest salary at a growing company in her home town.', uz: 'Ikkinchisi esa uning tug\'ilgan shahridagi rivojlanayotgan kompaniyada o\'rtacha maosh.' },
      { en: 'Her parents encourage her to take the city job for better career growth.', uz: 'Ota-onasi unga yaxshiroq martaba o\'sishi uchun shahardagi ishni tanlashni maslahat beradi.' },
      { en: 'However, Nodira values being close to her family and community more than money.', uz: 'Ammo Nodira uchun oilasi va jamiyatiga yaqin bo\'lish puldan ko\'ra muhimroq.' },
      { en: 'After days of thinking, she decides to stay and help her hometown company grow.', uz: 'Bir necha kun o\'ylagandan so\'ng, u qolib, tug\'ilgan shahridagi kompaniyaga o\'sishga yordam berishga qaror qiladi.' },
      { en: 'A year later, the company expands, and Nodira becomes one of its key leaders.', uz: 'Bir yildan so\'ng kompaniya kengayadi va Nodira uning asosiy rahbarlaridan biriga aylanadi.' }
    ],
    questions: [
      { question: 'What are the two job offers Nodira receives?', options: ['Two city jobs', 'A city job and a hometown job', 'Two hometown jobs', 'An internship and a full job'], correct: 'A city job and a hometown job' },
      { question: 'What do her parents encourage her to do?', options: ['Take the hometown job', 'Take the city job', 'Reject both offers', 'Start her own business'], correct: 'Take the city job' },
      { question: 'What does Nodira value more than money?', options: ['Fame', 'Being close to family and community', 'A big house', 'Traveling'], correct: 'Being close to family and community' }
    ]
  }

]

export function getStoryById(id) {
  return stories.find((s) => s.id === Number(id)) || null
}

export function isStoryUnlocked(story, userLevel) {
  return story.level <= (userLevel || 1)
}
