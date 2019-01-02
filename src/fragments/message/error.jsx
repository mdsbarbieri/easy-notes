import React, { Component } from 'react';
import './message.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setErrorMessage } from '../../redux/globalActions';

class ErrorMessage extends Component {
  
  loading(){
    if(this.props.errorMessage){
      setTimeout(()=>{
        this.props.setErrorMessage('');
      }, 3500);
      return (
        <div className="error-message">
          {this.props.errorMessage}
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
    errorMessage :  store.errorMessage
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({setErrorMessage}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorMessage);

