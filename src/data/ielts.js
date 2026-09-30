// IELTS Academic-style mock test content.
// Reading and Listening are scored objectively (right/wrong -> approximate
// band via accuracyToBand), so those two feed the "band prediction"
// average directly. Writing is graded by AI (see functions/ieltsWriting.js
// — the task list here must stay in sync with WRITING_TASKS there).
// Speaking reuses the existing Roleplay/Speaking Topics AI-scoring pipeline
// with IELTS-formatted prompts, so no separate grading function is needed.

export const ieltsReadingPassages = [
  {
    id: 'urban-farming',
    title: 'Urban Farming',
    text: `Urban farming, the practice of growing food within a city, has grown rapidly over the past two decades. Once seen as a hobby for a small number of enthusiasts, it is now viewed by many city planners as a serious solution to food security and environmental problems. Rooftop gardens, vertical farms, and community plots have appeared in cities from Tokyo to New York.

One of the main advantages of urban farming is the reduction in transportation costs and emissions, since food is grown close to where it is consumed. It also creates green spaces that can lower local temperatures and improve air quality. However, critics point out that urban farms typically produce far less food per unit of land than large-scale rural agriculture, and the initial cost of setting up vertical farms with artificial lighting can be very high.

Despite these challenges, several cities have begun offering subsidies and tax incentives to encourage urban farming projects, betting that the long-term environmental and social benefits will outweigh the costs.`,
    questions: [
      { type: 'tfng', question: 'Urban farming was invented in the last two decades.', options: ['True', 'False', 'Not Given'], correct: 'False' },
      { type: 'tfng', question: 'City planners now consider urban farming a serious solution to some problems.', options: ['True', 'False', 'Not Given'], correct: 'True' },
      { type: 'tfng', question: 'Urban farms produce more food per unit of land than rural farms.', options: ['True', 'False', 'Not Given'], correct: 'False' },
      { type: 'tfng', question: 'Some cities offer financial incentives for urban farming.', options: ['True', 'False', 'Not Given'], correct: 'True' },
      { type: 'mcq', question: 'According to the passage, what is a key criticism of urban farming?', options: ['It uses too much water', 'It produces less food per area of land', 'It only works in warm climates', 'It is illegal in most cities'], correct: 'It produces less food per area of land' }
    ]
  },
  {
    id: 'sleep-and-memory',
    title: 'Sleep and Memory',
    text: `For a long time, sleep was considered simply a period of rest during which the brain was largely inactive. Modern research has overturned this view, revealing that sleep plays an active and essential role in consolidating memories formed during the day. During deep sleep, the brain replays patterns of activity recorded while learning, effectively strengthening the neural connections associated with new information.

Studies have shown that people who sleep after learning a new skill, such as a musical piece or a language, perform significantly better when tested the following day compared to those who remain awake for the same period. This has led some researchers to argue that sleep should be treated as a critical part of any effective learning strategy, not simply as downtime.

Sleep deprivation, on the other hand, has been linked to poorer memory formation, reduced attention span, and slower reaction times. Given this evidence, some schools and universities have begun rethinking early start times, recognising that well-rested students may learn considerably more effectively.`,
    questions: [
      { type: 'tfng', question: 'Scientists always believed sleep was important for memory.', options: ['True', 'False', 'Not Given'], correct: 'False' },
      { type: 'tfng', question: 'The brain replays learning activity during deep sleep.', options: ['True', 'False', 'Not Given'], correct: 'True' },
      { type: 'tfng', question: 'People who stay awake after learning perform better on tests the next day.', options: ['True', 'False', 'Not Given'], correct: 'False' },
      { type: 'tfng', question: 'All universities have changed their start times because of this research.', options: ['True', 'False', 'Not Given'], correct: 'Not Given' },
      { type: 'mcq', question: 'What effect does sleep deprivation have, according to the passage?', options: ['Improved reaction times', 'Better memory formation', 'Reduced attention span', 'Increased creativity'], correct: 'Reduced attention span' }
    ]
  },
  {
    id: 'renewable-grid',
    title: 'The Challenge of Renewable Energy Grids',
    text: `As countries shift toward renewable energy sources such as wind and solar power, electricity grids face a new challenge: unlike traditional power plants, renewable sources do not generate a constant, predictable supply of electricity. Solar panels produce no power at night, and wind turbines are only effective when the wind is blowing at a suitable speed.

To address this, engineers have developed large-scale battery storage systems capable of storing excess energy produced during peak generation periods and releasing it when demand is high but generation is low. Some countries have also invested in smart grid technology, which uses real-time data to balance supply and demand automatically across a wide network.

Nevertheless, the transition remains costly, and many developing nations lack the infrastructure investment needed to build reliable renewable grids. Analysts suggest that international cooperation and funding will be essential if the world is to meet its climate targets while ensuring stable electricity access for all.`,
    questions: [
      { type: 'tfng', question: 'Renewable energy sources produce a constant supply of electricity.', options: ['True', 'False', 'Not Given'], correct: 'False' },
      { type: 'tfng', question: 'Battery storage systems can release stored energy during high demand.', options: ['True', 'False', 'Not Given'], correct: 'True' },
      { type: 'tfng', question: 'All developing nations have already built reliable renewable grids.', options: ['True', 'False', 'Not Given'], correct: 'False' },
      { type: 'mcq', question: 'What is smart grid technology used for, according to the passage?', options: ['Generating more solar power', 'Balancing supply and demand using real-time data', 'Reducing the cost of wind turbines', 'Replacing battery storage entirely'], correct: 'Balancing supply and demand using real-time data' }
    ]
  },
  {
    id: 'bee-decline',
    title: 'The Decline of Wild Bee Populations',
    text: `Wild bees play an essential role in pollinating roughly a third of the crops humans eat, yet populations of many species have fallen sharply in recent decades. Researchers point to a combination of causes: habitat loss from intensive farming, widespread use of certain pesticides, and the spread of parasites and diseases through commercial beekeeping.

Unlike honeybees, which are managed by beekeepers and can be moved between farms as needed, wild bees depend entirely on natural or semi-natural habitats such as hedgerows, meadows, and forest edges. As these habitats shrink, wild bees lose both the flowers they feed on and the nesting sites they require.

Some farmers have begun planting wildflower strips along the edges of their fields specifically to support wild bee populations. Early results suggest that these strips can meaningfully increase both the number and diversity of bees in an area, although scientists caution that far larger, coordinated efforts will be needed to reverse the overall decline.`,
    questions: [
      { type: 'tfng', question: 'Wild bees pollinate about a third of the crops eaten by humans.', options: ['True', 'False', 'Not Given'], correct: 'True' },
      { type: 'tfng', question: 'Wild bees can be moved between farms by beekeepers, just like honeybees.', options: ['True', 'False', 'Not Given'], correct: 'False' },
      { type: 'tfng', question: 'Wildflower strips have completely reversed the decline in wild bee numbers.', options: ['True', 'False', 'Not Given'], correct: 'False' },
      { type: 'tfng', question: 'Scientists believe larger efforts are still needed to help wild bees.', options: ['True', 'False', 'Not Given'], correct: 'True' },
      { type: 'mcq', question: 'According to the passage, what do wild bees depend on that honeybees do not?', options: ['Pesticide-free farms', 'Natural or semi-natural habitats', 'Commercial beekeepers', 'Warm climates only'], correct: 'Natural or semi-natural habitats' }
    ]
  },
  {
    id: 'ancient-trade-routes',
    title: 'The Legacy of Ancient Trade Routes',
    text: `Long before modern globalisation, a network of overland and maritime routes connected distant civilisations, allowing goods, ideas, and technologies to travel thousands of kilometres. The most famous of these, often referred to collectively as the Silk Road, linked China with the Mediterranean world, passing through Central Asia, Persia, and the Middle East.

Along these routes, merchants carried not only silk and spices but also papermaking techniques, mathematical knowledge, and religious beliefs. Buddhism spread from India into East Asia largely along these trade corridors, while later, Islamic scholarship and Chinese inventions such as gunpowder and the compass moved westward.

Modern archaeologists have found that many towns along the old routes grew wealthy not primarily from trading goods themselves, but from providing services to travelling merchants: accommodation, food, translation, and the exchange of currency. This suggests that the economic impact of the trade routes extended far beyond the value of the goods being transported.`,
    questions: [
      { type: 'tfng', question: 'The Silk Road only connected China and the Mediterranean directly, with no intermediate regions.', options: ['True', 'False', 'Not Given'], correct: 'False' },
      { type: 'tfng', question: 'Buddhism spread into East Asia partly through trade route contact.', options: ['True', 'False', 'Not Given'], correct: 'True' },
      { type: 'tfng', question: 'Gunpowder and the compass moved from China towards the west.', options: ['True', 'False', 'Not Given'], correct: 'True' },
      { type: 'mcq', question: 'According to archaeologists, how did many towns along the routes mainly grow wealthy?', options: ['By producing silk locally', 'By providing services to merchants', 'By taxing foreign governments', 'By mining precious metals'], correct: 'By providing services to merchants' },
      { type: 'mcq', question: 'Which of the following is NOT mentioned as travelling along the trade routes?', options: ['Papermaking techniques', 'Religious beliefs', 'Mathematical knowledge', 'Electrical technology'], correct: 'Electrical technology' }
    ]
  },
  {
    id: 'deep-sea-exploration',
    title: 'Why We Know More About the Moon Than the Ocean Floor',
    text: `It is a frequently repeated fact that humans have mapped the surface of the Moon in greater detail than the floor of Earth's own oceans. While satellite technology can capture the Moon's surface using cameras and radar from a stable orbit, mapping the seafloor requires sound waves, since light and radio signals cannot penetrate deep water effectively.

Sonar-equipped ships can measure ocean depth reasonably well, but detailed, high-resolution mapping is slow and expensive, requiring vessels to travel back and forth across enormous stretches of open water. As a result, only a small percentage of the global seafloor has been mapped in high resolution, and much of what scientists know about deep-sea terrain comes from lower-resolution satellite estimates based on gravity measurements.

Efforts are now underway, backed by international science organisations, to complete a high-resolution map of the entire ocean floor. Advocates argue that better maps would improve tsunami prediction, submarine cable planning, and our understanding of deep-sea ecosystems that remain almost entirely unexplored.`,
    questions: [
      { type: 'tfng', question: 'Light and radio signals travel efficiently through deep ocean water.', options: ['True', 'False', 'Not Given'], correct: 'False' },
      { type: 'tfng', question: 'Sonar mapping of the seafloor is fast and inexpensive compared to mapping the Moon.', options: ['True', 'False', 'Not Given'], correct: 'False' },
      { type: 'tfng', question: 'Most of the global seafloor has already been mapped in high resolution.', options: ['True', 'False', 'Not Given'], correct: 'False' },
      { type: 'tfng', question: 'A complete high-resolution ocean floor map would help with tsunami prediction.', options: ['True', 'False', 'Not Given'], correct: 'True' },
      { type: 'mcq', question: 'What do many current estimates of deep-sea terrain rely on?', options: ['Underwater cameras', 'Gravity measurements from satellites', 'Manned submarine surveys', 'Fishing boat reports'], correct: 'Gravity measurements from satellites' }
    ]
  },
  {
    id: 'placebo-effect',
    title: 'Understanding the Placebo Effect',
    text: `The placebo effect refers to a measurable improvement in a patient's condition that occurs after receiving a treatment with no active therapeutic ingredient, such as a sugar pill. For decades, doctors regarded the placebo effect mainly as a nuisance to be controlled for in drug trials, but a growing body of research suggests it reflects genuine, measurable changes in the brain and body.

Brain imaging studies have shown that placebo treatments for pain can trigger the release of the body's own natural painkillers, producing effects similar to actual medication in some cases. Interestingly, some studies have found that placebos can still produce benefits even when patients are explicitly told they are receiving a placebo, provided the treatment ritual — such as a doctor's attentive manner or the act of taking a pill — remains convincing.

Researchers now argue that understanding the placebo effect could help doctors design more effective treatments generally, by paying closer attention to factors such as patient expectation, the therapeutic relationship, and the context in which treatment is delivered, rather than dismissing these as irrelevant to a drug's true effectiveness.`,
    questions: [
      { type: 'tfng', question: 'Doctors have always viewed the placebo effect as scientifically important.', options: ['True', 'False', 'Not Given'], correct: 'False' },
      { type: 'tfng', question: 'Brain imaging has shown placebo pain treatments can trigger natural painkillers.', options: ['True', 'False', 'Not Given'], correct: 'True' },
      { type: 'tfng', question: 'Placebos never work once a patient knows they are receiving one.', options: ['True', 'False', 'Not Given'], correct: 'False' },
      { type: 'mcq', question: "According to the passage, what could studying the placebo effect help doctors do?", options: ['Eliminate the need for real medication', 'Design more effective treatments generally', 'Reduce the cost of drug trials only', 'Avoid speaking with patients'], correct: 'Design more effective treatments generally' },
      { type: 'mcq', question: 'What factor is mentioned as still producing a placebo benefit even when disclosed?', options: ['A convincing treatment ritual', 'A higher drug dosage', 'A longer hospital stay', 'A stricter diet'], correct: 'A convincing treatment ritual' }
    ]
  },
  {
    id: 'minimalist-design',
    title: 'The Rise of Minimalist Product Design',
    text: `Over the past twenty years, minimalist design — characterised by clean lines, limited colour palettes, and an absence of unnecessary decoration — has become dominant across industries ranging from consumer electronics to furniture and packaging. Proponents argue that minimalist design improves usability by removing distractions and helping users focus on a product's core function.

Critics, however, suggest that the widespread adoption of minimalism has sometimes gone too far, sacrificing clarity for aesthetics. Some studies of interface design, for example, have found that overly minimal icons and controls can actually confuse users, who rely on visual cues such as borders, shadows, and colour contrast to understand which elements are interactive.

Designers increasingly describe their work as balancing minimalism with what is sometimes called "affordance" — visual signals that indicate how an object should be used. This has led to a partial correction in recent design trends, with some previously flat, minimal interfaces reintroducing subtle shadows and borders to improve clarity without abandoning a clean overall look.`,
    questions: [
      { type: 'tfng', question: 'Minimalist design has become common only in the technology industry.', options: ['True', 'False', 'Not Given'], correct: 'False' },
      { type: 'tfng', question: 'All critics agree that minimalism should be abandoned entirely.', options: ['True', 'False', 'Not Given'], correct: 'Not Given' },
      { type: 'tfng', question: 'Some interface studies found that overly minimal designs can confuse users.', options: ['True', 'False', 'Not Given'], correct: 'True' },
      { type: 'mcq', question: 'What does "affordance" refer to in the passage?', options: ['The price of a product', 'Visual signals showing how to use an object', 'The number of colours used', 'The weight of a device'], correct: 'Visual signals showing how to use an object' },
      { type: 'mcq', question: 'What recent trend does the passage describe?', options: ['A complete return to decorative design', 'Reintroducing subtle shadows and borders for clarity', 'Removing all icons from interfaces', 'Increasing the use of bright colours only'], correct: 'Reintroducing subtle shadows and borders for clarity' }
    ]
  }
]

export const ieltsListeningItems = [
  {
    id: 'library-hours',
    context: 'A student is asking about library opening hours.',
    script: "Hi, I wanted to check the library's opening hours during the exam period. Normally we're open from nine in the morning until eight in the evening, but during exam weeks, we extend our hours to seven AM until midnight, seven days a week. Also, the group study rooms need to be booked online at least one day in advance.",
    questions: [
      { question: 'What time does the library normally open?', options: ['7 AM', '8 AM', '9 AM'], correct: '9 AM' },
      { question: 'Until what time is the library open during exam weeks?', options: ['8 PM', '10 PM', 'Midnight'], correct: 'Midnight' },
      { question: 'How far in advance must group study rooms be booked?', options: ['Same day', 'One day', 'One week'], correct: 'One day' }
    ]
  },
  {
    id: 'flight-delay',
    context: 'An announcement about a delayed flight.',
    script: "Attention passengers. Flight BA two-one-four to London has been delayed due to weather conditions. The new departure time is now three forty-five PM, and boarding will begin at three fifteen at gate twelve. Passengers with connecting flights should speak to a member of staff at the information desk for assistance.",
    questions: [
      { question: 'Why has the flight been delayed?', options: ['Technical problem', 'Weather conditions', 'Staff shortage'], correct: 'Weather conditions' },
      { question: 'What is the new departure time?', options: ['3:15 PM', '3:45 PM', '4:15 PM'], correct: '3:45 PM' },
      { question: 'Which gate will passengers board from?', options: ['Gate 10', 'Gate 12', 'Gate 21'], correct: 'Gate 12' }
    ]
  },
  {
    id: 'course-registration',
    context: 'A university staff member explains course registration.',
    script: "To register for next semester's courses, you'll need to log into the student portal using your university ID. Registration opens on the fifteenth of next month and closes exactly two weeks later. If you miss the deadline, you can still register late, but a twenty-five dollar late fee will apply. Make sure to check with your academic advisor before selecting your final courses.",
    questions: [
      { question: 'What do students need to log in with?', options: ['Email address', 'University ID', 'Phone number'], correct: 'University ID' },
      { question: 'How long does registration stay open?', options: ['One week', 'Two weeks', 'One month'], correct: 'Two weeks' },
      { question: 'What happens if a student misses the deadline?', options: ['They cannot register at all', 'They pay a late fee', 'They lose their place at university'], correct: 'They pay a late fee' }
    ]
  },
  {
    id: 'gym-membership',
    context: 'A receptionist explains gym membership options.',
    script: "Sure, let me explain our membership options. The standard monthly plan is thirty-five dollars and includes access to the gym floor and cardio equipment. If you'd like to include the swimming pool and group classes, the premium plan is fifty-five dollars a month. We also offer a twelve-month plan at a discounted rate of forty-five dollars a month, but that requires a one-time twenty dollar registration fee.",
    questions: [
      { question: 'How much is the standard monthly plan?', options: ['$25', '$35', '$45'], correct: '$35' },
      { question: 'What does the premium plan include that the standard plan does not?', options: ['Cardio equipment', 'Pool and group classes', 'Personal trainer'], correct: 'Pool and group classes' },
      { question: 'What is required for the twelve-month plan?', options: ['A medical certificate', 'A one-time registration fee', 'A friend to sign up too'], correct: 'A one-time registration fee' }
    ]
  },
  {
    id: 'apartment-viewing',
    context: 'A tenant calls an agent about viewing an apartment.',
    script: "Thanks for calling about the two-bedroom apartment on Maple Street. It's available for viewing this Thursday and Friday between two and five PM. The monthly rent is nine hundred and fifty dollars, and that includes water but not electricity or internet. We do require a security deposit equal to one month's rent before you can move in.",
    questions: [
      { question: 'On which days can the apartment be viewed?', options: ['Wednesday and Thursday', 'Thursday and Friday', 'Friday and Saturday'], correct: 'Thursday and Friday' },
      { question: 'What is included in the rent?', options: ['Water', 'Electricity', 'Internet'], correct: 'Water' },
      { question: 'What is required before moving in?', options: ['A signed reference letter', 'A security deposit', 'A parking permit'], correct: 'A security deposit' }
    ]
  },
  {
    id: 'museum-tour',
    context: 'A guide introduces a museum tour.',
    script: "Welcome to the City History Museum. Our guided tour begins in the main hall and lasts approximately ninety minutes, covering three floors. Photography is allowed everywhere except the textile gallery on the second floor, where flash can damage the fabrics. Please note the museum closes at six PM, so the last tour of the day starts at four fifteen.",
    questions: [
      { question: 'How long does the guided tour last?', options: ['Sixty minutes', 'Ninety minutes', 'Two hours'], correct: 'Ninety minutes' },
      { question: 'Where is photography not allowed?', options: ['The main hall', 'The textile gallery', 'The entrance'], correct: 'The textile gallery' },
      { question: 'What time does the last tour of the day start?', options: ['4:15 PM', '5:00 PM', '6:00 PM'], correct: '4:15 PM' }
    ]
  },
  {
    id: 'job-interview-tips',
    context: 'A career advisor gives tips before a job interview.',
    script: "Before your interview tomorrow, remember to arrive at least ten minutes early and bring two printed copies of your resume. The interview itself will last around forty-five minutes and will include a short written task about halfway through. Try to prepare two or three questions to ask the interviewer at the end, since candidates who ask thoughtful questions tend to leave a stronger impression.",
    questions: [
      { question: 'How early should the candidate arrive?', options: ['Five minutes', 'Ten minutes', 'Thirty minutes'], correct: 'Ten minutes' },
      { question: 'How many copies of the resume should be brought?', options: ['One', 'Two', 'Three'], correct: 'Two' },
      { question: 'What happens about halfway through the interview?', options: ['A coffee break', 'A short written task', 'A phone call'], correct: 'A short written task' }
    ]
  },
  {
    id: 'weather-forecast',
    context: 'A radio presenter gives the weekend weather forecast.',
    script: "Now for the weekend weather. Saturday will start off cloudy with a high of eighteen degrees, but expect sunshine to break through by early afternoon. Sunday looks less promising, with rain forecast from mid-morning through the evening, so if you're planning anything outdoors, Saturday morning to early afternoon is really your best window.",
    questions: [
      { question: "What is Saturday's forecast high temperature?", options: ['15 degrees', '18 degrees', '21 degrees'], correct: '18 degrees' },
      { question: 'When is rain expected on Sunday?', options: ['Early morning only', 'Mid-morning through evening', 'Late night only'], correct: 'Mid-morning through evening' },
      { question: 'When does the presenter suggest is the best time for outdoor plans?', options: ['Sunday evening', 'Saturday morning to early afternoon', 'Sunday morning'], correct: 'Saturday morning to early afternoon' }
    ]
  }
]

// Task 1: data description (Academic IELTS). Real exam shows a chart/graph;
// here the same data is given as a table so it renders without needing a
// charting library, but the task is otherwise authentic — describe the
// trend/comparison, no opinion required (that's what separates it from
// Task 2 below).
export const ieltsWritingTask1s = [
  {
    id: 'internet-usage-by-age',
    title: 'Internet Usage by Age Group (2010 vs 2023)',
    instruction: 'The table below shows the percentage of internet users in different age groups in 2010 and 2023. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
    columns: ['Age group', '2010 (%)', '2023 (%)'],
    rows: [
      ['16-24', '78', '99'],
      ['25-44', '65', '97'],
      ['45-64', '38', '89'],
      ['65+', '11', '61']
    ]
  },
  {
    id: 'city-population-growth',
    title: 'Population of Three Cities (2000-2020)',
    instruction: 'The chart below shows the population (in millions) of three cities between 2000 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
    columns: ['Year', 'Rivertown', 'Lakeside', 'Hillview'],
    rows: [
      ['2000', '2.1', '3.4', '1.2'],
      ['2010', '2.8', '3.6', '1.9'],
      ['2020', '4.5', '3.5', '3.1']
    ]
  },
  {
    id: 'household-energy-sources',
    title: 'Household Energy Sources in Country X (1990-2020)',
    instruction: 'The table below shows the percentage of household energy from different sources in Country X over three decades. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
    columns: ['Source', '1990 (%)', '2005 (%)', '2020 (%)'],
    rows: [
      ['Coal', '48', '30', '9'],
      ['Natural gas', '30', '35', '31'],
      ['Renewables', '4', '14', '42'],
      ['Nuclear', '18', '21', '18']
    ]
  },
  {
    id: 'coffee-production-process',
    title: 'The Coffee Production Process',
    instruction: 'The diagram below shows the stages involved in producing coffee, from harvesting to packaging. Summarise the information by describing the main stages of the process. Write at least 150 words.',
    columns: ['Stage', 'What happens'],
    rows: [
      ['1. Harvesting', 'Ripe coffee cherries are picked by hand or machine'],
      ['2. Processing', 'Cherries are pulped and the beans are separated from the fruit'],
      ['3. Drying', 'Beans are spread out and dried in the sun for 1-2 weeks'],
      ['4. Roasting', 'Dried beans are roasted at high temperature to develop flavour'],
      ['5. Packaging', 'Roasted beans are cooled, ground or left whole, and packaged']
    ]
  },
  {
    id: 'graduate-employment-fields',
    title: 'Fields of Employment for University Graduates (2023)',
    instruction: 'The table below shows the percentage of university graduates working in different fields one year after graduation. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
    columns: ['Field', 'Graduates (%)'],
    rows: [
      ['Technology', '27'],
      ['Healthcare', '19'],
      ['Education', '15'],
      ['Finance', '14'],
      ['Other / unemployed', '25']
    ]
  }
]

// Must stay in sync with WRITING_TASKS in functions/ieltsWriting.js —
// the Cloud Function grades against the task's exact prompt text.
export const ieltsWritingTasks = [
  { id: 'technology-society', prompt: 'Some people believe that technology has made our lives more complicated, while others think it has made life easier. Discuss both views and give your own opinion.' },
  { id: 'online-education', prompt: 'Many students now study online instead of attending traditional classes. Do the advantages of this outweigh the disadvantages?' },
  { id: 'environment-government', prompt: 'Some people think environmental problems are too big for individuals to solve, and only governments and large businesses can make a real difference. To what extent do you agree or disagree?' },
  { id: 'work-life-balance', prompt: 'In many countries, people are working longer hours than ever before. What are the causes of this, and what effects does it have on individuals and society?' },
  { id: 'social-media', prompt: 'Social media has changed the way people communicate with each other. Do you think this change has been positive or negative overall?' },
  { id: 'urban-vs-rural', prompt: 'More and more people are moving from rural areas to live in cities. What are the causes of this trend, and what problems can it create for both cities and the countryside?' },
  { id: 'traditional-culture', prompt: 'As countries become more globalised, some argue that traditional customs and culture are being lost. To what extent do you agree or disagree with this view?' },
  { id: 'space-exploration', prompt: 'Governments should spend money on space exploration rather than on solving problems on Earth. To what extent do you agree or disagree?' },
  { id: 'advertising-children', prompt: 'Some people think advertising aimed at children should be banned. Others believe parents, not governments, should be responsible for what children see. Discuss both views and give your own opinion.' },
  { id: 'university-tuition', prompt: 'In some countries, university education is free, while in others students must pay high fees. Do the advantages of free university education outweigh the disadvantages?' },
  { id: 'zoos-animal-welfare', prompt: 'Some people believe zoos are cruel and should be closed, while others think they play an important role in education and conservation. Discuss both views and give your own opinion.' },
  { id: 'remote-work', prompt: 'Many companies now allow employees to work from home permanently. What are the advantages and disadvantages of this trend for both employees and employers?' }
]

export const ieltsWritingTips = [
  'Introduction: rephrase the topic and state your position',
  'Body 1: discuss one view / one main idea with an example',
  'Body 2: discuss the other view / another idea with an example',
  'Conclusion: summarize and restate your opinion',
  "IELTS Task 2 talab qiladi: kamida 250 so'z, aniq struktura, misollar"
]

// Multiple speaking sets so learners can pick a different topic each
// practice session instead of always seeing the same three questions.
export const ieltsSpeakingSets = [
  {
    id: 'travel-and-places',
    title: 'Travel & Places',
    part1: [
      'Do you work or are you a student?',
      'What do you usually do in your free time?',
      'Do you prefer reading books or watching movies?'
    ],
    part2: {
      cue: 'Describe a place you would like to visit in the future.',
      points: ['Where it is', 'Why you want to go there', 'What you would do there', 'And explain why this place is important to you']
    },
    part3: [
      'Do you think tourism has more advantages or disadvantages for a country?',
      'How has travel changed in the last twenty years?',
      'Should governments invest more in protecting tourist destinations?'
    ]
  },
  {
    id: 'technology-daily-life',
    title: 'Technology & Daily Life',
    part1: [
      'How often do you use your smartphone every day?',
      'What was the last app you downloaded?',
      'Do you think you spend too much time online?'
    ],
    part2: {
      cue: 'Describe a piece of technology you find very useful.',
      points: ['What it is', 'When you started using it', 'How you use it', 'And explain why it is so useful to you']
    },
    part3: [
      'How has technology changed the way people communicate?',
      'Do you think children today rely too much on technology?',
      'What technology do you think will be common in twenty years?'
    ]
  },
  {
    id: 'work-and-study',
    title: 'Work & Study',
    part1: [
      'What subject did you enjoy most at school?',
      'Do you prefer working alone or in a team?',
      'What are your plans for your career?'
    ],
    part2: {
      cue: 'Describe a job you would like to have in the future.',
      points: ['What the job is', 'What skills it requires', 'Why you would like to do it', 'And explain how you plan to get this job']
    },
    part3: [
      'Do you think university education guarantees a good job nowadays?',
      'What qualities make someone a good leader at work?',
      'How is the nature of work likely to change in the future?'
    ]
  },
  {
    id: 'environment-and-nature',
    title: 'Environment & Nature',
    part1: [
      'Do you enjoy spending time outdoors?',
      'What do people in your country do to protect the environment?',
      'Is recycling common where you live?'
    ],
    part2: {
      cue: 'Describe an environmental problem in your country.',
      points: ['What the problem is', 'What causes it', 'What effects it has', 'And explain what could be done to solve it']
    },
    part3: [
      'Do you think individuals or governments are more responsible for protecting the environment?',
      'What are the biggest environmental challenges facing the world today?',
      'Should companies be punished more strictly for polluting?'
    ]
  },
  {
    id: 'food-and-culture',
    title: 'Food & Culture',
    part1: [
      'What is your favourite type of food?',
      'Do you enjoy cooking?',
      'Has your diet changed much in recent years?'
    ],
    part2: {
      cue: 'Describe a traditional dish from your country.',
      points: ['What the dish is', 'How it is prepared', 'When people usually eat it', 'And explain why it is important in your culture']
    },
    part3: [
      'Do you think traditional food is disappearing because of fast food?',
      'How does food culture differ between generations in your country?',
      'Should schools teach children about healthy eating?'
    ]
  },
  {
    id: 'friends-and-family',
    title: 'Friends & Family',
    part1: [
      'Do you have a large family?',
      'How often do you see your close friends?',
      'What do you usually do together with your family?'
    ],
    part2: {
      cue: 'Describe a family member or friend who has influenced you.',
      points: ['Who this person is', 'How you know them', 'What they have done', 'And explain how they have influenced you']
    },
    part3: [
      'Do you think family relationships have changed in recent generations?',
      'Is it more common now for young people to live far from their families?',
      'How important are friendships compared to family relationships?'
    ]
  }
]

// Accuracy% -> approximate IELTS band. A simplification (real IELTS uses
// fixed raw-score conversion tables per test), but gives learners a
// reasonable practice reference point for Reading and Listening.
export function accuracyToBand(percent) {
  if (percent >= 95) return 9.0
  if (percent >= 87) return 8.5
  if (percent >= 80) return 8.0
  if (percent >= 72) return 7.5
  if (percent >= 64) return 7.0
  if (percent >= 56) return 6.5
  if (percent >= 48) return 6.0
  if (percent >= 40) return 5.5
  if (percent >= 32) return 5.0
  if (percent >= 24) return 4.5
  return 4.0
}
