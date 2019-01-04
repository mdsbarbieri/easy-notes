import React, { Component } from 'react';
import './app.css';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { setStoragedNotes } from './redux/noteAction';
import { setStoragedActions } from './redux/configActions';
import { setStorageNeedUpdate } from './redux/globalActions';
import {getAllActions, getAllNotes} from './services/dataService';
import _ from 'lodash';

class LoadData extends Component {

  componentDidMount(){
    if(_.isEmpty(this.props.storagedNotes)){
      this.updateNoteStorage();
    }
    if(_.isEmpty(this.props.storagedActions)){
      this.updateActionStorage();
    }
  }
  
  componentDidUpdate(){
    if(this.props.storageNeedUpdate){
      this.props.setStorageNeedUpdate(false)
      this.updateNoteStorage();
      this.updateActionStorage();
    }
  }

  updateNoteStorage() {
    getAllNotes().then(result => {
      this.props.setStoragedNotes(result);
    });
  }

  updateActionStorage() {
    getAllActions().then(result => {
      this.props.setStoragedActions(result);
    });
  }

  render() {
    return (
      <div></div>
    );
  }
}

const mapStateToProps= (store) => {
  return {
    storagedNotes :  store.storagedNotes,
    storagedActions :  store.storagedActions,
    storageNeedUpdate: store.storageNeedUpdate
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({setStoragedNotes, setStoragedActions, setStorageNeedUpdate}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadData);

