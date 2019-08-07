import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadContacts } from '../Action';
import DisplayContact from './DisplayContact';

class ContactContainer extends Component {
  componentDidMount() {
    if (this.props.loadStatus === 'init') {
      this.props.loadContacts();
    }
  }
  render() {
    if (this.props.loadStatus !== 'success') {
      return <div> loading ... </div>;
    }
    return (
      <DisplayContact {...this.props}/>
    );
  }
}
function mapStateToProps(state) {
  return {
      loadStatus: state.loadStatus,
      contacts: state.contacts,
  }
}
export default connect(mapStateToProps, { loadContacts })(ContactContainer);
