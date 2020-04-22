import React from 'react';
import Button from '@material-ui/core/Button';
import SongData from './SongData';

class Song extends React.Component {
  constructor(props) {
    super(props);
    this.randomise = this.randomise.bind(this);
    this.state = {
      song: new SongData()
    };
  }
  randomise(){
    this.setState({
      song: new SongData()
    });
  }
  render() {
    return (
      <div className="Song">
        <h1>Artist</h1>
        <h2>{ this.state.song.artist }</h2>
        <h1>Title</h1>
        <h2>{ this.state.song.title }</h2>
        <h1>Tempo</h1>
        <h2>{ this.state.song.tempo }</h2>
        <h1>Key</h1>
        <h2>{ this.state.song.key.tonic } { this.state.song.key.type }</h2>
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
