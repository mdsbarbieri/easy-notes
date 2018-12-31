import React, { Component} from 'react';
import { Link } from "react-router-dom";

class ManageNote extends Component {

  constructor(props){
    super(props);
    this.doRemove = this.doRemove.bind(this);
    this.doEdit = this.doEdit.bind(this);
  }

  doRemove(noteId){
    console.log(`Remove item ${this.props.id}`);
  }

  doEdit(noteId){
    console.log(`Edit item ${this.props.id}`);
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

export default ManageNote;
