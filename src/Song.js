import React from 'react';
import Chance from 'chance';
import verb from './verb';
import idiom from './idiom';
import drunkenness from './drunkenness';
import Button from '@material-ui/core/Button';

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

console.log(verb())

class Song extends React.Component {
  constructor(props) {
    super(props);
    this.randomise = this.randomise.bind(this);
    this.state = {
      artist: artist(),
      title: title(),
      tempo: tempo(),
      minor: minor(),
      key: key()
    };
  }
  randomise(){
    this.setState({
      artist: artist(),
      title: title(),
      tempo: tempo(),
      minor: minor(),
      key: key()
    });
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
        <h1>Key</h1>
        <h2>{ this.state.key }{ this.state.minor ? "m" : "" }</h2>
        <Button variant="contained" 
          onClick={ this.randomise }
          color="primary">
          Randomise
        </Button>

      </div>
    );
  }
}

export default Song;
