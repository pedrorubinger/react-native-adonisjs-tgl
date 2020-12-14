import { put } from 'redux-saga/effects';

import api from '../../services/api';
import { Creators as GamesActions } from '../ducks/games';

export function* fetchGames(action) {
    const { userId, filters, page } = action.payload;
    const filtered = !!filters.length
        ? filters.reduce((acc, cur) => acc + ';' + cur)
        : 'all';

    // console.log(filters, filtered);
    try {
        const response = yield api
            .get(`/games/user/${userId}/${filtered}?page=${page || '1'}`);
        const pagination = {
            page: response.data.page,
            total: response.data.total,
            perPage: response.data.perPage,
            lastPage: response.data.lastPage
        };

        yield put(GamesActions.fetchGamesSuccess(response.data.data, pagination));
    } catch(err) {
        yield put(GamesActions.fetchGamesFailure(err.toString()));
    }
}

export function* storeGames(action) {
    try {
        yield api.post('/games', action.payload);
    } catch (err) {
        yield put(GamesActions.fetchGamesFailure(err.toString()));
    }
}