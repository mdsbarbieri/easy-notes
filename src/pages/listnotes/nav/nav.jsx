import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './nav.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {setCurrentFilter} from '../../../redux/filterAction';
import {setSelectedNoteIdx} from '../../../redux/noteAction';

class Header extends Component {

  constructor(props){
    super(props);
    this.handleSetFilter =  this.handleSetFilter.bind(this);
  }

  handleSetFilter(event){
    const target = event.target;
    const value = target.value;
    this.props.setSelectedNoteIdx(0);
    this.props.setCurrentFilter(value);
  }

  render() {
    return (
      <header className="nav shadow-sm">
        <div className="row container-fluid">
          <div className="col-8">
            <input type="text" className="form-control" onChange={this.handleSetFilter} defaultValue={this.props.currentFilter} placeholder="Search..."/>
          </div>
          <div className="col-4 actions">
            <Link to="/new">
              <label>
                  <span>Add Note</span>
              </label>
            </Link>
            <Link to="/config">
              <label>
                  <span>Config</span>
              </label>
            </Link>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps= (store) => {
  return {
    currentFilter :  store.currentFilter
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({setCurrentFilter, setSelectedNoteIdx}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
