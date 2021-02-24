import { combineReducers } from 'redux';
import todoListReducer from './todoListReducer';
import selectedTodoReducer from './selectedTodoReducer';
export default combineReducers({
 todoListReducer, selectedTodoReducer
});