import { all, takeLatest } from 'redux-saga/effects';

import { TYPES as AUTH_TYPES } from '../ducks/auth';
import { TYPES as BET_TYPES } from '../ducks/betTypes';
import { TYPES as GAMES_TYPES } from '../ducks/games';
import { checkAuth } from './auth';
import { fetchBetTypes } from './betTypes';
import { fetchGames, storeGames } from './games';

export function* watchAuth() {
    all([yield takeLatest(AUTH_TYPES.CHECK_AUTH_START, checkAuth)]);
}

export function* watchBetTypes() {
    all([yield takeLatest(BET_TYPES.BET_TYPES_START, fetchBetTypes)]);
}

export function* watchGames() {
    all([
        yield takeLatest(GAMES_TYPES.FETCH_GAMES, fetchGames),
        yield takeLatest(GAMES_TYPES.ADD_GAMES, storeGames)
    ]);
}