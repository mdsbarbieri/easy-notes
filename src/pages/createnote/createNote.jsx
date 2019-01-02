import React, { Component } from 'react';
import CloseLink from '../../fragments/close/closeLink';
import './createNote.css';
import { Link } from "react-router-dom";
import Loading from '../../fragments/loading/loading';
import ErrorMessage from '../../fragments/message/error';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { setShowLoading } from '../../redux/globalActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const ckEditorConf = {
  toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'insertTable' ]
}

class CreateNote extends Component {
  constructor(props){
    super(props);
    this.state = {
      plainTextData: props.initialPlainTextData || '',
      codeData: props.initialCodeData || '',
      title: props.initialTitleData || '',
      type: props.initialTypeData || 'plainText'
    }
    this.richData= props.initialRichData;
    this.setRichData = this.setRichData.bind(this);
    this.onChange = this.onChange.bind(this);
    this.save = this.save.bind(this);
  }

  setRichData(event, editor){
    this.richData = editor.getData();
  }
  
  componentDidMount(){
    this.props.setShowLoading(false);
  }

  onChange(event){
		const target = event.target;
		const name = target.name;
		const newState = {};
    newState[name] = target.value;
		this.setState(newState);
  }
  
  renderPlainTextData(){
    return(
      <div className="form-group">
        <label htmlFor="newNoteContent" className="form-control-title">Content:</label>
        <input type="text" className="form-control" name="plainTextData" onChange={this.onChange} id="newNotePlainText" placeholder="Note Content" value={this.state.plainTextData}/>
      </div>
    )
  }

  renderRichTextData(){
    return(
      <div className="form-group">
        <label htmlFor="newNoteContent" className="form-control-title">Content:</label>
        <CKEditor editor={ClassicEditor} config={ckEditorConf} data={this.richData} onChange={this.setRichData} />
      </div>
    )
  }

  renderCodeData(){
    return(
      <div className="form-group">
        <label htmlFor="newNoteContent" className="form-control-title">Content:</label>
        <textarea className="form-control ta-adjust-height" name="codeData" onChange={this.onChange} id="newNoteCodeData" placeholder="{...}" value={this.state.codeData}/>
      </div>
    )
  }

  save(){
    let saveData = {};
    if(this.props.initialNoteId){
      saveData.id = this.props.initialNoteId;
    }

    saveData.title = this.state.title;
    saveData.type = this.state.type;
    switch(this.state.type){
      case 'code': 
        saveData.content = this.state.codeData;
        break;
      case 'rich': 
        saveData.content = this.richData;
        break;
      case 'plainText': 
        saveData.content = this.state.plainTextData;
        break;
      default:
        saveData.content = this.state.plainTextData;
        break;
    }
  }

  renderInputMode(){
    switch(this.state.type){
      case 'code': 
        return this.renderCodeData()
      case 'rich': 
        return this.renderRichTextData()
      case 'plainText': 
        return this.renderPlainTextData()
      default:
        return this.renderPlainTextData()
    }
  }

  checkIsEnabled(value, expectedValue) {
    return value === expectedValue;
  }

  render() {
    return (
      <div className="create-note">
        <Loading />
        <ErrorMessage />
        <CloseLink href="/"/>
        <h4 className="shadow-sm">New Note</h4>
        <div className="container-fluid">
          <div className="row">
            <div className="col-8">
              <div className="form-group">
                <label htmlFor="newNoteTitle" className="form-control-title">Title:</label>
                <input type="text" className="form-control" name="title" onChange={this.onChange} id="newNoteTitle" placeholder="Title" value={this.state.title} />
              </div>
            </div>
            <div className="col-4">
              <div className="form-group">
                <label htmlFor="newNoteTitle" className="form-control-title">Type:</label>
                <select className="form-control" id="noteType" name="type" onChange={this.onChange} value={this.state.type}  placeholder="Title">
                  <option value="plainText">Text</option>
                  <option value="rich">Rich</option>
                  <option value="code">Code</option>
                </select>
              </div>
            </div>
          </div>
          {this.renderInputMode()}
        </div>
        <div className="container-fluid footer">
          <div className="justify-content-end actions">
            <label onClick={this.save}>
              <span>Save</span>
            </label>
            <label>
              <Link to="/">
                <span>Cancel</span>
              </Link>
            </label>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps= (store) => {
  return {
    storagedNotes :  store.storagedNotes
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({setShowLoading}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateNote);
