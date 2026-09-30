import { animate } from 'animejs'

// Vue custom directive: animates an element with a spring pop-in the moment
// it is mounted into the DOM. Use as v-pop-in on any element/component root.
// Optional modifier via v-pop-in="{ delay: 120 }" for staggered children.
export const vPopIn = {
  mounted(el, binding) {
    const delay = binding?.value?.delay ?? 0
    animate(el, {
      opacity: [0, 1],
      scale: [0.86, 1],
      translateY: [10, 0],
      duration: 520,
      delay,
      ease: 'outElastic(1, 0.7)'
    })
  }
}
