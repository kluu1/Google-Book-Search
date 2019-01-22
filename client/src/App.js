import React, { Component } from 'react';
import Nav from './components/Nav';
import Header from './components/Header';
import Books from './pages/Books';
import './App.css';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Nav />
        <Header />
        <Books />
      </React.Fragment>
    );
  }
}

export default App;
