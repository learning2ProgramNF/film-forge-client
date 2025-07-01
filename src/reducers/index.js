import { combineReducers } from 'redux';
import  useReducer  from './userReducer';
import movieReducer from './movieReducer';

const rootReducer = combineReducers({
  user: useReducer,
  movies: movieReducer
});

export default rootReducer;