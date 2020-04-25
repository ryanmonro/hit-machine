import React from 'react';
import HitMachine from './HitMachine';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Hit Machine
        <div className="App-description">a random song idea generator</div>
      </header>
      <HitMachine />
    </div>
  );
}

export default App;
