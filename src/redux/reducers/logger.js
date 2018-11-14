import { ADDED_LOGGER } from '../actionTypes';

const initialState = {
  message: [],
}

const logger = (state = initialState, action) => {
  switch (action.type){
    case ADDED_LOGGER:
      return {
        message: state.message.push(action.payload)
      };
    default:
      return state;
  }
}

export default logger;