import { combineReducers } from "redux";
import visibilityFilter from "./visibilityFilter";
import todos from "./todos";
import logger from './logger';

export default combineReducers({ todos, visibilityFilter, logger });
