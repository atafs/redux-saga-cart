import { delay } from 'redux-saga';

// generator function
export function* currentUserSaga() {
    while (true) {
        yield delay(1000);
        console.log('User sagas loop')
    }
}