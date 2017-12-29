import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { routerReducer as routing, routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas';
import reducers from './reducers';
import appHistory from './history';

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const appRouterMiddleware = routerMiddleware(appHistory);
  const enhancer = compose(
    applyMiddleware(sagaMiddleware),
    applyMiddleware(appRouterMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  );
  const store = createStore(combineReducers({
    ...reducers, routing,
  }), initialState, enhancer);
  sagaMiddleware.run(sagas);
  
  return store;
};