import React from 'react';
import ReactDOM from 'react-dom';

import { KateFormProvider, connectors } from 'kate-form';

import { Provider } from 'react-redux';
import configureStore from './store';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <KateFormProvider connectors={connectors} logRerender>
      <App />
    </KateFormProvider>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
