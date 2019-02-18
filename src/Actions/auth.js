import { push } from 'connected-react-router';

import {
  LOG_IN_SUCCESS,
  LOG_OUT,
} from '../Reducers/auth';

export function logOut() {
  return {
    type: LOG_OUT,
  }
}

export function logOutAction() {
  return (dispatch) => {
    dispatch(push('/logout'));
    dispatch(logOut());
  }
}

function logInSuccess(user) {
  return {
    type: LOG_IN_SUCCESS,
    user: user,
  }
}

export function hardLogin({ token, expire }) {
  return (dispatch) => {
    const time = parseInt((new Date()).getTime() / 1000, 10);
    const user = {
      "signInUserSession": {
        "accessToken": {
          "jwtToken": token,
          "payload": {
            "auth_time": time,
            "exp": time + parseInt(expire, 10),
          }
        }
      }
    }

    dispatch(logInSuccess(user));
  }
}
