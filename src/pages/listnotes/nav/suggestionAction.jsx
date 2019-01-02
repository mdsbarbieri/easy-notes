import React, { Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setTypedAction } from '../../../redux/noteAction';

class SuggestionAction extends Component {

  renderSuggestion(action){
    if(action.key.includes(this.regularizeActionType())){
      return(
        <div className="row">
          <div className="col-2 action-key">&lt;{action.key}&gt;</div>
          <div className="col-4 action-description">{action.description}</div>
          <div className="col-6 action-action">{action.action}</div>
        </div>
      )
    }
  }

  regularizeActionType(){
    const regularizedValue = this.props.typedAction.replace(">", '').trim();
    if(!regularizedValue){
      return "";
    }
    let actionName = regularizedValue;
    if(regularizedValue.indexOf(" ")){
      let actionArr =  regularizedValue.split(" ");
      actionName = actionArr.splice(0,1);
    }
    return actionName;
  }

  getSuggestions(){
      return  this.props.storagedActions.map((action) => (
        this.renderSuggestion(action)
      ));
  }

  render() {
    if(this.props.typedAction){
      return (
        <div className="suggestion-content">
          <div className="suggestion-overlay">
            {this.getSuggestions()}
          </div>
          <div className="overlay"></div>
        </div>
      );
    }
    return (<div></div>)
  }
}

const mapStateToProps= (store) => {
  return {
    typedAction :  store.typedAction,
    storagedActions :  store.storagedActions
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({setTypedAction}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SuggestionAction);

