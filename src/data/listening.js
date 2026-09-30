// Listening comprehension exercises — one set per level (1-14). Each item has
// a short English audio script (read aloud via the browser's built-in
// SpeechSynthesis, same engine as useSpeech.js) plus 2-3 comprehension
// questions. No external audio files or API needed — works offline.

export const listening = [
  {
    level: 1,
    title: "Oddiy tanishuv",
    items: [
      {
        script: "Hi, my name is Anna. I am a student. I am from Tashkent.",
        questions: [
          { question: "What is her name?", options: ["Anna", "Maria", "Laura"], correct: "Anna" },
          { question: "Where is she from?", options: ["Samarkand", "Tashkent", "Bukhara"], correct: "Tashkent" }
        ]
      },
      {
        script: "This is my family. My mother is a teacher. My father is a doctor.",
        questions: [
          { question: "What is the mother's job?", options: ["Doctor", "Teacher", "Student"], correct: "Teacher" },
          { question: "What is the father's job?", options: ["Teacher", "Driver", "Doctor"], correct: "Doctor" }
        ]
      }
    ]
  },
  {
    level: 2,
    title: "Kundalik narsalar",
    items: [
      {
        script: "I have two books and three pens on my table. I don't have a laptop.",
        questions: [
          { question: "How many books does he have?", options: ["Two", "Three", "Four"], correct: "Two" },
          { question: "Does he have a laptop?", options: ["Yes", "No"], correct: "No" }
        ]
      },
      {
        script: "There are five chairs and one big table in the classroom.",
        questions: [
          { question: "How many chairs are there?", options: ["Five", "Six", "Four"], correct: "Five" }
        ]
      }
    ]
  },
  {
    level: 3,
    title: "Kunlik tartib",
    items: [
      {
        script: "I usually wake up at seven. I have breakfast, then I go to work at nine.",
        questions: [
          { question: "What time does he wake up?", options: ["Six", "Seven", "Eight"], correct: "Seven" },
          { question: "What time does he go to work?", options: ["Eight", "Nine", "Ten"], correct: "Nine" }
        ]
      },
      {
        script: "She never eats meat, but she often eats vegetables and fruit.",
        questions: [
          { question: "Does she eat meat?", options: ["Yes, often", "No, never"], correct: "No, never" }
        ]
      }
    ]
  },
  {
    level: 4,
    title: "Sayohat",
    items: [
      {
        script: "Last summer, we traveled to Samarkand. We visited old buildings and took many photos.",
        questions: [
          { question: "Where did they travel?", options: ["Bukhara", "Samarkand", "Khiva"], correct: "Samarkand" },
          { question: "What did they take?", options: ["Photos", "Books", "Gifts"], correct: "Photos" }
        ]
      }
    ]
  },
  {
    level: 5,
    title: "Ob-havo",
    items: [
      {
        script: "Tomorrow it will be cold and windy. Don't forget your jacket.",
        questions: [
          { question: "What will the weather be like?", options: ["Hot", "Cold and windy", "Rainy"], correct: "Cold and windy" }
        ]
      },
      {
        script: "It is raining now, but it will be sunny this afternoon.",
        questions: [
          { question: "What is the weather now?", options: ["Sunny", "Raining", "Snowing"], correct: "Raining" }
        ]
      }
    ]
  },
  {
    level: 6,
    title: "Restoranda",
    items: [
      {
        script: "Excuse me, can I see the menu, please? I would like a coffee and a sandwich.",
        questions: [
          { question: "What does he want to drink?", options: ["Tea", "Coffee", "Juice"], correct: "Coffee" }
        ]
      }
    ]
  },
  {
    level: 7,
    title: "Ish suhbati",
    items: [
      {
        script: "I have worked as a manager for five years. Before that, I studied economics at university.",
        questions: [
          { question: "How long has he worked as a manager?", options: ["Three years", "Five years", "Ten years"], correct: "Five years" },
          { question: "What did he study?", options: ["Law", "Economics", "Medicine"], correct: "Economics" }
        ]
      }
    ]
  },
  {
    level: 8,
    title: "Sog'liq",
    items: [
      {
        script: "If you have a headache, you should drink water and rest. You shouldn't work too much.",
        questions: [
          { question: "What should you do for a headache?", options: ["Drink water and rest", "Work more", "Eat sugar"], correct: "Drink water and rest" }
        ]
      }
    ]
  },
  {
    level: 9,
    title: "Texnologiya",
    items: [
      {
        script: "Since smartphones were invented, people have changed the way they communicate every day.",
        questions: [
          { question: "What changed since smartphones were invented?", options: ["The weather", "The way people communicate", "The price of food"], correct: "The way people communicate" }
        ]
      }
    ]
  },
  {
    level: 10,
    title: "Muhokama",
    items: [
      {
        script: "If I had more time, I would learn another language. Unfortunately, I am very busy this year.",
        questions: [
          { question: "What would he do with more time?", options: ["Travel", "Learn another language", "Sleep more"], correct: "Learn another language" }
        ]
      }
    ]
  },
  {
    level: 11,
    title: "Yangiliklar",
    items: [
      {
        script: "The report was written by a team of scientists. It was published last month.",
        questions: [
          { question: "Who wrote the report?", options: ["A team of scientists", "A journalist", "A student"], correct: "A team of scientists" }
        ]
      }
    ]
  },
  {
    level: 12,
    title: "Biznes",
    items: [
      {
        script: "Had the company invested earlier, it would have grown much faster.",
        questions: [
          { question: "What would have happened if the company invested earlier?", options: ["It would have grown faster", "It would have closed", "Nothing"], correct: "It would have grown faster" }
        ]
      }
    ]
  },
  {
    level: 13,
    title: "Akademik",
    items: [
      {
        script: "The professor suggested that the students revise their essays before the deadline.",
        questions: [
          { question: "What did the professor suggest?", options: ["Skip the essay", "Revise their essays", "Write a new topic"], correct: "Revise their essays" }
        ]
      }
    ]
  },
  {
    level: 14,
    title: "Chuqur muhokama",
    items: [
      {
        script: "Not only did the policy fail to reduce costs, but it also created new problems for small businesses.",
        questions: [
          { question: "What did the policy fail to do?", options: ["Reduce costs", "Increase taxes", "Help large businesses"], correct: "Reduce costs" }
        ]
      }
    ]
  }
]

export function getListeningForLevel(level) {
  const matches = listening.filter((l) => l.level === Number(level))
  if (!matches.length) return listening[0]
  if (matches.length === 1) return matches[0]
  return {
    ...matches[0],
    items: matches.flatMap((l) => l.items || [])
  }
}
