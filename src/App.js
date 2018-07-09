import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './App.css';

import FormProxy from './FormPlain';
import FormProxyLayout from './FormLayout';

class App extends Component {
  render() {
    return (
      <div className="App">
        <p>
          <NavLink to="/material">Material demo</NavLink>
        </p>
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
