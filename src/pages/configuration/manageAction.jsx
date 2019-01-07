import React, { Component} from 'react';

class ManageAction extends Component {

  constructor(props){
    super(props);
    this.doRemove = this.doRemove.bind(this);
    this.doEdit = this.doEdit.bind(this);
  }

  doRemove(){
    if(!this.props.id){
      return;
    }
    this.props.doRemove(this.props.id)
  }

  doEdit(){
    this.props.doEdit(this.props.id)
  }

  render() {
    return (
      <div className="left actions">
        <label className="edit-note" onClick={this.doEdit}>
            Edit
          </label>
        <label className="remove-note" onClick={this.doRemove}>
          Remove
        </label>
      </div>
    );
  }
}

export default ManageAction;
