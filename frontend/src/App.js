import React from 'react';
import { Provider } from 'react-redux';
import { registerRootComponent } from 'expo';

import Router from './routes';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default registerRootComponent(App);