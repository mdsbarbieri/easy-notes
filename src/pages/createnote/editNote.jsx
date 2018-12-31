import React, { Component } from 'react';
import './createNote.css';
import CreateNote  from './createNote';
import _ from 'lodash';
import Loading from '../../fragments/loading/loading';
import { connect } from 'react-redux';

class EditNote extends Component {


  constructor(props){
    super(props);
    if(this.props.storagedNotes && this.props.storagedNotes.length){
      const currentNote = _.find(this.props.storagedNotes, { id: this.props.match.params.id });
      this.state = {
        ...this.state,
        currentNote
      }
    }
  }

  render() {
    if(this.state && this.state.currentNote){
      return (
        <CreateNote 
          initialNoteId={this.state.currentNote.id} 
          initialTitleData={this.state.currentNote.title} 
          initialTypeData={this.state.currentNote.type}
          initialCodeData={this.state.currentNote.content}
          initialPlainTextData={this.state.currentNote.content}
          initialRichData={this.state.currentNote.content}
          />
      );
    }
    return (
      <Loading />
    )
  }
}


const mapStateToProps= (store) => {
  return {
    storagedNotes :  store.storagedNotes
  }
}

export default connect(
  mapStateToProps,
)(EditNote);
