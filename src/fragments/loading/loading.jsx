import React, { Component } from 'react';
import './loading.css';
import { connect } from 'react-redux';

class Loading extends Component {
  
  loading(){
    if(this.props.showLoading){
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

const mapStateToProps= (store) => {
  return {
    showLoading :  store.showLoading
  }
}

export default connect(
  mapStateToProps
)(Loading);

