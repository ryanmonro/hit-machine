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
  componentWillMount() {
    document.title = 'Hit Machine'
  }
  randomise(){
    this.setState({
      song: new SongData()
    });
  }
  render() {
    return (
      <div className="Song">
        { this.state.song.details().map ((detail) => 
          <h3>{detail.name} <span style={{fontWeight: 400}}>{detail.value}</span></h3>
        )}

        { this.state.song.structure().map((section) =>
          <div className="section">
          <h3>{section.name}</h3>
          <p> | 
          { section.chords.map((chord) =>
            <span> {chord} |</span>
          )}
          </p>
          </div>
        )}

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
