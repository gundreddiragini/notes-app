
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import { addTodoItem } from './actions/addTodoItem';
import { useHistory } from "react-router-dom";
import { editTodoItem } from "./actions/editTodoItem";
import { saveSelectedTodo } from './actions/saveSelectedTodo';


function TodoForm(props) {

    // initialize form with note details of the note that should be edited or donot initialize the form for adding a new notes
    const fetchNote = () => {
        return props.selectedTodoReducer.selectedItem ? props.selectedTodoReducer.selectedItem : {title: '', content: ''} 
    }

    const [noteDetails, setNoteDetails] = useState(fetchNote());
    const history = useHistory();
    const edit = props.selectedTodoReducer.selectedItem ? true : false;

    var message = props.selectedTodoReducer.selectedItem ? 'Edit Notes' : 'Add Notes';

    // logic for submitting a new note or editing an existing note and submitting it
    const submitNote = ($event) => {
        $event.preventDefault();
        if(!noteDetails.title || !noteDetails.content) {
            return;
        } else {
            var httpMethod = edit ? 'put' : 'post';
            var reqBody = {title: noteDetails.title , content: noteDetails.content }
            var baseUrl = "https://shrouded-tor-41652.herokuapp.com/api/notes";
            var url = edit ? (baseUrl + '/' + noteDetails.id) : baseUrl
            fetch(url, {
                method: httpMethod,
                body: JSON.stringify(reqBody),
                headers: {
                    'Content-Type': 'application/json'
                  }
              }).then(resp => resp.json()).then(todoItem => {  
                   if(edit) {
                       props.editTodoItem(todoItem);
                   } else {
                    props.addTodoItem(todoItem);
                   }
                   props.saveSelectedTodo(null);
                  
                  history.push("/");  
            })
        }
    }

    return (
        <div> 
           <h1> {message} </h1>
        <div className="grid-parent">
            <form>
                <div className="grid-item">
                    <div className="division"><label htmlFor="noteTitle">Title</label></div>
                <div className="division"><input type="text" name="noteTitle" value={noteDetails.title} onChange={($event) => {setNoteDetails({...noteDetails, title: $event.target.value})}} /></div>
                
                </div>
                <div className="grid-item">
                <div className="division"><label htmlFor="noteContent">Content</label></div>
                <div className="division"><textarea name="noteContent" value={noteDetails.content} onChange={($event) => {setNoteDetails({...noteDetails, content: $event.target.value})}}></textarea></div>
                </div>
                <div className="grid-item">
                <button onClick={$event => submitNote($event)}>Submit</button>
                </div>
                
            </form>

        </div>
        </div>
    );
}

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({
    addTodoItem: (todoItem) => dispatch(addTodoItem(todoItem)),
    editTodoItem: (todoItem) => dispatch(editTodoItem(todoItem)),
    saveSelectedTodo: (todo) => dispatch(saveSelectedTodo(todo))
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm);
