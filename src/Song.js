// comments for sections

import Chance from 'chance';
import verb from './verb';
import mood from './mood';
import idiom from './idiom';
import drunkenness from './drunkenness';
import chordSequence from './chordSequence';
import { Key } from "@tonaljs/tonal";

var chance = new Chance();
var capitalize = require('capitalize');
var Sentencer = require('sentencer');

class Song{
  constructor(){
    this.artist = artist();
    this.title = title();
    this.tempo = tempo();
    this.mood = mood();
    this.minor = minor();
    this.guitar = guitar();
    this.keys = keys();
    this.bass = bass();
    this.drums = drums();
    this.minorness = randomElement(["natural"]); // removed the others for now
    this.key = this.minor ? Key.minorKey(key()) : Key.majorKey(key());
    this.buildSong();
  }
  newChordSequence(){
    var key // = this.minor ? this.key[this.minorness] : this.key
    if (this.minor) {
      key = this.key[this.minorness]
    } else {
      key = this.key
    }
    return chordSequence().map((degree)=>{
      var index = parseInt(degree) - 1;
      var note = key.scale[index];
      var chord = key.chords[index].split(note)[1];
      var quality = {
        "7": "",
        "m7": "m",
        "maj7": "",
        "m7b5": "ø"
      }[chord]
      return note + quality;
    }); 
  }
  buildSong(){
    var verse = this.newChordSequence();
    var chorus = this.newChordSequence();
    var middle = this.newChordSequence();
    if (Math.random() < 0.1) {
      // verse and chorus are the same
      chorus = verse;
    }
    var chorusComment = chance.weighted(
      ["more hi-hats", "another guitar part", "another keyboard part", "add handclaps", "bass gets busier"], 
      [0.2, 0.2, 0.2, 0.2, 0.2]
    );

    var tree = {
      'Intro': {
        'comment': {
          0.25: "just drums",
          // 0.25: "no drums", // will that work?
          0.25: "just bass",
          0.25: "just chords",
          0.25: "no bass"
        },
        'chords': {
          0.1: [],
          0.4: verse,
          0.4: chorus,
          // just first chord!
          0.1: [verse[0], verse[0], verse[0], verse[0]] 
        }
      },
      'Verse 1': {
        'chords': {
          1: verse
        },
        'comment': {
          0.1: "no bass until the chorus"
        }
      },
      'Chorus 1': {
        chords: {
          1: chorus
        },
        comment: {
          1: chorusComment 
        }
      },
      'Verse 2': {
        chords: {
          1: verse
        },
        comment: {
          0.25: "drums and bass drop out for a few bars",
          0.25: "half as long as first verse",
          0.5: ""
        }
      },
      'Chorus 2': {
        chords: {
          1: chorus
        },
        comment: {
          0.7: chorusComment,
          0.3: "twice as long as the first chorus"
        }
      },
      'Middle': {
        chords: {
          0.25: chorus,
          0.25: middle,
          0.5: verse
        },
        comment: {
          0.25: "drums and bass drop out and gradually build up",
          0.25: "some other instrument plays vocal melody",
          0.25: "slightly different groove to the rest of the song",
          0.25: "bass drops out"
        }
      },
      'Last Chorus': {
        chords: {
          1: chorus
        },
        comment: {
          0.3: chorusComment,
          0.7: "twice as long as the first chorus"
        }
      }
    }

    this.structure = [];
    for (var section in tree){
      var newSection = {name: section};
      for (var key in tree[section]){
        newSection[key] = chance.weighted(
          Object.values(tree[section][key]),
          Object.keys(tree[section][key])
        )
      }
      this.structure.push(newSection)
    }
  }
  details(){
    return [
      {name: "Artist", value: this.artist},
      {name: "Title", value: this.title},
      {name: "Tempo", value: this.tempo},
      {name: "Mood", value: this.mood},
      {name: "Key", value: this.key.tonic + " " + this.key.type},
      {name: "Guitar", value: this.guitar},
      {name: "Keys", value: this.keys},
      {name: "Bass", value: this.bass},
      {name: "Drums", value: this.drums},
    ]
  }
}

function artist(allowFeat=true){
  var a = randomElement([
    chance.word(),
    chance.first() + " " + chance.animal(),
    chance.name(),
    chance.prefix() + " " + Sentencer.make("{{ noun }}"),
    chance.first() + " " + Sentencer.make("the {{ noun }}"),
    verb() + Sentencer.make(" the {{ noun }}"),
    Sentencer.make("the {{ noun }}"),
    Sentencer.make("the {{ nouns }}"),
  ])
  if (allowFeat && Math.random() < 0.15) {
    a += " feat. " + artist(false)
  }
  return capitalise(a);
}

function title(){
  var t = randomElement([
    idiom(),
    drunkenness(),
    Sentencer.make("the {{ noun }}"),
    verb(),
    verb() + " " + chance.first(),
    chance.first()
  ]);
  return capitalise(t);
}

function tempo(){
  return chance.integer({ min: 60, max: 130 }) + "BPM"
}

function minor(){
  return Math.random() <= 0.3;
}

function key(){
  var k = randomElement("C Db D Eb E F Gb G Ab A Bb B".split(' '));
  return k;
}

function drums(){
  return randomElement([
    "drum kit (distorted)",
    "drum kit (Rock beat #1)",
    "drum kit (roomy, Wall of Sound-ish)",
    "CR-78 presets",
    "808 (trappy)",
    "808 (80s RnB)",
    "909 (Techno)",
    "just claps",
    "drum kit (Off the Wall-ish)",
    "classic hip-hop break",
    "Amen break",
    "none",
  ]);
}

function bass(){
  return randomElement([
    "electric, incongruous slapping",
    "electric, picked 8th note all downstrokes",
    "electric, picked, Wrecking Crew-esque",
    "electric, long notes, change when the chord does",
    "electric, what the kick drum's doing",
    "electric, dubby",
    "electric, Motown",
    "synth, sine wave long notes",
    "synth, detuned, many oscillators, long notes",
    "synth, acid",
    "synth, 16th notes sequenced",
    "None"
  ])
}

function guitar(){
  return randomElement([
    "Nile Rogers-ish",
    "The Edge-ish",
    "palm muted power chords",
    "acoustic: strumming",
    "electric: slacker strumming",
    "electric: clean verse, distorted chorus",
    "reggae offbeats",
    "same as the bass line",
    "long chords",
    "afrobeat-ish arpeggios",
    "lapsteel",
    "None"
  ])
}

// separate sound from part
function keys(){
  return randomElement([
    "Juno pads",
    "organ pads",
    "electric piano",
    "Mellotron strings",
    "arpeggiated",
    "piano (long chords)",
    "piano (ravey)",
    "piano (reggae offbeats)",
    "felted piano",
    "None"
  ])
}

// Utility functions

function capitalise(string){
  return capitalize.words(string);
}

function randomElement(arr){
  return arr[Math.floor(Math.random() * arr.length)]
}

export default Song;