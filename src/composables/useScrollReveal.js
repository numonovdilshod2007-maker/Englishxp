import { onMounted, onUnmounted } from 'vue'
import { animate } from 'animejs'

// Reveals .reveal elements with an anime.js entrance (fade + rise + slight scale)
// as they enter the viewport. Call useScrollReveal() in onMounted of any view.
// If content loads asynchronously (e.g. after a Firestore fetch), call the
// returned refresh() after the data arrives so newly-rendered elements are observed too.
export function useScrollReveal() {
  let observer = null

  function attach() {
    if (!observer) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const delay = Number(entry.target.dataset.revealDelay || 0)
              animate(entry.target, {
                opacity: [0, 1],
                translateY: [26, 0],
                scale: [0.97, 1],
                duration: 650,
                delay,
                ease: 'outExpo'
              })
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
      )
    }

    const targets = document.querySelectorAll('.reveal:not([data-revealed])')
    targets.forEach((el, i) => {
      el.dataset.revealed = 'true'
      el.dataset.revealDelay = Math.min(i, 8) * 55
      observer.observe(el)
    })
  }

  onMounted(() => {
    requestAnimationFrame(attach)
  })

  onUnmounted(() => {
    if (observer) observer.disconnect()
  })

  return { refresh: () => requestAnimationFrame(attach) }
}
