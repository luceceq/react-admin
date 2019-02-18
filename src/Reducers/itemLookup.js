export const ITEMLOOKUP_IS_LOADING = 'ITEMLOOKUP_IS_LOADING';
export const ITEMLOOKUP_IS_NOT_LOADING = 'ITEMLOOKUP_IS_NOT_LOADING';
export const ITEMLOOKUP_GET_LIST = 'ITEMLOOKUP_GET_LIST';

const initialState = {
  isLoading: false,
  list: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ITEMLOOKUP_IS_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      }

      case ITEMLOOKUP_IS_NOT_LOADING:
      return {
        ...state,
        isLoading: false,
      }

    case ITEMLOOKUP_GET_LIST:
      return {
        ...state,
        isLoading: false,
        list: action.payload
      }

    default:
      return state
  }
}
