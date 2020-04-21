import React from 'react';
import Chance from 'chance';
import verb from './verb';
import idiom from './idiom';

var chance = new Chance();
var capitalize = require('capitalize');
var Sentencer = require('sentencer');

function artist(feat=true){
  var a = randomElement([
    chance.word(),
    chance.first() + " " + chance.animal(),
    chance.name(),
    chance.prefix() + " " + Sentencer.make("{{ noun }}"),
    chance.first() + " " + Sentencer.make("the {{ noun }}"),
    Sentencer.make("the {{ noun }}"),
    verb() + Sentencer.make(" the {{ noun }}"),
    Sentencer.make("the {{ nouns }}"),
  ])
  if (feat && Math.random() < 0.15) {
    a += " feat. " + artist(false)
  }
  return capitalise(a);
}

function title(){
  return capitalise(idiom());
}

function tempo(){
  return chance.integer({ min: 60, max: 130 }) + "BPM"
}

function capitalise(string){
  return capitalize.words(string);
}

function randomElement(arr){
  return arr[Math.floor(Math.random() * arr.length)]
}

// function sentenceFragment(string){
//   var words = string.split(' ');
//   var start = randomInt(words.length - 1);
//   var end = start + randomInt(words.length - start - 1);
//   return words.slice(start, end).join(' ');
// }

function randomInt(max){
  return Math.floor(Math.random() * max);
}

console.log(verb())

class Song extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: artist(),
      title: title(),
      tempo: tempo()
    };
  }
  render() {
    return (
      <div className="Song">
        <h1>Artist</h1>
        <h2>{ this.state.artist }</h2>
        <h1>Title</h1>
        <h2>{ this.state.title }</h2>
        <h1>Tempo</h1>
        <h2>{ this.state.tempo }</h2>

        
      </div>
    );
  }
}

export default Song;
