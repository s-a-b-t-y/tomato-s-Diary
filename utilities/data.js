const SAMPLE_ENTRIES = [
  {
    id: '1',
    title: 'A Quiet Morning with Tea',
    content: 'The rain tapped softly against the window this morning. I sat with my chamomile tea, watching the world wake up in drops of silver. There is something deeply comforting about mornings like these, where time slows down and the world feels gentle.\n\nI thought about the book I am reading, the one about a woman who finds peace in a small coastal village. I think I understand her now. Sometimes peace is not about escaping, but about learning to be still.\n\nToday I want to carry this calm with me. I want to be the kind of person who notices the small things, the way light falls through curtains, the smell of fresh bread, the sound of laughter from somewhere far away.',
    mood: 'peaceful',
    date: '2026-07-09T08:30:00',
    createdAt: '2026-07-09T08:30:00',
    updatedAt: '2026-07-09T08:30:00'
  },
  {
    id: '2',
    title: 'Letters I Will Never Send',
    content: 'There are letters living inside me that will never find envelopes. Words addressed to people who have become strangers, to moments that have dissolved into memory.\n\nI wrote one today, to the version of myself who was afraid to speak. I told her that her voice matters, that the world needs her whispered truths as much as it needs the shouted ones.\n\nWriting is my favorite form of letting go. Each word I put down is a small release, a gentle unclenching of something I have been holding for too long.',
    mood: 'nostalgic',
    date: '2026-07-08T21:15:00',
    createdAt: '2026-07-08T21:15:00',
    updatedAt: '2026-07-08T21:15:00'
  },
  {
    id: '3',
    title: 'The Garden After Rain',
    content: 'I walked through the garden after the storm. Everything smelled of earth and beginnings. The roses were heavier with water, their petals drooping like tired dancers taking a bow.\n\nI noticed a small sprout pushing through near the old stone wall. Something new is always growing, even when we are not looking. Even when we think nothing is happening.\n\nThat is what I want to remember. Growth does not always look like progress. Sometimes it looks like patience. Sometimes it looks like rest.',
    mood: 'grateful',
    date: '2026-07-07T16:45:00',
    createdAt: '2026-07-07T16:45:00',
    updatedAt: '2026-07-07T16:45:00'
  },
  {
    id: '4',
    title: 'Recipe for a Good Day',
    content: 'One cup of sunlight through the window.\nTwo tablespoons of slow music.\nA handful of warm bread with honey.\nA generous pour of unscheduled time.\nOne long walk with no destination.\nA sprinkle of laughter from a stranger.\nAnd a quiet evening with a good book.\n\nThat is all I need. That is more than enough.',
    mood: 'happy',
    date: '2026-07-06T10:20:00',
    createdAt: '2026-07-06T10:20:00',
    updatedAt: '2026-07-06T10:20:00'
  },
  {
    id: '5',
    title: 'When Everything Feels Heavy',
    content: 'Today was one of those days where the weight of everything pressed down quietly. No dramatic breakdown, no tears. Just a heaviness that sat behind my ribs like a stone.\n\nI allowed it. I did not fight it. I made myself a cup of warm milk, wrapped myself in my thickest blanket, and simply existed.\n\nSome days, survival is the achievement. Getting through is the victory. And I did. I am here. And tomorrow, the weight might be a little lighter.',
    mood: 'sad',
    date: '2026-07-05T23:10:00',
    createdAt: '2026-07-05T23:10:00',
    updatedAt: '2026-07-05T23:10:00'
  }
];

const MOOD_OPTIONS = [
  { value: 'happy', emoji: '😊', label: 'Happy' },
  { value: 'sad', emoji: '😢', label: 'Sad' },
  { value: 'calm', emoji: '😌', label: 'Calm' },
  { value: 'excited', emoji: '🤩', label: 'Excited' },
  { value: 'grateful', emoji: '🙏', label: 'Grateful' },
  { value: 'angry', emoji: '😤', label: 'Angry' },
  { value: 'anxious', emoji: '😰', label: 'Anxious' },
  { value: 'peaceful', emoji: '🕊️', label: 'Peaceful' },
  { value: 'loving', emoji: '🥰', label: 'Loving' },
  { value: 'nostalgic', emoji: '🥺', label: 'Nostalgic' },
  { value: 'confused', emoji: '😵‍💫', label: 'Confused' },
  { value: 'not-sure', emoji: '🤔', label: 'Not Sure' }
];

const MOTIVATIONAL_QUOTES = [
    { text: 'She wrote her fears away and made room for joy.', author: "Cutie Pie J&I" },
    { text: 'Your story matters. Start writing it today.', author: "Cutie Pie J&I" },
    { text: 'Every page is a new beginning.', author: "Cutie Pie J&I" },
    { text: 'The pen is a key that unlocks rooms of the heart.', author: "Cutie Pie J&I" },
    { text: 'In the quiet of writing, we find our truest voice.', author: "Cutie Pie J&I" }
];

const FILTER_OPTIONS = {
  moods: ['all', 'happy', 'sad', 'calm', 'excited', 'grateful', 'angry', 'anxious', 'peaceful', 'loving', 'nostalgic'],
  sort: [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'title', label: 'Title A-Z' }
  ]
};
