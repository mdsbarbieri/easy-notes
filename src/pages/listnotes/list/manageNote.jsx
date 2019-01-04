import React, { Component} from 'react';
import { Link } from "react-router-dom";
import {removeNote} from '../../../services/dataService';
import { setShowLoading, setErrorMessage, setStorageNeedUpdate } from '../../../redux/globalActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class ManageNote extends Component {

  constructor(props){
    super(props);
    this.doRemove = this.doRemove.bind(this);
  }

  doRemove(){
    this.props.setShowLoading(true);
    removeNote(this.props.id).then(result => {
      this.props.setShowLoading(false)
      this.props.setStorageNeedUpdate(true);
    }).catch(err => {
      this.props.setShowLoading(false)
      this.props.setStorageNeedUpdate(true);
      if(err && err.errorMessage){
        this.props.setErrorMessage(err.errorMessage);
      }
    })
  }

  render() {
    return (
      <div className="manage-notes actions">
        <Link to={`/edit/${this.props.id}`}>
          <label className="edit-note">
              Edit
          </label>
        </Link>
        <label className="remove-note" onClick={this.doRemove}>
          Remove
        </label>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({setShowLoading, setErrorMessage, setStorageNeedUpdate}, dispatch);
}

export default connect(
  null,
  mapDispatchToProps
)(ManageNote);
