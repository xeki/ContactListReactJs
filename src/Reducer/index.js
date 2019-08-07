import _ from 'lodash';
import {
  ADD_CONTACT_WAITING,
  ADD_CONTACT_SUCCESS,
  // ADD_CONTACT_ERROR,
  ADD_CONTACT_RESET,
  EDIT_CONTACT_WAITING,
  EDIT_CONTACT_SUCCESS,
  // EDIT_CONTACT_ERROR,
  EDIT_CONTACT_RESET,
  DELETE_CONTACT_WAITING,
  DELETE_CONTACT_SUCCESS,
  // DELETE_CONTACT_ERROR,
  DELETE_CONTACT_RESET,

  LOAD_CONTACTS_WAITING,
  LOAD_CONTACTS_SUCCESS,

  SEARCH_CONTACT_WAITING,
  SEARCH_CONTACT_SUCCESS,
} from '../Type';

const INITIAL_STATE = {contacts: [], contact: {}, addStatus: 'init',
              editStatus: 'init', deleteStatus: 'init', loadStatus: 'init' };

const reducer = (state=INITIAL_STATE, action) => {
  let contacts;
  console.log("Action: ", action, '\nContacts: ', Object.keys(state.contacts).length);
  switch (action.type) {
    case LOAD_CONTACTS_WAITING:
         return { ...state, loadStatus: 'waiting' };
    case LOAD_CONTACTS_SUCCESS:
         return { ...state, loadStatus: 'success', contacts: action.payload };

    case ADD_CONTACT_WAITING:
         return { ...state, addStatus: 'waiting' };
    case  ADD_CONTACT_SUCCESS:
         contacts = { ...state.contacts, [action.payload.key]: action.payload };
         return { ...state, addStatus: 'success', contacts, contact: action.payload };
      case ADD_CONTACT_RESET:
           return { ...state, addStatus: 'init' };

    case EDIT_CONTACT_WAITING:
         return { ...state, editStatus: 'waiting' };
    case  EDIT_CONTACT_SUCCESS:
         contacts = { ...state.contacts, [action.payload.key]: action.payload };
         return { ...state, editStatus: 'success', contacts, contact: action.payload };
    case EDIT_CONTACT_RESET:
         return { ...state, editStatus: 'init' };

    case DELETE_CONTACT_WAITING:
         return { ...state, deleteStatus: 'waiting' };
    case  DELETE_CONTACT_SUCCESS:
         contacts = { ...state.contacts};
         contacts = _.omit(contacts, action.payload);
         return { ...state, contacts, deleteStatus: 'success', contact: action.payload };
    case DELETE_CONTACT_RESET:
         return { ...state, deleteStatus: 'init' };

    case SEARCH_CONTACT_WAITING:
        return { ...state, searchStatus: 'waiting' };
    case SEARCH_CONTACT_SUCCESS:
        const searchTerm = action.payload.trim().toLowerCase();
        contacts = { ...state.contacts };
        let searchResult =  searchTerm ? _.filter(contacts, contact => contact.name.toLowerCase().includes(searchTerm)) : contacts;
        return { ...state, searchStatus: 'success', searchResult };
    default:
         return { ...state };
  }
}

export default reducer;
