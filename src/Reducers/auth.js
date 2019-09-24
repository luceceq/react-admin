export const LOG_IN = "LOG_IN";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";
export const LOG_OUT = "LOG_OUT";

// initial state
const initialState = {
  isAuthenticating: false,
  user: {},
  signInError: false,
  signInErrorMessage: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        isAuthenticating: true,
        signInError: false
      };
    case LOG_IN_SUCCESS:
      return {
        isAuthenticating: false,
        user: action.user
      };
    case LOG_IN_FAILURE:
      return {
        ...state,
        isAuthenticating: false,
        signInError: true,
        signInErrorMessage: action.error.message
      };

    case LOG_OUT:
      return {
        ...initialState
      };

    default:
      return state;
  }
};
