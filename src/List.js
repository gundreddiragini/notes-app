
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { saveTodoList } from './actions/saveTodoList';
import { deleteTodoItem } from './actions/deleteTodoItem';
import { saveSelectedTodo } from './actions/saveSelectedTodo';
import {Link} from "react-router-dom";
import { useHistory } from "react-router-dom";


function List(props) {

    const history = useHistory();

    // get already saved todo items (notes)
    useEffect(() => {
        if(!props.todoListReducer.todoList) {
            fetch('https://shrouded-tor-41652.herokuapp.com/api/notes').then(resp => resp.json()).then(todos => { 
            props.saveTodoList(todos);    
        })
        }
    }, []);

    // delete a completed todo item (notes)
    const deleteTodo = (id) => {
        var url = 'https://shrouded-tor-41652.herokuapp.com/api/notes/'+id;
        fetch(url, {
            method: 'delete'
        }).then(resp => props.deleteTodoItem(id));
    }

    // edit a todo item (redirect to form with filled in details of the selected note)
    const editTodo = (todoItem) => {
        props.saveSelectedTodo(todoItem);
        history.push("/add");  
    }

    // add a new todo item (redirect to same form as edit and accept user inputs for a note)
    const addItem = () => {
        props.saveSelectedTodo(null);
    }

    return (
        <div>
        <h1>Notes App</h1>
        <p><Link to="/add" onClick={($event) => {addItem()}}>Add Notes</Link></p>
        <div className="grid-container">
            {
                props.todoListReducer && props.todoListReducer.todoList && props.todoListReducer.todoList.map((item, index) => {
                    return (
                        <div className="grid-child" key={index}>
                            <h2>{item.title}</h2>
                            <p>{item.content}</p>
                            <a onClick={($event) => {editTodo(item)}}>Edit</a>&nbsp;&nbsp;<a onClick={($event) => {deleteTodo(item.id)}}>Delete</a>
                        </div>
                    )
                })
            }

        </div>
        </div>
    );
}

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({
    saveTodoList: (listItems) => dispatch(saveTodoList(listItems)),
    deleteTodoItem: (id) => dispatch(deleteTodoItem(id)),
    saveSelectedTodo: (todo) => dispatch(saveSelectedTodo(todo))
})

export default connect(mapStateToProps, mapDispatchToProps)(List);
