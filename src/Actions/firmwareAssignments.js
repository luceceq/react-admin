import {
  GET_FIRMWARE_ASSIGNMENT,
  DELETE_FIRMWARE_ASSIGNMENT,
  ADD_FIRMWARE_ASSIGNMENT,
} from '../Reducers/firmwareAssignments';

import Request from "../request";

export function getFirmwareAssignments() {
  return (dispatch, getState) => {
    let { auth: { user: { signInUserSession: { accessToken } } } } = getState();

    return Request({
      url: 'firmware_assignments',
      method: 'get',
      token: accessToken,
    }).then(r => {
      dispatch({
        type: GET_FIRMWARE_ASSIGNMENT,
        data: r.data,
      });
    }).catch(() => {});
  }
}

export function deleteFirmwareAssignment(id) {
  return (dispatch, getState) => {
    let { auth: { user: { signInUserSession: { accessToken } } } } = getState();

    return Request({
      url: `firmware_assignments/${id}`,
      method: 'delete',
      token: accessToken,
    }).then(() => {
      dispatch({
        type: DELETE_FIRMWARE_ASSIGNMENT,
        id: id,
      });

      return Promise.resolve(true);
    }).catch(() => {
      return Promise.reject(false);
    });
  }
}

export function addFirmwareAssignment(data) {
  return (dispatch, getState) => {

    try {
      var { auth: { user: { signInUserSession: { accessToken } } } } = getState();
    } catch (error) {
      return Promise.reject();
    }

    return Request({
      url: 'firmware_assignments',
      method: 'post',
      token: accessToken,
      data: data,
    }).then(r => {
      dispatch({
        type: ADD_FIRMWARE_ASSIGNMENT,
        data: r.data,
      });

      return r.data;
    }).catch(e => {
      return Promise.reject(false);
    });
  }
}
