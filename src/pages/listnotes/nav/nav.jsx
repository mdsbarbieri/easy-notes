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

class Header extends Component {

  state = {
    localTypedAction: ''
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
      actionName = actionArr.splice(0,1);
      params = actionArr;
    }

    let action = {}
    this.props.storagedActions.forEach(element => {
      if(element.key.includes(actionName)){
        action = element;
      }
    })

    this.props.setShowLoading(true);
    executeAction(action, params).then(res => {
      this.props.setShowLoading(false);
    }).catch(err => {
      this.props.setErrorMessage(err);
      this.props.setShowLoading(false);
    })
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
  }
  
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  render() {
    return (
      <header className="nav shadow-sm">
        <div className="row container-fluid">
          <div className="col-8">
            <input type="text" className="form-control" autocomplete="off" autoFocus onChange={this.handleSetFilter} name="inputFilter" placeholder="Search..."/>
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
