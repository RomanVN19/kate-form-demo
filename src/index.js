import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Router, Switch, Redirect, Route } from 'react-router-dom';

import { KateFormProvider, connectors } from 'kate-form';

import { connectors as materialConnectors } from 'kate-form-material-kit-react';

import { Provider } from 'react-redux';
import configureStore from './store';

import './index.css';
import App from './App';
import Dashboard from './material/Dashboard';
import registerServiceWorker from './registerServiceWorker';


const store = configureStore();
const history = createBrowserHistory();

const Minimal = () => (
  <KateFormProvider connectors={connectors} logRerender>
    <App />
  </KateFormProvider>
);

const Material = props => (
  <KateFormProvider connectors={materialConnectors} logRerender>
    <Dashboard {...props} />
  </KateFormProvider>
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path="/kate-form-demo/minimal" component={Minimal} />
        <Route path="/kate-form-demo/material" component={Material} />
        <Route render={() => <Redirect to="/kate-form-demo/minimal" />} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
