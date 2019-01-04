import React, { Component } from 'react';
import './app.css';
import { HashRouter as Router, Route} from "react-router-dom";
import ListNotes from './pages/listnotes/listNotes';
import CreateNote from './pages/createnote/createNote';
import EditNote from './pages/createnote/editNote';
import Config from './pages/configuration/config';

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/" exact component={ListNotes} />
          <Route path="/new" component={CreateNote}/>
          <Route path="/config" component={Config}/>
          <Route path="/edit/:id" component={EditNote}/>
        </div>
      </Router>
    );
  }
}

export default App;

