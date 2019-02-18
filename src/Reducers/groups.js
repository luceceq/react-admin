export const GET_GROUPS_LIST = 'GET_GROUP_LIST';
export const GROUPS_ERROR = 'GROUPS_ERROR';
export const GROUPS_IS_LOADING = 'GROUPS_IS_LOADING';

export const GROUP_ADDED = 'GROUP_ADDED';
export const ADD_GROUP_IS_LOADING = 'ADD_GROUP_IS_LOADING';
export const ADD_GROUP_ERROR = 'ADD_GROUP_ERROR';

export const DELETE_GROUP = 'DELETE_GROUP';

const initialState = {
  isLoading: false,
  list: [],
  error: false,

  addGroupIsLoading: false,
  addGroupError: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_GROUPS_LIST:
      return {
        ...state,
        isLoading: false,
        error: false,
        list: action.data,
      }
    case GROUPS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      }
    case GROUPS_IS_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      }

    case ADD_GROUP_ERROR:
      return {
        ...state,
        addGroupIsLoading: false,
        addGroupError: action.error,
      }
    case ADD_GROUP_IS_LOADING:
      return {
        ...state,
        addGroupIsLoading: true,
        addGroupError: [],
      }
    case GROUP_ADDED:
      return {
        ...state,
        addGroupIsLoading: false,
        addGroupError: [],
        list: [...state.list, action.data],
      }

    case DELETE_GROUP:
      return {
        ...state,
        list: state.list.filter(e => e.id !== action.id),
      }

    default:
      return state
  }
}
