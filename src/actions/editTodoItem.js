export const editTodoItem = (todoItem) => dispatch => {
    dispatch({
     type: 'EDIT_TODO_ITEM',
     payload: todoItem
    })
   }