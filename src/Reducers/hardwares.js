export const GET_HARDWARES_LIST = 'GET_HARDWARES_LIST';
export const GET_HARDWARES_ERROR = 'GET_HARDWARES_ERROR';
export const GET_HARDWARES_IS_LOADING = 'GET_HARDWARES_IS_LOADING';

export const ADD_HARDWARES_DONE = 'ADD_HARDWARES_DONE';
export const ADD_HARDWARES_ERROR = 'ADD_HARDWARES_ERROR';
export const ADD_HARDWARES_IS_LOADING = 'ADD_HARDWARES_IS_LOADING';

export const DELETE_HARDWARES = 'DELETE_HARDWARES';

const initialState = {
  isLoading: false,
  list: [],
  error: false,

  addIsLoading: false,
  addError: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_HARDWARES_LIST:
      return {
        ...state,
        isLoading: false,
        error: false,
        list: action.data,
      }
    case GET_HARDWARES_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      }
    case GET_HARDWARES_IS_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      }

    case ADD_HARDWARES_DONE:
      return {
        ...state,
        addIsLoading: false,
        addError: [],
        list: [...state.list, action.data],
      }
    case ADD_HARDWARES_ERROR:
      return {
        ...state,
        addIsLoading: false,
        addError: action.error,
      }
    case ADD_HARDWARES_IS_LOADING:
      return {
        ...state,
        addIsLoading: true,
        addError: [],
      }

    case DELETE_HARDWARES:
      return {
        ...state,
        list: state.list.filter(e => e.id !== action.id),
      }

    default:
      return state
  }
}
