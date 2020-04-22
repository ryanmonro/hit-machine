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
    this.minorness = randomElement(["natural", "harmonic", "melodic"]);
    this.key = this.minor ? Key.minorKey(key()) : Key.majorKey(key());
    this.progression = this.newChordSequence();
  }
  newChordSequence(){
    if (this.minor){
      return chordSequence().map((c) => this.key[this.minorness].chords[parseInt(c) - 1])
    }
    return chordSequence().map((c) => this.key.chords[parseInt(c) - 1])
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

// Utility functions

function capitalise(string){
  return capitalize.words(string);
}

function randomElement(arr){
  return arr[Math.floor(Math.random() * arr.length)]
}

function randomInt(max){
  return Math.floor(Math.random() * max);
}

export default SongData;