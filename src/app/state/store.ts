import { combineReducers, createStore, Store } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import * as reducers from './ducks';

const rootReducer = combineReducers(reducers);

// const composeEnhancers = composeWithDevTools({});

const configureStore = (): Store => {
  return createStore(rootReducer, devToolsEnhancer({}));
};

export default configureStore;

export type AppState = ReturnType<typeof rootReducer>;
