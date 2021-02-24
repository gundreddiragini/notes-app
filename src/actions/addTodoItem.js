export const addTodoItem = (todoItem) => dispatch => {
    dispatch({
     type: 'ADD_TODO_ITEM',
     payload: todoItem
    })
   }