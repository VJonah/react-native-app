import { 
    CONFIRM_PHONE_NUMBER,
    CONFIRM_PHONE_NUMBER_FAIL,
    CONFIRM_PHONE_NUMBER_SUCCESS,
    PHONE_NUMBER_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    USER_LOGOUT

} from '../actions/types';

const INITIAL_STATE = 
{ 
    phoneNumber: '',
    password: '',
    user: null,
    error: '',
    loading: false,
    numberConfirmed: false,
    confirming: false,
    authenticated: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_LOGOUT:
            return INITIAL_STATE;
        case PHONE_NUMBER_CHANGED:
            return { ...state, phoneNumber: action.payload };
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        case LOGIN_USER_SUCCESS:
            return { ...INITIAL_STATE, user: action.payload, authenticated: true };
        case LOGIN_USER_FAIL:
            return { ...state, error: action.payload, password: '', loading: false };
        case LOGIN_USER:
            return { ...state, loading: true, error: '' };
        case CONFIRM_PHONE_NUMBER:
            return { ...state, confirming: true, error: '' };
        case CONFIRM_PHONE_NUMBER_SUCCESS:
            return { ...state, confirming: false, numberConfirmed: true, confirmResult: action.payload };
        case CONFIRM_PHONE_NUMBER_FAIL: 
            return { ...state, confirming: false, numberConfirmed: false, error: action.payload };
        default: 
            return state;
    }
};
