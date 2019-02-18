import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter, routerMiddleware } from 'connected-react-router';
import throttle from "lodash/throttle";

import rootReducer from "./Reducers";
import { loadState, saveState } from "./localStorage";

export const history = createBrowserHistory();

const persistedState = loadState();
const enhancers = [];

const middleware = [
  thunk,
  routerMiddleware(history),
];

/* eslint no-underscore-dangle: "off" */
/* eslint no-undef: "off" */
if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers,
);

const store = createStore(
  connectRouter(history)(rootReducer),
  persistedState,
  composedEnhancers,
);

store.subscribe(throttle(() => {
  saveState({
    auth: store.getState().auth
  });
}, 1000));

export default store;
