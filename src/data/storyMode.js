export const STORY_MODE_SCENARIOS = [
  {
    id: 'london-first-day', title: 'Your First Day in London', uzTitle: 'Londondagi birinchi kuningiz', level: 'A2', minutes: 5,
    icon: 'ti-plane-arrival', color: 'green', description: 'A short interactive adventure. Make choices, learn useful phrases and speak with your character.',
    character: { name: 'Maya', role: 'local friend', emoji: '👩🏻‍💼' },
    scenes: [
      { id:'airport', location:'Heathrow Airport', mood:'Arrival', character:'Maya', line:'Welcome to London! You look a little tired. Did you have a good flight?', translation:'Londonga xush kelibsiz! Biroz charchaganga o‘xshaysiz. Parvozingiz yaxshi o‘tdimi?', choices:[
        {text:'Yes, it was great. Thanks!',correct:true,reply:'Nice! Let’s get you into the city.',phrase:'It was great'},
        {text:'I am London.',correct:false,reply:'Almost! Say: “I am in London.”',phrase:'I am in London'},
        {text:'I have a flight yesterday.',correct:false,reply:'Good try. For a finished past action, say: “I had a flight yesterday.”',phrase:'I had a flight yesterday'}
      ], word:{en:'flight',uz:'parvoz',example:'My flight was long.'}},
      { id:'train', location:'Underground', mood:'Getting around', character:'Maya', line:'We need the Underground. Which line do you think we should take?', translation:'Bizga metro kerak. Sizningcha, qaysi liniyaga chiqishimiz kerak?', choices:[
        {text:'I think we should take the blue line.',correct:true,reply:'Exactly. You are getting around like a local!',phrase:'I think we should...'},
        {text:'We should taking blue.',correct:false,reply:'Close! After “should”, use the base verb: “should take”.',phrase:'should take'},
        {text:'Where is line?',correct:false,reply:'Try: “Where is the line?”',phrase:'Where is the line?'}
      ], word:{en:'line',uz:'liniya / yo‘nalish',example:'Take the blue line.'}},
      { id:'cafe', location:'Small Café', mood:'Ordering', character:'Maya', line:'I’m getting coffee. What would you like?', translation:'Men kofe olaman. Siz nima xohlaysiz?', choices:[
        {text:'Could I have a tea, please?',correct:true,reply:'Perfect. Polite and natural!',phrase:'Could I have...?'},
        {text:'Give me tea.',correct:false,reply:'People will understand, but “Could I have...?” sounds much more polite.',phrase:'Could I have...?'},
        {text:'I want one tea.',correct:false,reply:'Try: “Could I have a tea, please?”',phrase:'a tea, please'}
      ], word:{en:'polite',uz:'odobli / muloyim',example:'That was a polite request.'}},
      { id:'park', location:'Hyde Park', mood:'Small talk', character:'Maya', line:'The weather is beautiful today. What do you usually do on sunny days?', translation:'Bugun ob-havo chiroyli. Quyoshli kunlarda odatda nima qilasiz?', choices:[
        {text:'I usually walk and take photos.',correct:true,reply:'That sounds fun. London has plenty of places to explore.',phrase:'I usually...'},
        {text:'I usually walking.',correct:false,reply:'After “usually”, use the base verb: “usually walk”.',phrase:'I usually walk'},
        {text:'Yesterday I walk.',correct:false,reply:'For yesterday, use “walked”: “Yesterday I walked.”',phrase:'Yesterday I walked'}
      ], word:{en:'usually',uz:'odatda',example:'I usually walk in the evening.'}},
      { id:'challenge', location:'Evening Walk', mood:'Speak', character:'Maya', line:'Your turn! Tell me one thing you want to do in London.', translation:'Endi navbat sizniki! Londonda qilmoqchi bo‘lgan bitta narsangizni ayting.', choices:[{text:'Speak for 20 seconds',correct:true,reply:'Great! You just used English in a real situation.',phrase:'I want to...'}], speaking:true, word:{en:'explore',uz:'kashf qilmoq / aylanib ko‘rmoq',example:'I want to explore London.'}}
    ]
  },
  {
    id:'job-interview', title:'The First Job Interview', uzTitle:'Birinchi ish suhbati', level:'B1', minutes:6,
    icon:'ti-briefcase', color:'purple', description:'Practice confident answers in a short interview adventure.', character:{name:'Daniel',role:'interviewer',emoji:'👨🏻‍💼'},
    scenes:[
      {id:'intro',location:'Reception',mood:'Introduction',character:'Daniel',line:'Good morning. Could you tell me a little about yourself?',translation:'Xayrli tong. O‘zingiz haqingizda biroz gapirib bera olasizmi?',choices:[
        {text:'Sure. I’m a frontend developer and I enjoy building useful websites.',correct:true,reply:'Great introduction. Clear and confident.',phrase:'I enjoy building...'},
        {text:'I am frontend yesterday.',correct:false,reply:'Try a present form: “I’m a frontend developer.”',phrase:'I’m a frontend developer'},
        {text:'Myself Dilshod.',correct:false,reply:'A natural opening is: “I’m Dilshod.”',phrase:'I’m Dilshod'}
      ],word:{en:'confident',uz:'o‘ziga ishongan',example:'She sounds confident.'}},
      {id:'strength',location:'Interview Room',mood:'Strengths',character:'Daniel',line:'What is one of your strengths?',translation:'Kuchli tomoningizdan biri nima?',choices:[
        {text:'I learn quickly and I enjoy solving problems.',correct:true,reply:'Good. That gives a clear reason, not just a single adjective.',phrase:'I learn quickly'},
        {text:'My strength is I good.',correct:false,reply:'Try: “One of my strengths is that I learn quickly.”',phrase:'One of my strengths is...'},
        {text:'I am strength.',correct:false,reply:'Use the noun: “My strength is...”',phrase:'My strength is...'}
      ],word:{en:'strength',uz:'kuchli tomon',example:'Patience is one of my strengths.'}},
      {id:'problem',location:'Interview Room',mood:'Problem solving',character:'Daniel',line:'Tell me about a difficult problem you solved.',translation:'Yechgan qiyin muammolaringizdan biri haqida ayting.',choices:[
        {text:'I had a bug in a project, found the cause, and fixed it.',correct:true,reply:'Excellent. You gave a simple story with a clear result.',phrase:'I had a problem, so...'},
        {text:'I have a bug yesterday and fix.',correct:false,reply:'For a finished story: “I had a bug yesterday and fixed it.”',phrase:'I fixed it'},
        {text:'Problem was difficult.',correct:false,reply:'Add what you did: “I found the cause and fixed it.”',phrase:'I found the cause'}
      ],word:{en:'cause',uz:'sabab',example:'I found the cause of the problem.'}},
      {id:'close',location:'Interview Room',mood:'Final answer',character:'Daniel',line:'Why should we hire you?',translation:'Nega biz sizni ishga olishimiz kerak?',choices:[
        {text:'Because I learn fast, communicate clearly, and care about the result.',correct:true,reply:'Strong answer. Short, specific and natural.',phrase:'Because I...'},
        {text:'Because I need job.',correct:false,reply:'Talk about the value you can bring to the company.',phrase:'I can bring...'},
        {text:'You should hire me because I good.',correct:false,reply:'Try: “You should hire me because I can...”',phrase:'I can...'}
      ],word:{en:'hire',uz:'ishga olmoq',example:'The company wants to hire a developer.'}},
      {id:'speak',location:'Final Challenge',mood:'Speak',character:'Daniel',line:'Now give me a 20-second answer: why are you a good fit for this job?',translation:'Endi 20 soniya javob bering: nega bu ish sizga mos?',choices:[{text:'Speak for 20 seconds',correct:true,reply:'Nice work. You completed the interview.',phrase:'I would be a good fit because...'}],speaking:true,word:{en:'fit',uz:'mos kelmoq',example:'I think I am a good fit for this role.'}}
    ]
  }
]

export function getStoryModeScenario(id) { return STORY_MODE_SCENARIOS.find((scenario) => scenario.id === id) || STORY_MODE_SCENARIOS[0] }
