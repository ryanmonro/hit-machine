// from moodlist.net via Tom Whitwell
// returns string of two randomly picked moods

function mood(){
  var moods = [
    'Accepted',
    'Accomplished',
    'Aggravated',
    'Alone',
    'Amused',
    'Angry',
    'Annoyed',
    'Anxious',
    'Apathetic',
    'Apologetic',
    'Ashamed',
    'Awake',
    'Bewildered',
    'Bitchy',
    'Bittersweet',
    'Blah',
    'Blank',
    'Blissful',
    'Bored',
    'Bouncy',
    'Brooding',
    'Calm',
    'Cautious',
    'Chaotic',
    'Cheerful',
    'Chilled',
    'Chipper',
    'Cold',
    'Complacent',
    'Confused',
    'Content',
    'Cranky',
    'Crappy',
    'Crazy',
    'Crushed',
    'Curious',
    'Cynical',
    'Dark',
    'Defensive',
    'Delusional',
    'Demented',
    'Depressed',
    'Determined',
    'Devious',
    'Dirty',
    'Disappointed',
    'Discontent',
    'Ditzy',
    'Dorky',
    'Drained',
    'Drunk',
    'Ecstatic',
    'Energetic',
    'Enraged',
    'Enthralled',
    'Envious',
    'Exanimate',
    'Excited',
    'Exhausted',
    'Fearful',
    'Flirty',
    'Forgetful',
    'Frustrated',
    'Full',
    'Geeky',
    'Giddy',
    'Giggly',
    'Gloomy',
    'Good',
    'Grateful',
    'Groggy',
    'Grumpy',
    'Guilty',
    'Happy',
    'Heartbroken',
    'High',
    'Hopeful',
    'Hot',
    'Hungry',
    'Hyper',
    'Impressed',
    'Indescribable',
    'Indifferent',
    'Infuriated',
    'Irate',
    'Irritated',
    'Jealous',
    'Joyful',
    'Jubilant',
    'Lazy',
    'Lethargic',
    'Listless',
    'Lonely',
    'Loved',
    'Mad',
    'Melancholy',
    'Mellow',
    'Mischievous',
    'Moody',
    'Morose',
    'Naughty',
    'Nerdy',
    'Numb',
    'Okay',
    'Optimistic',
    'Peaceful',
    'Pessimistic',
    'Pissed off',
    'Pleased',
    'Predatory',
    'Quixotic',
    'Rapturous',
    'Recumbent',
    'Refreshed',
    'Rejected',
    'Rejuvenated',
    'Relaxed',
    'Relieved',
    'Restless',
    'Rushed',
    'Sad',
    'Satisfied',
    'Shocked',
    'Sick',
    'Silly',
    'Sleepy',
    'Smart',
    'Stressed',
    'Surprised',
    'Sympathetic',
    'Thankful',
    'Tired',
    'Touched',
    'Uncomfortable',
    'Weird'
  ];
  var output = []
  output.push(moods.splice(Math.floor(Math.random() * moods.length), 1))
  output.push(moods.splice(Math.floor(Math.random() * moods.length), 1))
  return output.join(", ");
}

export default mood;