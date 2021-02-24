export const saveSelectedTodo = (todoItem) => dispatch => {
    dispatch({
     type: 'SELECTED_TODO_ITEM',
     payload: todoItem
    })
   }