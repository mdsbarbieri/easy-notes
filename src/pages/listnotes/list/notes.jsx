import React, { Component } from 'react';
import './notes.css';
import RichRender from "./richRender";
import PlainTextRender from "./plainTextRender";
import CodeRender from "./codeRender";
import ManageNote from "./manageNote";
import {isAbleToShow} from '../../../services/filterService';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { setRenderedNotesQty, setSelectedNote } from '../../../redux/noteAction';

class Notes extends Component {

  state = {
    currentFilter: ''
  };

  renderizedItensIndex = 0;
  renderContent(note){
    const currentFilter = this.props.currentFilter;
    if(!isAbleToShow(currentFilter, note)){
      return;
    }
    this.renderizedItensIndex++;
    let active = this.renderizedItensIndex === this.props.selectedNoteIdx;
    if(active){
      this.props.setSelectedNote(note)
    }
    switch(note.type){
      case 'rich': 
        return this.renderRichContent(note, this.renderizedItensIndex, active);
      case 'plainText': 
        return this.renderPlainTextContent(note, this.renderizedItensIndex, active);
      case 'code': 
        return this.renderCodeContent(note, this.renderizedItensIndex, active);
      default: 
        return this.renderPlainTextContent(note, this.renderizedItensIndex, active);
    }
  }
  renderRichContent(note, renderizedItensIndex, active){
    return (
      <li className="clear-li rich" key={note.id} data-active={active} data-idx={renderizedItensIndex}>
        <ManageNote id={note.id} />
        <RichRender id={note.id} title={note.title} content={note.content} />
      </li>
    )
  }
  renderPlainTextContent(note, renderizedItensIndex, active){
    return (
      <li className="clear-li plain-text" key={note.id} data-active={active} data-idx={renderizedItensIndex}>
        <ManageNote id={note.id} />
        <PlainTextRender id={note.id} title={note.title} content={note.content} />
      </li>
    )
  }
  
  renderCodeContent(note, renderizedItensIndex, active){
    return (
      <li className="clear-li code" key={note.id} data-active={active} data-idx={renderizedItensIndex}>
        <ManageNote id={note.id} />
        <CodeRender id={note.id} title={note.title} content={note.content} />
      </li>
    )
  }

  renderNotesList(){
    this.renderizedItensIndex = 0;
    let renderedContent =  this.props.storagedNotes.map((note) => (
      this.renderContent(note)
    ));
    this.props.setRenderedNotesQty(this.renderizedItensIndex);
    return renderedContent;
  }

  render() {
    return (
      <React.Fragment>
        <ul className="clear-ul">
          {this.renderNotesList()}
        </ul>
      </React.Fragment>
    );
  }
}

const mapStateToProps= (store) => {
  return {
    currentFilter :  store.currentFilter,
    storagedNotes :  store.storagedNotes,
    selectedNoteIdx :  store.selectedNoteIdx
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({setRenderedNotesQty, setSelectedNote}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Notes);