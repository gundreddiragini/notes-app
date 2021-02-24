export default (state = {}, action) => {
    switch (action.type) {
     case 'SELECTED_TODO_ITEM':
      return {
       selectedItem: action.payload
      }
     default:
      return state
    }
   }