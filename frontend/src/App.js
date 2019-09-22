import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import JreNav from './components/JreNav';
import JreSearch from './components/JreSearch';
import JreAnalytics from './components/JreAnalytics'
import JreAbout from './components/JreAbout'

function App() {
  return (
    <div className="App">
      <Router basename="jre">
        <JreNav />
        <Route exact path="/" component={JreSearch} />
        <Route path="/analytics/" component={JreAnalytics} />
        <Route path="/about/" component={JreAbout} />
      </Router>
    </div>
  );
}

export default App;
