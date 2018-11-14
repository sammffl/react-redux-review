import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";

function logger({getState, dispatch}) {
  return next => action => {
    console.log('will dispatch', action);
    // dispatch({type: 'ADDED_LOGGER', payload: 'will dispatch'})
    const returnValue = next(action);
    console.log('state after dispatch', getState());
    // dispatch({type: 'ADDED_LOGGER', payload: 'state after dispatch'})
    return returnValue;
  }
}

export default createStore(rootReducer, applyMiddleware(logger));
