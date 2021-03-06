import React from 'react';
import Button from '@material-ui/core/Button';
import Song from './Song';

class HitMachine extends React.Component {
  constructor(props) {
    super(props);
    this.randomise = this.randomise.bind(this);
    this.state = {
      song: new Song()
    };
  }
  componentDidMount() {
    document.title = 'Hit Machine'
  }
  randomise(){
    this.setState({
      song: new Song()
    });
  }
  comment(text){
    return <span className="sectionComment">({text})</span>
  }
  render() {
    return (
      <div className="HitMachine">
        <h1>{this.state.song.artist} – {this.state.song.title}</h1>
        { this.state.song.details().map ((detail, idx) => 
          <div className="songDetail" key={idx}>
          <h3>{detail.name} <span style={{fontWeight: 400}}>{detail.value}</span></h3>
          </div>
        )}

        { this.state.song.structure.map((section, idx) =>
          <div className="section" key={idx}>
          <h3 className="sectionHeading">{section.name}
          { section.comment.length > 0 ? this.comment(section.comment) : "" }
          </h3>
          <p className="chordRow"> | 
          { section.chords.map((chord, idx) =>
            <span key={idx}> {chord} |</span>
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

export default HitMachine;
