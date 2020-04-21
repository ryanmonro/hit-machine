// source: https://github.com/dariusk/corpora/

function drunkenness(){
  var states_of_drunkenness = [
    "drunk",
    "hammered",
    "intoxicated",
    "impaired",
    "stinko",
    "wrecked",
    "pissed",
    "blotto",
    "sloshed",
    "buzzed",
    "tight",
    "canned",
    "baked",
    "thrashed",
    "trashed",
    "tipsy",
    "smashed",
    "totaled",
    "tore up",
    "gone",
    "soused",
    "thirsty",
    "annihilated",
    "blitzed",
    "stoned",
    "lit",
    "plastered",
    "three sheets to the wind",
    "tanked",
    "delerious",
    "friendly",
    "disorderly",
    "rowdy",
    "stewed"
  ];
  return states_of_drunkenness[Math.floor(Math.random() * states_of_drunkenness.length)];
}

export default drunkenness;