import React, { Component} from 'react';
import './notes.css';
import {copyToClipboard} from '../../../services/clipboardService'

class PlainTextRender extends Component {

  copyText(event){
    let target = event.currentTarget;
    target = target.parentElement.getElementsByClassName('note-text-content')[0];
    if(target){
      copyToClipboard(target);
    }
  }

  render() {
    return (
      <div className="note" id={`note-${this.props.id}`} onClick={this.copyText}>
        <h4 className="note-title">{this.props.title}</h4>
        <div className="note-text-content">
           {this.props.content}
        </div>
      </div>
    );
  }
}

export default PlainTextRender;
