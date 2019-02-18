export const GET_USERS_LIST = 'GET_USERS_LIST';
export const GET_USERS_ERROR = 'GET_USERS_ERROR';
export const GET_USERS_IS_LOADING = 'GET_USERS_IS_LOADING';
export const UPDATE_USERS_LIST = 'UPDATE_USERS_LIST';

const initialState = {
  isLoading: false,
  list: [],
  error: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_LIST:
      return {
        ...state,
        isLoading: false,
        error: false,
        list: action.data,
      }
    case GET_USERS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      }
    case GET_USERS_IS_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      }

    case UPDATE_USERS_LIST:
      return {
        ...state,
        list: state.list.map(item => {
          if (item.id === action.data.id) {
            return action.data;
          }

          return item;
        })
      }

    default:
      return state
  }
}
