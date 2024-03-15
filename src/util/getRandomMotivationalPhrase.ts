const phrases = [
  "Mastering touch typing opens doors to limitless productivity.",
  "Effort invested in touch typing yields exponential returns.",
  "With each keystroke, you're sculpting a pathway to efficiency.",
  "Embrace the challenge of touch typing, for it leads to mastery.",
  "Unlock the potential of your keyboard with fluent touch typing.",
  "In the realm of productivity, touch typing is your ultimate tool.",
  "Precision and speed unite in the art of touch typing.",
  "A journey of a thousand words begins with a single keystroke.",
  "Transform your typing speed from average to exceptional.",
  "Rise above the norm and become a touch typing virtuoso.",
  "Efficient typing today paves the way for success tomorrow.",
  "Embrace the rhythm of keys as you dance across the keyboard.",
  "Each keystroke is a note in the symphony of productivity.",
  "Elevate your typing skills and elevate your potential.",
  "With touch typing, you'll navigate the digital world with finesse.",
  "Empower yourself with the skill of lightning-fast typing.",
  "Efficiency is the hallmark of the touch typing maestro.",
  "Unleash your typing prowess and conquer any task.",
  "The keyboard is your canvas; touch typing, your brush.",
  "Typing mastery is not a destination, but a journey of constant improvement.",
  "Let your fingers glide across the keys like a maestro on the piano.",
  "Become the architect of your digital destiny through touch typing.",
  "Every keystroke is a step closer to becoming a typing virtuoso.",
  "In the race of productivity, touch typists lead the pack.",
  "Embrace the challenge of touch typing and watch your skills soar.",
  "Speed up your typing, speed up your success.",
  "With touch typing, you'll accomplish more in less time.",
  "The keyboard is your ally; touch typing, your superpower.",
  "Forge ahead with determination, and touch typing will become second nature.",
  "Effort invested in touch typing pays dividends for a lifetime.",
  "Dive deep into touch typing waters and emerge a proficient navigator.",
  "Turn typing from a chore into a pleasure with touch typing mastery.",
  "Efficiency in typing translates to efficiency in life.",
  "With touch typing, you'll write your own success story.",
  "Don't just type; touch type with purpose and precision.",
  "Speed isn't everything, but it sure helps – master touch typing.",
  "Break free from typing constraints and embrace the fluidity of touch typing.",
  "Conquer the digital realm with the sword of touch typing.",
  "The journey to touch typing mastery begins with a single keystroke.",
  "Let touch typing be your secret weapon in the pursuit of greatness.",
]

const getRandomMotivationalPhrase = (currentPhrase?: string) => {
  const filteredPhrases = phrases.filter((phrase) => phrase !== currentPhrase)

  const randomIndex = Math.floor(Math.random() * filteredPhrases.length)

  return filteredPhrases[randomIndex]
}

export default getRandomMotivationalPhrase
