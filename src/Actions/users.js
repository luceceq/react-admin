import {
  GET_USERS_LIST,
  GET_USERS_ERROR,
  GET_USERS_IS_LOADING,
  UPDATE_USERS_LIST,
} from '../Reducers/users';

import Request from "../request";

function _getList(items) {
  return {
    type: GET_USERS_LIST,
    data: items,
  }
}

function _errorOccurred(err) {
  return {
    type: GET_USERS_ERROR,
    error: err,
  }
}

function _isLoading() {
  return {
    type: GET_USERS_IS_LOADING,
  }
}

export function getUsrsListRequest() {
  return (dispatch, getState) => {
    dispatch(_isLoading());

    try {
      var { auth: { user: { signInUserSession: { accessToken } } } } = getState();
    } catch (error) {
      return Promise.reject();
    }

    return Request({
      url: 'users',
      method: 'get',
      token: accessToken,
    }).then(r => {
      dispatch(_getList(r.data));
    }).catch(e => {
      if (e) {
        dispatch(_errorOccurred(e));
      }
    })
  }
}

function _updateList(newItem) {
  return {
    type: UPDATE_USERS_LIST,
    data: newItem,
  }
}

export function assignToGroup({userId, data}) {
  return (dispatch, getState) => {
    dispatch(_isLoading());
    let { auth: { user: { signInUserSession: { accessToken } } } } = getState();

    return Request({
      url: `users/${userId}`,
      method: 'put',
      token: accessToken,
      data: data,
    }).then(r => {
      dispatch(_updateList(r.data));
    }).catch(e => {
      if (e) {
        dispatch(_errorOccurred(e));
      }
    });
  }
}
