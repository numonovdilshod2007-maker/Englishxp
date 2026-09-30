# EnglishXP — Gamified ingliz tili o'rganish platformasi

Vue.js 3 + Firebase asosida qurilgan, dark mode va neon dizaynli, streak/XP/level
tizimiga ega ingliz tili o'rganish veb-sayti.

## Telegram bot — kunlik eslatmalar (YANGI)

1. Telegram'da **@BotFather**ga yozing → `/newbot` → nom va username bering
   (masalan `EnglishXPBot`). U sizga bir token beradi (`123456:ABC-DEF...`).
2. `functions/.env` faylida (yo'q bo'lsa `functions/.env.example`dan nusxa
   oling) `TELEGRAM_BOT_TOKEN=` qatoriga shu tokenni qo'ying.
3. `src/stores/userStore.js` faylidagi `TELEGRAM_BOT_USERNAME = ''` qatoriga
   botingiz username'ini yozing (masalan `'EnglishXPBot'`, `@` belgisisiz) —
   bu Profil sahifasidagi ko'rsatmada ishlatiladi.
4. Functionlarni deploy qiling:
   ```bash
   cd functions && npm install
   firebase deploy --only functions
   ```
5. Deploy tugagach konsolda `telegramWebhook` uchun URL chiqadi
   (`https://<region>-<project-id>.cloudfunctions.net/telegramWebhook`).
   Shu URL'ni Telegram'ga webhook sifatida ro'yxatdan o'tkazing — brauzerda
   quyidagini oching (TOKEN va URL'ni almashtirib):
   ```
   https://api.telegram.org/bot<TOKEN>/setWebhook?url=<WEBHOOK_URL>
   ```
6. Tayyor. Endi foydalanuvchi Profil sahifasida "Ulash" tugmasini bosib,
   chiqqan kodni botga `/start KOD` shaklida yuborsa, hisobi ulanadi va
   har kuni soat 18:00 (Toshkent vaqti) da, agar o'sha kun hali mashq
   qilmagan bo'lsa, eslatma keladi.

## Firestore Rules — YANGILANGAN (follow + chat qo'shilgani sababli)

Loyiha papkasidagi `firestore.rules` faylidagi to'liq matnni Firebase Console >
Firestore Database > Rules bo'limiga joylashtiring va Publish bosing. Eski
qoida endi yetarli emas, chunki follow tizimi boshqa foydalanuvchining
hujjatiga yozishni talab qiladi, shuningdek `dms/{convId}/messages` qoidasi
ham shu faylda — chatni ishga tushirish uchun MAJBURIY.

**Diqqat:** agar chat sahifasida xabar yuborib bo'lmasa yoki xabarlar
ko'rinmasa, sababi 90% hollarda shu — Console'dagi rules eski holatda
qolib ketgan. Har safar `firestore.rules` fayli o'zgarsa, uni qayta
Console'ga qo'yib, Publish bosish kerak.

## Storage Rules — profil rasmini yuklash uchun MAJBURIY

Profilga rasm qo'yish ishlamayotgan bo'lsa, sababi shu bo'lim bajarilmagani:

1. Firebase Console > Build > **Storage** bo'limiga o'ting.
2. Agar Storage hali yoqilmagan bo'lsa, "Get started" bosing va yoqing
   (2024-yildan keyin yaratilgan loyihalarda bu bepul Spark rejada ham
   ishlaydi, lekin ba'zan Blaze (pay-as-you-go) rejaga o'tishni so'rashi
   mumkin — karta biriktirish kifoya, kichik loyihalar uchun bepul
   kvota yetarli).
3. **Rules** tabiga o'ting va loyiha papkasidagi `storage.rules` faylining
   to'liq matnini joylashtirib, Publish bosing.
4. Shundan keyin profil sahifasida kamera belgisini bosib rasm tanlang —
   yuklanishi kerak. Agar hali ham xato chiqsa, brauzer konsolidagi
   (F12 > Console) xato matnini tekshiring — odatda `storage/unauthorized`
   (rules noto'g'ri) yoki `storage/unknown` (Storage umuman yoqilmagan)
   bo'ladi.

## O'rnatish

```bash
npm install
```

## Firebase sozlash (MAJBURIY — birinchi qadam)

1. https://console.firebase.google.com ga kiring va yangi loyiha yarating
   (yoki mavjud `barbershop-uz-95586` dan ALOHIDA yangi loyiha tavsiya etiladi,
   chunki bu butunlay boshqa foydalanuvchi bazasi).

2. **Authentication** yoqing:
   - Build > Authentication > Get started
   - Sign-in method: "Email/Password" va "Google" ni yoqing

3. **Firestore Database** yarating:
   - Build > Firestore Database > Create database
   - Boshida "test mode" da boshlang, keyin quyidagi rules'ni qo'llang:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

   Bu qoida: har bir foydalanuvchi faqat o'zining hujjatini yoza oladi, lekin
   barchaning XP'ini o'qiy oladi (leaderboard uchun kerak).

4. **Web app** qo'shing:
   - Project settings (tishli g'ildirak) > General > Your apps > Web (</> belgisi)
   - Config obyektini nusxalang

5. Config'ni shu faylga joylashtiring: `src/firebase/config.js`
   - `YOUR_API_KEY`, `YOUR_PROJECT` va h.k. o'rinlariga haqiqiy qiymatlarni qo'ying

## Ishga tushirish (development)

```bash
npm run dev
```

Brauzerda `http://localhost:5173` ochiladi.

## Production build

```bash
npm run build
```

Natija `dist/` papkasida hosil bo'ladi. Buni Firebase Hosting'ga deploy qilish
uchun (Aka Ukalar'da qilganingizdek):

```bash
npx firebase-tools deploy --only hosting
```

(Avval `npx firebase-tools init hosting` orqali sozlash kerak, `dist` ni
public directory qilib ko'rsating.)

## Loyiha tuzilishi

```
src/
  data/vocabulary.js      — barcha so'zlar, kategoriyalar, XP/level formulalari
  firebase/config.js      — Firebase ulanish konfiguratsiyasi (TO'LDIRING)
  stores/userStore.js     — Pinia store: auth, XP, streak, leaderboard logikasi
  router/index.js         — sahifalar yo'nalishi
  components/AppNav.vue   — yuqori navigatsiya
  views/
    LandingView.vue       — bosh sahifa (auth talab qilmaydi)
    LoginView.vue         — kirish/ro'yxatdan o'tish
    DashboardView.vue     — foydalanuvchi paneli, kategoriyalar
    LessonView.vue        — so'z kartochkalari mashqi
    LeaderboardView.vue   — reyting jadvali
    ProfileView.vue       — foydalanuvchi profili
```

## Yangi so'z/kategoriya qo'shish

`src/data/vocabulary.js` faylini ochib, `categories` massiviga yangi
kategoriya va `words` obyektiga mos so'zlarni qo'shing. Boshqa hech qanday
kodni o'zgartirish shart emas — UI avtomatik yangi kategoriyani ko'rsatadi.

## Keyingi qadamlar (tavsiya)

- Telegram bot integratsiyasi (kunlik eslatma, streak yo'qotish ogohlantirishi)
  — Aka Ukalar loyihangizdagi tajribangizdan foydalanish mumkin
- Audio talaffuz (so'zni eshitish tugmasi)
- Do'stlarni taklif qilish tizimi (referral XP bonusi)
- Haftalik "lig'a" tizimi (Duolingo uslubida)
