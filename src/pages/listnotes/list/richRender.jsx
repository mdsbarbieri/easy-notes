import React, { Component} from 'react';
import './notes.css';
import {Parser} from 'html-to-react';

class RichRender extends Component {
  renderHtml(hmltText){
    const htmlParser = new Parser();
    return htmlParser.parse(hmltText);
  }

  render() {
    return (
      <div className="note" id={`note-${this.props.id}`} >
        <h4 className="note-title">{this.props.title}</h4>
        <div className="note-text-content">
           {this.renderHtml(this.props.content)}
        </div>
      </div>
    );
  }
}

export default RichRender;
