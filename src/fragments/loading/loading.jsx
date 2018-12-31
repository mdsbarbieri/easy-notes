import React, { Component } from 'react';
import './loading.css';

class Loading extends Component {
  state = {
    show: true
  }

  show(){
    this.setState({show : true});
  }

  hide(){
    this.setState({show : false});
  }

  loading(){
    if(this.state.show){
      return (
        <div className="loader-background">
          <div className="loader"></div>
        </div>
      )
    }
  }

  render() {
    return (
      <div>{this.loading()}</div>
    );
  }
}

export default Loading;

