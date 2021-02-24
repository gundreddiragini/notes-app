import './App.css';
import { Route, Switch } from "react-router-dom";
import List from "./List.js"
import TodoForm from './TodoForm.js'

function App() {

  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={List} />
        <Route path="/add" exact component={TodoForm} />
      </Switch>
    </div>
  );
}


export default App;
