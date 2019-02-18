export const GET_FIRMWARE_LIST = 'GET_FIRMWARE_LIST';
export const GET_FIRMWARE_ERROR = 'GET_FIRMWARE_ERROR';
export const GET_FIRMWARE_IS_LOADING = 'GET_FIRMWARE_IS_LOADING';

export const ADD_FIRMWARE_DONE = 'ADD_FIRMWARE_DONE';
export const ADD_FIRMWARE_ERROR = 'ADD_FIRMWARE_ERROR';
export const ADD_FIRMWARE_IS_LOADING = 'ADD_FIRMWARE_IS_LOADING';

export const DELETE_FIRMWARE = 'DELETE_FIRMWARE';

const initialState = {
  isLoading: false,
  list: [],
  error: false,

  addIsLoading: false,
  addError: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FIRMWARE_LIST:
      return {
        ...state,
        isLoading: false,
        error: false,
        list: action.data,
      }
    case GET_FIRMWARE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      }
    case GET_FIRMWARE_IS_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      }

    case ADD_FIRMWARE_DONE:
      return {
        ...state,
        addIsLoading: false,
        addError: [],
        list: [...state.list, action.data],
      }
    case ADD_FIRMWARE_ERROR:
      return {
        ...state,
        addIsLoading: false,
        addError: action.error,
      }
    case ADD_FIRMWARE_IS_LOADING:
      return {
        ...state,
        addIsLoading: true,
        addError: [],
      }

    case DELETE_FIRMWARE:
      return {
        ...state,
        list: state.list.filter(e => e.id !== action.id),
      }

    default:
      return state
  }
}
