import React from "react";
import { Button } from "semantic-ui-react";
import _ from "lodash";

const getAlphabeticList = contacts =>
  _.reduce(
    contacts,
    (obj, contact) => {
      const title = contact.name[0].toUpperCase();
      return { ...obj, [title]: [...(obj[title] || []), contact] };
    },
    {}
  );

const getSortedList = contacts => {
  return getAlphabeticList(contacts);
  // return Object.keys(alphabetList);
};
const navigateToEditContactPage = (contact, props) => {
  props.history.push({ pathname: '/add', state: { contact } });
}
const renderItem = (items, title, props) => {
  // console.log('Item: ', items, title);
  return (
    <div key={`block-${title}`} style={{ display: 'flex', flexDirection: 'column'}}>
      <div key={`title-${title}`} style={styles.titleStyle}> {title} </div>
      {_.map(items, item =>
        (<div className='contact-row' key={`outer-div-${item.key}`} style={{ paddingTop: '5px',
          paddingBottom: '5px', display: 'flex', flexDirection: 'row'}}>
            <div key={`inner-div-${item.key}`} style={styles.contactStyle}>
              <span key={`name-${item.key}`} style={styles.textFormat}>{item.name} </span>
              <span key={`phone-${item.key}`} style={styles.textFormat}>{item.phone}</span>
            </div>
            <div style={styles.buttonGroup}>
                <Button
                  content="edit"
                  style={styles.buttonStyle}
                  onClick={() =>
                    navigateToEditContactPage(item, props)
                  }
                />
                <Button
                  content="X"
                  style={{...styles.buttonStyle, ...styles.deltetButton}}
                  onClick={() => props.deleteContact(item.key)}
                />
          </div>
        </div>))}
    </div>
  );
};

const ContactSectionList = props => {
  const contactList = getSortedList(props.contacts);
  // console.log('ContactList ', contactList);
 return (<div style={styles.contactdiv}>
          {_.map(contactList, (section, title) =>
            renderItem(section, title, props)
          )}
      </div>)
};

const styles = {
  titleStyle: {
    fontSize: '18px',
    color: 'blue',
    textAlign: 'left',
    flex: 1,
    display: 'flex'
  },
  textFormat: {
    color: "steelblue",
    fontSize: 13,
    letterSpacing: 1.5,
    padding: 2,
    width: '100%',
    display: 'inline-block'
  },
  contactdiv: {
    paddingTop: 5,
    paddingBottom: 5,
    display: "flex",
    flexDirection: "column",
    justifyContent: 'center',
    width: '450px'
  },
  contactStyle: {
    flex: 3,
    flexDirection: "column"
  },
  buttonStyle: {
    alignSelf: "flex-end",
    height: "30px",
    width: "60px",
    backgroundColor:"green",
    margin: '5px'
  },
  deltetButton: {
    backgroundColor: 'red'
  }, buttonGroup :{
    flex: 1,
    display: 'flex',
    justifyContent: 'center'
  }
};
export default ContactSectionList;
