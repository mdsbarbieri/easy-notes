import React, { Component} from 'react';
import Code from 'react-code-prettify';
import './notes.css';

class CodeRender extends Component {

  render() {
    return (
      <div className="note" id={`note-${this.props.id}`}>
        <h4 className="note-title">{this.props.title}</h4>
        <div className="note-text-content">
          <Code codeString={this.props.content} />
        </div>
      </div>
    );
  }
}

export default CodeRender;
