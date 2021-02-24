export default (state = {}, action) => {
    switch (action.type) {
     case 'SAVE_TODO_LIST':
      return {
       todoList: action.payload
      }
      case 'ADD_TODO_ITEM':
        var list = state.todoList ? state.todoList.slice() : [];
        list.push(action.payload)
        return {
          todoList: list
        }
        case 'DELETE_TODO_ITEM':
          var list = state.todoList.slice();
          var newList = list.filter(x=> x.id != action.payload);

        return {
          todoList: newList
        }
        case 'EDIT_TODO_ITEM':
          var list = state.todoList.slice();
          list.forEach((item,i) => {
            if(item.id == action.payload.id) {
              list[i] = action.payload;
            }
          })
          return {
            todoList: list
          }
     default:
      return state
    }
   }