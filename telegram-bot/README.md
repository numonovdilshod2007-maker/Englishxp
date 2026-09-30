# English XP — Telegram bot

Botingiz: **t.me/EnglishPXbot**

## Nima qiladi

- `/word` yoki "📖 Bugungi so'z" — foydalanuvchi darajasiga mos kunlik so'z (misol bilan)
- `/quiz` yoki "📝 Grammar test" — Telegram'ning native quiz-poll formatida grammatika savoli (to'g'ri/noto'g'ri avtomatik ko'rsatiladi)
- `/streak` — joriy streak kunlar soni
- `/level` — darajani 1–14 oralig'ida tanlash
- **Kunlik eslatma**: belgilangan vaqtda (standart 19:00) hali mashq qilmagan foydalanuvchilarga avtomatik xabar + kunlik so'z yuboriladi

So'z va grammatika ma'lumotlari asosiy loyihadagi `src/data/vocabulary.js` va `src/data/grammar.js`dan olingan (shu papkaga nusxalangan) — ikkalasi sinxron bo'lishi uchun kelajakda shu fayllarni yangilab turing.

## O'rnatish

```bash
npm install
cp .env.example .env
```

`.env` faylini oching, `BOT_TOKEN` allaqachon to'ldirilgan (BotFather bergan token). Xohlasangiz `REMINDER_HOUR`/`REMINDER_MINUTE`ni o'zgartiring.

⚠️ **Xavfsizlik**: token allaqachon bir marta ochiq chatda yuborilgan edi. Ishga tushirishdan oldin BotFather'ga `/mybots` → botni tanlang → *API Token* → *Revoke current token* qilib, yangisini olib, `.env`ga o'sha yangi tokenni qo'yishni **qattiq tavsiya qilaman**.

## Ishga tushirish

```bash
npm start
```

Konsolda "English XP bot ishga tushdi (polling)..." chiqsa — tayyor. Telegram'da botga `/start` yozing (yoki t.me/EnglishPXbot ni oching).

Test uchun chat ID: `5776778620` — shu foydalanuvchi `/start` bossa, avtomatik ro'yxatdan o'tadi va kunlik eslatmalar shu chatga ham boradi.

## Serverda doim ishlab turishi uchun

Bu — polling rejimi, ya'ni jarayon uzluksiz ishlab turishi kerak. Variantlar:

- **VPS/server**: `pm2 start bot.js --name english-xp-bot` (pm2 avtomatik qayta ishga tushiradi agar yiqilsa)
- **Railway / Render**: loyihani deploy qiling, `npm start`ni start command qilib belgilang, `BOT_TOKEN`ni environment variable sifatida kiriting
- O'z kompyuteringizda test qilish uchun shunchaki `npm start`ni ochiq terminalda qoldirsangiz yetarli

## Keyingi qadamlar (agar kerak bo'lsa)

- Web ilova bilan bog'lash (Firebase login) — real foydalanuvchi profili, XP, haqiqiy streak sinxronizatsiyasi
- Webhook rejimiga o'tish (Firebase Functions orqali, loyihada `functions/` papkasi allaqachon bor)
- Flashcard/roleplay kabi boshqa funksiyalarni ham botga qo'shish
