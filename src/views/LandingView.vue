<template>
  <div class="landing-page">
    <AuroraBackground />

    <!-- NAVBAR -->
    <header class="site-header">
      <div class="container header-inner">
        <router-link to="/" class="brand" aria-label="EnglishXP home">
          <span class="brand-mark"><i class="ti ti-bolt" aria-hidden="true"></i></span>
          <span class="brand-name">English<span>XP</span></span>
        </router-link>

        <nav class="desktop-nav" aria-label="Asosiy navigatsiya">
          <a href="#features">Imkoniyatlar</a>
          <a href="#lesson">Darslar</a>
          <a href="#ai">AI Teacher</a>
          <a href="#ielts">IELTS</a>
          <a href="#how">Qanday ishlaydi</a>
        </nav>

        <div class="header-actions">
          <router-link to="/login" class="text-link">Kirish</router-link>
          <router-link to="/login" class="header-cta">
            Bepul boshlash
            <i class="ti ti-arrow-up-right" aria-hidden="true"></i>
          </router-link>
          <button class="mobile-menu-btn" type="button" aria-label="Menyuni ochish" @click="mobileOpen = !mobileOpen">
            <i :class="['ti', mobileOpen ? 'ti-x' : 'ti-menu-2']" aria-hidden="true"></i>
          </button>
        </div>
      </div>

      <div v-if="mobileOpen" class="mobile-nav">
        <a href="#features" @click="mobileOpen = false">Imkoniyatlar</a>
        <a href="#lesson" @click="mobileOpen = false">Darslar</a>
        <a href="#ai" @click="mobileOpen = false">AI Teacher</a>
        <a href="#ielts" @click="mobileOpen = false">IELTS</a>
        <a href="#how" @click="mobileOpen = false">Qanday ishlaydi</a>
        <router-link to="/login" class="mobile-nav-cta" @click="mobileOpen = false">Bepul boshlash</router-link>
      </div>
    </header>

    <main>
      <!-- HERO -->
      <section class="hero-section">
        <div class="container hero-grid">
          <div class="hero-copy">
            <div class="eyebrow reveal-up">
              <span class="live-dot"></span>
              Ingliz tili uchun bitta joyda to‘liq tizim
            </div>

            <h1 class="hero-title reveal-up" style="--delay: .08s">
              Ingliz tilini faqat <span class="hero-highlight">o‘rganmang.</span>
              Undan foydalaning.
            </h1>

            <p class="hero-lead reveal-up" style="--delay: .16s">
              EnglishXP sizni yangi so‘zdan boshlab real suhbatgacha olib boradi:
              darslar, listening, speaking, grammar, AI Teacher, IELTS va o‘yinlashtirilgan practice — barchasi bitta platformada.
            </p>

            <div class="hero-actions reveal-up" style="--delay: .24s">
              <router-link to="/login" class="btn-primary hero-primary">
                Bepul boshlash
                <i class="ti ti-arrow-right" aria-hidden="true"></i>
              </router-link>
              <a href="#lesson" class="hero-demo-link">
                <span class="play-circle"><i class="ti ti-player-play-filled" aria-hidden="true"></i></span>
                Dars qanday ko‘rinadi?
              </a>
            </div>

            <div class="hero-meta reveal-up" style="--delay: .32s">
              <div class="hero-meta-item">
                <i class="ti ti-check" aria-hidden="true"></i>
                <span>Ro‘yxatdan o‘tish bepul</span>
              </div>
              <div class="hero-meta-item">
                <i class="ti ti-device-mobile" aria-hidden="true"></i>
                <span>Telefon va desktop uchun</span>
              </div>
              <div class="hero-meta-item">
                <i class="ti ti-target-arrow" aria-hidden="true"></i>
                <span>A1 → C2 yo‘nalish</span>
              </div>
            </div>
          </div>

          <div class="hero-product reveal-up" style="--delay: .12s">
            <div class="product-window">
              <div class="window-topbar">
                <div class="window-dots">
                  <span></span><span></span><span></span>
                </div>
                <span class="window-title">EnglishXP • Learning</span>
                <div class="window-actions">
                  <span><i class="ti ti-flame" aria-hidden="true"></i> 12</span>
                  <span><i class="ti ti-heart-filled" aria-hidden="true"></i> 5</span>
                </div>
              </div>

              <div class="product-body">
                <div class="learning-topline">
                  <span>Daily lesson</span>
                  <strong>Level 7 <em>68%</em></strong>
                </div>
                <div class="learning-progress"><span></span></div>

                <div class="lesson-preview-card">
                  <div class="preview-kicker"><i class="ti ti-sparkles"></i> NEW WORD</div>
                  <h3>Which one is <span>“opportunity”?</span></h3>
                  <p>imkoniyat</p>
                  <div class="preview-options">
                    <div class="preview-option selected">
                      <div class="option-icon"><i class="ti ti-briefcase"></i></div>
                      <span>opportunity</span>
                      <b>1</b>
                    </div>
                    <div class="preview-option">
                      <div class="option-icon"><i class="ti ti-plane"></i></div>
                      <span>journey</span>
                      <b>2</b>
                    </div>
                    <div class="preview-option">
                      <div class="option-icon"><i class="ti ti-home"></i></div>
                      <span>building</span>
                      <b>3</b>
                    </div>
                  </div>
                  <div class="preview-feedback">
                    <div class="feedback-check"><i class="ti ti-check"></i></div>
                    <div>
                      <strong>Nice job!</strong>
                      <span>+10 XP • Keep going</span>
                    </div>
                    <button type="button">CONTINUE <i class="ti ti-arrow-right"></i></button>
                  </div>
                </div>

                <div class="product-bottom-row">
                  <div class="mini-stat">
                    <span class="mini-label">TODAY</span>
                    <strong>120 XP</strong>
                    <div class="mini-progress"><span style="width: 72%"></span></div>
                  </div>
                  <div class="mini-stat">
                    <span class="mini-label">SRS REVIEW</span>
                    <strong>18 words</strong>
                    <span class="mini-link">Review now <i class="ti ti-arrow-up-right"></i></span>
                  </div>
                </div>
              </div>
            </div>

            <div class="floating-card floating-streak">
              <div class="floating-icon flame"><i class="ti ti-flame"></i></div>
              <div><b>12 kun</b><span>Streak 🔥</span></div>
            </div>
            <div class="floating-card floating-ai">
              <div class="floating-icon ai"><i class="ti ti-sparkles"></i></div>
              <div><b>AI Teacher</b><span>Practice ready</span></div>
            </div>
          </div>
        </div>

        <div class="container skill-strip reveal-up">
          <span>Bir platformada:</span>
          <div><i class="ti ti-book"></i> Vocabulary</div>
          <div><i class="ti ti-abc-2"></i> Grammar</div>
          <div><i class="ti ti-headphones"></i> Listening</div>
          <div><i class="ti ti-microphone"></i> Speaking</div>
          <div><i class="ti ti-book-2"></i> Reading</div>
          <div><i class="ti ti-pencil"></i> Writing</div>
        </div>
      </section>

      <!-- HOW -->
      <section id="how" class="section section-how">
        <div class="container">
          <div class="section-heading centered reveal-up">
            <span class="section-kicker">QANDAY ISHLAYDI</span>
            <h2>Har kuni nimani qilishni<br class="desktop-only" /> EnglishXP o‘zi tartiblaydi.</h2>
            <p>Foydalanuvchi dars qidirib yurmaydi. Maqsad, daraja va oldingi natijalarga qarab keyingi qadam aniq ko‘rinadi.</p>
          </div>

          <div class="steps-grid">
            <article class="step-card reveal-up">
              <span class="step-number">01</span>
              <div class="step-icon"><i class="ti ti-target-arrow"></i></div>
              <h3>Maqsadingizni tanlang</h3>
              <p>General English, speaking, travel yoki IELTS — o‘zingizga kerakli yo‘nalishni belgilang.</p>
            </article>
            <article class="step-card reveal-up" style="--delay:.08s">
              <span class="step-number">02</span>
              <div class="step-icon"><i class="ti ti-map-2"></i></div>
              <h3>Learning Path tuziladi</h3>
              <p>Darajangizga mos yo‘l, level va bugungi practice bir ekranda ko‘rinadi.</p>
            </article>
            <article class="step-card reveal-up" style="--delay:.16s">
              <span class="step-number">03</span>
              <div class="step-icon"><i class="ti ti-microphone"></i></div>
              <h3>Bilimni real ishlating</h3>
              <p>Faqat test emas: speaking, roleplay, listening va writing orqali bilimni ishlatib ko‘ring.</p>
            </article>
          </div>
        </div>
      </section>

      <!-- FEATURES -->
      <section id="features" class="section section-features">
        <div class="container">
          <div class="section-heading reveal-up">
            <span class="section-kicker">ENGLISHXP ECOSYSTEM</span>
            <h2>Bitta platforma.<br />Ko‘proq real practice.</h2>
            <p>Saytda allaqachon mavjud bo‘lgan ko‘nikmalarni landingda ham ko‘rsatamiz — foydalanuvchi EnglishXP nimani berishini kirgan zahoti tushunadi.</p>
          </div>

          <div class="feature-bento">
            <router-link to="/learning-path" class="bento-card bento-path reveal-up">
              <div class="bento-copy">
                <span class="bento-label">01 • LEARNING PATH</span>
                <h3>A1 dan C2 gacha<br />aniq yo‘l.</h3>
                <p>Level → lesson → practice → progress. Keyingi qadam doim tayyor.</p>
                <span class="bento-link">Yo‘lni ko‘rish <i class="ti ti-arrow-up-right"></i></span>
              </div>
              <div class="path-visual">
                <div class="path-line"></div>
                <div class="path-level done"><span>A1</span><i class="ti ti-check"></i></div>
                <div class="path-level done"><span>A2</span><i class="ti ti-check"></i></div>
                <div class="path-level active"><span>B1</span><i class="ti ti-player-play-filled"></i></div>
                <div class="path-level"><span>B2</span><i class="ti ti-lock"></i></div>
                <div class="path-level"><span>C1</span><i class="ti ti-lock"></i></div>
              </div>
            </router-link>

            <router-link to="/ai-teacher" id="ai" class="bento-card bento-ai reveal-up" style="--delay:.08s">
              <div class="bento-label">02 • AI TEACHER</div>
              <div class="ai-orb"><i class="ti ti-sparkles"></i></div>
              <h3>Savolingiz bo‘lsa,<br /><span>AI Teacher</span> bor.</h3>
              <p>Grammar, vocabulary yoki sentence haqida savol bering va tushunarli izoh oling.</p>
              <span class="bento-link">AI Teacher <i class="ti ti-arrow-up-right"></i></span>
            </router-link>

            <router-link to="/roleplay" class="bento-card bento-roleplay reveal-up" style="--delay:.14s">
              <div class="bento-topline"><span class="bento-label">03 • ROLEPLAY</span><span class="pro-pill">PRO</span></div>
              <div class="conversation-ui">
                <div class="conversation-head"><div class="scenario-avatar"><i class="ti ti-building-store"></i></div><div><b>Café</b><small>Real conversation</small></div><span class="online-dot"></span></div>
                <div class="chat-bubble bot">Hi! What can I get for you?</div>
                <div class="chat-bubble user">I’d like a coffee, please.</div>
                <div class="chat-score"><i class="ti ti-sparkles"></i> AI feedback ready</div>
              </div>
              <h3>Real vaziyatlarda<br />gapiring.</h3>
              <p>AI bilan kafe, travel va ish kabi scenario’larda mashq qiling.</p>
            </router-link>

            <router-link to="/grammar-quiz" class="bento-card bento-grammar reveal-up" style="--delay:.18s">
              <span class="bento-label">04 • SMART PRACTICE</span>
              <h3>12 xil mashq va test formatlari.</h3>
              <p>Vocabulary, grammar, visual choice, listening, word order, typing, translation va speaking kabi formatlar bir lesson ichida aralashadi.</p>
              <div class="format-pills">
                <span>Vocabulary</span><span>Grammar</span><span>Listening</span><span>Speaking</span><span>Typing</span><span>Translate</span>
              </div>
            </router-link>

            <router-link to="/progress" class="bento-card bento-progress reveal-up" style="--delay:.22s">
              <div>
                <span class="bento-label">05 • PROGRESS</span>
                <h3>O‘sishingizni ko‘ring.</h3>
                <p>XP, streak, skill activity va SRS review bir joyda.</p>
              </div>
              <div class="progress-visual">
                <div class="ring"><strong>72%</strong><span>weekly</span></div>
                <div class="bars">
                  <span style="--w:82%"><i></i><em>Vocabulary</em></span>
                  <span style="--w:66%"><i></i><em>Listening</em></span>
                  <span style="--w:58%"><i></i><em>Speaking</em></span>
                </div>
              </div>
            </router-link>

            <router-link to="/stories" class="bento-card bento-stories reveal-up" style="--delay:.26s">
              <span class="bento-label">06 • STORIES</span>
              <div class="story-card">
                <span class="story-level">B1</span>
                <strong>The Train to London</strong>
                <small>Read • Listen • Understand</small>
              </div>
              <h3>Hikoyalar bilan<br />readingni jonlantiring.</h3>
              <span class="bento-link">Stories <i class="ti ti-arrow-up-right"></i></span>
            </router-link>

            <router-link to="/flashcards" class="bento-card bento-srs reveal-up" style="--delay:.30s">
              <span class="bento-label">07 • SRS</span>
              <div class="srs-cards">
                <div class="srs-card back"><span>remember</span><small>eslab qolmoq</small></div>
                <div class="srs-card front"><span>opportunity</span><small>imkoniyat</small><b>NEW</b></div>
              </div>
              <h3>So‘zlarni unutib qo‘ymang.</h3>
              <p>Spaced repetition orqali kerakli so‘zlarni vaqtida qaytaring.</p>
            </router-link>

            <router-link to="/leaderboard" class="bento-card bento-social reveal-up" style="--delay:.34s">
              <div class="bento-topline"><span class="bento-label">08 • SOCIAL</span><span class="xp-chip">+XP</span></div>
              <h3>Do‘stlar bilan raqobat boring.</h3>
              <div class="leader-mini">
                <div><span>1</span><b>Aziz</b><em>2,340 XP</em></div>
                <div class="you"><span>4</span><b>You</b><em>1,980 XP</em></div>
                <div><span>5</span><b>Madina</b><em>1,820 XP</em></div>
              </div>
              <span class="bento-link">Leaderboard <i class="ti ti-arrow-up-right"></i></span>
            </router-link>
          </div>
        </div>
      </section>

      <!-- LESSON SHOWCASE -->
      <section id="lesson" class="section section-lesson">
        <div class="container showcase-grid">
          <div class="lesson-showcase reveal-up">
            <div class="lesson-shell">
              <div class="lesson-shell-top">
                <button type="button" aria-label="Close"><i class="ti ti-x"></i></button>
                <div class="shell-progress"><span></span></div>
                <div class="shell-hearts"><i class="ti ti-heart-filled"></i> 5</div>
              </div>

              <div class="lesson-shell-content">
                <div class="lesson-kicker"><i class="ti ti-sparkles"></i> VISUAL CHOICE</div>
                <h3>Which one is <span>“journey”?</span></h3>
                <p class="lesson-question-uz">sayohat</p>
                <div class="lesson-answer-grid">
                  <div class="answer-card active"><div class="answer-art"><i class="ti ti-plane"></i></div><span>journey</span><b>1</b></div>
                  <div class="answer-card"><div class="answer-art"><i class="ti ti-home"></i></div><span>building</span><b>2</b></div>
                  <div class="answer-card"><div class="answer-art"><i class="ti ti-coffee"></i></div><span>coffee</span><b>3</b></div>
                </div>
              </div>

              <div class="lesson-feedback-bar">
                <div class="lesson-success-icon"><i class="ti ti-check"></i></div>
                <div><strong>Nice job!</strong><span>+10 XP • To‘g‘ri javob</span></div>
                <button type="button">CONTINUE <i class="ti ti-arrow-right"></i></button>
              </div>
            </div>
          </div>

          <div class="showcase-copy reveal-up" style="--delay:.10s">
            <span class="section-kicker">LESSON EXPERIENCE</span>
            <h2>Har bir lesson — kichik game session.</h2>
            <p>EnglishXP’da dars faqat “variantni belgilang” bilan tugamaydi. Savol turi almashadi, javobdan keyin feedback keladi va keyingi challenge darhol tayyor bo‘ladi.</p>

            <div class="check-list">
              <div><span><i class="ti ti-check"></i></span><p><b>Visual choice</b><small>Rasm va variantlar bilan yangi so‘zni toping.</small></p></div>
              <div><span><i class="ti ti-check"></i></span><p><b>Listening</b><small>Audio tinglang va eshitganingizni ajrating.</small></p></div>
              <div><span><i class="ti ti-check"></i></span><p><b>Word order & typing</b><small>Gapni tuzing yoki javobni o‘zingiz yozing.</small></p></div>
              <div><span><i class="ti ti-check"></i></span><p><b>Speaking</b><small>Mikrofon orqali talaffuz va gapirish mashqi.</small></p></div>
            </div>

            <router-link to="/login" class="text-cta">Birinchi lessonni boshlash <i class="ti ti-arrow-right"></i></router-link>
          </div>
        </div>
      </section>

      <!-- AI SECTION -->
      <section class="section section-ai-showcase">
        <div class="container ai-showcase-grid">
          <div class="showcase-copy reveal-up">
            <span class="section-kicker">AI TEACHER</span>
            <h2>“Nega bu grammar xato?”<br />degan savol qolib ketmaydi.</h2>
            <p>AI Teacher’ni lesson bilan yonma-yon ishlatish mumkin: mavzuni so‘raysiz, misol olasiz, keyin shu mavzu bo‘yicha practice qilasiz.</p>
            <div class="ai-feature-list">
              <span><i class="ti ti-message-circle"></i> Grammar explanation</span>
              <span><i class="ti ti-bulb"></i> Examples</span>
              <span><i class="ti ti-language"></i> Vocabulary help</span>
              <span><i class="ti ti-refresh"></i> Extra practice</span>
            </div>
            <router-link to="/login" class="text-cta">AI Teacher’ni sinab ko‘rish <i class="ti ti-arrow-right"></i></router-link>
          </div>

          <div class="ai-chat-mock reveal-up" style="--delay:.12s">
            <div class="ai-chat-head"><div class="ai-avatar"><i class="ti ti-sparkles"></i></div><div><strong>EnglishXP AI Teacher</strong><span>Always ready to help</span></div><span class="ai-status"></span></div>
            <div class="ai-messages">
              <div class="ai-message user">Why do we say “I went” instead of “I go” yesterday?</div>
              <div class="ai-message assistant"><div class="assistant-label">AI TEACHER</div><p>Because <b>yesterday</b> shows a finished time in the past. We use <b>Past Simple</b>:</p><div class="example-box"><span>✅ I <b>went</b> to Samarkand yesterday.</span><span>❌ I <b>go</b> to Samarkand yesterday.</span></div></div>
              <div class="ai-message user small">Give me one more practice.</div>
              <div class="ai-message assistant typing"><i class="ti ti-dots"></i> Creating practice…</div>
            </div>
            <div class="ai-input"><span>Ask anything about English…</span><i class="ti ti-send"></i></div>
          </div>
        </div>
      </section>

      <!-- IELTS -->
      <section id="ielts" class="section section-ielts">
        <div class="container ielts-card reveal-up">
          <div class="ielts-copy">
            <span class="section-kicker">IELTS MODE</span>
            <h2>General English’dan<br /><span>IELTS practice</span>gacha.</h2>
            <p>Vocabulary va grammar bazasini mustahkamlab, keyin Reading, Listening, Writing va Speaking yo‘nalishlarida maqsadli practice qiling.</p>
            <div class="ielts-skills"><span><i class="ti ti-headphones"></i> Listening</span><span><i class="ti ti-book"></i> Reading</span><span><i class="ti ti-pencil"></i> Writing</span><span><i class="ti ti-microphone"></i> Speaking</span></div>
            <router-link to="/login" class="btn-dark">IELTS yo‘nalishini ochish <i class="ti ti-arrow-right"></i></router-link>
          </div>
          <div class="ielts-path">
            <div class="ielts-glow"></div>
            <div class="ielts-path-head"><span>YOUR PATH</span><strong>English → IELTS</strong></div>
            <div class="ielts-track"><span class="track-fill"></span></div>
            <div class="ielts-nodes"><div class="complete"><i class="ti ti-check"></i><span>A2</span></div><div class="complete"><i class="ti ti-check"></i><span>B1</span></div><div class="current"><i class="ti ti-target"></i><span>B2</span></div><div><i class="ti ti-lock"></i><span>IELTS</span></div></div>
            <div class="ielts-stat-row"><div><strong>4</strong><span>Skill</span></div><div><strong>15+</strong><span>Levels</span></div><div><strong>∞</strong><span>Practice</span></div></div>
          </div>
        </div>
      </section>

      <!-- GAMIFICATION -->
      <section class="section section-game">
        <div class="container">
          <div class="section-heading centered reveal-up">
            <span class="section-kicker">GAME LOOP</span>
            <h2>O‘rganish — odatga aylansin.</h2>
            <p>XP, streak, daily goal, leaderboard va rewardlar userni keyingi darsga qaytaradigan progress loop yaratadi.</p>
          </div>
          <div class="game-loop reveal-up">
            <div class="loop-step"><span class="loop-icon"><i class="ti ti-book"></i></span><strong>Learn</strong><small>Yangi bilim</small></div>
            <i class="ti ti-chevron-right loop-arrow"></i>
            <div class="loop-step"><span class="loop-icon"><i class="ti ti-bolt"></i></span><strong>Earn XP</strong><small>Natijani ko‘ring</small></div>
            <i class="ti ti-chevron-right loop-arrow"></i>
            <div class="loop-step"><span class="loop-icon"><i class="ti ti-flame"></i></span><strong>Keep streak</strong><small>Har kuni qayting</small></div>
            <i class="ti ti-chevron-right loop-arrow"></i>
            <div class="loop-step"><span class="loop-icon"><i class="ti ti-swords"></i></span><strong>Compete</strong><small>Duels & leaderboard</small></div>
            <i class="ti ti-chevron-right loop-arrow"></i>
            <div class="loop-step"><span class="loop-icon"><i class="ti ti-chart-line"></i></span><strong>Improve</strong><small>Progress & SRS</small></div>
          </div>
        </div>
      </section>

      <!-- EXTRA PRODUCT TOOLS -->
      <section class="section section-tools">
        <div class="container">
          <div class="section-heading centered reveal-up">
            <span class="section-kicker">MORE INSIDE ENGLISHXP</span>
            <h2>Asosiy darslardan tashqari<br />yana ko‘p narsa bor.</h2>
            <p>Foydalanuvchi EnglishXP’ga kirgan zahoti platformadagi asosiy yo‘nalishlarni ko‘ra olishi kerak.</p>
          </div>

          <div class="tools-grid">
            <router-link to="/daily-challenge" class="tool-card reveal-up">
              <span class="tool-icon orange"><i class="ti ti-calendar-star"></i></span>
              <div><b>Daily Challenge</b><small>Har kuni yangi mini challenge.</small></div>
              <i class="ti ti-arrow-up-right tool-arrow"></i>
            </router-link>
            <router-link to="/pronunciation" class="tool-card reveal-up" style="--delay:.06s">
              <span class="tool-icon purple"><i class="ti ti-microphone"></i></span>
              <div><b>Pronunciation</b><small>Talaffuzni alohida mashq qiling.</small></div>
              <i class="ti ti-arrow-up-right tool-arrow"></i>
            </router-link>
            <router-link to="/writing" class="tool-card reveal-up" style="--delay:.12s">
              <span class="tool-icon blue"><i class="ti ti-pencil"></i></span>
              <div><b>Writing</b><small>Yozma topshiriqlar va practice.</small></div>
              <i class="ti ti-arrow-up-right tool-arrow"></i>
            </router-link>
            <router-link to="/community" class="tool-card reveal-up" style="--delay:.18s">
              <span class="tool-icon pink"><i class="ti ti-users"></i></span>
              <div><b>Community</b><small>O‘quvchilar bilan ijtimoiy tajriba.</small></div>
              <i class="ti ti-arrow-up-right tool-arrow"></i>
            </router-link>
            <router-link to="/shop" class="tool-card reveal-up" style="--delay:.24s">
              <span class="tool-icon green"><i class="ti ti-shopping-bag"></i></span>
              <div><b>Rewards Shop</b><small>Gems bilan power-up va avatarlar.</small></div>
              <i class="ti ti-arrow-up-right tool-arrow"></i>
            </router-link>
            <router-link to="/match-madness" class="tool-card reveal-up" style="--delay:.30s">
              <span class="tool-icon yellow"><i class="ti ti-bolt"></i></span>
              <div><b>Match Madness</b><small>Tezkor o‘yin va bonus XP.</small></div>
              <i class="ti ti-arrow-up-right tool-arrow"></i>
            </router-link>
          </div>
        </div>
      </section>

      <!-- FINAL CTA -->
      <section class="section final-cta-section">
        <div class="container">
          <div class="final-cta reveal-up">
            <div class="cta-glow"></div>
            <span class="section-kicker">READY?</span>
            <h2>Bugun 10 daqiqa.<br /><span>Keyin real English.</span></h2>
            <p>EnglishXP’da birinchi darsni boshlash uchun ortiqcha murakkablik kerak emas.</p>
            <div class="final-actions">
              <router-link to="/login" class="btn-primary hero-primary">Bepul boshlash <i class="ti ti-arrow-right"></i></router-link>
              <router-link to="/login" class="btn-secondary">Kirish</router-link>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="container footer-top">
        <router-link to="/" class="brand">
          <span class="brand-mark"><i class="ti ti-bolt"></i></span>
          <span class="brand-name">English<span>XP</span></span>
        </router-link>
        <p>Ingliz tilini o‘yin kabi emas — <strong>foydali odat kabi</strong> o‘rganing.</p>
        <router-link to="/login" class="footer-link">Bepul boshlash <i class="ti ti-arrow-up-right"></i></router-link>
      </div>
      <div class="container footer-bottom">
        <span>© {{ new Date().getFullYear() }} EnglishXP</span>
        <span>Learn • Practice • Speak • Improve</span>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useScrollReveal } from '../composables/useScrollReveal.js'
import AuroraBackground from '../components/AuroraBackground.vue'

const mobileOpen = ref(false)
useScrollReveal()
</script>

<style scoped>
:global(html) {
  scroll-behavior: smooth;
}

.landing-page {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background:
    radial-gradient(circle at 10% -5%, rgba(60, 230, 125, .12), transparent 34%),
    radial-gradient(circle at 92% 7%, rgba(60, 230, 125, .08), transparent 28%),
    var(--bg-void);
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  border-bottom: 1px solid var(--border-glass);
  background: rgba(247, 250, 248, .78);
  backdrop-filter: blur(22px) saturate(145%);
  -webkit-backdrop-filter: blur(22px) saturate(145%);
}

.header-inner { height: 76px; display: flex; align-items: center; gap: 28px; }
.brand { display: inline-flex; align-items: center; gap: 10px; flex-shrink: 0; }
.brand-mark { width: 34px; height: 34px; display: grid; place-items: center; border-radius: 11px; background: var(--accent); color: #0a1810; box-shadow: 0 10px 24px rgba(60, 230, 125, .22); }
.brand-mark i { font-size: 18px; }
.brand-name { font-family: var(--font-display); font-size: 19px; font-weight: 900; letter-spacing: -.04em; }
.brand-name > span { color: var(--accent-dim); }
.desktop-nav { flex: 1; display: flex; align-items: center; justify-content: center; gap: 26px; }
.desktop-nav a, .text-link { color: var(--text-secondary); font-size: 13px; font-weight: 700; transition: color .2s ease; }
.desktop-nav a:hover, .text-link:hover { color: var(--text-primary); }
.header-actions { display: flex; align-items: center; gap: 15px; }
.header-cta, .btn-primary, .btn-secondary, .btn-dark { display: inline-flex; align-items: center; justify-content: center; gap: 9px; border-radius: 14px; font-weight: 850; transition: transform .22s var(--ease-premium), box-shadow .22s ease, background .22s ease; }
.header-cta { padding: 11px 15px; background: #0c1712; color: #fff; font-size: 12px; box-shadow: 0 10px 25px rgba(12, 23, 18, .13); }
.header-cta:hover, .btn-dark:hover { transform: translateY(-2px); }
.header-cta i { font-size: 15px; color: var(--accent); }
.mobile-menu-btn { display: none; width: 40px; height: 40px; border: 1px solid var(--card-border); border-radius: 12px; background: var(--card-bg); color: var(--text-primary); }
.mobile-nav { display: none; }

.hero-section { position: relative; padding: 76px 0 22px; z-index: 1; }
.hero-grid { display: grid; grid-template-columns: minmax(0, .93fr) minmax(520px, 1.07fr); align-items: center; gap: 54px; min-height: 640px; }
.hero-copy { position: relative; z-index: 2; padding: 20px 0 32px; }
.eyebrow, .section-kicker, .bento-label { letter-spacing: .12em; text-transform: uppercase; font-weight: 900; }
.eyebrow { display: inline-flex; align-items: center; gap: 9px; color: var(--accent-dim); font-size: 11px; margin-bottom: 22px; }
.live-dot { width: 7px; height: 7px; background: var(--accent); border-radius: 50%; box-shadow: 0 0 0 6px rgba(60,230,125,.12); }
.hero-title { max-width: 670px; margin: 0; font-family: var(--font-display); font-size: clamp(48px, 5.6vw, 78px); line-height: .99; letter-spacing: -.065em; font-weight: 900; }
.hero-highlight { color: var(--accent-dim); position: relative; white-space: nowrap; }
.hero-highlight::after { content: ''; position: absolute; height: 10px; left: 2px; right: 4px; bottom: 4px; border-radius: 100px; background: rgba(60, 230, 125, .22); filter: blur(5px); z-index: -1; }
.hero-lead { max-width: 620px; margin: 24px 0 0; color: var(--text-secondary); font-size: 17px; line-height: 1.7; }
.hero-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 16px; margin-top: 32px; }
.hero-primary { min-height: 52px; padding: 0 20px; box-shadow: 0 14px 34px rgba(60, 230, 125, .18); }
.hero-primary:hover { transform: translateY(-3px); box-shadow: 0 18px 38px rgba(60, 230, 125, .24); }
.hero-demo-link { display: inline-flex; align-items: center; gap: 10px; color: var(--text-primary); font-size: 13px; font-weight: 800; }
.play-circle { width: 34px; height: 34px; display: grid; place-items: center; border: 1px solid var(--card-border); background: var(--card-bg); border-radius: 50%; box-shadow: 0 8px 22px rgba(13,17,16,.08); }
.play-circle i { font-size: 13px; margin-left: 1px; }
.hero-meta { display: flex; flex-wrap: wrap; gap: 18px; margin-top: 27px; }
.hero-meta-item { display: inline-flex; align-items: center; gap: 7px; color: var(--text-muted); font-size: 11px; font-weight: 700; }
.hero-meta-item i { color: var(--accent-dim); font-size: 15px; }

.hero-product { position: relative; padding: 9px 12px 54px; }
.product-window { background: #101b18; border-radius: 30px; border: 1px solid rgba(255,255,255,.09); box-shadow: 0 45px 100px rgba(16,27,24,.20), 0 10px 28px rgba(16,27,24,.13); overflow: hidden; transform: rotate(1.1deg); }
.window-topbar { height: 53px; padding: 0 18px; display: flex; align-items: center; gap: 14px; background: #13231f; border-bottom: 1px solid rgba(255,255,255,.07); color: #a9bab5; }
.window-dots { display: flex; gap: 6px; }
.window-dots span { width: 7px; height: 7px; border-radius: 50%; background: #41514c; }
.window-title { flex: 1; text-align: center; font-size: 11px; font-weight: 800; letter-spacing: .04em; }
.window-actions { display: flex; gap: 11px; font-size: 11px; font-weight: 800; }
.window-actions span:first-child { color: #9ce246; }
.window-actions span:last-child { color: #ff6a70; }
.product-body { padding: 25px; background: linear-gradient(180deg, #11201c, #152722); }
.learning-topline { display: flex; align-items: center; justify-content: space-between; color: #81948f; font-size: 11px; font-weight: 700; }
.learning-topline strong { color: #eaf2ef; }
.learning-topline em { color: #9fdf3e; font-style: normal; margin-left: 7px; }
.learning-progress, .mini-progress { height: 8px; border-radius: 100px; background: #293b36; overflow: hidden; }
.learning-progress { margin: 10px 0 22px; }
.learning-progress span { display: block; width: 68%; height: 100%; background: linear-gradient(90deg, #8bd126, #a9ef44); border-radius: inherit; }
.lesson-preview-card { background: #15251f; border: 1px solid #31433d; border-radius: 23px; padding: 25px; }
.preview-kicker, .lesson-kicker { color: #c46cff; font-size: 10px; font-weight: 900; letter-spacing: .12em; }
.lesson-kicker { color: #bfa8ff; }
.lesson-preview-card h3 { font-family: var(--font-display); color: #f2f6f4; font-size: clamp(22px, 3vw, 30px); line-height: 1.18; margin: 14px 0 3px; letter-spacing: -.04em; }
.lesson-preview-card h3 span, .lesson-shell-content h3 span { color: #9ce33d; }
.lesson-preview-card p { color: #7f928d; font-size: 12px; margin: 0 0 18px; }
.preview-options, .lesson-answer-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.preview-option { position: relative; min-height: 132px; padding: 13px; border: 1px solid #344944; border-radius: 17px; background: #192d26; display: flex; flex-direction: column; justify-content: flex-end; gap: 8px; color: #dce6e2; }
.preview-option.selected { border-color: #86c52a; box-shadow: inset 0 0 0 1px rgba(134,197,42,.35); }
.option-icon, .answer-art { display: grid; place-items: center; height: 64px; border-radius: 13px; background: linear-gradient(145deg, #243d34, #1b3029); color: #b6e953; font-size: 34px; }
.preview-option span { font-size: 11px; font-weight: 800; }
.preview-option b { position: absolute; right: 9px; top: 9px; width: 22px; height: 22px; display: grid; place-items: center; border-radius: 7px; background: #233832; color: #78908a; font-size: 10px; }
.preview-option.selected b { color: #0d1a0e; background: #9ce43a; }
.preview-feedback { display: flex; align-items: center; gap: 11px; margin-top: 16px; padding-top: 14px; border-top: 1px solid #30433d; }
.feedback-check, .lesson-success-icon { width: 38px; height: 38px; flex-shrink: 0; display: grid; place-items: center; border-radius: 50%; background: #20352c; color: #9fe540; }
.preview-feedback div:nth-child(2), .lesson-feedback-bar div:nth-child(2) { display: flex; flex-direction: column; gap: 2px; }
.preview-feedback strong, .lesson-feedback-bar strong { color: #9de440; font-size: 13px; }
.preview-feedback span, .lesson-feedback-bar span { color: #71847e; font-size: 10px; }
.preview-feedback button, .lesson-feedback-bar button { margin-left: auto; border: 0; background: #9be035; color: #12200f; border-radius: 12px; font-size: 10px; font-weight: 900; padding: 10px 14px; }
.product-bottom-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 13px; }
.mini-stat { background: #13241f; border: 1px solid #2d403a; border-radius: 16px; padding: 13px; }
.mini-label { display: block; color: #687c75; font-size: 8px; font-weight: 900; letter-spacing: .12em; }
.mini-stat strong { display: block; margin-top: 5px; color: #e6f0eb; font-size: 16px; }
.mini-progress { margin-top: 10px; height: 5px; }
.mini-progress span { display: block; height: 100%; border-radius: inherit; background: #91d630; }
.mini-link { display: block; margin-top: 8px; color: #9adb37; font-size: 9px; font-weight: 800; }
.floating-card { position: absolute; display: flex; align-items: center; gap: 10px; background: rgba(255,255,255,.92); border: 1px solid rgba(13,17,16,.08); border-radius: 18px; padding: 12px 14px; box-shadow: 0 22px 45px rgba(13,17,16,.14); backdrop-filter: blur(16px); animation: floatCard 5.8s ease-in-out infinite; }
.floating-card > div:last-child { display: flex; flex-direction: column; gap: 2px; }
.floating-card b { font-size: 12px; }
.floating-card span { font-size: 10px; color: var(--text-muted); font-weight: 700; }
.floating-icon { width: 35px; height: 35px; display: grid; place-items: center; border-radius: 11px; }
.floating-icon.flame { background: rgba(60,230,125,.14); color: #6eb51d; }
.floating-icon.ai { background: rgba(190,115,255,.12); color: #9d55e6; }
.floating-streak { right: -12px; top: 58px; }
.floating-ai { left: -24px; bottom: 55px; animation-delay: -2.8s; }
@keyframes floatCard { 0%,100%{ transform: translateY(0) } 50%{ transform: translateY(-9px) } }

.skill-strip { display: flex; align-items: center; gap: 12px; padding: 16px 18px; margin-top: 12px; border: 1px solid var(--card-border); border-radius: 18px; background: rgba(255,255,255,.66); box-shadow: 0 18px 44px rgba(13,17,16,.05); flex-wrap: wrap; }
.skill-strip > span { color: var(--text-muted); font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: .1em; margin-right: 4px; }
.skill-strip div { display: inline-flex; align-items: center; gap: 6px; padding: 7px 10px; border-radius: 10px; background: var(--surface-glass); color: var(--text-secondary); font-size: 10px; font-weight: 800; }
.skill-strip div i { color: var(--accent-dim); font-size: 14px; }

.section { position: relative; z-index: 1; padding: 120px 0; }
.section-heading { max-width: 720px; }
.section-heading.centered { max-width: 760px; margin: 0 auto 56px; text-align: center; }
.section-kicker { color: var(--accent-dim); font-size: 10px; }
.section-heading h2, .showcase-copy h2, .ielts-copy h2, .final-cta h2 { font-family: var(--font-display); font-weight: 900; letter-spacing: -.055em; line-height: 1.04; font-size: clamp(34px, 4.4vw, 56px); margin: 13px 0 17px; }
.section-heading p, .showcase-copy > p, .ielts-copy > p, .final-cta > p { color: var(--text-secondary); line-height: 1.72; font-size: 15px; max-width: 650px; margin: 0; }
.section-heading.centered p { margin: 0 auto; }

.section-how { padding-top: 94px; }
.steps-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
.step-card { position: relative; min-height: 290px; padding: 30px; border: 1px solid var(--card-border); border-radius: 23px; background: var(--card-bg); box-shadow: 0 16px 38px rgba(13,17,16,.045); overflow: hidden; }
.step-number { position: absolute; right: 22px; top: 22px; color: var(--text-muted); font-size: 10px; font-weight: 900; letter-spacing: .1em; }
.step-icon { width: 48px; height: 48px; display: grid; place-items: center; border-radius: 15px; background: rgba(60,230,125,.12); color: var(--accent-dim); font-size: 22px; margin-bottom: 34px; }
.step-card h3 { font-family: var(--font-display); font-size: 18px; margin: 0 0 10px; }
.step-card p { color: var(--text-secondary); font-size: 13px; line-height: 1.62; max-width: 300px; margin: 0; }

.section-features { padding-top: 70px; }
.feature-bento { display: grid; grid-template-columns: repeat(12, 1fr); gap: 16px; }
.bento-card { position: relative; min-height: 280px; padding: 28px; border-radius: 24px; border: 1px solid var(--card-border); background: var(--card-bg); color: var(--text-primary); overflow: hidden; transition: transform .28s var(--ease-premium), box-shadow .28s ease, border-color .28s ease; }
.bento-card:hover { transform: translateY(-5px); border-color: rgba(60,230,125,.52); box-shadow: 0 24px 60px rgba(13,17,16,.10); }
.bento-copy { position: relative; z-index: 2; max-width: 55%; }
.bento-label { color: var(--text-muted); font-size: 9px; }
.bento-card h3 { font-family: var(--font-display); font-size: clamp(22px, 2.2vw, 31px); letter-spacing: -.045em; line-height: 1.12; margin: 13px 0 10px; }
.bento-card p { color: var(--text-secondary); font-size: 12px; line-height: 1.6; margin: 0; max-width: 410px; }
.bento-link { display: inline-flex; align-items: center; gap: 7px; color: var(--accent-dim); font-size: 11px; font-weight: 900; margin-top: 18px; }
.bento-path { grid-column: span 7; min-height: 370px; background: linear-gradient(135deg, #fff, #f0f8f3); }
.bento-path .path-visual { position: absolute; inset: 28px 28px 26px auto; width: 43%; }
.path-line { position: absolute; left: 26px; top: 30px; bottom: 30px; width: 2px; background: repeating-linear-gradient(to bottom, #badcc7 0 7px, transparent 7px 13px); }
.path-level { position: relative; display: flex; align-items: center; gap: 12px; height: 60px; margin-bottom: 8px; padding-left: 8px; }
.path-level::before { content: ''; width: 38px; height: 38px; display: grid; place-items: center; border-radius: 50%; background: #e4ece8; border: 3px solid #fff; box-shadow: 0 9px 24px rgba(13,17,16,.08); }
.path-level span { position: absolute; left: 17px; z-index: 2; color: #67756e; font-size: 10px; font-weight: 900; }
.path-level i { font-size: 13px; }
.path-level.done::before, .path-level.active::before { background: #9ce23d; }
.path-level.done i, .path-level.active i { color: #0f1d10; }
.path-level.active::after { content: ''; position: absolute; left: 10px; width: 34px; height: 34px; border: 1px solid rgba(60,230,125,.7); border-radius: 50%; animation: ringPulse 2s infinite; }
.path-level:not(.active):not(.done) i { color: #b5c1bc; }
@keyframes ringPulse { 0%,100%{transform:scale(1);opacity:.3} 50%{transform:scale(1.22);opacity:0} }
.bento-ai { grid-column: span 5; background: #0e1a15; color: #eef4f1; }
.bento-ai p, .bento-ai .bento-label { color: #8ea29a; }
.bento-ai .bento-link { color: #a3e544; }
.ai-orb { width: 68px; height: 68px; display: grid; place-items: center; margin: 4px 0 20px; border-radius: 23px; color: #c582ff; background: radial-gradient(circle at 30% 25%, #3a234f, #20172a); box-shadow: 0 15px 42px rgba(152,90,213,.18); font-size: 27px; }
.bento-ai h3 span { color: #b678f1; }
.bento-roleplay { grid-column: span 5; background: linear-gradient(145deg, #fffdf8, #fbf3df); }
.bento-roleplay .bento-topline, .bento-social .bento-topline { display: flex; justify-content: space-between; align-items: center; }
.pro-pill, .xp-chip { padding: 5px 8px; border-radius: 100px; font-size: 8px; font-weight: 900; }
.pro-pill { color: #5a3700; background: linear-gradient(135deg, #f7ce69, #eaa446); }
.xp-chip { color: #245610; background: rgba(60,230,125,.14); }
.conversation-ui { margin: 18px 0 10px; padding: 14px; border: 1px solid #eadfc8; border-radius: 18px; background: rgba(255,255,255,.7); }
.conversation-head { display:flex; align-items:center; gap:9px; }
.scenario-avatar { width: 30px; height: 30px; display:grid; place-items:center; border-radius:10px; background:#f0dbaa; color:#85651c; }
.conversation-head > div:nth-child(2) { display:flex; flex-direction:column; gap:1px; }
.conversation-head b { font-size: 10px; }
.conversation-head small { color: #8b867b; font-size: 8px; }
.online-dot { width: 6px; height: 6px; margin-left:auto; border-radius:50%; background:#65bf57; }
.chat-bubble { width: fit-content; max-width: 90%; margin-top:10px; padding:8px 10px; border-radius:12px; font-size:8px; line-height:1.45; }
.chat-bubble.bot { color:#4d564f; background:#f0f4ee; }
.chat-bubble.user { margin-left:auto; color:#193016; background:#dbf3bf; }
.chat-score { margin-top:11px; font-size:8px; color:#6c9234; font-weight:900; }
.bento-roleplay h3 { font-size: 21px; }
.bento-roleplay p { max-width: 350px; }
.bento-grammar { grid-column: span 7; min-height: 310px; }
.format-pills { position:absolute; left:28px; right:28px; bottom:28px; display:flex; gap:7px; flex-wrap:wrap; }
.format-pills span { padding:7px 10px; border-radius:10px; background:var(--surface-glass); border:1px solid var(--card-border); color:var(--text-secondary); font-size:9px; font-weight:900; }
.bento-progress { grid-column: span 5; display:grid; grid-template-columns: 1fr .9fr; gap:12px; align-items:center; min-height:310px; }
.progress-visual { display:flex; flex-direction:column; gap:16px; }
.ring { width:124px; height:124px; margin:0 auto; border-radius:50%; background: conic-gradient(var(--accent-dim) 0 72%, #e8eeea 72% 100%); display:grid; place-content:center; text-align:center; position:relative; }
.ring::after { content:''; position:absolute; inset:10px; border-radius:50%; background:var(--card-bg); }
.ring strong,.ring span{position:relative; z-index:1; display:block}.ring strong{font-size:24px;font-family:var(--font-display)}.ring span{font-size:8px;color:var(--text-muted);font-weight:800}
.bars { display:flex; flex-direction:column; gap:8px; }
.bars span { display:block; position:relative; padding-top:14px; }
.bars i { display:block; height:6px; width:var(--w); border-radius:99px; background:var(--accent-dim); opacity:.86; }
.bars em { position:absolute; top:0; left:0; color:var(--text-muted); font-size:7px; font-style:normal; font-weight:800; }
.bento-stories { grid-column: span 4; min-height: 305px; background: linear-gradient(145deg, #f6f8ff, #eef1ff); }
.story-card { margin: 17px 0 15px; padding: 17px; border-radius: 18px; background: #252a46; color: #eef0ff; box-shadow: 0 16px 30px rgba(37,42,70,.18); }
.story-level { display:inline-block; padding:4px 7px; border-radius:7px; background: rgba(255,255,255,.1); font-size:8px; font-weight:900; letter-spacing:.1em; }
.story-card strong { display:block; font-size:15px; margin-top:15px; }
.story-card small { display:block; margin-top:5px; color:#b7bdd9; font-size:8px; }
.bento-stories h3 { font-size:20px; }
.bento-srs { grid-column: span 4; min-height:305px; background: linear-gradient(145deg,#fdfdfb,#edf6f0); }
.srs-cards { height:117px; margin:18px 0 15px; position:relative; }
.srs-card { position:absolute; width:170px; height:96px; border-radius:16px; display:flex; flex-direction:column; justify-content:center; padding:16px; }
.srs-card span{font-weight:900;font-size:14px}.srs-card small{margin-top:4px;color:var(--text-muted);font-size:8px}.srs-card.back{right:0;top:0;transform:rotate(5deg);background:#d9e4de;color:#66746e}.srs-card.front{left:0;top:20px;background:#fff;border:1px solid var(--card-border);box-shadow:0 16px 30px rgba(13,17,16,.10)}.srs-card b{position:absolute;right:10px;top:9px;color:var(--accent-dim);font-size:7px;letter-spacing:.1em}
.bento-social { grid-column: span 4; min-height:305px; background: #0e1b16; color:#eef5f2; }
.bento-social p,.bento-social .bento-label{color:#91a49d}.bento-social .bento-link{color:#a5e646}.leader-mini{display:flex;flex-direction:column;gap:8px;margin:20px 0 3px}.leader-mini div{display:grid;grid-template-columns:21px 1fr auto;align-items:center;gap:8px;padding:8px 10px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.06);border-radius:12px}.leader-mini span{font-size:8px;color:#8b9d96}.leader-mini b{font-size:9px}.leader-mini em{font-style:normal;font-size:8px;color:#8ca49a}.leader-mini .you{border-color:rgba(60,230,125,.35);background:rgba(60,230,125,.07)}

.section-lesson { padding-top: 105px; background: linear-gradient(180deg, rgba(13,17,16,0), rgba(13,17,16,.028)); }
.showcase-grid { display:grid; grid-template-columns:minmax(0,1.12fr) minmax(330px,.88fr); align-items:center; gap:78px; }
.lesson-showcase { position:relative; }
.lesson-shell { position:relative; background:#101b18; border-radius:30px; border:1px solid rgba(255,255,255,.08); overflow:hidden; box-shadow:0 36px 90px rgba(13,17,16,.18); }
.lesson-shell-top { height:59px; display:grid; grid-template-columns:42px 1fr 64px; align-items:center; gap:12px; padding:0 16px; background:#13231f; }
.lesson-shell-top button { width:34px;height:34px;border:0;background:transparent;color:#7d9189; }
.shell-progress { height:7px; border-radius:100px; background:#30413c; overflow:hidden; }
.shell-progress span{display:block;width:32%;height:100%;background:#96dc35;border-radius:inherit}
.shell-hearts { font-size:11px;color:#ff6c71;font-weight:900;text-align:right }
.lesson-shell-content { min-height:385px; padding:50px 48px 36px; }
.lesson-shell-content h3 { font-family:var(--font-display);color:#f0f5f2;font-size:31px;line-height:1.15;letter-spacing:-.04em;margin:16px 0 3px; }
.lesson-question-uz { color:#80928d; font-size:12px; margin:0 0 22px; }
.answer-card { position:relative; min-height:180px;padding:15px;border-radius:18px;border:1px solid #384d45;background:#1a2b26;color:#e8f0ed;display:flex;flex-direction:column;justify-content:flex-end;gap:10px; }
.answer-card.active { border:2px solid #83c328; background:#1d342a; box-shadow:0 0 0 1px rgba(131,195,40,.12), 0 15px 30px rgba(131,195,40,.07); }
.answer-card b { position:absolute; right:12px; top:12px; width:23px;height:23px;display:grid;place-items:center;border-radius:7px;background:#243830;color:#7f938c;font-size:10px; }
.answer-card.active b { background:#8fd12a;color:#11200c }
.answer-card span { font-size:11px;font-weight:900 }
.answer-art { height:110px;font-size:52px }
.lesson-feedback-bar { padding:18px 23px;display:flex;align-items:center;gap:12px;background:#1b3029;border-top:1px solid #30433c; }
.lesson-feedback-bar button { padding:11px 17px; }
.check-list { display:flex; flex-direction:column; gap:15px; margin-top:27px; }
.check-list > div { display:flex; align-items:flex-start; gap:11px; }
.check-list > div > span { width:26px;height:26px;display:grid;place-items:center;border-radius:8px;background:rgba(60,230,125,.12);color:var(--accent-dim);flex-shrink:0; }
.check-list p { margin:0;display:flex;flex-direction:column;gap:3px; }
.check-list b { font-size:13px; }.check-list small { color:var(--text-secondary);font-size:11px;line-height:1.5; }
.text-cta { display:inline-flex;align-items:center;gap:8px;color:var(--accent-dim);font-size:12px;font-weight:900;margin-top:28px; }

.section-ai-showcase { background:#0d1512; color:#eff5f2; }
.ai-showcase-grid { display:grid;grid-template-columns:.85fr 1.15fr;align-items:center;gap:74px; }
.section-ai-showcase .showcase-copy > p { color:#9bacA5; }
.ai-feature-list { display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:25px; }
.ai-feature-list span { display:flex;align-items:center;gap:8px;padding:10px 12px;border:1px solid rgba(255,255,255,.07);border-radius:12px;background:rgba(255,255,255,.035);color:#d5e0db;font-size:10px;font-weight:800; }
.ai-feature-list i { color:#ae70ec; }
.ai-chat-mock { background:#15221e;border:1px solid rgba(255,255,255,.08);border-radius:26px;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.28); }
.ai-chat-head { display:flex;align-items:center;gap:11px;padding:18px;border-bottom:1px solid rgba(255,255,255,.07); }
.ai-avatar { width:38px;height:38px;display:grid;place-items:center;border-radius:13px;background:rgba(187,115,255,.12);color:#bd78ef; }
.ai-chat-head div:nth-child(2){display:flex;flex-direction:column;gap:2px}.ai-chat-head strong{font-size:11px}.ai-chat-head span{color:#7e9188;font-size:8px}.ai-status{width:7px;height:7px;border-radius:50%;background:#82d32e;margin-left:auto;box-shadow:0 0 0 5px rgba(130,211,46,.1);}
.ai-messages { padding:22px;display:flex;flex-direction:column;gap:13px;min-height:405px;background:linear-gradient(180deg,#11201b,#0f1a17); }
.ai-message { max-width:76%;padding:11px 13px;border-radius:15px;font-size:10px;line-height:1.55; }
.ai-message.user { align-self:flex-end;background:#dff2c3;color:#203017;border-bottom-right-radius:6px; }
.ai-message.user.small { font-size:9px; }
.ai-message.assistant { background:#1b3028;color:#d9e6e0;border:1px solid rgba(255,255,255,.06);border-bottom-left-radius:6px; }
.ai-message.assistant p { margin:7px 0 10px; }.assistant-label{font-size:7px;letter-spacing:.12em;font-weight:900;color:#b879ee}.example-box{display:flex;flex-direction:column;gap:5px;padding:9px;border-radius:10px;background:#10201a;border:1px solid rgba(255,255,255,.06)}.example-box span{font-size:9px}.ai-message.typing{color:#8ca198;display:inline-flex;align-items:center;gap:6px}
.ai-input { padding:14px 17px;display:flex;align-items:center;justify-content:space-between;border-top:1px solid rgba(255,255,255,.07);color:#72847d;font-size:10px; }
.ai-input i { color:#a8e345; font-size:15px; }

.section-ielts { padding-top: 105px; }
.ielts-card { display:grid;grid-template-columns:1fr .88fr;align-items:stretch;border-radius:30px;overflow:hidden;background:linear-gradient(135deg,#ecf8ef,#dcf3e4);border:1px solid #cfe6d6;box-shadow:0 24px 70px rgba(13,17,16,.08); }
.ielts-copy { padding:54px; }
.ielts-copy h2 span { color:var(--accent-dim); }
.ielts-skills{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:24px 0 27px}.ielts-skills span{display:inline-flex;align-items:center;gap:8px;color:#3e574c;font-size:10px;font-weight:900}.ielts-skills i{color:#6cae1b}.btn-dark{padding:13px 17px;background:#0d1712;color:#fff;font-size:11px}.btn-dark i{color:#9fe53f}
.ielts-path{position:relative;overflow:hidden;padding:44px;background:#10201a;color:#eff7f3;min-height:430px;display:flex;flex-direction:column;justify-content:center}.ielts-glow{position:absolute;width:330px;height:330px;border-radius:50%;background:radial-gradient(circle,rgba(114,229,110,.19),transparent 68%);top:-120px;right:-90px}.ielts-path-head{display:flex;justify-content:space-between;gap:10px;align-items:end}.ielts-path-head span{color:#6e847b;font-size:8px;font-weight:900;letter-spacing:.12em}.ielts-path-head strong{font-size:12px}.ielts-track{position:relative;height:7px;border-radius:100px;background:#2e4239;margin:44px 0 25px}.track-fill{display:block;width:68%;height:100%;border-radius:inherit;background:#91d72f;box-shadow:0 0 22px rgba(145,215,47,.18)}.ielts-nodes{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}.ielts-nodes > div{display:flex;flex-direction:column;align-items:center;gap:9px}.ielts-nodes i{width:32px;height:32px;display:grid;place-items:center;border-radius:50%;background:#1b3029;color:#63776e;font-size:12px}.ielts-nodes span{font-size:9px;color:#7e928a;font-weight:900}.ielts-nodes .complete i{background:#8ad12c;color:#11200d}.ielts-nodes .current i{border:1px solid #b57be5;background:rgba(180,120,229,.12);color:#c48df0;box-shadow:0 0 0 5px rgba(180,120,229,.07)}.ielts-stat-row{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:34px}.ielts-stat-row div{padding:13px;border-radius:14px;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.06)}.ielts-stat-row strong{display:block;font-family:var(--font-display);font-size:22px}.ielts-stat-row span{display:block;margin-top:3px;color:#72877f;font-size:8px;font-weight:800}

.section-tools { padding-top: 20px; }
.tools-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; }
.tool-card { min-height:94px; display:flex; align-items:center; gap:12px; padding:15px; border-radius:18px; border:1px solid var(--card-border); background:var(--card-bg); color:var(--text-primary); box-shadow:0 13px 32px rgba(13,17,16,.04); transition:transform .24s var(--ease-premium),border-color .24s ease,box-shadow .24s ease; }
.tool-card:hover { transform:translateY(-3px); border-color:rgba(60,230,125,.5); box-shadow:0 20px 42px rgba(13,17,16,.08); }
.tool-card > div { min-width:0; flex:1; display:flex; flex-direction:column; gap:4px; }
.tool-card b { font-size:12px; }
.tool-card small { color:var(--text-muted); font-size:9px; line-height:1.45; }
.tool-icon { width:38px; height:38px; display:grid; place-items:center; flex-shrink:0; border-radius:12px; font-size:17px; }
.tool-icon.orange { background:rgba(255,149,0,.12); color:#d47b00; }
.tool-icon.purple { background:rgba(180,120,235,.12); color:#9854cb; }
.tool-icon.blue { background:rgba(80,140,245,.12); color:#4b83dc; }
.tool-icon.pink { background:rgba(238,95,150,.12); color:#c24a7b; }
.tool-icon.green { background:rgba(60,230,125,.12); color:var(--accent-dim); }
.tool-icon.yellow { background:rgba(246,196,83,.13); color:#b8871d; }
.tool-arrow { margin-left:auto; color:var(--text-muted); font-size:14px; }

.section-game { padding-top: 100px; }
.game-loop { display:flex;align-items:center;justify-content:space-between;gap:10px;padding:18px;border:1px solid var(--card-border);border-radius:23px;background:var(--card-bg);box-shadow:0 18px 50px rgba(13,17,16,.05); }
.loop-step { flex:1;min-width:120px;display:flex;align-items:center;justify-content:center;flex-direction:column;text-align:center;gap:7px;padding:12px; }.loop-icon{width:44px;height:44px;display:grid;place-items:center;border-radius:14px;background:rgba(60,230,125,.11);color:var(--accent-dim);font-size:20px}.loop-step strong{font-size:11px}.loop-step small{color:var(--text-muted);font-size:8px;font-weight:800}.loop-arrow{color:#bac7c0;font-size:16px}

.final-cta-section { padding: 90px 0 120px; }
.final-cta { position:relative;overflow:hidden;padding:72px 28px;text-align:center;border-radius:32px;background:#0e1b16;color:#f3f8f5;border:1px solid rgba(255,255,255,.06);box-shadow:0 36px 90px rgba(13,17,16,.17); }
.cta-glow{position:absolute;width:450px;height:450px;left:50%;top:50%;transform:translate(-50%,-50%);border-radius:50%;background:radial-gradient(circle,rgba(60,230,125,.18),transparent 66%);pointer-events:none}.final-cta > *:not(.cta-glow){position:relative;z-index:1}.final-cta .section-kicker{color:#9ce33e}.final-cta h2{max-width:700px;margin:14px auto 16px}.final-cta h2 span{color:#9be33e}.final-cta > p{color:#93a69d;margin:0 auto}.final-actions{display:flex;justify-content:center;gap:10px;margin-top:28px}.final-actions .btn-secondary{padding:0 18px;min-height:52px;background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.1);color:#e8f0eb}.final-actions .btn-secondary:hover{border-color:#547266;background:rgba(255,255,255,.09)}

.site-footer { border-top:1px solid var(--border-glass);position:relative;z-index:1; }
.footer-top{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:28px;padding:34px 0}.footer-top p{margin:0;color:var(--text-muted);font-size:10px;text-align:center}.footer-top p strong{color:var(--text-secondary)}.footer-link{color:var(--accent-dim);font-size:10px;font-weight:900}.footer-bottom{display:flex;justify-content:space-between;gap:15px;padding:14px 0 28px;color:#8b9690;font-size:9px;border-top:1px solid var(--border-glass)}

.reveal-up{opacity:0;transform:translateY(18px);animation: revealUp .7s var(--ease-premium) forwards;animation-delay:var(--delay,0s)}
@keyframes revealUp {to{opacity:1;transform:none}}

@media (max-width: 1100px) {
  .desktop-nav { gap: 16px; }
  .hero-grid { grid-template-columns: 1fr; gap: 22px; }
  .hero-copy { text-align: center; padding: 20px 0 0; }
  .hero-title,.hero-lead { margin-left:auto;margin-right:auto; }
  .hero-actions,.hero-meta{justify-content:center;}
  .hero-product{max-width:770px;width:100%;margin:0 auto;}
}

@media (max-width: 900px) {
  .desktop-nav,.header-actions .text-link { display:none; }
  .mobile-menu-btn{display:block}.header-cta{display:none}.mobile-nav{display:flex;flex-direction:column;gap:2px;padding:12px 20px 16px;border-top:1px solid var(--border-glass);background:rgba(247,250,248,.96)}.mobile-nav a{padding:12px 10px;border-radius:10px;color:var(--text-secondary);font-size:13px;font-weight:800}.mobile-nav a:hover{background:var(--surface-glass);color:var(--text-primary)}.mobile-nav .mobile-nav-cta{background:#0d1712;color:#fff;text-align:center;margin-top:4px}
  .steps-grid{grid-template-columns:1fr}.feature-bento{grid-template-columns:1fr}.bento-card{grid-column:span 1 !important}.bento-copy{max-width:58%}.bento-progress{grid-template-columns:1fr}.tools-grid{grid-template-columns:1fr 1fr}.showcase-grid,.ai-showcase-grid,.ielts-card{grid-template-columns:1fr}.lesson-shell-content{min-height:auto}.ielts-path{min-height:370px}.game-loop{flex-wrap:wrap;justify-content:center}.loop-arrow{transform:rotate(90deg)}.loop-step{min-width:110px}.footer-top{grid-template-columns:1fr;justify-items:center;text-align:center}.footer-bottom{flex-direction:column;text-align:center;align-items:center}
}

@media (max-width: 640px) {
  .container{padding-left:16px;padding-right:16px}.header-inner{height:66px}.brand-name{font-size:17px}.brand-mark{width:32px;height:32px}.hero-section{padding-top:46px}.hero-title{font-size:43px}.hero-lead{font-size:14px}.hero-actions{flex-direction:column;align-items:stretch}.hero-primary{width:100%}.hero-demo-link{justify-content:center}.hero-meta{gap:10px 14px}.hero-meta-item{font-size:9px}.hero-product{padding:0 0 50px}.product-window{border-radius:22px;transform:none}.window-topbar{padding:0 12px}.window-title{font-size:9px}.window-actions{font-size:9px;gap:7px}.product-body{padding:14px}.lesson-preview-card{padding:17px;border-radius:17px}.lesson-preview-card h3{font-size:21px}.preview-options,.lesson-answer-grid{grid-template-columns:1fr}.preview-option{min-height:88px;display:grid;grid-template-columns:50px 1fr auto;align-items:center;justify-content:initial;gap:10px}.option-icon,.answer-art{height:50px;font-size:24px}.preview-option b{right:9px;top:50%;transform:translateY(-50%)}.preview-feedback{align-items:flex-start}.preview-feedback button{padding:10px 12px;font-size:9px}.floating-card{display:none}.skill-strip{border-radius:14px;padding:11px}.skill-strip > span{width:100%}.section{padding:82px 0}.section-how{padding-top:70px}.section-heading h2,.showcase-copy h2,.ielts-copy h2,.final-cta h2{font-size:34px}.section-heading p,.showcase-copy > p,.ielts-copy > p{font-size:13px}.step-card{min-height:auto;padding:24px}.step-icon{margin-bottom:24px}.bento-card{min-height:280px;padding:22px}.bento-copy{max-width:100%}.bento-path .path-visual{position:relative;inset:auto;width:100%;height:260px;margin-top:25px}.path-line{left:26px;top:12px;bottom:12px}.path-level{margin-bottom:0}.bento-progress{display:block}.progress-visual{margin-top:22px;display:grid;grid-template-columns:130px 1fr;align-items:center}.ring{width:108px;height:108px}.bento-roleplay .conversation-ui{margin-top:16px}.bento-grammar{min-height:330px}.format-pills{left:22px;right:22px;bottom:22px}.bento-stories,.bento-srs,.bento-social{min-height:290px}.lesson-shell-content{padding:36px 18px 25px}.lesson-shell-content h3{font-size:26px}.lesson-answer-grid{gap:9px}.answer-card{min-height:94px;display:grid;grid-template-columns:58px 1fr auto;align-items:center;gap:9px;padding:11px}.answer-art{height:58px}.lesson-feedback-bar{padding:12px;}.lesson-feedback-bar button{padding:10px 12px}.ai-showcase-grid{gap:36px}.ai-feature-list{grid-template-columns:1fr}.ai-messages{padding:15px;min-height:340px}.ai-message{max-width:92%}.ielts-copy{padding:34px 22px}.ielts-path{padding:30px 20px}.tools-grid{grid-template-columns:1fr}.ielts-nodes span{font-size:8px}.ielts-stat-row strong{font-size:18px}.game-loop{gap:3px;padding:10px}.loop-arrow{display:none}.loop-step{min-width:95px;padding:10px 4px}.loop-icon{width:38px;height:38px;font-size:16px}.final-cta{padding:58px 20px}.final-actions{flex-direction:column}.final-actions > *{width:100%}.desktop-only{display:none}
}
</style>
