# EnglishXP Admin Content Studio

## Admin kirishini yoqish

Admin huquqi client orqali o'zi-o'zidan berilmaydi. Bu xavfsizlik uchun Firebase Firestore'dagi `users/{UID}` profilida `isAdmin: true` bilan belgilanadi.

1. Firebase Console → Firestore Database → `users`.
2. O'zingizning Auth UID profilingizni oching.
3. `isAdmin` fieldini `true` qiling.
4. Saytga qayta kiring.
5. Navbar ichida **Admin** menyusi paydo bo'ladi va `/admin` ochiladi.

## Nimalarni kodsiz qo'shish mumkin

- Vocabulary: level, EN/UZ, example.
- Grammar: topic, rules, examples, istalgancha multiple-choice test.
- Listening: script va istalgancha savol.
- Writing: Uzbek prompt va bir nechta accepted English javob.
- Stories: matn, tarjima, comprehension testlar.
- IELTS: Reading, Listening, Task 1, Task 2, Speaking.

Saqlangan custom content Firestore'ga yoziladi va ilova yuklanganda mavjud content bilan birlashtiriladi. Yangi kontent uchun frontend deploy qilish shart emas.

## Muhim

Admin paneldagi write huquqi Firestore rules orqali `isAdmin == true` bo'lgan accountlargagina beriladi. Oddiy user admin panelga kira olmaydi va custom content kolleksiyalariga yozolmaydi.
