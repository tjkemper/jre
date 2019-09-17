import React from 'react';
import logo from './logo.svg';
import './App.css';
import JreNav from './components/JreNav';
import JreSearch from './components/JreSearch';

function App() {
  return (
    
    <div className="App">
      <JreNav />
      <JreSearch />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
