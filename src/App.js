import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import FormProxy from './FormPlain';
import FormProxyLayout from './FormLayout';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          Form Plain
        </p>
        <FormProxy />
        <p className="App-intro">
          Form Layout
        </p>
        <div style={{margin: 'auto', width: 'fit-content'}}>
          <FormProxyLayout />
        </div>
      </div>
    );
  }
}

export default App;
