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
  // LOAD_CONTACTS_ERROR,
  // LOAD_CONTACTS_RESET,
  SEARCH_CONTACT_WAITING,
  SEARCH_CONTACT_SUCCESS,
} from '../Type';
import { getContactList } from '../Data';

export const loadContacts = () => dispatch => {
  dispatch({ type: LOAD_CONTACTS_WAITING });
  const contacts = getContactList();
  setTimeout(()=>dispatch({ type: LOAD_CONTACTS_SUCCESS, payload: contacts}), 500);
}
export const addNewContact = (contact) => dispatch => {
  dispatch({type: ADD_CONTACT_WAITING});
  setTimeout(()=>dispatch({ type: ADD_CONTACT_SUCCESS, payload: contact}), 500);
}

export const deleteContact = (id) => dispatch => {
  dispatch({type: DELETE_CONTACT_WAITING});
  setTimeout(()=>dispatch({ type: DELETE_CONTACT_SUCCESS, payload: id}), 500);
}

export const editContact = (contact) => dispatch => {
  dispatch({type: EDIT_CONTACT_WAITING});
  setTimeout(()=>dispatch({ type: EDIT_CONTACT_SUCCESS, payload: contact}), 500);
}

export const searchContact = (searchTerm) => dispatch => {
  dispatch({type: SEARCH_CONTACT_WAITING});
  setTimeout(()=>dispatch({ type: SEARCH_CONTACT_SUCCESS, payload: searchTerm }), 500);
}
export const resetAddNewContact = () => dispatch => dispatch({ type: ADD_CONTACT_RESET });

export const resetDeleteContact = () => dispatch => dispatch({ type: DELETE_CONTACT_RESET });

export const resetEditContact = () => dispatch => dispatch({ type: EDIT_CONTACT_RESET });
