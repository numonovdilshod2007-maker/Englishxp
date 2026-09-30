// Level-based vocabulary system.
// Each level unlocks a fixed word list. Word count and difficulty increase
// as the level number grows. A user must finish level N to unlock level N+1.

export const LEVEL_WORD_COUNTS = [20, 30, 35, 40, 45, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50]

export const levels = [
  {
    level: 1,
    title: 'Yangi boshlovchi',
    description: 'Eng oddiy, eng ko\'p ishlatiladigan so\'zlar',
    words: [
      { en: 'hello', uz: 'salom', example: 'Hello, how are you?', exampleUz: 'Salom, qalaysiz?' },
      { en: 'yes', uz: 'ha', example: 'Yes, I agree.', exampleUz: 'Ha, men rozimman.' },
      { en: 'no', uz: 'yo\'q', example: 'No, I don\'t think so.', exampleUz: 'Yo\'q, men bunday deb o\'ylamayman.' },
      { en: 'thank you', uz: 'rahmat', example: 'Thank you for your help.', exampleUz: 'Yordamingiz uchun rahmat.' },
      { en: 'please', uz: 'iltimos', example: 'Please, sit down.', exampleUz: 'Iltimos, o\'tiring.' },
      { en: 'sorry', uz: 'kechirasiz', example: 'Sorry, I am late.', exampleUz: 'Kechirasiz, men kech qoldim.' },
      { en: 'water', uz: 'suv', example: 'Can I have some water?', exampleUz: 'Menga biroz suv bera olasizmi?' },
      { en: 'name', uz: 'ism', example: 'What is your name?', exampleUz: 'Ismingiz nima?' },
      { en: 'house', uz: 'uy', example: 'This is my house.', exampleUz: 'Bu mening uyim.' },
      { en: 'friend', uz: 'do\'st', example: 'He is my best friend.', exampleUz: 'U mening eng yaqin do\'stim.' },
      { en: 'good', uz: 'yaxshi', example: 'This is a good idea.', exampleUz: 'Bu yaxshi fikr.' },
      { en: 'bad', uz: 'yomon', example: 'The weather is bad today.', exampleUz: 'Bugun ob-havo yomon.' },
      { en: 'big', uz: 'katta', example: 'That is a big house.', exampleUz: 'U katta uy.' },
      { en: 'small', uz: 'kichik', example: 'I have a small bag.', exampleUz: 'Mening kichik sumkam bor.' },
      { en: 'today', uz: 'bugun', example: 'What are you doing today?', exampleUz: 'Bugun nima qilyapsiz?' },
      { en: 'tomorrow', uz: 'ertaga', example: 'See you tomorrow.', exampleUz: 'Ertaga ko\'rishguncha.' },
      { en: 'time', uz: 'vaqt', example: 'What time is it?', exampleUz: 'Soat necha bo\'ldi?' },
      { en: 'food', uz: 'ovqat', example: 'I like this food.', exampleUz: 'Menga bu ovqat yoqadi.' },
      { en: 'family', uz: 'oila', example: 'I love my family.', exampleUz: 'Men oilamni sevaman.' },
      { en: 'school', uz: 'maktab', example: 'I go to school every day.', exampleUz: 'Men har kuni maktabga boraman.' }
    ]
  },
  {
    level: 2,
    title: 'So\'z izlovchi',
    description: 'Kundalik suhbatda kerak bo\'ladigan so\'zlar',
    words: [
      { en: 'morning', uz: 'ertalab', example: 'I wake up early in the morning.', exampleUz: 'Men ertalab erta uyg\'onaman.' },
      { en: 'tired', uz: 'charchagan', example: 'I am tired after work.', exampleUz: 'Men ishdan keyin charchayman.' },
      { en: 'hungry', uz: 'och', example: 'I am very hungry right now.', exampleUz: 'Men hozir juda ochman.' },
      { en: 'happy', uz: 'baxtli', example: 'I feel happy today.', exampleUz: 'Bugun o\'zimni baxtli his qilyapman.' },
      { en: 'sad', uz: 'xafa', example: 'She felt sad after the news.', exampleUz: 'U yangilikdan keyin xafa bo\'ldi.' },
      { en: 'new', uz: 'yangi', example: 'I bought a new phone.', exampleUz: 'Men yangi telefon sotib oldim.' },
      { en: 'old', uz: 'eski / keksa', example: 'This is an old book.', exampleUz: 'Bu eski kitob.' },
      { en: 'bread', uz: 'non', example: 'I eat bread every morning.', exampleUz: 'Men har ertalab non yeyman.' },
      { en: 'milk', uz: 'sut', example: 'I drink milk every day.', exampleUz: 'Men har kuni sut ichaman.' },
      { en: 'tea', uz: 'choy', example: 'Would you like some tea?', exampleUz: 'Choy ichasizmi?' },
      { en: 'ticket', uz: 'chipta', example: 'I bought a ticket online.', exampleUz: 'Men chiptani onlayn sotib oldim.' },
      { en: 'hotel', uz: 'mehmonxona', example: 'We stayed in a nice hotel.', exampleUz: 'Biz yaxshi mehmonxonada turdik.' },
      { en: 'airport', uz: 'aeroport', example: 'The airport is far from here.', exampleUz: 'Aeroport bu yerdan uzoq.' },
      { en: 'meeting', uz: 'uchrashuv', example: 'We have a meeting at 3 PM.', exampleUz: 'Bizda soat 3 da uchrashuv bor.' },
      { en: 'colleague', uz: 'hamkasb', example: 'My colleague helped me.', exampleUz: 'Hamkasbim menga yordam berdi.' },
      { en: 'weekend', uz: 'dam olish kuni', example: 'What are your plans for the weekend?', exampleUz: 'Dam olish kuniga rejalaringiz qanday?' },
      { en: 'neighbor', uz: 'qo\'shni', example: 'My neighbor is very friendly.', exampleUz: 'Qo\'shnim juda samimiy.' },
      { en: 'excited', uz: 'hayajonlangan', example: 'I am excited about the trip.', exampleUz: 'Men sayohatdan hayajonlanyapman.' },
      { en: 'angry', uz: 'jahli chiqgan', example: 'He was angry about the delay.', exampleUz: 'U kechikish uchun jahli chiqqan edi.' },
      { en: 'guest', uz: 'mehmon', example: 'We are expecting guests tonight.', exampleUz: 'Biz bugun kechqurun mehmon kutyapmiz.' },
      { en: 'restaurant', uz: 'restoran', example: 'Let\'s go to a restaurant.', exampleUz: 'Keling, restoranga boraylik.' },
      { en: 'vegetable', uz: 'sabzavot', example: 'Vegetables are good for health.', exampleUz: 'Sabzavotlar salomatlik uchun foydali.' },
      { en: 'fruit', uz: 'meva', example: 'I eat fruit every day.', exampleUz: 'Men har kuni meva yeyman.' },
      { en: 'passport', uz: 'pasport', example: 'Don\'t forget your passport.', exampleUz: 'Pasportingizni unutmang.' },
      { en: 'flight', uz: 'parvoz', example: 'Our flight leaves at 9 AM.', exampleUz: 'Bizning parvozimiz soat 9 da jo\'naydi.' },
      { en: 'train', uz: 'poyezd', example: 'We took a train to the city.', exampleUz: 'Biz shaharga poyezdda bordik.' },
      { en: 'salary', uz: 'maosh', example: 'She got a salary increase.', exampleUz: 'Uning maoshi oshirildi.' },
      { en: 'breakfast', uz: 'nonushta', example: 'I have breakfast at 7 AM.', exampleUz: 'Men soat 7 da nonushta qilaman.' },
      { en: 'routine', uz: 'kunlik tartib', example: 'I have a morning routine.', exampleUz: 'Mening ertalabki kunlik tartibim bor.' },
      { en: 'celebrate', uz: 'nishonlamoq', example: 'We celebrate birthdays every year.', exampleUz: 'Biz har yili tug\'ilgan kunlarni nishonlaymiz.' }
    ]
  },
  {
    level: 3,
    title: 'So\'z yig\'uvchi',
    description: 'Fikrni aniqroq ifodalash uchun so\'zlar',
    words: [
      { en: 'understand', uz: 'tushunmoq', example: 'I don\'t understand this word.', exampleUz: 'Men bu so\'zni tushunmayapman.' },
      { en: 'important', uz: 'muhim', example: 'This is very important.', exampleUz: 'Bu juda muhim.' },
      { en: 'different', uz: 'farqli', example: 'These two are very different.', exampleUz: 'Bu ikkovi juda farqli.' },
      { en: 'remember', uz: 'eslamoq', example: 'I remember his name.', exampleUz: 'Men uning ismini eslayman.' },
      { en: 'forget', uz: 'unutmoq', example: 'Don\'t forget your keys.', exampleUz: 'Kalitlaringizni unutmang.' },
      { en: 'believe', uz: 'ishonmoq', example: 'I believe you.', exampleUz: 'Men sizga ishonaman.' },
      { en: 'beautiful', uz: 'chiroyli', example: 'What a beautiful day!', exampleUz: 'Qanday chiroyli kun!' },
      { en: 'delicious', uz: 'mazali', example: 'This soup is delicious.', exampleUz: 'Bu sho\'rva juda mazali.' },
      { en: 'spicy', uz: 'achchiq', example: 'This food is too spicy for me.', exampleUz: 'Bu ovqat men uchun juda achchiq.' },
      { en: 'fresh', uz: 'yangi / yangilangan', example: 'These vegetables are fresh.', exampleUz: 'Bu sabzavotlar yangi.' },
      { en: 'destination', uz: 'manzil', example: 'What is your final destination?', exampleUz: 'Sizning yakuniy manzilingiz qayer?' },
      { en: 'journey', uz: 'sayohat', example: 'It was a long journey.', exampleUz: 'Bu uzoq sayohat edi.' },
      { en: 'tourist', uz: 'sayyoh', example: 'Many tourists visit this place.', exampleUz: 'Ko\'p sayyohlar bu joyga tashrif buyuradi.' },
      { en: 'currency', uz: 'valyuta', example: 'What is the local currency?', exampleUz: 'Mahalliy valyuta nima?' },
      { en: 'deadline', uz: 'muddat', example: 'The deadline is next Friday.', exampleUz: 'Muddat kelasi juma kuni tugaydi.' },
      { en: 'client', uz: 'mijoz', example: 'The client was happy with our work.', exampleUz: 'Mijoz bizning ishimizdan mamnun bo\'ldi.' },
      { en: 'manager', uz: 'menejer', example: 'My manager praised my work.', exampleUz: 'Menejerim ishimni maqtadi.' },
      { en: 'budget', uz: 'byudjet', example: 'We need to stay within budget.', exampleUz: 'Biz byudjet doirasida qolishimiz kerak.' },
      { en: 'nervous', uz: 'asabiy', example: 'She felt nervous before the exam.', exampleUz: 'U imtihondan oldin asabiylashdi.' },
      { en: 'proud', uz: 'faxrlanish', example: 'I am proud of you.', exampleUz: 'Men sen bilan faxrlanaman.' },
      { en: 'surprised', uz: 'hayron', example: 'I was surprised by the gift.', exampleUz: 'Men sovg\'adan hayron bo\'ldim.' },
      { en: 'worried', uz: 'tashvishlangan', example: 'She is worried about the exam.', exampleUz: 'U imtihon haqida tashvishlanmoqda.' },
      { en: 'bored', uz: 'zerikkan', example: 'I feel bored at home.', exampleUz: 'Men uyda zerikkanman.' },
      { en: 'schedule', uz: 'jadval', example: 'My schedule is very busy this week.', exampleUz: 'Bu hafta jadvalim juda band.' },
      { en: 'chores', uz: 'uy ishlari', example: 'I do chores every Sunday.', exampleUz: 'Men har yakshanba uy ishlarini qilaman.' },
      { en: 'laundry', uz: 'kir yuvish', example: 'I need to do the laundry today.', exampleUz: 'Men bugun kir yuvishim kerak.' },
      { en: 'grocery', uz: 'oziq-ovqat mahsulotlari', example: 'I went grocery shopping yesterday.', exampleUz: 'Men kecha oziq-ovqat xarid qilishga bordim.' },
      { en: 'habit', uz: 'odat', example: 'Reading is a good habit.', exampleUz: 'Kitob o\'qish yaxshi odat.' },
      { en: 'border', uz: 'chegara', example: 'We crossed the border by bus.', exampleUz: 'Biz chegarani avtobusda kesib o\'tdik.' },
      { en: 'visa', uz: 'viza', example: 'I need a visa to travel there.', exampleUz: 'U yerga sayohat qilish uchun menga viza kerak.' },
      { en: 'employee', uz: 'xodim', example: 'The company has 50 employees.', exampleUz: 'Kompaniyada 50 nafar xodim bor.' },
      { en: 'report', uz: 'hisobot', example: 'Please prepare the monthly report.', exampleUz: 'Iltimos, oylik hisobotni tayyorlang.' },
      { en: 'interview', uz: 'suhbat', example: 'I have a job interview today.', exampleUz: 'Bugun mening ish suhbatim bor.' },
      { en: 'menu', uz: 'menyu', example: 'Can I see the menu, please?', exampleUz: 'Menyuni ko\'rsam bo\'ladimi, iltimos?' },
      { en: 'order', uz: 'buyurtma qilmoq', example: 'I would like to order pizza.', exampleUz: 'Men pitsa buyurtma qilmoqchiman.' }
    ]
  },
  {
    level: 4,
    title: 'Word warrior',
    description: 'Ish va sayohatda kerak bo\'ladigan so\'zlar',
    words: [
      { en: 'negotiate', uz: 'muzokara qilish', example: 'We need to negotiate the price.', exampleUz: 'Biz narx bo\'yicha muzokara olib borishimiz kerak.' },
      { en: 'contract', uz: 'shartnoma', example: 'Please sign the contract.', exampleUz: 'Iltimos, shartnomani imzolang.' },
      { en: 'strategy', uz: 'strategiya', example: 'Our new strategy is working well.', exampleUz: 'Bizning yangi strategiyamiz yaxshi ishlayapti.' },
      { en: 'profit', uz: 'foyda', example: 'The company made a big profit.', exampleUz: 'Kompaniya katta foyda oldi.' },
      { en: 'invoice', uz: 'hisob-faktura', example: 'Please send the invoice today.', exampleUz: 'Iltimos, hisob-fakturani bugun yuboring.' },
      { en: 'presentation', uz: 'taqdimot', example: 'I have a presentation tomorrow.', exampleUz: 'Ertaga mening taqdimotim bor.' },
      { en: 'resume', uz: 'rezyume', example: 'Send me your resume.', exampleUz: 'Menga rezyumeni yuboring.' },
      { en: 'promotion', uz: 'lavozimni ko\'tarish', example: 'She got a promotion last month.', exampleUz: 'U o\'tgan oy lavozimga ko\'tarildi.' },
      { en: 'teamwork', uz: 'jamoaviy ish', example: 'Teamwork is important for success.', exampleUz: 'Muvaffaqiyat uchun jamoaviy ish muhim.' },
      { en: 'partnership', uz: 'hamkorlik', example: 'We formed a new partnership.', exampleUz: 'Biz yangi hamkorlik tuzdik.' },
      { en: 'reservation', uz: 'band qilish', example: 'I made a reservation for two.', exampleUz: 'Men ikki kishi uchun joy band qildim.' },
      { en: 'guide', uz: 'gid / yo\'lboshchi', example: 'Our guide showed us the old city.', exampleUz: 'Gidimiz bizga eski shaharni ko\'rsatdi.' },
      { en: 'departure', uz: 'jo\'nash', example: 'The departure time changed.', exampleUz: 'Jo\'nash vaqti o\'zgardi.' },
      { en: 'arrival', uz: 'kelish', example: 'The arrival hall was crowded.', exampleUz: 'Kelish zali odam bilan gavjum edi.' },
      { en: 'souvenir', uz: 'sovg\'a / esdalik', example: 'I bought a souvenir for my mom.', exampleUz: 'Men onamga sovg\'a sotib oldim.' },
      { en: 'sightseeing', uz: 'diqqatga sazovor joylarni ko\'rish', example: 'We went sightseeing all day.', exampleUz: 'Biz kun bo\'yi diqqatga sazovor joylarni tomosha qildik.' },
      { en: 'platform', uz: 'platforma', example: 'The train leaves from platform 4.', exampleUz: 'Poyezd 4-platformadan jo\'naydi.' },
      { en: 'delay', uz: 'kechikish', example: 'Our flight had a two-hour delay.', exampleUz: 'Bizning parvozimiz ikki soat kechikdi.' },
      { en: 'embarrassed', uz: 'uyalgan', example: 'He felt embarrassed after the mistake.', exampleUz: 'U xatosidan keyin uyalib qoldi.' },
      { en: 'calm', uz: 'tinch / xotirjam', example: 'Stay calm during the test.', exampleUz: 'Test paytida xotirjam bo\'ling.' },
      { en: 'jealous', uz: 'rashk qiluvchi', example: 'Don\'t be jealous of others.', exampleUz: 'Boshqalarga rashk qilmang.' },
      { en: 'lonely', uz: 'yolg\'iz / sog\'inchli', example: 'He felt lonely in the new city.', exampleUz: 'U yangi shaharda o\'zini yolg\'iz his qildi.' },
      { en: 'relieved', uz: 'yengil tortgan', example: 'I was relieved to hear good news.', exampleUz: 'Yaxshi xabarni eshitib, yengil tortdim.' },
      { en: 'curious', uz: 'qiziqsinuvchan', example: 'Children are very curious.', exampleUz: 'Bolalar juda qiziqsinuvchan bo\'ladi.' },
      { en: 'commute', uz: 'ishga qatnash', example: 'My commute takes 30 minutes.', exampleUz: 'Ishga qatnashim 30 daqiqa vaqt oladi.' },
      { en: 'appointment', uz: 'qabul / uchrashuv', example: 'I have a doctor\'s appointment.', exampleUz: 'Mening shifokorga qabulim bor.' },
      { en: 'household', uz: 'xonadon', example: 'We share household duties.', exampleUz: 'Biz xonadon vazifalarini bo\'lishamiz.' },
      { en: 'errand', uz: 'mayda ish / topshiriq', example: 'I have a few errands to run.', exampleUz: 'Menda bajarishim kerak bo\'lgan bir nechta ishlarim bor.' },
      { en: 'portion', uz: 'qism / ulush', example: 'The portion was very big.', exampleUz: 'Ulush juda katta edi.' },
      { en: 'flavor', uz: 'ta\'m', example: 'This dish has a great flavor.', exampleUz: 'Bu taomning ta\'mi ajoyib.' },
      { en: 'ingredient', uz: 'tarkibiy qism', example: 'Flour is the main ingredient.', exampleUz: 'Un asosiy tarkibiy qism hisoblanadi.' },
      { en: 'recipe', uz: 'retsept', example: 'Can you share your recipe?', exampleUz: 'Retseptingizni ulashib yuborasizmi?' },
      { en: 'sour', uz: 'nordon', example: 'Lemons taste sour.', exampleUz: 'Limonlar nordon ta\'mga ega.' },
      { en: 'leftover', uz: 'qolgan ovqat', example: 'We had leftovers for lunch.', exampleUz: 'Tushlikda qolgan ovqatni yedik.' },
      { en: 'itinerary', uz: 'sayohat rejasi', example: 'Our itinerary includes three cities.', exampleUz: 'Bizning marshrutimiz uchta shaharni o\'z ichiga oladi.' },
      { en: 'baggage claim', uz: 'yuk olish joyi', example: 'Meet me at baggage claim.', exampleUz: 'Yuk olish joyida meni kuting.' },
      { en: 'accommodation', uz: 'turar joy', example: 'The accommodation was very comfortable.', exampleUz: 'Turar joy juda qulay edi.' },
      { en: 'bedtime', uz: 'uxlash vaqti', example: 'My bedtime is at 11 PM.', exampleUz: 'Mening uxlash vaqtim soat 11 da.' },
      { en: 'alarm clock', uz: 'soat uyg\'otgich', example: 'My alarm clock didn\'t ring.', exampleUz: 'Mening uyg\'otgichim jiringlamadi.' },
      { en: 'relax', uz: 'dam olmoq', example: 'I like to relax after work.', exampleUz: 'Ishdan keyin dam olishni yaxshi ko\'raman.' },
      { en: 'frustrated', uz: 'asabiylashgan', example: 'I was frustrated with the traffic.', exampleUz: 'Tirbandlikdan asabim buzildi.' }
    ]
  },
  {
    level: 5,
    title: 'Til ustasi',
    description: 'Murakkabroq fikrlarni ifodalash',
    words: [
      { en: 'opportunity', uz: 'imkoniyat', example: 'This is a great opportunity.', exampleUz: 'Bu ajoyib imkoniyat.' },
      { en: 'experience', uz: 'tajriba', example: 'She has a lot of experience.', exampleUz: 'Uning katta tajribasi bor.' },
      { en: 'achieve', uz: 'erishmoq', example: 'You can achieve your goals.', exampleUz: 'Siz maqsadlaringizga erisha olasiz.' },
      { en: 'revenue', uz: 'daromad', example: 'Revenue increased this quarter.', exampleUz: 'Bu chorakda daromad oshdi.' },
      { en: 'startup', uz: 'startap', example: 'He founded a successful startup.', exampleUz: 'U muvaffaqiyatli startap tashkil qildi.' },
      { en: 'agenda', uz: 'kun tartibi', example: 'Let\'s go through the agenda.', exampleUz: 'Keling, kun tartibini ko\'rib chiqaylik.' },
      { en: 'feedback', uz: 'fikr-mulohaza', example: 'Thank you for your feedback.', exampleUz: 'Fikr-mulohazangiz uchun rahmat.' },
      { en: 'investment', uz: 'investitsiya', example: 'This is a good investment.', exampleUz: 'Bu yaxshi investitsiya.' },
      { en: 'confident', uz: 'ishonchli', example: 'He is confident in his abilities.', exampleUz: 'U o\'z qobiliyatlariga ishonchli.' },
      { en: 'grateful', uz: 'minnatdor', example: 'I am grateful for your support.', exampleUz: 'Yordamingiz uchun minnatdorman.' },
      { en: 'hopeful', uz: 'umidvor', example: 'We are hopeful about the future.', exampleUz: 'Biz kelajakka umid bilan qaraymiz.' },
      { en: 'disappointed', uz: 'ko\'ngli qolgan', example: 'She was disappointed with the result.', exampleUz: 'U natijadan ko\'ngli qolgan edi.' },
      { en: 'decide', uz: 'qaror qilmoq', example: 'We need to decide now.', exampleUz: 'Biz hozir qaror qabul qilishimiz kerak.' },
      { en: 'achievement', uz: 'yutuq', example: 'Graduating was a big achievement.', exampleUz: 'Bitirish katta yutuq edi.' },
      { en: 'challenge', uz: 'qiyinchilik / sinov', example: 'Learning a language is a challenge.', exampleUz: 'Til o\'rganish bu qiyinchilikdir.' },
      { en: 'progress', uz: 'taraqqiyot / o\'sish', example: 'You are making great progress.', exampleUz: 'Siz ajoyib rivojlanish ko\'rsatyapsiz.' },
      { en: 'consistent', uz: 'izchil / barqaror', example: 'Be consistent with your practice.', exampleUz: 'Mashqlaringizda izchil bo\'ling.' },
      { en: 'patience', uz: 'sabr', example: 'Learning takes patience.', exampleUz: 'O\'rganish sabr talab qiladi.' },
      { en: 'motivation', uz: 'rag\'bat', example: 'I lost my motivation for a while.', exampleUz: 'Men bir muddat rag\'batimni yo\'qotdim.' },
      { en: 'discipline', uz: 'intizom', example: 'Discipline helps you reach goals.', exampleUz: 'Intizom maqsadlaringizga erishishga yordam beradi.' },
      { en: 'environment', uz: 'atrof-muhit', example: 'We must protect the environment.', exampleUz: 'Biz atrof-muhitni asrashimiz kerak.' },
      { en: 'community', uz: 'jamoa / hamjamiyat', example: 'Our community is very supportive.', exampleUz: 'Bizning jamoamiz juda hamjihat.' },
      { en: 'responsibility', uz: 'mas\'uliyat', example: 'I take responsibility for my mistakes.', exampleUz: 'Men xatolarim uchun mas\'uliyatni o\'z zimmamga olaman.' },
      { en: 'independent', uz: 'mustaqil', example: 'She is very independent.', exampleUz: 'U juda mustaqil.' },
      { en: 'creative', uz: 'ijodkor', example: 'He has a creative mind.', exampleUz: 'Uning ijodkor fikrlashi bor.' },
      { en: 'efficient', uz: 'samarali', example: 'This method is more efficient.', exampleUz: 'Bu usul yanada samaraliroq.' },
      { en: 'flexible', uz: 'moslashuvchan', example: 'My schedule is flexible.', exampleUz: 'Mening jadvalim moslashuvchan.' },
      { en: 'reliable', uz: 'ishonchli / barqaror', example: 'He is a reliable friend.', exampleUz: 'U ishonchli do\'st.' },
      { en: 'ambitious', uz: 'maqsadli / ambitsiyali', example: 'She is very ambitious.', exampleUz: 'U juda maqsadga intiluvchan.' },
      { en: 'genuine', uz: 'samimiy / haqiqiy', example: 'His apology felt genuine.', exampleUz: 'Uning uzri samimiy tuyuldi.' },
      { en: 'thoughtful', uz: 'andishali / fikrli', example: 'That was a thoughtful gift.', exampleUz: 'Bu andishali sovg\'a edi.' },
      { en: 'generous', uz: 'saxiy', example: 'He is generous with his time.', exampleUz: 'U vaqtida saxiy.' },
      { en: 'humble', uz: 'kamtar', example: 'Despite his success, he stays humble.', exampleUz: 'Muvaffaqiyatiga qaramay, u kamtar bo\'lib qoladi.' },
      { en: 'curiosity', uz: 'qiziqish', example: 'Curiosity drives learning.', exampleUz: 'Qiziqish o\'rganishga undaydi.' },
      { en: 'wisdom', uz: 'donolik', example: 'Age brings wisdom.', exampleUz: 'Yosh donolik olib keladi.' },
      { en: 'gratitude', uz: 'minnatdorchilik', example: 'I keep a gratitude journal.', exampleUz: 'Men minnatdorchilik kundaligini yuritaman.' },
      { en: 'compassion', uz: 'rahmdillik', example: 'Show compassion to others.', exampleUz: 'Boshqalarga rahmdillik ko\'rsating.' },
      { en: 'resilience', uz: 'bardoshlilik', example: 'Resilience helps in tough times.', exampleUz: 'Bardoshlilik og\'ir kunlarda yordam beradi.' },
      { en: 'perspective', uz: 'qarash / nuqtai nazar', example: 'Try to see his perspective.', exampleUz: 'Uning nuqtai nazarini tushunishga harakat qiling.' },
      { en: 'integrity', uz: 'halollik', example: 'She acts with integrity.', exampleUz: 'U halollik bilan ish tutadi.' },
      { en: 'authentic', uz: 'asl / haqiqiy', example: 'Be authentic to yourself.', exampleUz: 'O\'zingizga sodiq bo\'ling.' }
    ]
  }
]

// ─── B1 Levels (6–7) ────────────────────────────────────────────────────────
levels.push(
  {
    level: 6,
    title: 'B1 Boshlang\'ich',
    description: 'B1 darajasi — erkin suhbat sari birinchi qadam',
    words: [
      { en: 'achieve', uz: 'erishmoq', example: 'She achieved her goal.', exampleUz: 'U o\'z maqsadiga erishdi.' },
      { en: 'affect', uz: 'ta\'sir qilmoq', example: 'Stress affects your health.', exampleUz: 'Stress sog\'ligingizga ta\'sir qiladi.' },
      { en: 'afford', uz: 'qo\'lidan kelmoq', example: 'I can\'t afford a new car.', exampleUz: 'Men yangi mashina sotib ololmayman.' },
      { en: 'although', uz: 'garchi ... bo\'lsa ham', example: 'Although it was cold, we went out.', exampleUz: 'Garchi sovuq bo\'lsa ham, biz chiqdik.' },
      { en: 'appear', uz: 'ko\'rinmoq / paydo bo\'lmoq', example: 'She appears confident.', exampleUz: 'U ishonchli ko\'rinadi.' },
      { en: 'argue', uz: 'bahslashmoq', example: 'They argue about money.', exampleUz: 'Ular pul haqida bahslashadi.' },
      { en: 'attempt', uz: 'urinib ko\'rmoq', example: 'He attempted to climb the mountain.', exampleUz: 'U tog\'ga chiqishga urindi.' },
      { en: 'avoid', uz: 'qochmoq / saqlanmoq', example: 'Avoid eating too much sugar.', exampleUz: 'Haddan ko\'p shakar yeyishdan saqlaning.' },
      { en: 'awareness', uz: 'xabardorlik', example: 'Raise awareness about the environment.', exampleUz: 'Atrof-muhit haqida xabardorlikni oshiring.' },
      { en: 'behavior', uz: 'xulq-atvor', example: 'His behavior surprised everyone.', exampleUz: 'Uning xulq-atvori hamma ni ajablantirdi.' },
      { en: 'benefit', uz: 'foyda / manfaat', example: 'Exercise has many benefits.', exampleUz: 'Jismoniy mashqlar ko\'p foyda beradi.' },
      { en: 'career', uz: 'kasb / martaba', example: 'She built a successful career.', exampleUz: 'U muvaffaqiyatli martaba qurdi.' },
      { en: 'challenge', uz: 'qiyinchilik', example: 'This job is a real challenge.', exampleUz: 'Bu ish haqiqiy qiyinchilik.' },
      { en: 'communicate', uz: 'muloqot qilmoq', example: 'We communicate by email.', exampleUz: 'Biz elektron pochta orqali muloqot qilamiz.' },
      { en: 'compare', uz: 'solishtirmoq', example: 'Compare the two options.', exampleUz: 'Ikki variantni solishtiring.' },
      { en: 'complain', uz: 'shikoyat qilmoq', example: 'He always complains about the weather.', exampleUz: 'U doim ob-havo haqida shikoyat qiladi.' },
      { en: 'concentrate', uz: 'diqqat jamlash', example: 'I can\'t concentrate in noise.', exampleUz: 'Men shovqinda diqqatimni jamlayolmayman.' },
      { en: 'consider', uz: 'ko\'rib chiqmoq', example: 'Consider all the options.', exampleUz: 'Barcha variantlarni ko\'rib chiqing.' },
      { en: 'convince', uz: 'ishontirmoq', example: 'She convinced me to stay.', exampleUz: 'U meni qolishga ishontirdi.' },
      { en: 'courage', uz: 'jasorat', example: 'It takes courage to speak up.', exampleUz: 'Gapirish uchun jasorat kerak.' },
      { en: 'curious', uz: 'qiziquvchan', example: 'Children are naturally curious.', exampleUz: 'Bolalar tabiatan qiziquvchan bo\'ladi.' },
      { en: 'damage', uz: 'zarar / shikastlamoq', example: 'The storm damaged the roof.', exampleUz: 'Bo\'ron tomni shikastladi.' },
      { en: 'deal with', uz: 'hal qilmoq / kurashmoq', example: 'She deals with problems calmly.', exampleUz: 'U muammolarni xotirjamlik bilan hal qiladi.' },
      { en: 'despite', uz: 'qaramay', example: 'He ran despite the rain.', exampleUz: 'U yomg\'irga qaramay yugurdi.' },
      { en: 'develop', uz: 'rivojlantirmoq', example: 'We need to develop new skills.', exampleUz: 'Biz yangi ko\'nikmalarni rivojlantirishimiz kerak.' },
      { en: 'disappoint', uz: 'umidini puchga chiqarmoq', example: 'The movie disappointed me.', exampleUz: 'Film meni hafsalasizlantirdi.' },
      { en: 'education', uz: 'ta\'lim', example: 'Education is very important.', exampleUz: 'Ta\'lim juda muhim.' },
      { en: 'encourage', uz: 'rag\'batlantirmoq', example: 'Teachers encourage students.', exampleUz: 'O\'qituvchilar o\'quvchilarni rag\'batlantiradi.' },
      { en: 'experience', uz: 'tajriba / boshdan kechirish', example: 'This experience changed my life.', exampleUz: 'Bu tajriba hayotimni o\'zgartirdi.' },
      { en: 'fail', uz: 'muvaffaqiyatsiz bo\'lmoq', example: 'Don\'t be afraid to fail.', exampleUz: 'Muvaffaqiyatsizlikdan qo\'rqmang.' },
      { en: 'familiar', uz: 'tanish / yaxshi bilgan', example: 'I am familiar with this topic.', exampleUz: 'Men bu mavzu bilan tanishman.' },
      { en: 'fortunately', uz: 'baxtimizga', example: 'Fortunately, no one was hurt.', exampleUz: 'Baxtimizga, hech kim jarohat olmadi.' },
      { en: 'freedom', uz: 'erkinlik', example: 'Freedom of speech is important.', exampleUz: 'So\'z erkinligi muhim.' },
      { en: 'frustrated', uz: 'umidsizlangan', example: 'I feel frustrated when I make mistakes.', exampleUz: 'Xato qilsam, umidsizlanaman.' },
      { en: 'grateful', uz: 'minnatdor', example: 'I am grateful for your help.', exampleUz: 'Yordamingiz uchun minnatdorman.' },
      { en: 'handle', uz: 'uddalash / boshqarish', example: 'She handles stress well.', exampleUz: 'U stressni yaxshi boshqaradi.' },
      { en: 'however', uz: 'ammo / biroq', example: 'However, the plan changed.', exampleUz: 'Biroq, reja o\'zgardi.' },
      { en: 'imagine', uz: 'tasavvur qilmoq', example: 'Imagine living in Paris.', exampleUz: 'Parij da yashashni tasavvur qiling.' },
      { en: 'immediately', uz: 'darhol', example: 'Call me immediately.', exampleUz: 'Menga darhol qo\'ng\'iroq qiling.' },
      { en: 'improve', uz: 'yaxshilamoq', example: 'Practice improves your English.', exampleUz: 'Mashq ingliz tilingizni yaxshilaydi.' },
      { en: 'increase', uz: 'oshirilmoq / o\'sish', example: 'Prices increased last year.', exampleUz: 'O\'tgan yili narxlar oshdi.' },
      { en: 'instead', uz: 'o\'rniga', example: 'Use a bike instead of a car.', exampleUz: 'Mashina o\'rniga velosiped ishlating.' },
      { en: 'issue', uz: 'masala / muammo', example: 'This is a serious issue.', exampleUz: 'Bu jiddiy masala.' },
      { en: 'knowledge', uz: 'bilim', example: 'Knowledge is power.', exampleUz: 'Bilim — kuch.' },
      { en: 'lately', uz: 'so\'nggi paytlarda', example: 'I haven\'t seen him lately.', exampleUz: 'Men uni so\'nggi paytlarda ko\'rmadim.' },
      { en: 'likely', uz: 'ehtimoliy', example: 'It\'s likely to rain tonight.', exampleUz: 'Bugun kechqurun yomg\'ir yog\'ishi ehtimoli bor.' },
      { en: 'manage', uz: 'uddalamoq / boshqarmoq', example: 'She manages a big team.', exampleUz: 'U katta jamoani boshqaradi.' },
      { en: 'mention', uz: 'aytib o\'tmoq', example: 'He mentioned your name.', exampleUz: 'U ismingizni aytdi.' },
      { en: 'moreover', uz: 'bundan tashqari', example: 'Moreover, the price is lower.', exampleUz: 'Bundan tashqari, narx ham pastroq.' },
      { en: 'negative', uz: 'salbiy', example: 'Avoid negative thoughts.', exampleUz: 'Salbiy fikrlardan saqlaning.' },
      { en: 'opportunity', uz: 'imkoniyat', example: 'This is a great opportunity.', exampleUz: 'Bu ajoyib imkoniyat.' }
    ]
  },
  {
    level: 7,
    title: 'B1 Mustahkam',
    description: 'B1 darajasini mustahkamlashtirish',
    words: [
      { en: 'overcome', uz: 'yengib o\'tmoq', example: 'She overcame her fear.', exampleUz: 'U qo\'rquvini yengdi.' },
      { en: 'participate', uz: 'qatnashmoq', example: 'Everyone should participate.', exampleUz: 'Hamma qatnashishi kerak.' },
      { en: 'patient', uz: 'sabr-toqatli', example: 'Be patient, it takes time.', exampleUz: 'Sabr qiling, vaqt kerak.' },
      { en: 'permanent', uz: 'doimiy', example: 'This is not a permanent solution.', exampleUz: 'Bu doimiy yechim emas.' },
      { en: 'personality', uz: 'shaxsiyat', example: 'She has a strong personality.', exampleUz: 'Uning kuchli shaxsiyati bor.' },
      { en: 'prefer', uz: 'afzal ko\'rmoq', example: 'I prefer tea over coffee.', exampleUz: 'Men qahva o\'rniga choy afzal ko\'raman.' },
      { en: 'previous', uz: 'oldingi', example: 'I met him at the previous event.', exampleUz: 'Men uni oldingi tadbirda uchrashgan edim.' },
      { en: 'process', uz: 'jarayon', example: 'Learning is a long process.', exampleUz: 'O\'rganish uzoq jarayon.' },
      { en: 'progress', uz: 'taraqqiyot / o\'sish', example: 'You are making great progress.', exampleUz: 'Siz katta yutuqlarga erishyapsiz.' },
      { en: 'provide', uz: 'ta\'minlamoq', example: 'The school provides free meals.', exampleUz: 'Maktab bepul ovqat beradi.' },
      { en: 'purpose', uz: 'maqsad / niyat', example: 'What is the purpose of this meeting?', exampleUz: 'Bu uchrashuvning maqsadi nima?' },
      { en: 'react', uz: 'munosabat bildirmoq', example: 'How did he react to the news?', exampleUz: 'U yangiliklarni qanday qabul qildi?' },
      { en: 'realistic', uz: 'real / amaliy', example: 'Set realistic goals.', exampleUz: 'Real maqsadlar qo\'ying.' },
      { en: 'refuse', uz: 'rad etmoq', example: 'She refused to answer.', exampleUz: 'U javob berishdan bosh tortdi.' },
      { en: 'relationship', uz: 'munosabat', example: 'They have a good relationship.', exampleUz: 'Ularning yaxshi munosabati bor.' },
      { en: 'relevant', uz: 'tegishli / dolzarb', example: 'Please share relevant information.', exampleUz: 'Iltimos, tegishli ma\'lumot ulashing.' },
      { en: 'responsible', uz: 'mas\'ul', example: 'Be responsible for your actions.', exampleUz: 'Harakatlaringiz uchun mas\'ul bo\'ling.' },
      { en: 'result', uz: 'natija', example: 'The result was better than expected.', exampleUz: 'Natija kutilgandan yaxshiroq chiqdi.' },
      { en: 'situation', uz: 'vaziyat / holat', example: 'The situation is under control.', exampleUz: 'Vaziyat nazorat ostida.' },
      { en: 'solution', uz: 'yechim', example: 'We need a quick solution.', exampleUz: 'Bizga tez yechim kerak.' },
      { en: 'solve', uz: 'hal qilmoq', example: 'Can you solve this problem?', exampleUz: 'Bu muammoni hal qila olasizmi?' },
      { en: 'specific', uz: 'aniq / konkret', example: 'Be specific about your plans.', exampleUz: 'Rejalaringiz haqida aniq bo\'ling.' },
      { en: 'stress', uz: 'stress', example: 'Work stress is common today.', exampleUz: 'Ish stressi bugungi kunda keng tarqalgan.' },
      { en: 'struggle', uz: 'kurashmoq / qiynalib yurmok', example: 'He struggled to find a job.', exampleUz: 'U ish topishda qiynaldi.' },
      { en: 'succeed', uz: 'muvaffaqiyatga erishmoq', example: 'Work hard to succeed.', exampleUz: 'Muvaffaqiyatga erishish uchun qattiq ishlang.' },
      { en: 'support', uz: 'qo\'llab-quvvatlash', example: 'Thank you for your support.', exampleUz: 'Qo\'llab-quvvatlashingiz uchun rahmat.' },
      { en: 'tend to', uz: 'moyil bo\'lmoq', example: 'She tends to be late.', exampleUz: 'U kech qolishga moyil.' },
      { en: 'therefore', uz: 'shuning uchun', example: 'Therefore, we changed the plan.', exampleUz: 'Shuning uchun, rejani o\'zgartirdik.' },
      { en: 'throughout', uz: 'davomida / bo\'yi', example: 'Throughout the year, they worked hard.', exampleUz: 'Yil davomida ular qattiq ishladi.' },
      { en: 'trust', uz: 'ishonch', example: 'Trust is built over time.', exampleUz: 'Ishonch vaqt o\'tishi bilan quriladi.' },
      { en: 'unfortunately', uz: 'afsuski', example: 'Unfortunately, I missed the bus.', exampleUz: 'Afsuski, men avtobusni o\'tkazib yubordim.' },
      { en: 'various', uz: 'turli-xil', example: 'There are various options.', exampleUz: 'Turli-xil variantlar mavjud.' },
      { en: 'willing', uz: 'tayyor / ixtiyoriy', example: 'Are you willing to help?', exampleUz: 'Yordam berishga tayyormisiz?' },
      { en: 'worth', uz: 'qadrli / arziydi', example: 'Is it worth the effort?', exampleUz: 'Bu urinishga arziydimi?' },
      { en: 'approach', uz: 'yondashuv', example: 'Try a different approach.', exampleUz: 'Boshqa yondashuvni sinab ko\'ring.' },
      { en: 'aspect', uz: 'jihat / tomon', example: 'Every aspect matters.', exampleUz: 'Har bir jihat muhim.' },
      { en: 'assume', uz: 'faraz qilmoq', example: 'Don\'t assume anything.', exampleUz: 'Hech narsani faraz qilmang.' },
      { en: 'attitude', uz: 'munosabat / pozitsiya', example: 'A positive attitude helps a lot.', exampleUz: 'Ijobiy munosabat juda yordam beradi.' },
      { en: 'capable', uz: 'qodir / uddalay oladigan', example: 'She is capable of more.', exampleUz: 'U ko\'proq narsaga qodir.' },
      { en: 'contribute', uz: 'hissa qo\'shmoq', example: 'Everyone can contribute.', exampleUz: 'Hamma hissa qo\'sha oladi.' },
      { en: 'current', uz: 'hozirgi / joriy', example: 'What is the current situation?', exampleUz: 'Hozirgi vaziyat qanday?' },
      { en: 'discuss', uz: 'muhokama qilmoq', example: 'Let\'s discuss the plan.', exampleUz: 'Rejani muhokama qilaylik.' },
      { en: 'effect', uz: 'ta\'sir / natija', example: 'The medicine had no effect.', exampleUz: 'Dori ta\'sir qilmadi.' },
      { en: 'essential', uz: 'zarur / asosiy', example: 'Sleep is essential for health.', exampleUz: 'Uyqu sog\'liq uchun zarur.' },
      { en: 'evidence', uz: 'dalil / isbotlar', example: 'There is no evidence of that.', exampleUz: 'Buning hech qanday dalili yo\'q.' },
      { en: 'expand', uz: 'kengaytirmoq', example: 'They want to expand the business.', exampleUz: 'Ular biznesni kengaytirmoqchi.' },
      { en: 'factor', uz: 'omil', example: 'Price is the main factor.', exampleUz: 'Narx asosiy omil.' },
      { en: 'focus', uz: 'e\'tibor qaratmoq', example: 'Focus on what matters most.', exampleUz: 'Eng muhim narsaga e\'tibor qarating.' },
      { en: 'formal', uz: 'rasmiy', example: 'Use formal language in emails.', exampleUz: 'Elektron pochtalarda rasmiy til ishlating.' },
      { en: 'generate', uz: 'hosil qilmoq / ishlab chiqarmoq', example: 'The project will generate income.', exampleUz: 'Loyiha daromad keltiradi.' },
      { en: 'identify', uz: 'aniqlash / tanish', example: 'Identify the problem first.', exampleUz: 'Avval muammoni aniqlang.' }
    ]
  }
)

// ─── B2 Levels (8–10) ───────────────────────────────────────────────────────
levels.push(
  {
    level: 8,
    title: 'B2 Mustaqil',
    description: 'B2 — murakkab mavzularda erkin fikr bildirish',
    words: [
      { en: 'abstract', uz: 'mavhum', example: 'The concept is too abstract.', exampleUz: 'Tushuncha juda mavhum.' },
      { en: 'acknowledge', uz: 'tan olmoq', example: 'He acknowledged his mistake.', exampleUz: 'U xatosini tan oldi.' },
      { en: 'adequate', uz: 'yetarli', example: 'The response was not adequate.', exampleUz: 'Javob yetarli emas edi.' },
      { en: 'advocate', uz: 'himoya qilmoq / targ\'ib qilmoq', example: 'She advocates for equal rights.', exampleUz: 'U teng huquq uchun kurashadi.' },
      { en: 'ambiguous', uz: 'noaniq / ikki ma\'noli', example: 'His answer was ambiguous.', exampleUz: 'Uning javobi noaniq edi.' },
      { en: 'analyze', uz: 'tahlil qilmoq', example: 'We need to analyze the data.', exampleUz: 'Biz ma\'lumotlarni tahlil qilishimiz kerak.' },
      { en: 'anticipate', uz: 'oldindan ko\'rmoq', example: 'We did not anticipate this problem.', exampleUz: 'Biz bu muammoni oldindan ko\'rmadik.' },
      { en: 'appropriate', uz: 'munosib / to\'g\'ri', example: 'Choose appropriate clothing.', exampleUz: 'Munosib kiyim tanlang.' },
      { en: 'assess', uz: 'baholamoq', example: 'Assess the risks before deciding.', exampleUz: 'Qaror qilishdan oldin xavflarni baholang.' },
      { en: 'authorize', uz: 'vakolat bermoq', example: 'Only the manager can authorize this.', exampleUz: 'Buni faqat menejer tasdiqlashi mumkin.' },
      { en: 'bias', uz: 'tarafgirlik / xolislik etishmasligi', example: 'Try to avoid personal bias.', exampleUz: 'Shaxsiy xolislikdan voz kechishga urinmang.' },
      { en: 'clarify', uz: 'aniqlashtirmoq', example: 'Please clarify your question.', exampleUz: 'Iltimos, savolingizni aniqlashtiring.' },
      { en: 'collaborate', uz: 'hamkorlik qilmoq', example: 'Teams must collaborate effectively.', exampleUz: 'Jamoalar samarali hamkorlik qilishi kerak.' },
      { en: 'compelling', uz: 'ishontiruvchi / jozibador', example: 'She made a compelling argument.', exampleUz: 'U ishontiruvchi dalil keltirdi.' },
      { en: 'comprehensive', uz: 'keng qamrovli', example: 'Write a comprehensive report.', exampleUz: 'Keng qamrovli hisobot yozing.' },
      { en: 'concede', uz: 'yon bermoq / tan olmoq', example: 'He conceded that he was wrong.', exampleUz: 'U noto\'g\'ri ekanini tan oldi.' },
      { en: 'consequence', uz: 'oqibat', example: 'Think about the consequences.', exampleUz: 'Oqibatlar haqida o\'ylang.' },
      { en: 'consistent', uz: 'izchil', example: 'Be consistent in your work.', exampleUz: 'Ishingizda izchil bo\'ling.' },
      { en: 'controversial', uz: 'munozarali', example: 'This is a controversial topic.', exampleUz: 'Bu munozarali mavzu.' },
      { en: 'convey', uz: 'yetkazmoq / ifodalmoq', example: 'Words can convey emotions.', exampleUz: 'So\'zlar his-tuyg\'ularni ifodalay oladi.' },
      { en: 'counterpart', uz: 'hamkasb / o\'xshash shaxs', example: 'He met his Russian counterpart.', exampleUz: 'U rus hamkasbi bilan uchrashdi.' },
      { en: 'credible', uz: 'ishonchli / e\'tiborli', example: 'Use credible sources.', exampleUz: 'Ishonchli manbalardan foydalaning.' },
      { en: 'crisis', uz: 'inqiroz', example: 'The country faces an economic crisis.', exampleUz: 'Mamlakat iqtisodiy inqirozga duch kelmoqda.' },
      { en: 'deduce', uz: 'xulosa chiqarmoq', example: 'What can you deduce from this?', exampleUz: 'Bundan qanday xulosa chiqarish mumkin?' },
      { en: 'deliberate', uz: 'ataylab / qasddan', example: 'It was a deliberate choice.', exampleUz: 'Bu ataylab qilingan tanlov edi.' },
      { en: 'demonstrate', uz: 'ko\'rsatmoq / isbotlamoq', example: 'Demonstrate your skills.', exampleUz: 'Ko\'nikmalaringizni ko\'rsating.' },
      { en: 'derive', uz: 'olmoq / kelib chiqmoq', example: 'He derives satisfaction from work.', exampleUz: 'U ishdan qoniqish oladi.' },
      { en: 'dimension', uz: 'o\'lcham / jihati', example: 'Consider every dimension of the issue.', exampleUz: 'Masalaning har bir jihatini ko\'rib chiqing.' },
      { en: 'diverse', uz: 'xilma-xil / turli', example: 'We have a diverse team.', exampleUz: 'Bizda xilma-xil jamoa bor.' },
      { en: 'effective', uz: 'samarali', example: 'Find the most effective method.', exampleUz: 'Eng samarali usulni toping.' },
      { en: 'elaborate', uz: 'batafsil ifodalash', example: 'Please elaborate on your idea.', exampleUz: 'Iltimos, fikringizni batafsil ayting.' },
      { en: 'eliminate', uz: 'bartaraf etmoq', example: 'Eliminate unnecessary steps.', exampleUz: 'Keraksiz qadamlarni bartaraf eting.' },
      { en: 'emerging', uz: 'paydo bo\'layotgan', example: 'AI is an emerging technology.', exampleUz: 'AI paydo bo\'layotgan texnologiyadir.' },
      { en: 'emphasize', uz: 'ta\'kidlamoq', example: 'He emphasized the importance of trust.', exampleUz: 'U ishonchning ahamiyatini ta\'kidladi.' },
      { en: 'enforce', uz: 'amalga oshirmoq / qo\'llash', example: 'The rules must be enforced.', exampleUz: 'Qoidalar amalga oshirilishi kerak.' },
      { en: 'enhance', uz: 'oshirmoq / yaxshilamoq', example: 'This tool enhances productivity.', exampleUz: 'Bu vosita mahsuldorlikni oshiradi.' },
      { en: 'ensure', uz: 'kafolatlamoq', example: 'Ensure the data is correct.', exampleUz: 'Ma\'lumotlar to\'g\'riligini kafolatlang.' },
      { en: 'establish', uz: 'o\'rnatmoq', example: 'Establish clear boundaries.', exampleUz: 'Aniq chegaralar o\'rnating.' },
      { en: 'evaluate', uz: 'baholamoq', example: 'Evaluate the pros and cons.', exampleUz: 'Ijobiy va salbiy tomonlarini baholang.' },
      { en: 'evolve', uz: 'rivojlanmoq / o\'zgarmoq', example: 'Technology evolves rapidly.', exampleUz: 'Texnologiya tez rivojlanadi.' },
      { en: 'exploit', uz: 'foydalanmoq (noto\'g\'ri)', example: 'Don\'t exploit others\' weaknesses.', exampleUz: 'Boshqalarning zaif tomonlarini ishlatmang.' },
      { en: 'explicit', uz: 'ochiq-oydin / aniq', example: 'Give explicit instructions.', exampleUz: 'Aniq ko\'rsatmalar bering.' },
      { en: 'expose', uz: 'fosh etmoq / ta\'sir ostiga olmoq', example: 'Expose children to different cultures.', exampleUz: 'Bolalarni turli madaniyatlarga tanishtiring.' },
      { en: 'extensive', uz: 'keng / ko\'p', example: 'She has extensive experience.', exampleUz: 'Uning keng tajribasi bor.' },
      { en: 'facilitate', uz: 'osonlashtirmoq', example: 'Technology facilitates communication.', exampleUz: 'Texnologiya muloqotni osonlashtiradi.' },
      { en: 'feasible', uz: 'amalga oshirish mumkin', example: 'Is this plan feasible?', exampleUz: 'Bu reja amalga oshiriladimi?' },
      { en: 'flexible', uz: 'moslashuvchan', example: 'Stay flexible in your approach.', exampleUz: 'Yondashuvingizda moslashuvchan bo\'ling.' },
      { en: 'fluctuate', uz: 'tebranmoq / o\'zgarib turmoq', example: 'Prices fluctuate constantly.', exampleUz: 'Narxlar doim o\'zgarib turadi.' },
      { en: 'fundamental', uz: 'asosiy / fundamental', example: 'This is a fundamental right.', exampleUz: 'Bu asosiy huquq.' },
      { en: 'global', uz: 'global / jahon miqyosida', example: 'Climate change is a global problem.', exampleUz: 'Iqlim o\'zgarishi global muammodir.' }
    ]
  },
  {
    level: 9,
    title: 'B2 Mustahkam',
    description: 'Murakkab matinlar va akademik nutq',
    words: [
      { en: 'hypothesis', uz: 'gipoteza', example: 'Test your hypothesis carefully.', exampleUz: 'Gipotezangizni diqqat bilan tekshiring.' },
      { en: 'illustrate', uz: 'ko\'rsatmoq / misollar keltirmoq', example: 'Illustrate your point with data.', exampleUz: 'Fikringizni ma\'lumotlar bilan ko\'rsating.' },
      { en: 'implement', uz: 'joriy etmoq / amalga oshirmoq', example: 'Implement the new policy.', exampleUz: 'Yangi siyosatni joriy eting.' },
      { en: 'implicit', uz: 'yashirin / aniq aytilmagan', example: 'There was an implicit agreement.', exampleUz: 'Yashirin kelishuv bor edi.' },
      { en: 'imply', uz: 'nazarda tutmoq', example: 'What does this data imply?', exampleUz: 'Bu ma\'lumotlar nimani nazarda tutadi?' },
      { en: 'incentive', uz: 'rag\'bat / sababchi', example: 'Bonuses are a strong incentive.', exampleUz: 'Bonuslar kuchli rag\'bat hisoblanadi.' },
      { en: 'incorporate', uz: 'qo\'shmoq / birlashtirmoq', example: 'Incorporate feedback into your work.', exampleUz: 'Fikrlarni ishingizga qo\'shing.' },
      { en: 'indicate', uz: 'ko\'rsatmoq / bildirmoq', example: 'The data indicates growth.', exampleUz: 'Ma\'lumotlar o\'sishni ko\'rsatadi.' },
      { en: 'inevitable', uz: 'muqarrar', example: 'Change is inevitable.', exampleUz: 'O\'zgarish muqarrar.' },
      { en: 'influence', uz: 'ta\'sir / ta\'sir ko\'rsatmoq', example: 'Music can influence your mood.', exampleUz: 'Musiqa kayfiyatingizga ta\'sir qiladi.' },
      { en: 'infrastructure', uz: 'infratuzilma', example: 'Invest in infrastructure.', exampleUz: 'Infratuzilmaga investitsiya qiling.' },
      { en: 'initiate', uz: 'boshlash / tashabbuskor bo\'lmoq', example: 'He initiated the project.', exampleUz: 'U loyihani boshladi.' },
      { en: 'innovative', uz: 'innovatsion', example: 'We need innovative ideas.', exampleUz: 'Bizga innovatsion g\'oyalar kerak.' },
      { en: 'insight', uz: 'tushuncha / chuqur fikr', example: 'She provided valuable insight.', exampleUz: 'U qimmatli tushuncha berdi.' },
      { en: 'integrity', uz: 'halollik / butunlik', example: 'Act with integrity at all times.', exampleUz: 'Har doim halollik bilan ish yuring.' },
      { en: 'justify', uz: 'asoslash / oqlash', example: 'Justify your decision.', exampleUz: 'Qaroringizni asoslang.' },
      { en: 'maintain', uz: 'saqlash / qo\'llab-quvvatlash', example: 'Maintain a healthy lifestyle.', exampleUz: 'Sog\'lom turmush tarzini saqlang.' },
      { en: 'mechanism', uz: 'mexanizm', example: 'Understand the mechanism of change.', exampleUz: 'O\'zgarish mexanizmini tushunib oling.' },
      { en: 'methodology', uz: 'metodologiya', example: 'Explain your research methodology.', exampleUz: 'Tadqiqot metodologiyangizni tushuntiring.' },
      { en: 'minimize', uz: 'kamaytirilmoq / kamaytirish', example: 'Minimize the risk of error.', exampleUz: 'Xato xavfini kamaytiring.' },
      { en: 'modify', uz: 'o\'zgartirmoq', example: 'Modify the design slightly.', exampleUz: 'Dizaynni biroz o\'zgartiring.' },
      { en: 'motivate', uz: 'rag\'batlantirmoq', example: 'What motivates you?', exampleUz: 'Sizni nima rag\'batlantiradi?' },
      { en: 'mutual', uz: 'o\'zaro', example: 'This requires mutual respect.', exampleUz: 'Bu o\'zaro hurmatni talab qiladi.' },
      { en: 'negotiate', uz: 'muzokara qilmoq', example: 'Negotiate the terms carefully.', exampleUz: 'Shartlarni diqqat bilan muzokaralang.' },
      { en: 'neutral', uz: 'betaraf / neytral', example: 'Try to remain neutral.', exampleUz: 'Neytral qolishga harakat qiling.' },
      { en: 'nonetheless', uz: 'shunga qaramay', example: 'Nonetheless, the project succeeded.', exampleUz: 'Shunga qaramay, loyiha muvaffaqiyatli bo\'ldi.' },
      { en: 'objective', uz: 'maqsad / xolis', example: 'State your main objective.', exampleUz: 'Asosiy maqsadingizni ayting.' },
      { en: 'observe', uz: 'kuzatmoq', example: 'Observe how they interact.', exampleUz: 'Ularning o\'zaro munosabatini kuzating.' },
      { en: 'obtain', uz: 'qo\'lga kiritmoq', example: 'How can I obtain permission?', exampleUz: 'Ruxsat qanday olish mumkin?' },
      { en: 'obvious', uz: 'ayon / ravshan', example: 'The answer seems obvious.', exampleUz: 'Javob ravshan ko\'rinadi.' },
      { en: 'ongoing', uz: 'davom etayotgan', example: 'This is an ongoing project.', exampleUz: 'Bu davom etayotgan loyiha.' },
      { en: 'opponent', uz: 'raqib', example: 'Respect your opponent.', exampleUz: 'Raqibingizni hurmat qiling.' },
      { en: 'outcome', uz: 'natija / oqibat', example: 'The outcome was surprising.', exampleUz: 'Natija hayratlanarli edi.' },
      { en: 'overall', uz: 'umuman olganda', example: 'Overall, the project was successful.', exampleUz: 'Umuman olganda, loyiha muvaffaqiyatli bo\'ldi.' },
      { en: 'perceive', uz: 'idrok etmoq', example: 'How do you perceive this change?', exampleUz: 'Siz bu o\'zgarishni qanday idrok qilasiz?' },
      { en: 'persist', uz: 'qat\'iy turmoq / davom etmoq', example: 'Persist despite difficulties.', exampleUz: 'Qiyinchiliklarga qaramay davom eting.' },
      { en: 'phenomenon', uz: 'hodisa / fenomen', example: 'This is a global phenomenon.', exampleUz: 'Bu global hodisa.' },
      { en: 'perspective', uz: 'nuqtai nazar', example: 'Consider different perspectives.', exampleUz: 'Turli nuqtai nazarlarni ko\'rib chiqing.' },
      { en: 'plausible', uz: 'ishonchli / to\'g\'ri bo\'lishi mumkin', example: 'That explanation sounds plausible.', exampleUz: 'Bu tushuntirish mantiqqa to\'g\'ri keladi.' },
      { en: 'potential', uz: 'potentsial', example: 'She has great potential.', exampleUz: 'Uning katta potentsiali bor.' },
      { en: 'precise', uz: 'aniq / to\'liq', example: 'Be precise with your measurements.', exampleUz: 'O\'lchovlaringizda aniq bo\'ling.' },
      { en: 'prevalent', uz: 'keng tarqalgan', example: 'Stress is prevalent in cities.', exampleUz: 'Stress shaharlarda keng tarqalgan.' },
      { en: 'principle', uz: 'tamoyil / qoida', example: 'Stick to your principles.', exampleUz: 'Tamoyillaringizga qat\'iy boring.' },
      { en: 'prioritize', uz: 'ustuvorlik bermoq', example: 'Prioritize your most important tasks.', exampleUz: 'Eng muhim vazifalaringizga ustuvorlik bering.' },
      { en: 'profound', uz: 'chuqur', example: 'He made a profound statement.', exampleUz: 'U chuqur bayonot berdi.' },
      { en: 'promote', uz: 'ilgari surmoq / reklama qilmoq', example: 'Promote healthy habits.', exampleUz: 'Sog\'lom odatlarni ilgari suring.' },
      { en: 'rational', uz: 'mantiqiy / aqlli', example: 'Make rational decisions.', exampleUz: 'Mantiqiy qarorlar qabul qiling.' },
      { en: 'recognize', uz: 'tan olmoq / aniqlash', example: 'Recognize the signs of burnout.', exampleUz: 'Charchash belgilarini aniqlang.' },
      { en: 'reform', uz: 'islohot', example: 'The system needs reform.', exampleUz: 'Tizim islohotga muhtoj.' },
      { en: 'reinforce', uz: 'mustahkamlash', example: 'Reinforce positive behavior.', exampleUz: 'Ijobiy xulqni mustahkamlang.' }
    ]
  },
  {
    level: 10,
    title: 'B2 Yuqori',
    description: 'Akademik va kasbiy B2 darajasi',
    words: [
      { en: 'reluctant', uz: 'istamaslik bilan / tortinchoq', example: 'He was reluctant to share.', exampleUz: 'U ulashishni istamadi.' },
      { en: 'remark', uz: 'izoh / qayd', example: 'She made an insightful remark.', exampleUz: 'U chuqur fikrli izoh bildirdi.' },
      { en: 'represent', uz: 'ifodalash / vakillik qilish', example: 'She represents the company.', exampleUz: 'U kompaniyaga vakillik qiladi.' },
      { en: 'require', uz: 'talab qilmoq', example: 'This job requires patience.', exampleUz: 'Bu ish sabr talab qiladi.' },
      { en: 'research', uz: 'tadqiqot', example: 'Research shows positive results.', exampleUz: 'Tadqiqotlar ijobiy natijalarni ko\'rsatadi.' },
      { en: 'reveal', uz: 'oshkor qilmoq / ko\'rsatmoq', example: 'The report reveals major flaws.', exampleUz: 'Hisobot katta kamchiliklarni oshkor qiladi.' },
      { en: 'rigorous', uz: 'qat\'iy / qiyin', example: 'The training is rigorous.', exampleUz: 'Trening juda qat\'iy.' },
      { en: 'robust', uz: 'kuchli / ishonchli', example: 'Build a robust system.', exampleUz: 'Kuchli tizim qurishni o\'ylab ko\'ring.' },
      { en: 'scope', uz: 'qamrov / ko\'lam', example: 'Define the scope of the project.', exampleUz: 'Loyiha qamrovini belgilang.' },
      { en: 'scrutinize', uz: 'sinchkovlik bilan o\'rganmoq', example: 'Scrutinize every detail.', exampleUz: 'Har bir detalga sinchkov qarang.' },
      { en: 'sequence', uz: 'ketma-ketlik', example: 'Follow the correct sequence.', exampleUz: 'To\'g\'ri ketma-ketlikka rioya qiling.' },
      { en: 'significant', uz: 'muhim / sezilarli', example: 'There is a significant difference.', exampleUz: 'Sezilarli farq mavjud.' },
      { en: 'simultaneously', uz: 'bir vaqtda', example: 'Two events occurred simultaneously.', exampleUz: 'Ikki voqea bir vaqtda sodir bo\'ldi.' },
      { en: 'sophisticated', uz: 'murakkab / rivojlangan', example: 'She uses sophisticated methods.', exampleUz: 'U murakkab usullardan foydalanadi.' },
      { en: 'straightforward', uz: 'oddiy / to\'g\'ridan-to\'g\'ri', example: 'The instructions are straightforward.', exampleUz: 'Ko\'rsatmalar oddiy.' },
      { en: 'subsequent', uz: 'keyingi / undan keyingi', example: 'Subsequent tests confirmed it.', exampleUz: 'Keyingi sinovlar buni tasdiqladi.' },
      { en: 'substantial', uz: 'katta / sezilarli miqdorda', example: 'This is a substantial improvement.', exampleUz: 'Bu katta yaxshilanish.' },
      { en: 'subtle', uz: 'nozik / sezilmas', example: 'There is a subtle difference.', exampleUz: 'Nozik farq mavjud.' },
      { en: 'sufficient', uz: 'yetarli', example: 'Is the evidence sufficient?', exampleUz: 'Dalillar yetarlimi?' },
      { en: 'supplement', uz: 'to\'ldirmoq / qo\'shimcha', example: 'Supplement your diet with vitamins.', exampleUz: 'Ovqatingizni vitaminlar bilan to\'ldiring.' },
      { en: 'sustain', uz: 'davom ettirmoq / saqlamoq', example: 'Sustain your motivation daily.', exampleUz: 'Motivatsiyangizni kunlik saqlang.' },
      { en: 'tension', uz: 'taranglik / zo\'riqish', example: 'There is tension between them.', exampleUz: 'Ular o\'rtasida taranglik bor.' },
      { en: 'terminate', uz: 'tugatmoq / xotima bermoq', example: 'They terminated the contract.', exampleUz: 'Ular shartnomani bekor qildi.' },
      { en: 'threshold', uz: 'chegara / bosqich', example: 'We are at a critical threshold.', exampleUz: 'Biz muhim bosqichda turibmiz.' },
      { en: 'transition', uz: 'o\'tish / o\'tish davri', example: 'The transition to a new system was smooth.', exampleUz: 'Yangi tizimga o\'tish silliq bo\'ldi.' },
      { en: 'transparent', uz: 'shaffof / ochiq', example: 'Be transparent with your team.', exampleUz: 'Jamoangiz bilan ochiq bo\'ling.' },
      { en: 'trigger', uz: 'sabab bo\'lmoq / ishga tushirmoq', example: 'Stress can trigger illness.', exampleUz: 'Stress kasallikka sabab bo\'lishi mumkin.' },
      { en: 'ultimate', uz: 'eng yuqori / nihoyatda', example: 'This is the ultimate challenge.', exampleUz: 'Bu eng katta sinov.' },
      { en: 'underlying', uz: 'asosida yotgan / yashirin', example: 'Address the underlying problem.', exampleUz: 'Asosida yotgan muammoni hal qiling.' },
      { en: 'unique', uz: 'noyob / o\'ziga xos', example: 'Everyone has unique qualities.', exampleUz: 'Har kimning noyob fazilatlari bor.' },
      { en: 'utilize', uz: 'foydalanmoq / qo\'llash', example: 'Utilize all available resources.', exampleUz: 'Mavjud barcha resurslardan foydalaning.' },
      { en: 'valid', uz: 'to\'g\'ri / asosli', example: 'That is a valid argument.', exampleUz: 'Bu asosli dalil.' },
      { en: 'variable', uz: 'o\'zgaruvchi', example: 'The results depend on many variables.', exampleUz: 'Natijalar ko\'p o\'zgaruvchilarga bog\'liq.' },
      { en: 'verify', uz: 'tekshirmoq / tasdiqlash', example: 'Verify the information before sharing.', exampleUz: 'Ulashishdan oldin ma\'lumotni tekshiring.' },
      { en: 'virtually', uz: 'deyarli / amalda', example: 'This is virtually impossible.', exampleUz: 'Bu deyarli imkonsiz.' },
      { en: 'visible', uz: 'ko\'rinadigan / ravshan', example: 'Make your goals visible.', exampleUz: 'Maqsadlaringizni ko\'zga ko\'rinadigan qiling.' },
      { en: 'voluntary', uz: 'ixtiyoriy', example: 'Participation is voluntary.', exampleUz: 'Qatnashish ixtiyoriy.' },
      { en: 'vulnerable', uz: 'zaif / himoyasiz', example: 'Children are the most vulnerable.', exampleUz: 'Bolalar eng zaif hisoblanadi.' },
      { en: 'widespread', uz: 'keng tarqalgan', example: 'Misinformation is widespread online.', exampleUz: 'Yolg\'on ma\'lumot onlaynda keng tarqalgan.' },
      { en: 'yield', uz: 'hosil bermoq / ber', example: 'This approach yields better results.', exampleUz: 'Bu yondashuv yaxshiroq natijalar beradi.' },
      { en: 'accommodate', uz: 'joylashtirmoq / moslashmoq', example: 'We can accommodate your request.', exampleUz: 'Sizning talabingizni qondira olamiz.' },
      { en: 'accumulate', uz: 'to\'planmoq / yig\'moq', example: 'Experience accumulates over time.', exampleUz: 'Tajriba vaqt o\'tishi bilan to\'planadi.' },
      { en: 'accurate', uz: 'aniq / to\'g\'ri', example: 'Give an accurate description.', exampleUz: 'Aniq tavsif bering.' },
      { en: 'adapt', uz: 'moslashtirmoq / moslashmoq', example: 'Adapt to changing situations.', exampleUz: 'O\'zgaruvchan holatga moslashing.' },
      { en: 'adhere', uz: 'rioya qilmoq / qat\'iy amal qilmoq', example: 'Adhere to company policy.', exampleUz: 'Kompaniya siyosatiga rioya qiling.' },
      { en: 'adjacent', uz: 'qo\'shni / yonidagi', example: 'The adjacent room is empty.', exampleUz: 'Qo\'shni xona bo\'sh.' },
      { en: 'aggregate', uz: 'yig\'ma / umumiy', example: 'Look at aggregate data.', exampleUz: 'Yig\'ma ma\'lumotlarga qarang.' },
      { en: 'allocate', uz: 'taqsimlash', example: 'Allocate resources wisely.', exampleUz: 'Resurslarni oqilona taqsimlang.' },
      { en: 'alter', uz: 'o\'zgartirmoq', example: 'We need to alter our strategy.', exampleUz: 'Strategiyamizni o\'zgartirshimiz kerak.' },
      { en: 'ambition', uz: 'ambitsiya / intilish', example: 'Her ambition inspired everyone.', exampleUz: 'Uning ambitsiyasi hamma ni ilhomlantirdi.' }
    ]
  }
)

// ─── C1 Levels (11–14) ──────────────────────────────────────────────────────
levels.push(
  {
    level: 11,
    title: 'C1 Kirishmoq',
    description: 'C1 — murakkab matnlar va nutqni to\'liq tushunish',
    words: [
      { en: 'aberration', uz: 'og\'ish / istisnoi holat', example: 'This result is an aberration.', exampleUz: 'Bu natija istisnoi holat.' },
      { en: 'abstain', uz: 'o\'zini tiymoq', example: 'He abstained from voting.', exampleUz: 'U ovoz berishdan o\'zini tiydi.' },
      { en: 'accentuate', uz: 'ta\'kidlamoq / ajratib ko\'rsatmoq', example: 'This design accentuates the contrast.', exampleUz: 'Bu dizayn kontrastni ajratib ko\'rsatadi.' },
      { en: 'acrimonious', uz: 'o\'tkir / zaharli (bahslar uchun)', example: 'The debate was acrimonious.', exampleUz: 'Bahs juda o\'tkir bo\'ldi.' },
      { en: 'adept', uz: 'mohir / usta', example: 'She is adept at problem-solving.', exampleUz: 'U muammolarni hal qilishda mohir.' },
      { en: 'alleviate', uz: 'yengillashtirmoq', example: 'This medicine alleviates pain.', exampleUz: 'Bu dori og\'riqni yengillashtiradi.' },
      { en: 'ambivalent', uz: 'ikkilanmoq / ikki xil his', example: 'She felt ambivalent about the offer.', exampleUz: 'U taklif haqida ikkilandi.' },
      { en: 'ameliorate', uz: 'yaxshilamoq', example: 'Steps to ameliorate the situation.', exampleUz: 'Vaziyatni yaxshilash uchun chora-tadbirlar.' },
      { en: 'amorphous', uz: 'shaklsiz / aniq bo\'lmagan', example: 'The plan remained amorphous.', exampleUz: 'Reja aniq shaklga kirmadi.' },
      { en: 'anarchic', uz: 'tartibsiz / anarxik', example: 'The scene was anarchic.', exampleUz: 'Sahna tartibsiz edi.' },
      { en: 'anecdotal', uz: 'anekdotik / real bo\'lmagan', example: 'The evidence is anecdotal.', exampleUz: 'Dalil anekdotik xususiyatda.' },
      { en: 'anomaly', uz: 'anomaliya / g\'ayritabiiylik', example: 'Scientists found an anomaly in the data.', exampleUz: 'Olimlar ma\'lumotlarda anomaliya topdi.' },
      { en: 'antagonize', uz: 'dushman qilmoq / g\'azablanmoq', example: 'Don\'t antagonize your colleagues.', exampleUz: 'Hamkasblaringizni g\'azablantirmang.' },
      { en: 'antiquated', uz: 'eskirgan / o\'z zamonini o\'tgan', example: 'This method is antiquated.', exampleUz: 'Bu usul o\'z zamonini o\'tgan.' },
      { en: 'apprehensive', uz: 'xavotirli / qo\'rquvli', example: 'She felt apprehensive before the exam.', exampleUz: 'U imtihondan oldin xavotirlanganini his qildi.' },
      { en: 'arbitrary', uz: 'o\'zboshimchalik bilan', example: 'The decision seemed arbitrary.', exampleUz: 'Qaror o\'zboshimchalik bilan qabul qilingandek tuyuldi.' },
      { en: 'archaic', uz: 'qadimiy / eskirgan', example: 'Some laws are archaic.', exampleUz: 'Ba\'zi qonunlar eskirgan.' },
      { en: 'arduous', uz: 'og\'ir / mashaqqatli', example: 'Climbing the mountain was arduous.', exampleUz: 'Tog\'ga chiqish mashaqqatli edi.' },
      { en: 'articulate', uz: 'aniq ifodalash / nutqi ravshan', example: 'She is a very articulate speaker.', exampleUz: 'U juda ravshan nutq so\'zlaydi.' },
      { en: 'ascertain', uz: 'aniqlamoq / tekshirmoq', example: 'Ascertain the facts first.', exampleUz: 'Avval faktlarni aniqlang.' },
      { en: 'astute', uz: 'ziyrak / aqlli', example: 'She made an astute observation.', exampleUz: 'U ziyrak kuzatuv qildi.' },
      { en: 'attenuate', uz: 'zaiflashmoq / kamaymoq', example: 'Walls attenuate the sound.', exampleUz: 'Devorlar tovushni so\'ndiradi.' },
      { en: 'augment', uz: 'oshirmoq / kuchaytirishmoq', example: 'Augment your income with freelancing.', exampleUz: 'Frilansingiz bilan daromadingizni oshiring.' },
      { en: 'autonomous', uz: 'avtonom / mustaqil', example: 'The region is autonomous.', exampleUz: 'Mintaqa avtonom hisoblanadi.' },
      { en: 'benchmark', uz: 'mezon / taqqoslash o\'lchovi', example: 'Set a benchmark for quality.', exampleUz: 'Sifat uchun mezon o\'rnating.' },
      { en: 'benevolent', uz: 'mehribon / saxiy', example: 'She is a benevolent leader.', exampleUz: 'U mehribon rahbar.' },
      { en: 'candid', uz: 'ochiq-samimiy / rostgo\'y', example: 'Be candid about your concerns.', exampleUz: 'Tashvishlaringiz haqida ochiq bo\'ling.' },
      { en: 'catalyst', uz: 'katalizator / turtki', example: 'Education is a catalyst for change.', exampleUz: 'Ta\'lim o\'zgarish uchun turtki bo\'ladi.' },
      { en: 'circumvent', uz: 'aylanib o\'tmoq / qochmoq', example: 'He tried to circumvent the rules.', exampleUz: 'U qoidalardan qochishga urindi.' },
      { en: 'cogent', uz: 'ishontiruvchi / mantiqli', example: 'She made a cogent argument.', exampleUz: 'U mantiqli dalil keltirdi.' },
      { en: 'coherent', uz: 'izchil / mantiqan bog\'liq', example: 'Present a coherent argument.', exampleUz: 'Izchil dalil keltiring.' },
      { en: 'complacent', uz: 'o\'zidan mamnun / g\'aflatda', example: 'Don\'t become complacent with success.', exampleUz: 'Muvaffaqiyat bilan o\'zingizdan mamnun bo\'lib qolmang.' },
      { en: 'convoluted', uz: 'murakkab / chalkash', example: 'The explanation was too convoluted.', exampleUz: 'Tushuntirish juda murakkab edi.' },
      { en: 'copious', uz: 'mo\'l / ko\'p', example: 'He took copious notes.', exampleUz: 'U ko\'p yozib oldi.' },
      { en: 'corroborate', uz: 'tasdiqlash', example: 'Can you corroborate this claim?', exampleUz: 'Bu da\'voni tasdiqlaya olasizmi?' },
      { en: 'curtail', uz: 'cheklamoq / qisqartirmoq', example: 'We must curtail spending.', exampleUz: 'Xarajatlarni cheklashimiz kerak.' },
      { en: 'cynical', uz: 'siniqman / ishonmovchi', example: 'He is cynical about politics.', exampleUz: 'U siyosatga nisbatan ishonmovchi.' },
      { en: 'daunting', uz: 'qo\'rqinchli / qiyin ko\'rinadigan', example: 'The task seemed daunting at first.', exampleUz: 'Dastlab vazifa qo\'rqinchli tuyuldi.' },
      { en: 'decipher', uz: 'shifrlash ochmoq / tushunmoq', example: 'Can you decipher this code?', exampleUz: 'Bu kodni ochib bera olasizmi?' },
      { en: 'deficient', uz: 'etishmovchi / yetarli emas', example: 'The diet is deficient in vitamins.', exampleUz: 'Parhez vitaminga boy emas.' },
      { en: 'delegate', uz: 'topshirmoq / vakolat bermoq', example: 'Learn to delegate tasks.', exampleUz: 'Vazifalarni topshirishni o\'rganing.' },
      { en: 'detrimental', uz: 'zararli', example: 'Smoking is detrimental to health.', exampleUz: 'Chekish sog\'liqqa zararli.' },
      { en: 'devoid', uz: 'mahrum / bo\'sh', example: 'The room was devoid of furniture.', exampleUz: 'Xona mebelsiz edi.' },
      { en: 'diligent', uz: 'mehnatkash / g\'ayratli', example: 'She is a diligent worker.', exampleUz: 'U mehnatkash xodim.' },
      { en: 'discrepancy', uz: 'tafovut / nomuvofiqlik', example: 'There is a discrepancy in the data.', exampleUz: 'Ma\'lumotlarda tafovut bor.' },
      { en: 'distinctive', uz: 'o\'ziga xos / ajralib turadigan', example: 'Her voice is very distinctive.', exampleUz: 'Uning ovozi juda o\'ziga xos.' },
      { en: 'diverge', uz: 'farqlanmoq / ajralmoq', example: 'Our opinions diverge here.', exampleUz: 'Fikrlarimiz bu yerda farqlanadi.' },
      { en: 'eloquent', uz: 'notiq / ravshan gapiradigan', example: 'He is an eloquent speaker.', exampleUz: 'U ravshan gapiradigan notiq.' },
      { en: 'emulate', uz: 'taqlid qilmoq', example: 'Emulate the best in your field.', exampleUz: 'O\'z sohangizdagi eng yaxshilariga taqlid qiling.' },
      { en: 'enigmatic', uz: 'sirli / jumboqli', example: 'Her smile was enigmatic.', exampleUz: 'Uning tabassumi sirli edi.' }
    ]
  },
  {
    level: 12,
    title: 'C1 Rivojlanish',
    description: 'Akademik yozish va murakkab fikr yuritish',
    words: [
      { en: 'equivocal', uz: 'noaniq / ikki ma\'noli', example: 'His response was equivocal.', exampleUz: 'Uning javobi noaniq edi.' },
      { en: 'eradicate', uz: 'butunlay yo\'q qilmoq', example: 'We must eradicate poverty.', exampleUz: 'Qashshoqlikni butunlay yo\'q qilishimiz kerak.' },
      { en: 'exacerbate', uz: 'yomonlashtirmoq', example: 'Stress exacerbates the condition.', exampleUz: 'Stress holatni yomoni lashtiradi.' },
      { en: 'exemplify', uz: 'namunalik bo\'lmoq / misol keltirmoq', example: 'This project exemplifies creativity.', exampleUz: 'Bu loyiha ijodkorlikni namoyish etadi.' },
      { en: 'exhaustive', uz: 'to\'liq / batafsil', example: 'Conduct an exhaustive review.', exampleUz: 'To\'liq ko\'rib chiqishni amalga oshiring.' },
      { en: 'expedite', uz: 'tezlashtirmoq', example: 'Expedite the approval process.', exampleUz: 'Tasdiqlash jarayonini tezlashtiring.' },
      { en: 'extrapolate', uz: 'ekstrapolyatsiya qilmoq', example: 'Don\'t extrapolate beyond the data.', exampleUz: 'Ma\'lumotlardan uzoqlashib fikr yuritma.' },
      { en: 'facilitate', uz: 'osonlashtirmoq / ko\'maklashmoq', example: 'Technology facilitates communication.', exampleUz: 'Texnologiya muloqotni osonlashtiradi.' },
      { en: 'fallacious', uz: 'yolg\'on / noto\'g\'ri', example: 'That argument is fallacious.', exampleUz: 'Bu dalil noto\'g\'ri.' },
      { en: 'formidable', uz: 'kuchli / og\'ir', example: 'She is a formidable opponent.', exampleUz: 'U kuchli raqib.' },
      { en: 'futile', uz: 'behuda / foydasiz', example: 'Further attempts are futile.', exampleUz: 'Keyingi urinishlar behuda.' },
      { en: 'gregarious', uz: 'ijtimoiy / serdanoz', example: 'He is naturally gregarious.', exampleUz: 'U tabiatan serdanoz.' },
      { en: 'hamper', uz: 'to\'sqinlik qilmoq', example: 'Bad weather hampered the work.', exampleUz: 'Yomon ob-havo ishga to\'sqinlik qildi.' },
      { en: 'hasten', uz: 'tezlashtirmoq', example: 'Don\'t hasten a big decision.', exampleUz: 'Katta qaror qilishda shoshilmang.' },
      { en: 'hinder', uz: 'to\'sqinlik qilmoq', example: 'Lack of funds hinders progress.', exampleUz: 'Mablag\' etishmasligi taraqqiyotga to\'sqinlik qiladi.' },
      { en: 'holistic', uz: 'yaxlit / kompleks', example: 'Take a holistic approach.', exampleUz: 'Kompleks yondashuvni qo\'llang.' },
      { en: 'homogenous', uz: 'bir jinsli', example: 'The group is not homogenous.', exampleUz: 'Guruh bir jinsli emas.' },
      { en: 'hyperbole', uz: 'mubolag\'a / bo\'rttirib ko\'rsatish', example: 'That statement is pure hyperbole.', exampleUz: 'Bu bayonot sof mubolag\'a.' },
      { en: 'immutable', uz: 'o\'zgarmas', example: 'Some truths are immutable.', exampleUz: 'Ba\'zi haqiqatlar o\'zgarmasdir.' },
      { en: 'imperceptible', uz: 'sezilmas', example: 'The change was imperceptible.', exampleUz: 'O\'zgarish sezilmas edi.' },
      { en: 'impinge', uz: 'ta\'sir qilmoq / bostirib kirmoq', example: 'Don\'t let fear impinge on decisions.', exampleUz: 'Qo\'rquvni qarorlaringizga ta\'sir qildirmang.' },
      { en: 'inadvertently', uz: 'bexosdan / bilmay', example: 'She inadvertently revealed the secret.', exampleUz: 'U sirni bexosdan fosh qildi.' },
      { en: 'incessant', uz: 'to\'xtovsiz', example: 'The incessant noise was unbearable.', exampleUz: 'To\'xtovsiz shovqin chidab bo\'lmas edi.' },
      { en: 'incognito', uz: 'yashirin / nomsiz', example: 'She traveled incognito.', exampleUz: 'U yashirin holda sayohat qildi.' },
      { en: 'incontrovertible', uz: 'bahssiz / inkor etib bo\'lmaydigan', example: 'The evidence is incontrovertible.', exampleUz: 'Dalillar bahssiz.' },
      { en: 'indiscriminate', uz: 'tanlamay / beparvo', example: 'Indiscriminate use of antibiotics is harmful.', exampleUz: 'Antibiotikni tanlamay ishlatish zararli.' },
      { en: 'inefficacious', uz: 'samarasiz', example: 'The remedy proved inefficacious.', exampleUz: 'Davo samarasiz chiqdi.' },
      { en: 'inherent', uz: 'tabiiy / ichki', example: 'There are inherent risks in this.', exampleUz: 'Bunda ichki xavflar mavjud.' },
      { en: 'intermittent', uz: 'vaqti-vaqti bilan / uzuq-yuluq', example: 'There were intermittent power cuts.', exampleUz: 'Elektr toki vaqti-vaqti bilan o\'chdi.' },
      { en: 'intricate', uz: 'murakkab / chigal', example: 'The design is very intricate.', exampleUz: 'Dizayn juda murakkab.' },
      { en: 'invoke', uz: 'murojaat qilmoq', example: 'She invoked her right to remain silent.', exampleUz: 'U jim qolish huquqiga murojaat qildi.' },
      { en: 'jeopardize', uz: 'xavf ostiga qo\'ymoq', example: 'Don\'t jeopardize your career.', exampleUz: 'Martabangizni xavf ostiga qo\'ymang.' },
      { en: 'laborious', uz: 'og\'ir / mashaqqatli', example: 'It was a laborious process.', exampleUz: 'Bu mashaqqatli jarayon edi.' },
      { en: 'latent', uz: 'yashirin / uyqudagi', example: 'She has latent talent.', exampleUz: 'Unda yashirin iste\'dod bor.' },
      { en: 'legitimate', uz: 'qonuniy / asosli', example: 'That is a legitimate concern.', exampleUz: 'Bu asosli tashvish.' },
      { en: 'lucid', uz: 'ravshan / aniq', example: 'Give a lucid explanation.', exampleUz: 'Aniq tushuntirish bering.' },
      { en: 'meticulous', uz: 'puxta / batafsil', example: 'She is a meticulous planner.', exampleUz: 'U puxta rejalashtiruvchi.' },
      { en: 'mitigate', uz: 'yumshatmoq / kamaytirishmoq', example: 'Mitigate the risks early.', exampleUz: 'Xavflarni erta kamaytirishga harakat qiling.' },
      { en: 'mundane', uz: 'oddiy / zerikarli', example: 'The work is mostly mundane.', exampleUz: 'Ish ko\'pincha zerikarli.' },
      { en: 'negate', uz: 'inkor qilmoq', example: 'One mistake can negate all progress.', exampleUz: 'Bitta xato barcha taraqqiyotni inkor qilishi mumkin.' },
      { en: 'negligible', uz: 'ahamiyatsiz / juda kichik', example: 'The difference is negligible.', exampleUz: 'Farq ahamiyatsiz.' },
      { en: 'nuanced', uz: 'nozik farqlarga ega', example: 'The analysis was nuanced.', exampleUz: 'Tahlil nozik farqlarga ega edi.' },
      { en: 'obscure', uz: 'noma\'lum / tushunib bo\'lmaydigan', example: 'The text is obscure and difficult.', exampleUz: 'Matn noma\'lum va qiyin.' },
      { en: 'obsolete', uz: 'eskirgan / foydasiz', example: 'This technology is obsolete.', exampleUz: 'Bu texnologiya eskirgan.' },
      { en: 'omnipresent', uz: 'hamma joyda mavjud', example: 'Social media is omnipresent today.', exampleUz: 'Ijtimoiy tarmoqlar bugun hamma joyda.' },
      { en: 'oppressive', uz: 'zulmkorona / og\'ir', example: 'The heat was oppressive.', exampleUz: 'Issiq og\'ir edi.' },
      { en: 'paradox', uz: 'qarama-qarshilik / paradoks', example: 'That statement is a paradox.', exampleUz: 'Bu bayonot paradoks.' },
      { en: 'paraphrase', uz: 'boshqacha ifodalash', example: 'Can you paraphrase that?', exampleUz: 'Buni boshqacha ifodalay olasizmi?' },
      { en: 'partisan', uz: 'tarafkash / guruhchi', example: 'Avoid partisan views.', exampleUz: 'Tarafkash qarashlarden saqlaning.' },
      { en: 'penchant', uz: 'moyillik / qiziqish', example: 'He has a penchant for drama.', exampleUz: 'Uning dramaga moyilligi bor.' }
    ]
  },
  {
    level: 13,
    title: 'C1 Kuchli',
    description: 'Keng adabiy va ilmiy leksika',
    words: [
      { en: 'pervasive', uz: 'keng tarqalgan / hamma joyda bor', example: 'The influence of social media is pervasive.', exampleUz: 'Ijtimoiy tarmoqlarning ta\'siri hamma joyda seziladi.' },
      { en: 'polarize', uz: 'qutblashtirmoq', example: 'The debate polarized the community.', exampleUz: 'Bahs hamjamiyatni ikki qutbga ajratdi.' },
      { en: 'pragmatic', uz: 'amaliy / pragmatik', example: 'Take a pragmatic approach.', exampleUz: 'Amaliy yondashuvni qo\'llang.' },
      { en: 'precipitate', uz: 'shoshiltirib yubormoq / sabab bo\'lmoq', example: 'His words precipitated the crisis.', exampleUz: 'Uning so\'zlari inqirozga sabab bo\'ldi.' },
      { en: 'predominant', uz: 'ustun / asosiy', example: 'English is the predominant language.', exampleUz: 'Ingliz tili ustun til hisoblanadi.' },
      { en: 'premise', uz: 'asos / taxmin', example: 'The argument rests on a false premise.', exampleUz: 'Dalil noto\'g\'ri asosga tayanadi.' },
      { en: 'prolific', uz: 'unumdor / ko\'p asarlar yaratgan', example: 'She is a prolific writer.', exampleUz: 'U juda ko\'p asarlar yozgan yozuvchi.' },
      { en: 'proponent', uz: 'tarafdor / himoyachi', example: 'He is a proponent of free speech.', exampleUz: 'U so\'z erkinligining tarafdori.' },
      { en: 'prosper', uz: 'gullab-yashnash', example: 'Business will prosper with hard work.', exampleUz: 'Biznes mehnat bilan gullab yashnaydi.' },
      { en: 'provocative', uz: 'qo\'zg\'atuvchi / provokatsion', example: 'She made a provocative statement.', exampleUz: 'U provokatsion bayonot berdi.' },
      { en: 'prudent', uz: 'ehtiyotkor / aqlli', example: 'It would be prudent to save money.', exampleUz: 'Pul tejash oqilona bo\'lar edi.' },
      { en: 'quest', uz: 'izlash / topmoq uchun harakat', example: 'The quest for knowledge never ends.', exampleUz: 'Bilimni izlash hech qachon tugamaydi.' },
      { en: 'ramification', uz: 'oqibat / shoxlanish', example: 'Consider the ramifications of this.', exampleUz: 'Buning oqibatlarini ko\'rib chiqing.' },
      { en: 'rampant', uz: 'nazorat ostidan chiqib ketgan', example: 'Corruption is rampant.', exampleUz: 'Korrupsiya nazorat ostidan chiqib ketgan.' },
      { en: 'rationalize', uz: 'oqlamoq / izohlash', example: 'Don\'t rationalize bad decisions.', exampleUz: 'Yomon qarorlarni oqlashga urinmang.' },
      { en: 'rebuke', uz: 'tanbeh bermoq / qoralamok', example: 'He was publicly rebuked.', exampleUz: 'U ommaviy tanbeh oldi.' },
      { en: 'reconcile', uz: 'yarashmok / muvofiqlashmoq', example: 'Can you reconcile these views?', exampleUz: 'Bu qarashlrni muvofiqlashtira olasizmi?' },
      { en: 'rectify', uz: 'to\'g\'rilamoq / isloh qilmoq', example: 'Rectify the error immediately.', exampleUz: 'Xatoni darhol to\'g\'rilang.' },
      { en: 'redundant', uz: 'ortiqcha / kerak emas', example: 'Some steps were redundant.', exampleUz: 'Ba\'zi qadamlar ortiqcha edi.' },
      { en: 'refute', uz: 'rad qilmoq / inkor etmoq', example: 'She refuted every argument.', exampleUz: 'U har bir dalilni rad qildi.' },
      { en: 'relentless', uz: 'to\'xtovsiz / shafqatsiz', example: 'She is relentless in her pursuit.', exampleUz: 'U maqsadi sari to\'xtovsiz intiladi.' },
      { en: 'repercussion', uz: 'oqibat / ta\'sir', example: 'The decision had serious repercussions.', exampleUz: 'Qaror jiddiy oqibatlarga olib keldi.' },
      { en: 'reticent', uz: 'jim / kamgap', example: 'He is reticent about his past.', exampleUz: 'U o\'tmishi haqida kamgap.' },
      { en: 'rhetoric', uz: 'ritorika / niqoblangan nutq', example: 'His speech was full of rhetoric.', exampleUz: 'Uning nutqi ritorikaga to\'la edi.' },
      { en: 'rudimentary', uz: 'asosiy / oddiy', example: 'I have only rudimentary skills.', exampleUz: 'Menda faqat asosiy ko\'nikmalar bor.' },
      { en: 'sanction', uz: 'sanksiya / jazolash', example: 'The country faces sanctions.', exampleUz: 'Mamlakat sanksiyalarga duch kelmoqda.' },
      { en: 'scathing', uz: 'o\'tkir / keskin tanqidiy', example: 'She gave a scathing review.', exampleUz: 'U keskin tanqidiy baho berdi.' },
      { en: 'skeptical', uz: 'shubhali / ishonqiramovchi', example: 'I am skeptical about this claim.', exampleUz: 'Men bu da\'voga shubha bilan qarayman.' },
      { en: 'solicit', uz: 'so\'ramoq / yig\'moq', example: 'Solicit feedback from users.', exampleUz: 'Foydalanuvchilardan fikr-mulohaza so\'rang.' },
      { en: 'speculative', uz: 'taxminiy / mulohazali', example: 'This is purely speculative.', exampleUz: 'Bu sof taxmin.' },
      { en: 'sporadic', uz: 'vaqti-vaqti / tartibsiz', example: 'Attendance was sporadic.', exampleUz: 'Qatnashish tartibsiz edi.' },
      { en: 'stark', uz: 'keskin / aniq', example: 'There is a stark difference.', exampleUz: 'Keskin farq mavjud.' },
      { en: 'steadfast', uz: 'qat\'iyatli / barqaror', example: 'She remained steadfast in her beliefs.', exampleUz: 'U e\'tiqodida barqaror qoldi.' },
      { en: 'stringent', uz: 'qat\'iy / og\'ir', example: 'The rules are very stringent.', exampleUz: 'Qoidalar juda qat\'iy.' },
      { en: 'subjugate', uz: 'bo\'ysundirmoq', example: 'They refused to be subjugated.', exampleUz: 'Ular bo\'ysunishdan bosh tortdi.' },
      { en: 'superficial', uz: 'yuzaki / sirt', example: 'The analysis was superficial.', exampleUz: 'Tahlil yuzaki edi.' },
      { en: 'superfluous', uz: 'ortiqcha / kerak emas', example: 'Remove superfluous information.', exampleUz: 'Ortiqcha ma\'lumotlarni olib tashlang.' },
      { en: 'susceptible', uz: 'moyil / zaif', example: 'Children are more susceptible to illness.', exampleUz: 'Bolalar kasallikka ko\'proq moyil.' },
      { en: 'swift', uz: 'tez / zudlik bilan', example: 'Take swift action.', exampleUz: 'Tezda harakat qiling.' },
      { en: 'tacit', uz: 'yashirin / ochiq aytilmagan', example: 'There was a tacit agreement.', exampleUz: 'Yashirin kelishuv bor edi.' },
      { en: 'tangible', uz: 'moddiy / real ko\'rinadigan', example: 'Show tangible results.', exampleUz: 'Real natijalar ko\'rsating.' },
      { en: 'tenuous', uz: 'zaif / ishonchsiz', example: 'The link between them is tenuous.', exampleUz: 'Ular orasidagi bog\'liqlik zaif.' },
      { en: 'thorough', uz: 'to\'liq / puxta', example: 'Conduct a thorough investigation.', exampleUz: 'Puxta tekshiruv o\'tkazing.' },
      { en: 'transient', uz: 'o\'tkinchi / muvaqqat', example: 'Happiness can be transient.', exampleUz: 'Baxt o\'tkinchi bo\'lishi mumkin.' },
      { en: 'tumultuous', uz: 'g\'alayon / hayajonli', example: 'It was a tumultuous time.', exampleUz: 'Bu g\'alayon vaqti edi.' },
      { en: 'ubiquitous', uz: 'hamma joyda mavjud', example: 'Smartphones are ubiquitous.', exampleUz: 'Smartfonlar hamma joyda.' },
      { en: 'unilateral', uz: 'bir tomonlama', example: 'The decision was unilateral.', exampleUz: 'Qaror bir tomonlama edi.' },
      { en: 'unprecedented', uz: 'misli ko\'rilmagan', example: 'The growth was unprecedented.', exampleUz: 'O\'sish misli ko\'rilmagan edi.' },
      { en: 'unwieldy', uz: 'og\'ir / boshqarish qiyin', example: 'The system became unwieldy.', exampleUz: 'Tizim boshqarib bo\'lmaydigan bo\'lib qoldi.' },
      { en: 'vague', uz: 'noaniq / loyqa', example: 'The instructions were vague.', exampleUz: 'Ko\'rsatmalar noaniq edi.' }
    ]
  },
  {
    level: 14,
    title: 'C1 Mukammal',
    description: 'Eng yuqori akademik va ilmiy leksika',
    words: [
      { en: 'venerate', uz: 'hurmat qilmoq', example: 'They venerate their ancestors.', exampleUz: 'Ular ajdodlarini ulug\'laydi.' },
      { en: 'verbose', uz: 'so\'zga usta / ko\'p so\'zli', example: 'His writing is verbose.', exampleUz: 'Uning yozuvi ortiqcha so\'zlar bilan to\'lgan.' },
      { en: 'viable', uz: 'amalga oshiriladigan / maqbul', example: 'Is this a viable solution?', exampleUz: 'Bu maqbul yechimmi?' },
      { en: 'vigilant', uz: 'hushyor / sergak', example: 'Stay vigilant online.', exampleUz: 'Onlaynda hushyor bo\'ling.' },
      { en: 'visceral', uz: 'ichki / hissiy', example: 'She had a visceral reaction.', exampleUz: 'Uning hissiy reaktsiyasi bo\'ldi.' },
      { en: 'vitriolic', uz: 'zaharli / o\'tkir tanqid', example: 'The review was vitriolic.', exampleUz: 'Sharh zaharli edi.' },
      { en: 'wary', uz: 'ehtiyotkor / ogohlantirilgan', example: 'Be wary of false promises.', exampleUz: 'Yolg\'on va\'dalardan ehtiyot bo\'ling.' },
      { en: 'zealous', uz: 'g\'ayratli / ishtiyoqmand', example: 'She is a zealous advocate.', exampleUz: 'U g\'ayratli himoyachi.' },
      { en: 'abridge', uz: 'qisqartirmoq', example: 'The book was abridged for students.', exampleUz: 'Kitob talabalar uchun qisqartirildi.' },
      { en: 'acquiesce', uz: 'rozi bo\'lmoq / qabul qilmoq', example: 'He acquiesced to the demands.', exampleUz: 'U talablarga rozi bo\'ldi.' },
      { en: 'acrimonious', uz: 'achchiq / zaharli', example: 'The acrimonious split divided the team.', exampleUz: 'Achchiq ajralish jamoani bo\'ldi.' },
      { en: 'admonish', uz: 'ogohlantirishmoq / tanbeh bermoq', example: 'She admonished him gently.', exampleUz: 'U uni muloyimlik bilan tanbeh berdi.' },
      { en: 'affable', uz: 'ochiq-ko\'ngil / muomalakor', example: 'He is an affable host.', exampleUz: 'U muomalakor mezbon.' },
      { en: 'alacrity', uz: 'shiddat / ishtiyoq', example: 'She accepted with alacrity.', exampleUz: 'U ishtiyoq bilan qabul qildi.' },
      { en: 'ameliorate', uz: 'yaxshilashtirmoq', example: 'Efforts to ameliorate poverty.', exampleUz: 'Qashshoqlikni yaxshilash sa\'y-harakatlari.' },
      { en: 'annihilate', uz: 'butunlay yo\'q qilmoq', example: 'They annihilated the competition.', exampleUz: 'Ular raqobatni butunlay yo\'q qildi.' },
      { en: 'antithesis', uz: 'qarama-qarshilik / antitezis', example: 'This is the antithesis of justice.', exampleUz: 'Bu adolatning qarama-qarshisi.' },
      { en: 'approbation', uz: 'ma\'qullash / tasdiqlash', example: 'She sought her teacher\'s approbation.', exampleUz: 'U o\'qituvchisining tasdiqlashini so\'radi.' },
      { en: 'arcane', uz: 'sirli / maxfiy', example: 'The ritual had arcane significance.', exampleUz: 'Marosimning sirli ma\'nosi bor edi.' },
      { en: 'articulate', uz: 'ravshan ifodalash', example: 'Articulate your thoughts clearly.', exampleUz: 'Fikrlaringizni aniq ifodalang.' },
      { en: 'austerity', uz: 'qat\'iy tejamkorlik', example: 'Years of austerity affected the country.', exampleUz: 'Yillar davomida tejamkorlik mamlakatga ta\'sir qildi.' },
      { en: 'axiom', uz: 'aksioma / inkor qilib bo\'lmaydigan haqiqat', example: 'This is a fundamental axiom.', exampleUz: 'Bu asosiy aksioma.' },
      { en: 'beguile', uz: 'aldamoq / o\'z bag\'riga tortmoq', example: 'Don\'t be beguiled by appearances.', exampleUz: 'Tashqi ko\'rinish bilan aldanmang.' },
      { en: 'belabor', uz: 'haddan tashqari so\'z ko\'paytirmoq', example: 'Don\'t belabor the point.', exampleUz: 'Fikrni haddan tashqari so\'zlashdan saqlaning.' },
      { en: 'bellicose', uz: 'jangari / mojarochil', example: 'His tone was bellicose.', exampleUz: 'Uning ohangida jangarilik bor edi.' },
      { en: 'bemoan', uz: 'hayfsalamoq / afsuslanmoq', example: 'He bemoaned the lack of support.', exampleUz: 'U qo\'llab-quvvatlash yo\'qligidan afsuslandi.' },
      { en: 'bewildering', uz: 'chalg\'ituvchi / shoshirtiruvchi', example: 'The choice is bewildering.', exampleUz: 'Tanlov chalg\'ituvchi.' },
      { en: 'burgeon', uz: 'o\'sib-rivojlanmoq', example: 'The industry is burgeoning.', exampleUz: 'Sanoat rivojlanib bormoqda.' },
      { en: 'cajole', uz: 'yopishqoq iltimos qilmoq', example: 'He cajoled her into agreeing.', exampleUz: 'U uni rozilikka ko\'ndirib oldi.' },
      { en: 'callous', uz: 'sovuqqon / berahm', example: 'His callous attitude shocked everyone.', exampleUz: 'Uning berahm munosabati hamma ni larzaga keltirdi.' },
      { en: 'capitulate', uz: 'taslim bo\'lmoq', example: 'They refused to capitulate.', exampleUz: 'Ular taslim bo\'lishdan bosh tortdi.' },
      { en: 'carve out', uz: 'o\'rnini topmoq', example: 'She carved out a niche for herself.', exampleUz: 'U o\'ziga munosib o\'rin topdi.' },
      { en: 'castigate', uz: 'qattiq tanqid qilmoq', example: 'The press castigated the decision.', exampleUz: 'Matbuot qarorni qattiq tanqid qildi.' },
      { en: 'caustic', uz: 'o\'tkir / achishtiruvchi', example: 'He made a caustic remark.', exampleUz: 'U o\'tkir izoh bildirdi.' },
      { en: 'cerebral', uz: 'aqliy / fikrga asoslangan', example: 'He is a very cerebral person.', exampleUz: 'U juda aqlli odam.' },
      { en: 'chicanery', uz: 'aldov / firib', example: 'Legal chicanery delayed justice.', exampleUz: 'Huquqiy firib adolatni kechiktirdi.' },
      { en: 'circumspect', uz: 'ehtiyotkor / mulohazali', example: 'Be circumspect in your dealings.', exampleUz: 'Muomalalarda ehtiyotkor bo\'ling.' },
      { en: 'clandestine', uz: 'yashirin / maxfiy', example: 'They held clandestine meetings.', exampleUz: 'Ular yashirin uchrashuvlar o\'tkazdi.' },
      { en: 'coerce', uz: 'majbur qilmoq', example: 'He was coerced into signing.', exampleUz: 'Uni imzolashga majbur qildi.' },
      { en: 'confound', uz: 'chalg\'itmoq / hayratga solmoq', example: 'The results confounded experts.', exampleUz: 'Natijalar ekspertlarni hayratga soltdi.' },
      { en: 'consummate', uz: 'mukammal / eng yuqori darajadagi', example: 'She is a consummate professional.', exampleUz: 'U mukammal mutaxassis.' },
      { en: 'contentious', uz: 'munozarali / bahsli', example: 'This is a contentious issue.', exampleUz: 'Bu munozarali masala.' },
      { en: 'contrite', uz: 'pushaymon / tavbakor', example: 'He seemed genuinely contrite.', exampleUz: 'U haqiqatan ham pushaymon ko\'rindi.' },
      { en: 'coruscating', uz: 'porloq / bo\'rttiruvchi', example: 'She gave a coruscating performance.', exampleUz: 'U ajoyib ijro ko\'rsatdi.' },
      { en: 'countenance', uz: 'chehraviy ifoda / toqat qilmoq', example: 'He would not countenance dishonesty.', exampleUz: 'U nomustahkamlikka toqat qilmadi.' },
      { en: 'culpable', uz: 'aybdor', example: 'He was found culpable.', exampleUz: 'U aybdor deb topildi.' },
      { en: 'curtail', uz: 'qisqartirmoq / cheklamoq', example: 'Budget cuts curtailed services.', exampleUz: 'Byudjet qisqarishi xizmatlarni chekladi.' },
      { en: 'debilitating', uz: 'zaiflashtiruvchi', example: 'The illness was debilitating.', exampleUz: 'Kasallik zaiflashtiruvchi edi.' },
      { en: 'decimate', uz: 'jiddiy zarar yetkazmoq', example: 'The disease decimated the population.', exampleUz: 'Kasallik aholini qirib tashladi.' },
      { en: 'decree', uz: 'farmon / buyruq', example: 'The government issued a decree.', exampleUz: 'Hukumat farmon chiqardi.' }
    ]
  },
  {
    level: 15,
    title: 'C2 Ustoz darajasi',
    description: 'Ona tilida so\'zlashuvchi darajasidagi nozik va nodir so\'zlar',
    words: [
      { en: 'ubiquitous', uz: 'hamma joyda uchraydigan', example: 'Smartphones are ubiquitous nowadays.', exampleUz: 'Hozirda smartfonlar hamma joyda uchraydi.' },
      { en: 'pernicious', uz: 'zararli / halokatli', example: 'Gossip can have a pernicious effect.', exampleUz: "G'iybat halokatli ta'sir ko'rsatishi mumkin." },
      { en: 'ephemeral', uz: 'qisqa muddatli / o\'tkinchi', example: 'Fame can be ephemeral.', exampleUz: "Shuhrat o'tkinchi bo'lishi mumkin." },
      { en: 'sycophant', uz: 'xushomadgo\'y', example: 'He was surrounded by sycophants.', exampleUz: "U xushomadgo'ylar bilan o'ralgan edi." },
      { en: 'obfuscate', uz: 'chalkashtirmoq / xiralashtirmoq', example: 'The report seemed to obfuscate the facts.', exampleUz: 'Hisobot faktlarni chalkashtirib yuborgandek edi.' },
      { en: 'magnanimous', uz: 'saxovatli / oliyjanob', example: 'She was magnanimous in victory.', exampleUz: "U g'alabada oliyjanob edi." },
      { en: 'inexorable', uz: 'to\'xtatib bo\'lmaydigan', example: 'The inexorable rise of technology.', exampleUz: "Texnologiyaning to'xtatib bo'lmas o'sishi." },
      { en: 'quintessential', uz: 'eng mukammal namuna', example: 'He is the quintessential gentleman.', exampleUz: 'U jentlmenning eng mukammal namunasi.' },
      { en: 'surreptitious', uz: 'yashirin / pinhona', example: 'He took a surreptitious glance at his phone.', exampleUz: "U telefoniga pinhona qaradi." },
      { en: 'ostentatious', uz: 'ko\'zga tashlanadigan / dabdabali', example: 'Their wedding was quite ostentatious.', exampleUz: "Ularning to'yi juda dabdabali edi." },
      { en: 'perfunctory', uz: 'yuzaki / rasmiyatchilik uchun', example: 'He gave a perfunctory apology.', exampleUz: 'U yuzaki uzr so\'radi.' },
      { en: 'equanimity', uz: 'sokinlik / xotirjamlik', example: 'She faced the crisis with equanimity.', exampleUz: 'U inqirozga xotirjamlik bilan yuzlandi.' },
      { en: 'vicarious', uz: 'boshqa birov orqali his qilingan', example: 'He felt vicarious pride in his son\'s success.', exampleUz: "U o'g'lining muvaffaqiyatidan g'urur his qildi." },
      { en: 'insidious', uz: 'sekin-asta zarar keltiruvchi', example: 'It is an insidious disease.', exampleUz: 'Bu sekin-asta zarar keltiruvchi kasallik.' },
      { en: 'fastidious', uz: 'nihoyatda talabchan / mayda-chuyda', example: 'He is fastidious about cleanliness.', exampleUz: 'U tozalik borasida nihoyatda talabchan.' },
      { en: 'ineffable', uz: 'so\'z bilan ifodalab bo\'lmaydigan', example: 'She felt an ineffable joy.', exampleUz: "U so'z bilan ifodalab bo'lmas xursandchilik his qildi." },
      { en: 'obstinate', uz: 'qaysar / o\'jar', example: 'He is too obstinate to change his mind.', exampleUz: "U fikrini o'zgartirish uchun juda qaysar." },
      { en: 'penchant', uz: 'moyillik / ishtiyoq', example: 'She has a penchant for drama.', exampleUz: 'Uning dramaga moyilligi bor.' },
      { en: 'quandary', uz: 'ikkilanish holati', example: 'I am in a quandary about what to do.', exampleUz: "Men nima qilishni bilmay ikkilanmoqdaman." },
      { en: 'recalcitrant', uz: 'bo\'ysunmas / itoatsiz', example: 'The recalcitrant child refused to listen.', exampleUz: 'Itoatsiz bola tinglashdan bosh tortdi.' },
      { en: 'sagacious', uz: 'dono / zukko', example: 'He gave sagacious advice.', exampleUz: 'U dono maslahat berdi.' },
      { en: 'taciturn', uz: 'kamgap / sokin', example: 'He is a taciturn man.', exampleUz: 'U kamgap odam.' },
      { en: 'unctuous', uz: 'soxta xushmuomala / laganbardor', example: 'His unctuous manner made her uneasy.', exampleUz: "Uning soxta xushmuomalaligi uni bezovta qildi." },
      { en: 'vindicate', uz: 'oqlamoq / haqligini isbotlamoq', example: 'The new evidence vindicated him.', exampleUz: "Yangi dalillar uning haqligini isbotladi." },
      { en: 'winsome', uz: 'yoqimtoy / maftunkor', example: 'She has a winsome smile.', exampleUz: 'Uning maftunkor tabassumi bor.' },
      { en: 'zenith', uz: 'eng yuqori nuqta / cho\'qqi', example: 'His career reached its zenith.', exampleUz: "Uning karyerasi eng yuqori nuqtasiga yetdi." },
      { en: 'abnegate', uz: 'voz kechmoq', example: 'He abnegated his responsibilities.', exampleUz: 'U mas\'uliyatidan voz kechdi.' },
      { en: 'byzantine', uz: 'nihoyatda murakkab', example: 'The tax code is famously byzantine.', exampleUz: 'Soliq kodeksi juda murakkabligi bilan mashhur.' },
      { en: 'cacophony', uz: 'g\'alati shovqin / dissonans', example: 'A cacophony of car horns filled the street.', exampleUz: "Ko'cha mashinalar signalining shovqiniga to'ldi." },
      { en: 'debacle', uz: 'katta muvaffaqiyatsizlik', example: 'The event turned into a total debacle.', exampleUz: "Tadbir to'liq muvaffaqiyatsizlikka aylandi." },
      { en: 'effrontery', uz: 'beadablik / haddan oshish', example: 'He had the effrontery to ask for more.', exampleUz: "Uning ko'proq so'rashga jur'ati yetdi." },
      { en: 'fecund', uz: 'unumdor / hosildor', example: 'The fecund soil produced huge crops.', exampleUz: 'Unumdor tuproq katta hosil berdi.' },
      { en: 'garrulous', uz: 'gapga usta / ko\'p gapiradigan', example: 'My garrulous uncle never stops talking.', exampleUz: "Mening ko'p gapiradigan amakim to'xtamay gapiraveradi." },
      { en: 'hegemony', uz: 'hukmronlik / ustunlik', example: 'The country sought regional hegemony.', exampleUz: 'Mamlakat mintaqaviy ustunlikka intildi.' },
      { en: 'iconoclast', uz: 'an\'anaviy qarashlarga qarshi chiquvchi', example: 'She was an iconoclast in the art world.', exampleUz: "U san'at olamida an'anaviy qarashlarga qarshi chiquvchi edi." },
      { en: 'juxtapose', uz: 'yonma-yon qo\'ymoq / taqqoslamoq', example: 'The film juxtaposes wealth and poverty.', exampleUz: "Film boylik va qashshoqlikni yonma-yon qo'yadi." },
      { en: 'kowtow', uz: 'ta\'zim qilmoq / boshini egmoq', example: 'He refused to kowtow to pressure.', exampleUz: "U bosimga bo'ysunishdan bosh tortdi." },
      { en: 'labyrinthine', uz: 'chigal / labirintsimon', example: 'The old city has labyrinthine streets.', exampleUz: 'Eski shaharning ko\'chalari chigal.' },
      { en: 'maverick', uz: 'mustaqil fikrlovchi / betakror', example: 'He is a maverick in his field.', exampleUz: "U o'z sohasida betakror shaxs." },
      { en: 'nefarious', uz: 'yovuz / razil', example: 'They uncovered his nefarious plot.', exampleUz: 'Ular uning yovuz rejasini fosh qilishdi.' },
      { en: 'obsequious', uz: 'haddan tashqari itoatkor', example: 'The obsequious waiter annoyed the guests.', exampleUz: 'Haddan tashqari itoatkor ofitsiant mehmonlarni bezovta qildi.' },
      { en: 'panacea', uz: 'hamma dardga davo', example: 'There is no panacea for poverty.', exampleUz: "Qashshoqlikka hamma dardga davo yo'q." },
      { en: 'quagmire', uz: 'botqoq / chiqib bo\'lmas vaziyat', example: 'The war became a political quagmire.', exampleUz: 'Urush siyosiy botqoqqa aylandi.' },
      { en: 'raconteur', uz: 'mohir hikoyachi', example: 'He is a natural raconteur.', exampleUz: 'U tabiiy mohir hikoyachi.' },
      { en: 'sanguine', uz: 'optimistik / umidvor', example: 'She remained sanguine about the future.', exampleUz: 'U kelajak haqida optimistik qoldi.' },
      { en: 'transient', uz: 'vaqtinchalik / o\'tkinchi', example: 'Fame is often transient.', exampleUz: "Shuhrat ko'pincha vaqtinchalik bo'ladi." },
      { en: 'usurp', uz: 'noqonuniy egallab olmoq', example: 'He tried to usurp the throne.', exampleUz: "U taxtni noqonuniy egallashga urindi." },
      { en: 'vitiate', uz: 'buzmoq / kuchini yo\'qotmoq', example: 'The scandal vitiated public trust.', exampleUz: "Janjal jamoat ishonchini buzdi." },
      { en: 'wanton', uz: 'beparvo / o\'ylamasdan qilingan', example: 'The wanton destruction shocked everyone.', exampleUz: "Beparvo vayronagarchilik hammani larzaga soldi." }
    ]
  }
)

// XP rewards for different actions
export const XP_REWARDS = {
  correctAnswer: 10,
  perfectLesson: 25,
  dailyStreak: 15,
  newWordLearned: 5
}

// XP needed to reach a given user level
export function getXpForLevel(level) {
  return level * 100
}

export function getLevelFromXp(totalXp) {
  let level = 1
  while (totalXp >= getXpForLevel(level)) {
    level++
  }
  return level
}

export function getLevelTitle(level) {
  const found = levels.find((l) => l.level === level)
  if (found) return found.title
  return levels[levels.length - 1].title
}

// Admin-added words (fetched from Firestore at app start by contentStore.js)
// get pushed into this array at runtime and are merged into the relevant
// level automatically — no code deploy needed to add new vocabulary.
export const customWords = []

export function getWordsForLevel(levelNum) {
  const found = levels.find((l) => l.level === levelNum)
  const base = found ? found.words : levels[0].words
  const extra = customWords.filter((w) => w.level === Number(levelNum))
  return extra.length > 0 ? [...base, ...extra] : base
}

export function getLevelData(levelNum) {
  return levels.find((l) => l.level === levelNum) || levels[0]
}

export const maxLevel = levels.length

const COMMON_WORDS_UZ = {
  '11': '11',
  '3': '3',
  '30': '30',
  '4': '4',
  '50': '50',
  '7': '7',
  '9': '9',
  'a': 'bir',
  'abilities': 'qobiliyatlar',
  'about': 'haqida',
  'acts': 'harakat qiladi',
  'after': 'keyin',
  'age': 'yosh',
  'agree': 'rozi',
  'am': 'man',
  'am_time': 'tongda',
  'an': 'bir',
  'and': 'va',
  'any': 'biror',
  'apology': 'uzr',
  'are': 'dir',
  'at': 'da',
  'bag': 'sumka',
  'baggage': 'yuk',
  'be': 'bo\'lmoq',
  'before': 'oldin',
  'birthdays': 'tug\'ilgan kunlar',
  'book': 'kitob',
  'bought': 'sotib oldi',
  'brings': 'olib keladi',
  'bus': 'avtobus',
  'busy': 'band',
  'but': 'lekin',
  'by': 'orqali',
  'can': 'mumkin',
  'children': 'bolalar',
  'cities': 'shaharlar',
  'city': 'shahar',
  'claim': 'olish',
  'comfortable': 'qulay',
  'company': 'kompaniya',
  'could': 'mumkin edi',
  'crossed': 'kesib o\'tdi',
  'crowded': 'gavjum',
  'despite': 'qaramasdan',
  'did': 'qildi',
  'do': 'qilmoq',
  'doctor\'s': 'shifokorning',
  'does': 'qiladi',
  'doing': 'qilyapti',
  'don\'t': 'emas',
  'down': 'pastga',
  'drink': 'ichmoq',
  'drives': 'boshqaradi',
  'during': 'davomida',
  'duties': 'vazifalar',
  'early': 'erta',
  'eat': 'yemoq',
  'employees': 'xodimlar',
  'errands': 'mayda ishlar',
  'every': 'har',
  'expecting': 'kutmoqda',
  'far': 'uzoq',
  'feel': 'his qilmoq',
  'felt': 'his qildi',
  'few': 'bir nechta',
  'final': 'yakuniy',
  'flour': 'un',
  'for': 'uchun',
  'formed': 'tuzdi',
  'founded': 'asos solingan',
  'friday': 'juma',
  'friend': 'do\'st',
  'from': 'dan',
  'future': 'kelajak',
  'go': 'bormoq',
  'goals': 'maqsadlar',
  'got': 'oldi',
  'graduating': 'bitirayotgan',
  'great': 'ajoyib',
  'guests': 'mehmonlar',
  'had': 'bor edi',
  'hall': 'zal',
  'has': 'bor',
  'have': 'bor',
  'he': 'u',
  'health': 'salomatlik',
  'hear': 'eshitmoq',
  'helped': 'yordam berdi',
  'helps': 'yordam beradi',
  'her': 'uning',
  'here': 'bu yerda',
  'his': 'uning',
  'home': 'uy',
  'how': 'qanday',
  'i': 'men',
  'idea': 'fikr',
  'in': 'da/ichida',
  'includes': 'o\'z ichiga oladi',
  'increase': 'oshish',
  'increased': 'oshdi',
  'is': 'dir',
  'it': 'u',
  'job': 'ish',
  'journal': 'kundalik',
  'keep': 'saqlamoq',
  'language': 'til',
  'late': 'kech qolgan',
  'learning': 'o\'rganish',
  'leaves': 'jo\'nab ketadi',
  'leftovers': 'qolgan ovqat',
  'lemons': 'limonlar',
  'let\'s': 'keling',
  'like': 'yoqtirmoq',
  'local': 'mahalliy',
  'long': 'uzoq',
  'lot': 'ko\'p',
  'love': 'sevmoq',
  'lunch': 'tushlik',
  'made': 'qildi',
  'main': 'asosiy',
  'many': 'ko\'p',
  'me': 'meni',
  'meet': 'uchrashmoq',
  'method': 'usul',
  'mind': 'aql/fikr',
  'minutes': 'daqiqa',
  'mistake': 'xato',
  'monthly': 'oylik',
  'more': 'ko\'proq',
  'must': 'kerak',
  'my': 'mening',
  'need': 'kerak',
  'news': 'yangilik',
  'next': 'keyingi',
  'nice': 'yaxshi',
  'no': 'yo\'q',
  'not': 'emas',
  'now': 'hozir',
  'of': 'ning',
  'on': 'ustida',
  'online': 'onlayn',
  'or': 'yoki',
  'others': 'boshqalar',
  'our': 'bizning',
  'phone': 'telefon',
  'pizza': 'pitsa',
  'place': 'joy',
  'plans': 'rejalar',
  'please': 'iltimos',
  'pm': 'tushdan keyin',
  'practice': 'mashq qilish',
  'praised': 'maqtadi',
  'prepare': 'tayyorlamoq',
  'price': 'narx',
  'protect': 'himoya qilmoq',
  'quarter': 'chorak',
  'reach': 'erishmoq',
  'reading': 'kitob o\'qish',
  'right': 'hozir',
  'run': 'bajarmoq',
  'send': 'yubormoq',
  'share': 'bo\'lishmoq',
  'she': 'u',
  'shopping': 'xarid qilish',
  'should': 'kerak',
  'show': 'ko\'rsatmoq',
  'sign': 'imzolamoq',
  'sit': 'o\'tirmoq',
  'some': 'ba\'zi',
  'soup': 'sho\'rva',
  'stayed': 'turdik',
  'stays': 'qoladi',
  'success': 'muvaffaqiyat',
  'successful': 'muvaffaqiyatli',
  'sunday': 'yakshanba',
  'support': 'yordam',
  'supportive': 'yordam beruvchi',
  'takes': 'davom etadi',
  'taste': 'ta\'m',
  'test': 'test',
  'thank': 'rahmat',
  'that': 'u/o\'sha',
  'the': '',
  'their': 'ularning',
  'there': 'u yerda',
  'these': 'bular',
  'they': 'ular',
  'this': 'bu',
  'those': 'o\'shalar',
  'three': 'uch',
  'times': 'vaqtlar',
  'to': 'ga',
  'today': 'bugun',
  'tomorrow': 'ertaga',
  'tonight': 'bugun kechqurun',
  'too': 'juda/ham',
  'took': 'oldi',
  'tough': 'og\'ir',
  'tourists': 'sayyohlar',
  'traffic': 'tirbandlik',
  'travel': 'sayohat qilmoq',
  'trip': 'sayohat',
  'try': 'harakat qilmoq',
  'two': 'ikki',
  'two-hour': 'ikki soatlik',
  'up': 'yuqoriga',
  'vegetables': 'sabzavotlar',
  'very': 'juda',
  'visit': 'tashrif buyurmoq',
  'wake': 'uyg\'onmoq',
  'was': 'edi',
  'we': 'biz',
  'weather': 'ob-havo',
  'week': 'hafta',
  'well': 'yaxshi',
  'went': 'bordi',
  'were': 'edi',
  'what': 'nima',
  'when': 'qachon',
  'where': 'qayerda',
  'who': 'kim',
  'why': 'nega',
  'with': 'bilan',
  'within': 'ichida',
  'work': 'ish',
  'working': 'ishlamoqda',
  'would': 'bo\'lardi',
  'year': 'yil',
  'yes': 'ha',
  'yesterday': 'kecha',
  'you': 'siz',
  'your': 'sizning',
  'yourself': 'o\'zingiz'
}

// Builds an approximate word-by-word Uzbek gloss for an English example
// sentence, used as a hint in word-order exercises. Prefers the learner's
// already-known vocabulary translation for the target word, then falls back
// to a small dictionary of common function words for everything else.
export function buildUzHint(word) {
  if (word.exampleUz) return word.exampleUz

  const allWords = getAllWords()
  const byEn = {}
  for (const w of allWords) byEn[w.en.toLowerCase()] = w.uz

  const cleaned = word.example.replace(/[.?!]$/, '')
  const tokens = cleaned.split(' ')

  const glossed = tokens.map((tok) => {
    const bare = tok.toLowerCase().replace(/[.,!?]/g, '').replace(/'s$/, "'s")
    if (bare === word.en.toLowerCase()) return word.uz
    if (byEn[bare]) return byEn[bare]
    if (COMMON_WORDS_UZ[bare] !== undefined) return COMMON_WORDS_UZ[bare]
    return null
  }).filter((w) => w && w.length > 0)

  return glossed.length > 0 ? glossed.join(' ') : word.uz
}

// ---------- Exercise generation helpers ----------
// Each lesson word is shown as one of several exercise types, mirroring the
// variety found in apps like Duolingo. These helpers build the data each
// exercise component needs, drawing wrong-answer options from the same
// level's word pool so distractors stay at a similar difficulty.

export const EXERCISE_TYPES = ['flashcard', 'multipleChoice', 'wordOrder', 'typing', 'listening']

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
      ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Builds a sequence of exercises for a level: one entry per word, each
// tagged with a randomly chosen exercise type (flashcard is intentionally
// weighted lower since it requires no active recall).
export function buildLessonQueue(levelNum) {
  const words = getWordsForLevel(levelNum)
  const weighted = ['multipleChoice', 'multipleChoice', 'wordOrder', 'typing', 'listening', 'flashcard', 'speaking']
  return words.map((word) => ({
    word,
    type: weighted[Math.floor(Math.random() * weighted.length)]
  }))
}

// 4-option multiple choice: word.uz is correct, three distractors pulled
// from an arbitrary word pool (used directly by review sessions where words
// may come from several different levels).
export function buildMultipleChoiceGeneric(word, pool) {
  const filtered = pool.filter((w) => w.en !== word.en)
  const distractors = shuffle(filtered).slice(0, 3).map((w) => w.uz)
  const options = shuffle([word.uz, ...distractors])
  return { options, correct: word.uz }
}

// 4-option multiple choice: word.uz is correct, three distractors pulled
// from other words in the same level.
export function buildMultipleChoice(word, levelNum) {
  return buildMultipleChoiceGeneric(word, getWordsForLevel(levelNum))
}

// Word-order exercise: scrambles the example sentence's words; the user
// must tap them back into the original order.
export function buildWordOrder(word) {
  const cleaned = word.example.replace(/[.?!]$/, '')
  const correctOrder = cleaned.split(' ')
  const scrambled = shuffle(correctOrder)
  // Guard against the shuffle accidentally producing the original order
  if (scrambled.join(' ') === correctOrder.join(' ') && correctOrder.length > 1) {
    ;[scrambled[0], scrambled[1]] = [scrambled[1], scrambled[0]]
  }
  return { scrambled, correctOrder }
}

// Typing exercise: show the Uzbek meaning, user types the English word.
export function buildTyping(word) {
  return { prompt: word.uz, answer: word.en.toLowerCase().trim() }
}

// Listening exercise: reuses multiple choice but the prompt is spoken via
// the Web Speech API instead of shown as text (see useSpeech composable).
export function buildListening(word, levelNum) {
  return buildMultipleChoice(word, levelNum)
}

export function getMaxLevel() {
  return levels.length
}

// ---------- Review / Mistakes helpers ----------

// Flat list of every unique word across all levels, used for review mode
// where words can come from any level the user has attempted.
export function getAllWords() {
  const seen = new Set()
  const all = []
  for (const level of levels) {
    for (const word of level.words) {
      if (!seen.has(word.en)) {
        seen.add(word.en)
        all.push(word)
      }
    }
  }
  for (const word of customWords) {
    if (!seen.has(word.en)) {
      seen.add(word.en)
      all.push(word)
    }
  }
  return all
}

export function findWordByEn(en) {
  return getAllWords().find((w) => w.en === en) || null
}

// Builds a review queue from a list of English words the user previously
// got wrong. Mixes multipleChoice/typing/listening (skips wordOrder and
// flashcard since review sessions favor active-recall checks).
export function buildReviewQueue(mistakeWordsEn) {
  const pool = getAllWords()
  const reviewTypes = ['multipleChoice', 'typing', 'listening']
  const words = mistakeWordsEn
    .map((en) => findWordByEn(en))
    .filter(Boolean)
  return words.map((word) => ({
    word,
    type: reviewTypes[Math.floor(Math.random() * reviewTypes.length)]
  }))
}