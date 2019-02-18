import {
  GET_GROUPS_LIST,
  GROUPS_ERROR,
  GROUPS_IS_LOADING,
  ADD_GROUP_IS_LOADING,
  GROUP_ADDED,
  ADD_GROUP_ERROR,
  DELETE_GROUP,
} from '../Reducers/groups';

import Request from "../request";

function updateGroupsList(items) {
  return {
    type: GET_GROUPS_LIST,
    data: items,
  }
}

function errorOccurred(err) {
  return {
    type: GROUPS_ERROR,
    error: err,
  }
}

function isLoading() {
  return {
    type: GROUPS_IS_LOADING,
  }
}

export function getGroupsList() {
  return (dispatch, getState) => {
    dispatch(isLoading());

    try {
      var { auth: { user: { signInUserSession: { accessToken } } } } = getState();
    } catch (error) {
      return Promise.reject();
    }

    return Request({
      url: 'groups',
      method: 'get',
      token: accessToken,
    }).then(r => {
      dispatch(updateGroupsList(r.data));
    }).catch(e => {
      if (e) {
        dispatch(errorOccurred(e));
      }

      return Promise.reject();
    });
  }
}

function addGroupErrorOccurred(err) {
  return {
    type: ADD_GROUP_ERROR,
    error: err.errors.name,
  }
}

function addGroupIsLoading() {
  return {
    type: ADD_GROUP_IS_LOADING,
  }
}

function groupAdded(data) {
  return {
    type: GROUP_ADDED,
    data: data,
  }
}

export function addGroupRequest(data) {
  return (dispatch, getState) => {
    dispatch(addGroupIsLoading());
    let { auth: { user: { signInUserSession: { accessToken } } } } = getState();

    return Request({
      url: 'groups',
      method: 'post',
      token: accessToken,
      data: data,
    }).then(r => {
      dispatch(groupAdded(r.data));
      return r.data;
    }).catch(e => {
      if (e.response) {
        dispatch(addGroupErrorOccurred(e.response.data));
      }
    })
  }
}

function groupDeleted(id) {
  return {
    type: DELETE_GROUP,
    id: id,
  }
}

export function deleteGroupRequest(id) {
  return (dispatch, getState) => {
    let { auth: { user: { signInUserSession: { accessToken } } } } = getState();

    return Request({
      url: `groups/${id}`,
      method: 'delete',
      token: accessToken,
    }).then(() => {
      dispatch(groupDeleted(id));
      return Promise.resolve(true);
    }).catch(() => {
      return Promise.reject(false);
    })
  }
}
