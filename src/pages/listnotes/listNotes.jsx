import React, { Component } from 'react';
import Nav from "./nav/nav";
import Notes from "./list/notes";
import Loading from '../../fragments/loading/loading';
import ErrorMessage from '../../fragments/message/error';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setSelectedNoteIdx } from '../../redux/noteAction';
import { setShowLoading } from '../../redux/globalActions';
import {copyToClipboard} from '../../services/clipboardService'
import _ from 'lodash';
import LoadData from '../../loadData';

class ListNotes extends Component {

  constructor(props){
    super(props);
    this._handleKeyDown = this._handleKeyDown.bind(this);
  }

  componentDidMount(){
    this.props.setShowLoading(false);
  }

  _handleKeyDown(event){
    if(this.props.typedAction){
      return;
    }

    let idx = 0;
    switch( event.keyCode ) {
      case 13:
        if(_.isEmpty(this.props.selectedNote)){
          return;
        }
        const noteContainer =  document.getElementById(`note-${this.props.selectednote._id}`);
        if(!noteContainer){
          return;
        }
        const noteContent = noteContainer.getElementsByClassName('note-text-content')[0];
        if(!noteContent){
          return
        }

        copyToClipboard(noteContent);
        break;
      case 38:
        idx =  this.props.selectedNoteIdx;
        if(idx === 0){
          return;
        }
        this.props.setSelectedNoteIdx(idx - 1);
        break;
      case 40:
        idx =  this.props.selectedNoteIdx + 1;
        if(idx > this.props.renderedNotesQty){
          return;
        }
        this.props.setSelectedNoteIdx(idx);
        break;
      default: 
          break;
    }
  }

  componentWillMount(){
    document.addEventListener("keydown", this._handleKeyDown);
  }
  
  componentWillUnmount() {
    document.removeEventListener("keydown", this._handleKeyDown);
  }

  render() {
    return (
      <div>
        <LoadData />
        <Loading />
        <ErrorMessage />
        <Nav/>
        <Notes/>
      </div>
    );
  }
}

const mapStateToProps= (store) => {
  return {
    selectedNote :  store.selectedNote,
    selectedNoteIdx :  store.selectedNoteIdx,
    renderedNotesQty: store.renderedNotesQty,
    typedAction :  store.typedAction
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({setSelectedNoteIdx, setShowLoading}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListNotes);

