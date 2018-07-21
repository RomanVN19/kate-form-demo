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
          <NavLink to="/kate-form-demo/material/inputs">Material demo</NavLink>
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
        <div style={{ marginTop: 50 }}>
          <a target="_blank" href="https://github.com/romannep/kate-form-demo">View source</a>
        </div>
      </div>
    );
  }
}

export default App;
