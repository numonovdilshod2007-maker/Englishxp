# EnglishXP — learning loop upgrade

## What changed

### 1. Micro Sprint
Normal lessons are now intentionally short: 4 target words are recycled through 3 core formats (visual recognition, active recall, context) for 12 micro-tests, plus a small grammar intro + 2 grammar questions when grammar content exists.

### 2. Combo rewards
Correct answers build a combo (3x / 5x / 8x). Each milestone gives a small XP bonus so progress feels continuous without making lessons longer.

### 3. Smart Review
The review engine now prioritizes due SRS cards, recently missed words, and low-ease cards. Each selected word gets two quick active-recall checks.

### 4. Mistake Bank
Added `/mistakes` with a dedicated list of words that were actually answered incorrectly. Each item links into Smart Review.

### 5. Real streak activity
Opening the app no longer advances the streak. A streak day is now recorded when the learner actually answers a lesson question (correct or wrong). This keeps streaks tied to learning activity.

### 6. Mini Checkpoint
After a sprint, Learning Path exposes a small mixed checkpoint. It records the result without unlocking levels by itself.

### 7. Dashboard integration
A mistake banner appears when the user has active mistakes; Today’s plan can prioritize the Mistake Bank when there are no due SRS cards.

### 8. Auth initialization resilience
Auth/profile loading is wrapped in try/finally so `authReady` cannot stay false forever when a Firebase/network error occurs.

## Validation

- JavaScript files were checked with `node --check`.
- Vue `<script setup>` blocks were extracted and checked with `node --check`.
- Full Vite build could not be run because this environment could not complete dependency installation; the npm cache was incomplete for one package. No claim of a successful production build is made here.
