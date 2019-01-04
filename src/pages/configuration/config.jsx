import React, { Component } from 'react';
import CloseLink from '../../fragments/close/closeLink';
import ErrorMessage from '../../fragments/message/error';
import Loading from '../../fragments/loading/loading';
import { connect } from 'react-redux';
import ManageActions from './manageAction'
import { bindActionCreators } from 'redux';
import { setShowLoading } from '../../redux/globalActions';
import './config.css';
import LoadData from '../../loadData';

class Config extends Component {

  state = {
    name: '',
    action: ''
  }

  constructor(props){
    super(props);
    this.save = this.save.bind(this);
    this.onChange = this.onChange.bind(this);
    this.doEdit = this.doEdit.bind(this);
    this.doRemove = this.doRemove.bind(this);
  }

  componentDidMount(){
    this.props.setShowLoading(false)
  }

  onChange(event){
		const target = event.target;
    const name = target.name;
    const newState = {};
    newState[name] = target.value;
		this.setState(newState);
  }
  

  save(){
    if(!this.state.name || !this.state.action){
      return;
    }
    console.log(this.state)
  }

  renderSaveAction(){
    return ( 
      <div>
        <h4 className="shadow-sm">Actions</h4>
        <div className="container-fluid">
          <div className="row">
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="newNoteTitle" className="form-control-title">Name:</label>
                <input type="text" className="form-control" name="name" onChange={this.onChange} id="newConfigName" placeholder="Name" />
              </div>
            </div>
            <div className="col-9">
              <div className="form-group">
                <label htmlFor="newNoteTitle" className="form-control-title">Action:</label>
                <input type="text" className="form-control" name="action" onChange={this.onChange} id="newConfigAction" placeholder="Action" />
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

  doRemove(noteId){
    console.log(`Edit item ${this.props.id}`);
  }

  doEdit(noteId){
    console.log(`Edit item ${this.props.id}`);
  }

  renderActionContent(action){
    return (
      <tr key={action.id}>
        <th scope="row">{action.id}</th>
        <td>{action.description}</td>
        <td> {action.key}</td>
        <td> {action.action}</td>
        <td>
          <ManageActions id={action.id}/>
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
                <th scope="col">#</th>
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
  return bindActionCreators({setShowLoading}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Config);
