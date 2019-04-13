import { 
    CONTACT_PRESSED, 
    EXPERIENCE_CREATE_SUCCESS,
    USER_LOGOUT
} from '../actions/types';

const INITIAL_STATE = 
{
    contacts: [],
    selectedContacts: [],
    loading: false,
    error: '',
    contactsAreLoaded: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        //adds users to the selected list if they are not already there, removes them if they are
        case CONTACT_PRESSED:
            if (isSameContact(state.selectedContacts, action.payload)) {
                const index = getIndexOfContact(state.selectedContacts, action.payload);
                state.selectedContacts.splice(index, 1); 
                return { ...state, selectedContacts: state.selectedContacts };
            } else {
                state.selectedContacts.push(action.payload);
                return { ...state, selectedContacts: state.selectedContacts };
            }
        case EXPERIENCE_CREATE_SUCCESS:
            return { ...state, selectedContacts: [] };
        case USER_LOGOUT:
            return INITIAL_STATE;
        default: 
            return state;
    }
};

const getIndexOfContact = (selectedContacts, contact) => {
    for (let i = 0; i < selectedContacts.length; i++) {
        if (selectedContacts[i].phoneNumber === contact.phoneNumber){
            return i;
        }
    }
};
//custom compare function to compare contacts by their phoneNumber
const isSameContact = (selectedContacts, contact) => {
    for (let i = 0; i < selectedContacts.length; i++) {
        if (selectedContacts[i].phoneNumber === contact.phoneNumber) {
            return (true);
        }
    }
    return (false);
};
