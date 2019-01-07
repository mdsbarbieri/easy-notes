import React, { Component} from 'react';
import './notes.css';

class PlainTextRender extends Component {

  render() {
    return (
      <div className="note" id={`note-${this.props.id}`} >
        <h4 className="note-title">{this.props.title}</h4>
        <div className="note-text-content">
           {this.props.content}
        </div>
      </div>
    );
  }
}

export default PlainTextRender;
