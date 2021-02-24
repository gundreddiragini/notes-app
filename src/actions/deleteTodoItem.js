export const deleteTodoItem = (id) => dispatch => {
    dispatch({
     type: 'DELETE_TODO_ITEM',
     payload: id
    })
   }