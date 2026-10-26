/* Tell Ours Studio — content.
   Every film, Vimeo ID and still is carried over from telloursstudio.com. */

const IMG = 'assets/img/';
const P = 'assets/posters/';

window.TO = {
  studio: {
    name: 'Tell Ours Studio',
    email: 'alpha@telloursstudio.com',
    phone: '(718) 690-8169',
    phoneHref: 'tel:+17186908169',
    address: ['270 Center St', 'West Haven, CT 06516'],
    instagram: 'https://www.instagram.com/telloursstudio/',
    handle: '@telloursstudio',
  },

  // Optional generated motion (Runway / HyperFrames renders). Drop an .mp4 path in and the
  // site swaps it in for the still/Vimeo layer. See RUNWAY.md for the shot list.
  motion: {
    heroOverlay: null,      // e.g. 'assets/motion/hero-light-leak.mp4' (screen-blended over hero)
    manifesto: null,        // e.g. 'assets/motion/manifesto-ink.mp4'
    closing: null,          // e.g. 'assets/motion/closing-loop.mp4'
  },

  clients: [
    'Yale University', 'Elm City Freddy Fixer', 'Think for Academia', 'Winning Ways',
    'Next Level Empowerment Program', 'Aftertime', "Full Citizen's Coalition", 'Stop Solitary CT',
    'Freedom Reads', 'Coastal Film Lab', 'Citywide Youth Coalition', 'The Breed', 'Skiros',
    'Rhode Island Freedom Collective', 'The Black Institute',
  ],

  films: [
    {
      slug: 'heba', title: 'Heba', year: '2026', category: 'Documentary Portrait',
      vimeo: { id: '1229264147' }, runtime: '2:08',
      synopsis: 'Heba is a documentary portrait of a hair stylist whose chair offers more than a style — a quiet practice of care that brings tranquility to her clients.',
      credits: [['Director', 'Alpha Jalloh'], ['Cinematographer', 'Alpha Jalloh'], ['Editor', 'Alpha Jalloh'], ['Producer', 'Alpha Jalloh']],
      production: { format: 'Documentary Portrait' },
      stills: [IMG + '5091bb1b-heba-poster.jpg'],
    },
    {
      slug: 'blossoming-beyond-bars', title: 'Blossoming Beyond Bars', year: '2026', category: 'Event Film',
      vimeo: { id: '1230006540', previewStart: 38 }, runtime: '7:14',
      synopsis: "A recap and documentary film of Blossoming Beyond Bars, a women's re-entry conference — a day of gathering, reflection, and new beginnings.",
      credits: [['Production', 'Tell Ours Studio']],
      production: { format: 'Event Film' },
      stills: [IMG + 'c2e523e0-01.jpg', IMG + 'e17778f3-02.jpg', IMG + 'aed69901-03.jpg'],
    },
    {
      slug: 'freedom-pack', title: 'Freedom Pack', year: '2026', category: 'Mini Documentary',
      vimeo: { id: '1228666522', previewStart: 4 }, runtime: '5:32',
      synopsis: "A mini documentary on the Rhode Island Freedom Collective's Freedom Packs, prepared for people coming home from prison.",
      credits: [['Production', 'Tell Ours Studio']],
      production: { client: 'Rhode Island Freedom Collective', format: 'Mini Documentary' },
      stills: [IMG + 'freedom-pack-frame.jpg', P + 'freedom-pack.svg'],
      collections: ['nonprofit-community'],
    },
    {
      slug: 'citywide-youth-coalition-50', title: 'Citywide Youth Coalition — 50th Anniversary', short: 'Citywide Youth Coalition 50', year: '2026', category: 'Event Film',
      vimeo: { id: '1228666563' }, runtime: '4:12',
      synopsis: "Story-led documentation of Citywide Youth Coalition's 50th anniversary and the community gathered around it.",
      credits: [['Production', 'Tell Ours Studio']],
      production: { client: 'Citywide Youth Coalition', format: 'Event Film' },
      stills: [IMG + 'citywide-youth-coalition-50-frame.jpg', P + 'citywide-youth-coalition-50.svg'],
      collections: ['nonprofit-community'],
    },
    {
      slug: 'still-worth-reading', title: 'Still Worth Reading', year: '2026', category: 'Documentary',
      vimeo: { id: '1211665941' }, runtime: '3:40',
      synopsis: 'Still Worth Reading follows the work of Freedom Reads and the enduring power of literature to create connection, reflection, and possibility.',
      credits: [['Director', 'Alpha Jalloh'], ['Cinematographer', 'Alpha Jalloh'], ['Editor', 'Alpha Jalloh'], ['Producer', 'Alpha Jalloh']],
      production: { client: 'Freedom Reads', format: 'Short Documentary' },
      stills: [IMG + 'still-worth-reading-frame.jpg', P + 'still-worth-reading.svg'],
      collections: ['nonprofit-community'],
    },
    {
      slug: 'inside-coastal', title: 'Inside Coastal', year: '2026', category: 'Portrait',
      vimeo: { id: '1212631152' },
      synopsis: 'Inside Coastal is a short film about a small store in Tampa, Florida that develops film — a portrait of craft, community, and the people keeping analog photography alive.',
      credits: [['Director', 'Alpha Jalloh'], ['Cinematographer', 'Alpha Jalloh'], ['Editor', 'Alpha Jalloh'], ['Producer', 'Alpha Jalloh']],
      production: { location: 'Tampa, FL', format: 'Short Film' },
      stills: [IMG + 'a40f2ac7-inside-coastal-vimeo-poster.jpg'],
    },
    {
      slug: 'yale-kente-stoling-2026', title: '2026 Yale Kente Stoling — Black Graduation', short: 'Yale Kente Stoling', year: '2026', category: 'Event Film',
      vimeo: { id: '1204336052', hash: 'de57d23c40' },
      synopsis: "Coverage of Yale's Black Graduation kente stoling ceremony — a portrait of legacy, community, and celebration.",
      credits: [['Director', 'Alpha Jalloh'], ['Cinematographer', 'Alpha Jalloh'], ['Cinematographer', 'Aaron Davis']],
      production: { client: 'Yale University', location: 'New Haven, CT', format: 'Event Film' },
      stills: [IMG + 'f9dfa78b-yale-kente-stoling-2026-01.jpg', IMG + '0a6cde09-yale-kente-stoling-2026-02.jpg', IMG + '4e69fae6-yale-kente-stoling-2026-03.jpg'],
      collections: ['nonprofit-community'],
    },
    {
      slug: 'as-they-count-us', title: 'As They Count Us', year: '2025', category: 'Documentary',
      vimeo: { id: '1204315044', hash: 'c71504d7d7', start: 60, previewStart: 60 },
      synopsis: 'A documentary examining representation, public data, and the distance between how communities are measured and how they understand themselves.',
      credits: [['Director', 'Alpha Jalloh'], ['Cinematographer', 'Alpha Jalloh'], ['Editor', 'Alpha Jalloh'], ['Producer', 'Alpha Jalloh']],
      production: { format: 'Documentary' },
      stills: [IMG + '40206839-as-they-count-us-01.jpg', IMG + '0c88d3ac-as-they-count-us-02.jpg', IMG + '5c6320f3-as-they-count-us-03.jpg'],
    },
    {
      slug: 'black-man-run', title: 'Black Man Run', year: '2025', category: 'Short Film',
      vimeo: { id: '1204331276' }, aspect: '4 / 3',
      synopsis: 'An intimate portrait of movement, endurance, and the inner life carried through every mile.',
      credits: [['Director', 'Alpha Jalloh'], ['Cinematographer', 'Alpha Jalloh'], ['Editor', 'Alpha Jalloh'], ['Producer', 'Alpha Jalloh']],
      production: { format: 'Short Film' },
      stills: [IMG + '1770189b-black-man-run-01.jpg', IMG + 'ee803af6-black-man-run-02.jpg', IMG + 'c434b4af-black-man-run-03.jpg'],
    },
    {
      slug: 'the-city-is-watching', title: 'The City is Watching', year: '2025', category: 'Documentary',
      vimeo: { id: '1204368638', hash: '07af190d16' }, aspect: '4 / 3',
      synopsis: 'A meditation on surveillance, neighborhood, and who gets seen inside the modern American city.',
      credits: [['Director', 'Alpha Jalloh'], ['Cinematographer', 'Alpha Jalloh'], ['Editor', 'Alpha Jalloh'], ['Producer', 'Alpha Jalloh']],
      production: { format: 'Documentary' },
      stills: [IMG + 'e6167c52-the-city-is-watching-01.jpg', IMG + '82ab9967-the-city-is-watching-02.jpg', IMG + 'ac3868c5-the-city-is-watching-03.jpg'],
    },
    {
      slug: 'freddy-fixer-parade', title: 'Freddy Fixer Parade', year: '2025', category: 'Culture + Event',
      vimeo: { id: '1208092947' },
      synopsis: 'The Freddy Fixer Parade — a decades-long New Haven tradition — captured in full color, sound, and community.',
      credits: [['Director', 'Alpha Jalloh'], ['Assistant Director', 'Shakur Collins'], ['Cinematographer', 'Alpha Jalloh'], ['Editor', 'Alpha Jalloh'], ['Producer', 'Alpha Jalloh']],
      production: { location: 'New Haven, CT', format: 'Event Film' },
      stills: [IMG + '353f1dd8-freddy-fixer-parade-01.jpg', IMG + '9c6587f0-freddy-fixer-parade-02.jpg', IMG + 'a310466f-freddy-fixer-parade-03.jpg'],
      collections: ['nonprofit-community'],
    },
    {
      slug: 'broken-wings', title: 'Broken Wings', year: '2025', category: 'Short Film',
      vimeo: { id: '1208200882' },
      synopsis: 'Broken Wings — a short film exploring fragility, resilience, and flight.',
      credits: [['Director', 'Alpha Jalloh'], ['Cinematographer', 'Alpha Jalloh'], ['Editor', 'Alpha Jalloh'], ['Producer', 'Alpha Jalloh']],
      production: { format: 'Short Film' },
      stills: [IMG + '5310f5b3-broken-wings-01.jpg', IMG + '4b0e9e28-broken-wings-02.jpg', IMG + '8056401e-broken-wings-03.jpg'],
    },
    {
      slug: 'still-arriving', title: 'Still Arriving', year: '2025', category: 'Documentary Portrait',
      vimeo: { id: '1208597791' },
      synopsis: 'A micro-documentary following Shakur Collins and the long arc of his education, creative practice, and graduation from Wesleyan University.',
      credits: [['Director', 'Alpha Jalloh'], ['Cinematographer', 'Alpha Jalloh'], ['Editor', 'Alpha Jalloh'], ['Producer', 'Alpha Jalloh'], ['Subject', 'Shakur Collins']],
      production: { location: 'Middletown, CT', format: 'Micro-Documentary' },
      stills: [IMG + '33c472f4-01.jpg', IMG + '0bb3560b-02.jpg', IMG + '081478b7-03.jpg'],
      collections: ['nonprofit-community'],
    },
  ],

  // Behind-the-scenes clips (vertical) from the Academy page, plus the on-set closing loop.
  bts: [
    { id: '1212857681', caption: 'Filming outside in falling snow.', poster: IMG + 'e1c04b9f-1212857681.jpg' },
    { id: '1208305240', caption: 'An outdoor production gathering.', poster: IMG + '9403be0a-1208305240.jpg' },
    { id: '1208304839', caption: 'Camera and lighting setup in the studio.', poster: IMG + 'c2703eab-1208304839.jpg' },
    { id: '1208305853', caption: 'On location for a home interview.', poster: IMG + 'cd598239-1208305853.jpg' },
    { id: '1208305988', caption: 'Filming a seated conversation outdoors.', poster: IMG + '950d7fea-1208305988.jpg' },
  ],
  onSet: { id: '1208305734', poster: IMG + '4743dc1e-wtoo-41-of-45.jpg' },
};

TO.films.forEach((f, i) => {
  f.poster = f.stills[0];
  f.format = f.production.format || f.category;
  f.index = i;
});
TO.film = (slug) => TO.films.find((f) => f.slug === slug);

TO.team = [
  {
    name: 'Alpha Jalloh', role: 'Founder & Executive Director', img: IMG + '69b30e50-founder-camera.jpg',
    blurb: 'Director · Cinematographer · Editor',
    bio: [
      'Alpha Jalloh is a filmmaker, cinematographer, editor, and entrepreneur who founded Tell Ours Studio as a home for ambitious stories and the people who make them. His work is rooted in intimacy, natural light, emotional precision, and a belief that every frame should reveal something true.',
      "A student at Yale University, Alpha works across the full life of a project. He joins early client conversations, develops the creative direction, directs talent and crews, shapes cinematography and lighting, and carries the work through editing, color, and final delivery. That fluency allows him to protect a story's core idea while making hundreds of practical decisions around it.",
      "Beyond individual films, Alpha guides the studio's creative culture and mentors emerging filmmakers. He is building Tell Ours as both a production company and a durable creative institution where rigorous work, shared knowledge, and new talent can grow together.",
    ],
  },
  {
    name: 'Bambie Koroma', role: 'Director of Operations & Client Experience', img: IMG + 'e2a051da-bambie-koroma.jpg',
    blurb: 'Keeps the full machinery of the studio running.',
    bio: [
      'As Director of Operations and Client Experience, Bambie Koroma keeps the full machinery of Tell Ours Studio running — translating creative vision into organized action. She designs and manages the systems that allow productions to move from first conversation to final delivery: building timelines, coordinating people and resources, tracking deliverables, and making sure every department has what it needs before the work begins.',
      'Her background as a Scrum Master and project manager brings discipline without rigidity. She anticipates what a production will need, removes obstacles before they slow the team down, and protects the creative process so directors, cinematographers, and editors can stay focused on the work itself. From client communication and contract workflows to shoot-day logistics and post-production handoffs, she makes sure the studio operates with clarity, accountability, and care.',
      "She also leads Tell Ours Studio's weddings, special events, and event production division, bringing the same operational precision to celebrations and live experiences that deserve to be remembered.",
    ],
  },
  {
    name: 'James Jeter', role: 'Chief of Strategy · Director', img: IMG + '271714e0-james-jeter.jpg',
    blurb: 'Strategist, filmmaker, and advocate for civic life.',
    bio: [
      'James Jeter is a nationally respected strategist, filmmaker, and advocate whose work has shaped conversations about democracy, participation, and civic life across the country. As Founder of the Full Citizens Coalition, he has spent years building coalitions that create meaningful change.',
      "At Tell Ours Studio, James guides the company's long-term vision, strategic partnerships, and organizational growth while contributing creatively as a director. He helps shape the stories the studio tells, ensuring every project aligns with the company's mission while positioning the studio for lasting impact.",
    ],
  },
  {
    name: 'Shakur Collins', role: 'Director of Production', img: IMG + '0d983df3-shakur-collins.jpg',
    blurb: 'Turns a creative idea into a shoot day that works.',
    bio: [
      'Shakur Collins runs production at Tell Ours Studio. He is the person who turns a creative idea into a shoot day that actually works — building schedules, assembling crews, managing gear, coordinating locations, and making sure every department has what it needs before the camera rolls.',
      "A Wesleyan University graduate and filmmaker, Shakur understands production from both sides. He knows what a set needs to run smoothly and what a director needs to stay focused on the story. Whether it's a documentary, branded piece, event film, or short, he makes sure the work gets made on time, on budget, and with the highest standard of care.",
    ],
  },
  {
    name: 'Ray Boyd', role: 'Director of Partnerships & Engagement', img: IMG + '81f72994-ray-boyd.jpg',
    blurb: 'Founder of the Next Level Empowerment Program.',
    bio: [
      'Ray Boyd is the founder of the Next Level Empowerment Program and a respected community leader committed to expanding opportunity, developing people, and strengthening neighborhoods.',
      'At Tell Ours Studio, Ray leads community partnerships, organizational relationships, and engagement strategy. His ability to build authentic relationships connects the studio with organizations, leaders, and communities whose stories deserve to be documented. He reminds the team that every partnership is an opportunity to create lasting impact.',
    ],
  },
  {
    name: 'Dr. S. Zelda Roland', role: 'Senior Advisor', img: IMG + '52feecaa-zelda-roland.jpg',
    blurb: 'Educator, scholar of film and storytelling.',
    bio: [
      'Dr. S. Zelda Roland has spent her career proving that access to education is also access to voice. Through her work at Yale University and the University of New Haven, she has built influential educational programs, expanded pathways to learning, and mentored students whose ideas deserve room to develop.',
      'A scholar of film and storytelling, Dr. Roland understands that the stories we choose to tell shape the world we inherit. As Senior Advisor to Tell Ours Studio, she brings the wisdom of an educator, the eye of a storyteller, and the unwavering belief that people deserve the opportunity to author their own narratives. Her mentorship continues to shape not only our work, but the values behind every frame we create.',
    ],
  },
  {
    name: 'Gary Clarke', role: 'Production Assistant', img: IMG + '67b0e41b-gary-clarke.jpg',
    blurb: 'Creator of the HEART Program · co-founder of PTSDV Inc.',
    bio: [
      'Gary Clarke is a production assistant, program creator, and community leader shaped by transformation, discipline, and service. He is committed to helping young people build family, self-love, and purpose.',
      'At Tell Ours Studio he brings focus, patience, and attention to detail to every set. As a PA, Gary understands that the small things matter: the setup, the timing, the movement, the quiet work that helps the whole production come together.',
      'Gary holds an associate’s degree in General Studies and is completing his bachelor’s degree at Wesleyan University. He is the creator of the HEART Program and co-founder of PTSDV Inc., Protect, Teach, Stop Domestic Violence.',
    ],
  },
];

TO.academy = {
  stations: [
    { id: 'story', number: '01—02', label: 'Story', summary: 'Find the point of view, shape the structure, and prepare an interview.', outcome: 'Concept, pitch, outline, and interview plan.' },
    { id: 'camera', number: '03—04', label: 'Camera', summary: 'Build technical control, then turn it into an intentional visual language.', outcome: 'Camera exercise, storyboard, and visual sequence.' },
    { id: 'lighting', number: '05—08', label: 'Lighting & production', summary: 'Shape light and sound, plan the production, and work together on set.', outcome: 'Interview exercise, production plan, and principal filming.' },
    { id: 'editing', number: '09—12', label: 'Editing', summary: 'Organize, cut, revise, finish, and present the short film.', outcome: 'First cut, finished film, and screening.' },
  ],
  weeks: [
    { week: '01', station: 'story', title: 'Story & point of view', learn: 'Audience, theme, ethical representation, and writing a clear logline.', make: 'A short-film concept and one-paragraph pitch.' },
    { week: '02', station: 'story', title: 'Story structure & interviews', learn: 'Beginning, middle, and end; character; research; consent; and open-ended interview questions.', make: 'A story outline and interview plan.' },
    { week: '03', station: 'camera', title: 'Camera foundations', learn: 'Exposure, aperture, shutter, ISO, white balance, focus, and frame rates.', make: 'A controlled exposure and focus exercise.' },
    { week: '04', station: 'camera', title: 'Cinematography & visual language', learn: 'Composition, lens choice, coverage, motivated movement, and continuity.', make: 'A storyboard and short visual sequence.' },
    { week: '05', station: 'lighting', title: 'Lighting foundations', learn: 'Direction, quality, contrast, color temperature, and working with natural and practical light.', make: 'A comparison of interview lighting setups.' },
    { week: '06', station: 'lighting', title: 'Lighting on location & sound', learn: 'Shaping available light, balancing sources, safe placement and cables, microphone placement, and clean dialogue.', make: 'A lit interview exercise with usable audio.' },
    { week: '07', station: 'lighting', title: 'Pre-production', learn: 'Treatments, shot lists, locations, permissions, schedules, crew roles, and production safety.', make: 'A production plan for the short film.' },
    { week: '08', station: 'lighting', title: 'Production', learn: 'Directing and recording interviews and scenes, capturing purposeful B-roll, collaborating on set, and reviewing footage.', make: 'Principal filming for the short film.' },
    { week: '09', station: 'editing', title: 'Editing foundations', learn: 'Organizing and backing up media, syncing sound, making selects, sequencing, and pacing.', make: 'A first cut of the short film.' },
    { week: '10', station: 'editing', title: 'Story in the edit', learn: 'Character and structure, interview editing, continuity, rhythm, and constructive feedback.', make: 'A revised rough cut.' },
    { week: '11', station: 'editing', title: 'Finishing', learn: 'Dialogue cleanup, sound design, music permissions, basic color correction, captions, and delivery formats.', make: 'A finished cut.' },
    { week: '12', station: 'editing', title: 'Screening & next steps', learn: 'Presenting work, giving and receiving critique, reflecting on creative choices, and planning future projects.', make: 'A screening of the completed short film and a feedback session.' },
  ],
};
