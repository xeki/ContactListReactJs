import React from "react";
import { Button, Form } from "semantic-ui-react";
import _ from 'lodash';
import { connect } from 'react-redux';
import { deleteContact, searchContact } from '../Action';
import ContactSectionList from "./ContactSectionList";

class DisplayContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showContacts: true,
      searchTerm: ''
    };
    this.handleSearch = _.debounce(this.handleSearch, 300);
  }

 handleSearch = (e, { value }) => {
   this.setState({ searchTerm: value });
   this.props.searchContact(value);
 }
  navigateToAddContact = () => {
    this.props.history.push({ pathname: '/add', state: { addNewContact: this.addNewContact } });
  };
  toggleContacts = () => {
    this.setState(prevState => ({ showContacts: !prevState.showContacts }));
  };
  deleteContact = id => {
    this.props.deleteContact(id);
  };

  render() {
    if (this.props.deleteStatus === 'waiting' ||
        this.props.searchStatus === 'waiting') {
      return <div> updating contact list ... </div>;
    }
    return (
      <div style={styles.container}>
        <div>
            <Button
              style={styles.button}
              content="toggle contacts"
              onClick={this.toggleContacts}
            />
          <Button
              style={styles.button}
              content="Add New Contact"
              onClick={this.navigateToAddContact}
            />
          <Form.Input
             name='search'
             defaultValue={this.state.searchTerm}
             onChange={this.handleSearch}
             placeholder='search'
             autoFocus
             />
          </div>
          {this.state.showContacts && (
            <ContactSectionList
              {...this.props}
              contacts={this.state.searchTerm.trim() ? this.props.searchResult: this.props.contacts}
              deleteContact={this.deleteContact}
            />
          )}
      </div>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
    paddingBottom: 50,
    marginBottom: 100,
    paddingLeft: 20
  },
  button: {
    margin: "5px",
    fontFamily: "sarif",
    fontWeight: "bold",
    backgroundColor: "steelblue",
    height: '30px',
    borderRadius: "5px"
  }
};

function mapStateToProps(state) {
  return { contacts: state.contacts,
           deleteStatus: state.deleteStatus,
           searchResult: state.searchResult,
           searchStatus: state.searchStatus
         };
}
export default connect(mapStateToProps,
   { deleteContact, searchContact }
 )(DisplayContact)
