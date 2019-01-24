import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './components/Nav';
import Header from './components/Header';
import Books from './pages/Books';
import Saved from './pages/Saved';
import NoMatch from './pages/NoMatch';
import API from './utils/API';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Header />
          <Switch>
            <Route
              exact
              path="/"
              component={Books}
              loadBooks={this.loadBooks}
            />
            <Route exact path="/books" component={Books} />
            <Route exact path="/saved" component={Saved} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
