import {
  GET_HARDWARES_LIST,
  GET_HARDWARES_ERROR,
  GET_HARDWARES_IS_LOADING,
  ADD_HARDWARES_DONE,
  ADD_HARDWARES_ERROR,
  ADD_HARDWARES_IS_LOADING,
  DELETE_HARDWARES,
} from '../Reducers/hardwares';

import Request from "../request";

function _getList(items) {
  return {
    type: GET_HARDWARES_LIST,
    data: items,
  }
}

function _errorOccurred(err) {
  return {
    type: GET_HARDWARES_ERROR,
    error: err,
  }
}

function _isLoading() {
  return {
    type: GET_HARDWARES_IS_LOADING,
  }
}

export function getHardwaresListRequest() {
  return (dispatch, getState) => {
    dispatch(_isLoading());

    try {
      var { auth: { user: { signInUserSession: { accessToken } } } } = getState();
    } catch (error) {
      return Promise.reject();
    }

    return Request({
      url: 'hardwares',
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

function _add(data) {
  return {
    type: ADD_HARDWARES_DONE,
    data: data,
  }
}

function _addErrorOccurred(err) {
  return {
    type: ADD_HARDWARES_ERROR,
    error: err.errors.name,
  }
}

function _addIsLoading() {
  return {
    type: ADD_HARDWARES_IS_LOADING,
  }
}

export function addHardwareRequest(data) {
  return (dispatch, getState) => {
    dispatch(_addIsLoading());
    let { auth: { user: { signInUserSession: { accessToken } } } } = getState();

    return Request({
      url: 'hardwares',
      method: 'post',
      token: accessToken,
      data: data,
    }).then(r => {
      dispatch(_add(r.data));
      return r.data;
    }).catch(e => {
      if (e.response) {
        dispatch(_addErrorOccurred(e.response.data));
      }
    })
  }
}

function _delete(id) {
  return {
    type: DELETE_HARDWARES,
    id: id,
  }
}

export function deleteHardwareRequest(id) {
  return (dispatch, getState) => {
    let { auth: { user: { signInUserSession: { accessToken } } } } = getState();

    return Request({
      url: `hardwares/${id}`,
      method: 'delete',
      token: accessToken,
    }).then(() => {
      dispatch(_delete(id));
      return Promise.resolve(true);
    }).catch(() => {
      return Promise.reject(false);
    })
  }
}
