import React, { Component } from 'react';
import CloseLink from '../../fragments/close/closeLink';
import ErrorMessage from '../../fragments/message/error';
import Loading from '../../fragments/loading/loading';
import { connect } from 'react-redux';
import ManageActions from './manageAction'
import { bindActionCreators } from 'redux';
import { setShowLoading, setErrorMessage, setStorageNeedUpdate } from '../../redux/globalActions';
import './config.css';
import LoadData from '../../loadData';
import { saveAction, removeAction } from '../../services/dataService';
import _ from 'lodash';
import ipcMessages from '../../backend/ipcMessagesEsm';
const { ipcRenderer } = window.require('electron');


class Config extends Component {

  state = {
    key: '',
    action: '',
    description: '',
    editActionId: ''
  }

  constructor(props){
    super(props);
    this.save = this.save.bind(this);
    this.onChange = this.onChange.bind(this);
    this.doEdit = this.doEdit.bind(this);
    this.doRemove = this.doRemove.bind(this);
  }

  componentDidMount(){
    this.props.setShowLoading(false);
    ipcRenderer.send(ipcMessages.RESIZE_WINDOW, {width: 650, height: 350, full: true});
  }

  onChange(event){
		const target = event.target;
    const name = target.name;
    const newState = {};
    newState[name] = target.value;
		this.setState(newState);
  }
  
  resetState(){
    this.setState({key: '',action: '',description: '', editActionId: ''});
  }

  save(){
    this.props.setShowLoading(true);
    if(!this.state.key || !this.state.action){
      return;
    }

    let saveData = {};
    if(this.state.editActionId){
      saveData._id = this.state.editActionId;
    }
    saveData.key = this.state.key;
    saveData.action = this.state.action;
    saveData.description = this.state.description;

    saveAction(saveData).then(response => {
      this.props.setStorageNeedUpdate(true);
      this.props.setShowLoading(false);
      this.resetState();
    }).catch(err => {
      if(err && err.errorMessage){
        this.props.setErrorMessage(err.errorMessage);
      }
      this.props.setShowLoading(false);
      this.props.setStorageNeedUpdate(true);
    });
  }

  doRemove(actionId){
    if(!actionId){
      return;
    }

    removeAction(actionId).then(response => {
      this.props.setStorageNeedUpdate(true);
      this.props.setShowLoading(false);
    }).catch(err => {
      if(err && err.errorMessage){
        this.props.setErrorMessage(err.errorMessage);
      }
      this.props.setShowLoading(false);
      this.props.setStorageNeedUpdate(true);
    });
  }

  doEdit(actionId){
    if(!actionId){
      return;
    }
    const editAction = _.find(this.props.storagedActions, {_id: actionId});
    this.setState({
      key: editAction.key,
      action: editAction.action,
      description: editAction.description,
      editActionId: editAction._id
    });
    window.scrollTo(0, 0);
  }

  renderSaveAction(){
    return ( 
      <div>
        <h4 className="shadow-sm">Actions</h4>
        <div className="container-fluid">
          <div className="row">
            <div className="col-2">
              <div className="form-group">
                <label htmlFor="newNoteTitle" className="form-control-title">Name:</label>
                <input type="text" className="form-control" name="key" onChange={this.onChange} value={this.state.key} id="newConfigName" placeholder="Key" />
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="newNoteTitle" className="form-control-title">Description:</label>
                <input type="text" className="form-control" name="description" onChange={this.onChange} value={this.state.description} id="newConfigDescription" placeholder="Description" />
              </div>
            </div>
            <div className="col-7">
              <div className="form-group">
                <label htmlFor="newNoteTitle" className="form-control-title">Action:</label>
                <input type="text" className="form-control" name="action" onChange={this.onChange} value={this.state.action}  id="newConfigAction" placeholder="Action" />
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="justify-content-end actions">
            <label onClick={this.save}>
              <span>Save</span>
            </label>
          </div>
        </div>
      </div>
    )
  }
  renderActionContent(action){
    return (
      <tr key={action._id}>
        <td>{action.description || '-'}</td>
        <td> {action.key}</td>
        <td> {action.action}</td>
        <td>
          <ManageActions id={action._id} doRemove={this.doRemove} doEdit={this.doEdit}/>
        </td>
      </tr>
    )
  }
  
  renderNotesList(){
    if(!this.props.storagedActions){
      return;
    }
    return this.props.storagedActions.map((action) => (
      this.renderActionContent(action)
    ));
  }


  renderRegisteredActions(){
    return ( 
      <div>
        <h4 className="shadow-sm">Registered Actions</h4>
        <div className="container-fluid">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Description</th>
                <th scope="col">Key</th>
                <th scope="col">Action</th>
                <th scope="col">Manager</th>
              </tr>
            </thead>
            <tbody>
              {this.renderNotesList()}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="create-note">
        <Loading />
        <LoadData />
        <ErrorMessage />
        <CloseLink href="/"/>
        {this.renderSaveAction()}
        {this.renderRegisteredActions()}
      </div>
    );
  }
}

const mapStateToProps= (store) => {
  return {
    storagedNotes :  store.storagedNotes,
    storagedActions: store.storagedActions
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({setShowLoading, setErrorMessage, setStorageNeedUpdate}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Config);
