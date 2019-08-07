import React from "react";
import { Header, Button, Form } from "semantic-ui-react";
import { connect } from 'react-redux';
import uniqid from 'uniqid';
import { addNewContact, editContact } from '../Action';
// import Constants from 'expo-constants';

class AddContact extends React.Component {
  constructor(props) {
    super(props);
    let name = "";
    let phone = "";
    let key = null;
    const location = this.props.location;
    const contact = location && location.state ? location.state.contact : null;
    if (contact) {
      name = contact.name;
      phone = contact.phone;
      key = contact.key;
    }
    this.state = { name, phone, key };
  }

  handleContact = (e, { name, value }) => {
    this.setState({ [name]: value });
  };
  handleFormSubmit = () => {
    // const key = this.props.navigation.getParam("key", null);
    if (this.state.name === "" || this.state.phone.length < 0) {
      return;
    } else {
      if (this.state.key) {
        this.props.editContact(this.state);
      } else {
        const key = uniqid();
        this.props.addNewContact({ ...this.state, key });
      }
      this.props.history.push('/home');
    }
  };
  render() {
    return (
      <div style={styles.container}>
      <Header> {this.state.key ? 'Edit' : 'Add'} Contact </Header>
       <Form.Group>
            <Form.Input
              style={styles.inputStyle}
              placeholder="name"
              type='text'
              name="name"
              value={this.state.name}
              onChange={this.handleContact}
            />
        </Form.Group>
        <Form.Group>
          <Form.Input
            style={styles.inputStyle}
            placeholder="phone number"
            name="phone"
            type='text'
            value={this.state.phone}
            onChange={this.handleContact}
          />
        </Form.Group>
        <Form.Group>
          <Button primary content="Submit" onClick={this.handleFormSubmit} />
          <Button negative content="Cancel" onClick={()=>this.props.history.push('/home')} />
        </Form.Group>
      </div>
    );
  }
}

const styles = {
  container: {
    width: '400px',
    margin: 'auto',
    marginTop: '20px',
    border: '1px solid grey',
    boxSizing: 'border-boxing',
    padding: '5px'
  },
  inputStyle: {
    borderWidth: '1px',
    borderColor: "blue",
    margin: '5px',
    width: '300px'
  }
};

export default connect(null, { addNewContact, editContact} )(AddContact);
