# EnglishXP Profile Upgrade

- Removed the Telegram reminder block from the user profile UI.
- Added a richer personal Profile dashboard with progress, XP, streak, skills, achievements, reminders and referral tools.
- Added `/user/:uid` public profile pages for authenticated users.
- People list avatars/names now open each learner's public profile.
- Public profiles intentionally do not render email addresses or other direct contact details.
- Existing Telegram Cloud Function files were left untouched so old server code does not break unexpectedly; they are no longer exposed in the profile UI.
