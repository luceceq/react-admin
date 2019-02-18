import {
  ITEMLOOKUP_IS_LOADING,
  ITEMLOOKUP_GET_LIST,
  ITEMLOOKUP_IS_NOT_LOADING,
} from '../Reducers/itemLookup';

import Request from "../request";

function _isLoading() {
  return {
    type: ITEMLOOKUP_IS_LOADING,
  }
}

function _isNotLoading() {
  return {
    type: ITEMLOOKUP_IS_NOT_LOADING,
  }
}

function _updateList(items) {
  return {
    type: ITEMLOOKUP_GET_LIST,
    payload: typeof items === 'object' ? [items] : items,
  }
}

let queryTemp = '';

export function requestSearch({ query }) {
  query = query ? query : queryTemp;
  queryTemp = query;

  return (dispatch, getState) => {
    dispatch(_isLoading());
    let { auth: { user: { signInUserSession: { accessToken } } } } = getState();

    return Request({
      admin: true,
      url: `items?${query}`,
      method: 'get',
      token: accessToken,
    }).then(r => {
      dispatch(_updateList(r.data));
    }).catch(() => {
      dispatch(_isNotLoading());
    });
  }
}

export function requestSearchByHardware({ query }) {
  query = query ? query : queryTemp;
  queryTemp = query;

  return (dispatch, getState) => {
    dispatch(_isLoading());
    let { auth: { user: { signInUserSession: { accessToken } } } } = getState();

    return Request({
      admin: true,
      url: `items?${query}`,
      method: 'get',
      token: accessToken,
    }).then(r => {
      dispatch(_updateList(r.data));
    }).catch(() => {
      dispatch(_updateList([]));
    });
  }
}

export function requestDeleteHardware(id) {
  return (dispatch, getState) => {
    dispatch(_isLoading());
    let { auth: { user: { signInUserSession: { accessToken } } } } = getState();

    return Request({
      admin: true,
      url: `items/${id}`,
      method: 'delete',
      token: accessToken,
    }).then(r => {
      dispatch(requestSearchByHardware({
        query: null,
      }));

      return Promise.resolve(r.data);
    }).catch(e => {
      dispatch(_isNotLoading());
      return Promise.reject(e);
    });
  }
}
