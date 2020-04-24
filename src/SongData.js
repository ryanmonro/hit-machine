// avoid mmaj7

import Chance from 'chance';
import verb from './verb';
import mood from './mood';
import idiom from './idiom';
import drunkenness from './drunkenness';
import chordSequence from './chordSequence';
import { Note, Scale, Key, Progression } from "@tonaljs/tonal";

var chance = new Chance();
var capitalize = require('capitalize');
var Sentencer = require('sentencer');

class SongData{
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
    this.minorness = randomElement(["natural", "melodic"]);
    this.key = this.minor ? Key.minorKey(key()) : Key.majorKey(key());
    this.verse = this.newVerse();
    this.chorus = this.newChorus();
  }
  newChordSequence(){
    if (this.minor){
      return chordSequence().map((c) => this.key[this.minorness].chords[parseInt(c) - 1])
    }
    return chordSequence().map((c) => this.key.chords[parseInt(c) - 1])
  }
  newVerse(){
    return this.newChordSequence()
  }

  newChorus(){
    return this.newChordSequence()
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

  structure(){
    return [
      {name: "Verse", chords: this.verse},
      {name: "Chorus", chords: this.chorus},

    ]
  }
}


function artist(feat=true){
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
  if (feat && Math.random() < 0.15) {
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
  return Math.random() <= 0.5;
}

function key(){
  var k = randomElement("C Db D Eb E F Gb G Ab A Bb B".split(' '));
  return k;
}

function drums(){
  return randomElement([
    "Drum kit (distorted)",
    "Drum kit (Rock beat #1)",
    "Drum kit (roomy, Wall of Sound-ish)",
    "CR-78 presets",
    "808 (trappy)",
    "808 (80s RnB)",
    "909 (Techno)",
    "Just claps",
    "Drum kit (Off the Wall-ish)",
    "Classic hip-hop break",
    "Amen break",
    "None",
  ]);
}

function bass(){
  return randomElement([
    "Bass guitar: incongruous slapping",
    "Bass guitar: picked 8th note all downstrokes",
    "Bass guitar: picked, Wrecking Crew-esque",
    "Bass guitar: long notes, change when the chord does",
    "Bass guitar: what the kick drum's doing",
    "Bass guitar: dubby",
    "Bass guitar: Motown",
    "Synth: sine wave long notes",
    "Synth: detuned, many oscillators, long notes",
    "Synth: acid",
    "Synth: 16th notes sequenced",
    "None"
  ])
}

function guitar(){
  return randomElement([
    "Nile Rogers-ish",
    "The Edge-ish",
    "Palm muted power chords",
    "Acoustic strumming",
    "Electric slacker strumming",
    "Clean verse, distorted chorus",
    "Reggae offbeats",
    "Same as the bass line",
    "Long chords",
    "Afrobeat-ish arpeggios",
    "Lapsteel",
    "None"
  ])
}

// separate sound from part
function keys(){
  return randomElement([
    "Juno pads",
    "Organ pads",
    "Electric piano",
    "Mellotron strings",
    "Arpeggiated",
    "Piano (long chords)",
    "Piano (ravey)",
    "Piano (reggae offbeats)",
    "Felted piano",
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

export default SongData;