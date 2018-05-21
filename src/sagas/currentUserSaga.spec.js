import { take, put, call, apply } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

import {
    GET_CURRENT_USER_INFO,
    setCurrentUser
} from "../actions";

import { currentUserSaga } from "./currentUserSaga";

describe('The Current User Saga', () => {
    test('It triggers the action GET_CURRENT_USER_INFO successfully', () => {
        // create a generator object
        const gen = currentUserSaga();
        expect(gen.next().value).toEqual(take(GET_CURRENT_USER_INFO));

    })

    test('It fetches and puts the current user data', () => {
        // mocks
        const id = 'NCC1701';
        const user = { name: 'Americo Thomas' };
        const json = () => {};
        const response =  { json };

        // create a generator object
        const gen = currentUserSaga();

        gen.next();
        expect(gen.next({id}).value).toEqual(call(fetch, `http://localhost:8081/user/${id}`));
        expect(gen.next(response).value).toEqual(apply(response, response.json));
        expect(gen.next(user).value).toEqual(put(setCurrentUser(user)));
    })
});