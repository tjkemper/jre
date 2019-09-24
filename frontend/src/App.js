import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import JreNav from './components/JreNav';
import JreLoadable from './components/JreLoadable';

class App extends React.Component {

  render() {
    const Random = JreLoadable({
      loader: () => import('./components/JreRandom'),
    });
    const Search = JreLoadable({
      loader: () => import('./components/JreSearch'),
    });
    const Analytics = JreLoadable({
      loader: () => import('./components/analytics/JreAnalytics'),
    });
    const About = JreLoadable({
      loader: () => import('./components/JreAbout'),
    });

    return (
      <div className="App">
        <Router basename="jre">
          <JreNav />
          <Switch>
            <Route exact path="/" component={Random} />
            <Route path="/search/" component={Search} />
            <Route path="/analytics/" component={Analytics} />
            <Route path="/about/" component={About} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
