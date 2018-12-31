import React, { Component } from 'react';
import './closeLink.css';
import { Link } from "react-router-dom";

class CloseLink extends Component {
  render() {
    return (
      <Link to={this.props.href} className="close" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </Link>
    );
  }
}

export default CloseLink;