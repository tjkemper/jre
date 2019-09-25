import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import JreNav from './components/JreNav';
import JreLoadable from './components/JreLoadable';

class App extends React.Component {

  render() {
    const Analytics = JreLoadable({
      loader: () => import('./components/analytics/JreAnalytics'),
    });
    const Search = JreLoadable({
      loader: () => import('./components/JreSearch'),
    });
    const Random = JreLoadable({
      loader: () => import('./components/JreRandom'),
    });

    return (
      <div className="App">
        <Router basename="jre">
          <JreNav />
          <Switch>
            <Route exact path="/" component={Analytics} />
            <Route path="/search/" component={Search} />
            <Route exact path="/random/" component={Random} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
