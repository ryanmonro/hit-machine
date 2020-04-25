// lose 7ths in general, this is pop

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
    if (Math.random() < 0.1) {
      // verse and chorus are the same
      chorus = verse;
    }
    this.structure = [
      {name: "Verse 1", chords: verse},
      {name: "Chorus 1", chords: chorus},
      {name: "Verse 2", chords: verse},
      {name: "Chorus 2", chords: chorus},
    ]
    if (Math.random() < 0.9) {
      // 90% chance of an intro, otherwise straight in
      // default: intro is a new section (10% chance)
      var intro = this.newChordSequence();
      var introChoice = Math.random();
      if (introChoice < 0.45) {
        // 45% chance intro is a chorus ie Bon Jovi
        intro = chorus;
      } else if (introChoice < 0.9) {
        // 45% chance intro is a verse ie not Bon Jovi
        intro = verse
      }
      this.structure.unshift({name: "Intro", chords: intro});
    }
    // default middle section: 
    var middle = this.newChordSequence();
    // 90% chance of an intro, otherwise straight in
    var middleChoice = Math.random();
    if (middleChoice < 0.5) {
      // 50% chance middle is a chorus
      middle = chorus;
    } else if (introChoice < 0.75) {
      // 25% chance middle is a verse
      middle = verse
    }
    this.structure.push({name: "Middle", chords: middle});
    this.structure.push({name: "Chorus 3", chords: chorus });
    if (Math.random() < 0.8) {
      this.structure.push({name: "Chorus 4", chords: chorus });
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