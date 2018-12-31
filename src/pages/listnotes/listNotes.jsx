import React, { Component } from 'react';
import Nav from "./nav/nav";
import Notes from "./list/notes";
import Loading from '../../fragments/loading/loading';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setSelectedNoteIdx } from '../../redux/noteAction';
import {copyToClipboard} from '../../services/clipboardService'
import _ from 'lodash';

class ListNotes extends Component {

  constructor(props){
    super(props);
    this.loading = React.createRef()
    this._handleKeyDown = this._handleKeyDown.bind(this);
  }

  componentDidMount(){
    this.loading.current.hide();
  }

  _handleKeyDown = (event) => {
    let idx = 0;
    switch( event.keyCode ) {
      case 13:
        if(_.isEmpty(this.props.selectedNote)){
          return;
        }
        const noteContainer =  document.getElementById(`note-${this.props.selectedNote.id}`);
        if(!noteContainer){
          return;
        }
        const noteContent = noteContainer.getElementsByClassName('note-text-content')[0];
        if(!noteContent){
          return
        }

        copyToClipboard(noteContent)
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
        <Loading ref={this.loading}/>
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
    renderedNotesQty: store.renderedNotesQty
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({setSelectedNoteIdx}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListNotes);

