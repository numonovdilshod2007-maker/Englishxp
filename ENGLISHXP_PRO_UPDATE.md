# EnglishXP — Pro UI & Lesson Update

## What changed
- LessonView rebuilt into an immersive, Duolingo-inspired lesson experience with a compact HUD, progress bar, lives, session XP and bottom feedback actions.
- Added 10 exercise modes to the lesson engine: flashcard, multiple choice, visual choice, word order, typing, listening, fill-the-blank, reverse meaning choice, sentence translation and speaking.
- Lesson generation now deliberately rotates through exercise types for more variety.
- Visual choice uses app-native icons, so it does not require a new image CDN or extra assets.
- ShopView rebuilt with power-up cards, balance/stat widgets, avatar collection, clear empty/locked states and feedback messages.
- Added working shop actions for Heart Refill and XP Boost; XP Boost persists as a timestamp on the user profile.
- Kept the existing Firebase/Pinia architecture and existing learning data.
- Removed local Telegram bot env/data files from the distributable archive and replaced the example bot token with a placeholder.

## Verification
- All application JavaScript files pass `node --check`.
- A full Vite production build could not be completed in this environment because dependency installation repeatedly timed out; run `npm ci && npm run build` locally to perform the final production build check.
