import {
  GET_FIRMWARE_LIST,
  GET_FIRMWARE_ERROR,
  GET_FIRMWARE_IS_LOADING,
  ADD_FIRMWARE_DONE,
  ADD_FIRMWARE_ERROR,
  ADD_FIRMWARE_IS_LOADING,
  DELETE_FIRMWARE,
} from '../Reducers/firmware';

import Request from "../request";

function _getList(items) {
  return {
    type: GET_FIRMWARE_LIST,
    data: items,
  }
}

function _errorOccurred(err) {
  return {
    type: GET_FIRMWARE_ERROR,
    error: err,
  }
}

function _isLoading() {
  return {
    type: GET_FIRMWARE_IS_LOADING,
  }
}

export function getFirmwareListRequest() {
  return (dispatch, getState) => {
    dispatch(_isLoading());

    try {
      var { auth: { user: { signInUserSession: { accessToken } } } } = getState();
    } catch (error) {
      return Promise.reject();
    }

    return Request({
      url: 'firmwares',
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
    type: ADD_FIRMWARE_DONE,
    data: data,
  }
}

function _addErrorOccurred(err) {
  return {
    type: ADD_FIRMWARE_ERROR,
    error: err.errors.name,
  }
}

function _addIsLoading() {
  return {
    type: ADD_FIRMWARE_IS_LOADING,
  }
}

export function addFirmwareRequest(data) {
  return (dispatch, getState) => {
    dispatch(_addIsLoading());
    let { auth: { user: { signInUserSession: { accessToken } } } } = getState();

    return Request({
      url: 'firmwares',
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
    type: DELETE_FIRMWARE,
    id: id,
  }
}

export function deleteFirmwareRequest(id) {
  return (dispatch, getState) => {
    let { auth: { user: { signInUserSession: { accessToken } } } } = getState();

    return Request({
      url: `firmwares/${id}`,
      method: 'delete',
      token: accessToken,
    }).then(response => {
      dispatch(_delete(id));
      return Promise.resolve(true);
    }).catch(err => {
      return Promise.reject(false);
    })
  }
}
