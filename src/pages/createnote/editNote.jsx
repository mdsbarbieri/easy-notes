import React, { Component } from 'react';
import './createNote.css';
import CreateNote  from './createNote';
import _ from 'lodash';
import { connect } from 'react-redux';
import LoadData from '../../loadData'

class EditNote extends Component {

  state = {
    currentNote: {}
  }

  componentDidMount(){
    const currentNote = _.find(this.props.storagedNotes, { _id: this.props.match.params.id });
    this.setState({currentNote});
  }

  renderEdit(){
    if(!_.isEmpty(this.state.currentNote)){
      return (
        <CreateNote 
          initialNoteId={this.state.currentNote._id} 
          initialTitleData={this.state.currentNote.title} 
          initialTypeData={this.state.currentNote.type}
          initialCodeData={this.state.currentNote.content}
          initialPlainTextData={this.state.currentNote.content}
          initialRichData={this.state.currentNote.content}
          />
      )
    }
  }

  render() {
    return (
      <div>
        <LoadData />
        {this.renderEdit()}
      </div>
    )
  }

}


const mapStateToProps= (store) => {
  return {
    storagedNotes :  store.storagedNotes
  }
}

export default connect(
  mapStateToProps
)(EditNote);
