import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './nav.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {setCurrentFilter} from '../../../redux/filterAction';
import {setSelectedNoteIdx, setTypedAction} from '../../../redux/noteAction';
import SuggestionAction from './suggestionAction';
import { executeAction } from '../../../services/shellService';
import { setShowLoading, setErrorMessage } from '../../../redux/globalActions';
import _ from 'lodash';
import ipcMessages from '../../../backend/ipcMessagesEsm';
const { ipcRenderer } = window.require('electron');

class Header extends Component {

  state = {
    localTypedAction: '',
    resized: false
  }

  constructor(props){
    super(props);
    this.inputType = 'filter';
    this.handleSetFilter =  this.handleSetFilter.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  
  handleSetFilter(event){
    const target = event.target;
    const value = target.value;
    this.setState({localTypedAction:value});
    
    if(!value && this.state.resized){
      this.setState({resized:false})
      ipcRenderer.send(ipcMessages.RESIZE_WINDOW, {width: 650, height: 40, full: false});
    }
    
    if(value && !this.state.resized){
      this.setState({resized:true})
      ipcRenderer.send(ipcMessages.RESIZE_WINDOW, {width: 650, height: 350, full: true});
    }

    if(value.startsWith('>')){
      return this.handleActionEvent(value);
    }
    
    if(this.props.typedAction){
      this.props.setTypedAction("");
    }
    
    this.props.setSelectedNoteIdx(0);
    this.props.setCurrentFilter(value);
  }

  handleActionEvent(value){
    if(this.props.currentFilter){
      this.props.setCurrentFilter("");
    }
    this.inputType = 'action';
    this.props.setTypedAction(value);
  }

  submitAction(){
    if(!this.props.typedAction){
      return;
    }
    const regularizedValue = this.props.typedAction.replace(">", '').trim();
    if(!regularizedValue){
      return;
    }
    
    let actionName = regularizedValue;
    let params = [];
    if(regularizedValue.indexOf(" ")){
      let actionArr =  regularizedValue.split(" ");
      actionName = actionArr.splice(0,1)[0];
      params = actionArr;
    }

    let action = _.find(this.props.storagedActions, {key: actionName});
    
    if(!action){
      this.props.setErrorMessage('Invalid Action')
      return;
    }

    this.inputType = 'filter';
    this.props.setTypedAction('');
    this.setState({localTypedAction:''});
    executeAction(action, params);
  }

  handleKeyDown(event){
    switch( event.keyCode ) {
      case 13: 
        this.submitAction();
        break;
      default: 
        break;
    }
  }

  componentWillMount(){
    document.addEventListener("keydown", this.handleKeyDown);
    ipcRenderer.send(ipcMessages.RESIZE_WINDOW, {width: 650, height: 40, full: false});
  }
  
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  render() {
    return (
      <header className="nav shadow-sm">
        <div className="row container-fluid">
          <div className="col-8">
            <input type="text" className="form-control" autoComplete="off" autoFocus 
              onChange={this.handleSetFilter} 
              value={this.state.localTypedAction}
              name="inputFilter" placeholder="Search..."/>
          </div>
          <div className="col-4 actions">
            <Link to="/new">
              <label>
                  <span>Add Note</span>
              </label>
            </Link>
            <Link to="/config">
              <label>
                  <span>Config</span>
              </label>
            </Link>
          </div>
        </div>
        <div className="row container-fluid">
          <SuggestionAction />
        </div>
      </header>
    );
  }
}

const mapStateToProps= (store) => {
  return {
    currentFilter :  store.currentFilter,
    typedAction :  store.typedAction,
    storagedActions :  store.storagedActions
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({setCurrentFilter, setSelectedNoteIdx, setTypedAction, setShowLoading, setErrorMessage}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
