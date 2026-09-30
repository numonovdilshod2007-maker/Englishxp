# EnglishXP Micro-Learning Upgrade

## Product principle

The goal is not to trick learners about the amount of work. The UX should make progress feel approachable by using short, visible checkpoints while keeping the learning density high.

## What changed

- Core lesson: 16 quick checks by default.
- Target set: 4 words reused across 4 retrieval modes.
- Round 1: Visual recognition.
- Round 2: Translation recall.
- Round 3: Context / fill-in-the-blank.
- Round 4: Listening recognition.
- New words are prioritized using `completedWords`, with one previously completed word included when possible for retrieval practice.
- Optional bonus round supports definition, word order, typing, and sentence translation without making the core sprint longer.
- Lesson HUD now communicates a short sprint and a rough 4-minute expectation.

## Why this is better than one question per word

The old queue could create up to 50+ questions for a single vocabulary level and exposed each word to only one main exercise type. The new design creates a small mastery loop: recognize -> recall -> use in context -> hear. This increases retrieval attempts per minute and gives users frequent progress moments.

## Next product upgrades

1. Track `sprintNumber` per level so every user gets a deterministic sequence rather than random repetition.
2. Add a `bonus` screen after completion with 1-tap optional rounds.
3. Generate more context examples per word from curated content, not automatic low-quality paraphrases.
4. Add a 60-second speed round as a separate mode, not as a mandatory part of the main lesson.
5. Use mistakes to schedule exact follow-up micro-sprints through SRS.
