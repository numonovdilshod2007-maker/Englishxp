# To'lov tizimini ishga tushirish (Payme + Click)

Bu qo'llanma Pro obunani **haqiqiy pul bilan** ishlaydigan qilish uchun kerak bo'lgan barcha qadamlarni tushuntiradi.
Kod tayyor — sizga faqat merchant hisoblaringizni ochish va sozlamalarni to'ldirish qoladi.

## 1. Merchant hisoblarini oching

**Payme:**
1. https://business.payme.uz ga kiring, biznes hisob oching (yuridik shaxs yoki YaTT kerak)
2. "Kassalar" bo'limidan yangi kassa yarating → `Merchant ID` oling
3. "Sozlamalar" → API kalitlari → **Test key** (sinov uchun) va **Production key**ni oling

**Click:**
1. https://merchant.click.uz ga kiring, merchant hisob oching
2. Yangi xizmat (service) yarating → `Merchant ID` va `Service ID` oling
3. "Sozlamalar"dan **Secret key**ni oling

## 2. Cloud Functions'ni sozlang

```bash
cd functions
npm install
cp .env.example .env
```

`.env` faylini oching va haqiqiy qiymatlarni kiriting:
```
PAYME_MERCHANT_ID=sizning_merchant_id
PAYME_SECRET_KEY=sizning_secret_key
CLICK_MERCHANT_ID=sizning_merchant_id
CLICK_SERVICE_ID=sizning_service_id
CLICK_SECRET_KEY=sizning_secret_key
```

## 3. Deploy qiling

```bash
firebase login
firebase deploy --only functions
```

Deploy tugagach, terminalda ikkita URL chiqadi, masalan:
```
paymeCallback: https://us-central1-test-course-9d80e.cloudfunctions.net/paymeCallback
clickCallback: https://us-central1-test-course-9d80e.cloudfunctions.net/clickCallback
```

## 4. Callback URL'larni merchant kabinetlariga qo'shing

- **Payme**: business.payme.uz → Kassa sozlamalari → "Callback URL" maydoniga `paymeCallback` havolasini qo'ying
- **Click**: merchant.click.uz → Xizmat sozlamalari → "Callback URL" maydoniga `clickCallback` havolasini qo'ying

## 5. Frontend'da Merchant ID'larni kiriting

`src/stores/userStore.js` faylida:
```js
export const PAYME_MERCHANT_ID = 'sizning_merchant_id'
export const CLICK_MERCHANT_ID = 'sizning_merchant_id'
export const CLICK_SERVICE_ID = 'sizning_service_id'
```

Bularni to'ldirmaguningizcha, `/upgrade` sahifasidagi to'lov tugmalari faol bo'lmaydi (xavfsizlik uchun ataylab shunday).

## 6. Firestore Rules va Indekslarni deploy qiling

```bash
firebase deploy --only firestore:rules
```

## 7. Sinab ko'ring

- Avval **test kalit** bilan ishlang (Payme test muhitida to'lov qilish uchun maxsus test kartalar beradi — hujjatidan qarang)
- Test muvaffaqiyatli o'tgach, `.env`dagi kalitlarni **production**ga almashtiring va qayta deploy qiling:
  ```bash
  firebase deploy --only functions
  ```

## Qanday ishlaydi

1. Foydalanuvchi `/upgrade`da "Payme orqali to'lash" yoki "Click orqali to'lash" tugmasini bosadi
2. Payme/Click'ning o'z checkout sahifasiga yo'naltiriladi (karta ma'lumotlarini shu yerda kiritadi — bizning serverimiz karta raqamini hech qachon ko'rmaydi)
3. To'lov tasdiqlangach, Payme/Click bizning `paymeCallback`/`clickCallback` funksiyamizga so'rov yuboradi
4. Cloud Function to'lovni tekshiradi va **faqat shu yerda** (server tomonda, Admin SDK orqali) foydalanuvchining `isPro: true` qiladi — bu client tomonidan hech qachon soxtalashtirib bo'lmaydigan joy
5. Har 24 soatda `checkExpiredSubscriptions` funksiyasi muddati o'tgan obunalarni avtomatik o'chiradi (30 kunlik)

## Muhim eslatmalar

- ⚠️ Bu real pul bilan ishlaydi — production kalitlarni faqat tayyor bo'lganingizda kiriting
- ⚠️ Payme/Click API spetsifikatsiyasi vaqti-vaqti bilan yangilanadi — deploy qilishdan oldin rasmiy hujjatlar bilan solishtiring: developer.help.paycom.uz va docs.click.uz
- 🔒 `isPro` maydoni endi **faqat server** (Cloud Functions) tomonidan yozilishi mumkin — `firestore.rules`da qattiq bloklangan, hech kim brauzer konsolidan o'zini Pro qila olmaydi
