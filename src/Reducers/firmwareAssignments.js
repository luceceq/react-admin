export const GET_FIRMWARE_ASSIGNMENT = 'GET_FIRMWARE_ASSIGNMENT';
export const DELETE_FIRMWARE_ASSIGNMENT = 'DELETE_FIRMWARE_ASSIGNMENT';
export const ADD_FIRMWARE_ASSIGNMENT = 'ADD_FIRMWARE_ASSIGNMENT';

const initialState = {
  list: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FIRMWARE_ASSIGNMENT:
      return {
        ...state,
        list: action.data,
      }

    case DELETE_FIRMWARE_ASSIGNMENT:
      return {
        ...state,
        list: state.list.filter(e => e.id !== action.id),
      }

    case ADD_FIRMWARE_ASSIGNMENT:
      return {
        ...state,
        list: [...state.list, action.data],
      }

    default:
      return state
  }
}
