import React, { Component } from 'react';
import './app.css';
import { BrowserRouter as Router, Route} from "react-router-dom";
import ListNotes from './pages/listnotes/listNotes';
import CreateNote from './pages/createnote/createNote';
import EditNote from './pages/createnote/editNote';
import Config from './pages/configuration/config';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { setStoragedNotes } from './redux/noteAction';
import { setStoragedActions } from './redux/configActions';
import {getAllNotes, getAllActions} from './services/dataService';
import _ from 'lodash';

class App extends Component {

  componentDidMount(){
    if(_.isEmpty(this.props.storagedNotes)){
      getAllNotes().then(result => {
        this.props.setStoragedNotes(result.notes);
      });
    }
    if(_.isEmpty(this.props.storagedActions)){
      getAllActions().then(result => {
        this.props.setStoragedActions(result.actions);
      });
    }
  }

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

const mapStateToProps= (store) => {
  return {
    storagedNotes :  store.storagedNotes,
    storagedActions :  store.storagedActions
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({setStoragedNotes, setStoragedActions}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

