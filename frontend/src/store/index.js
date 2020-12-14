import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import auth from './ducks/auth';
import betTypes from './ducks/betTypes';
import cart from './ducks/cart';
import games from './ducks/games';
import { TYPES } from './ducks/auth';
import { watchAuth, watchBetTypes, watchGames } from './sagas';

const appReducer = combineReducers({
    auth,
    betTypes,
    cart,
    games
});

const rootReducer = (state, action) => {
    if(action.type === TYPES.USER_LOGOUT)
        state = undefined;

   return appReducer(state, action); 
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchGames);
sagaMiddleware.run(watchBetTypes);

export default store;