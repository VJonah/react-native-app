import {
    USER_FETCH_BIO,
    USER_NAME_CHANGED,
    USER_UPDATE_BIO_FAIL,
    USER_UPDATE_BIO_SUCCESS,
    USER_SIGN_OUT_FAIL,
    USER_LOGOUT
} from '../actions/types';

const INITIAL_STATE = 
{
    name: '',
    userBio: {},
    error: '',
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_FETCH_BIO:
            if (typeof action.payload.Name !== undefined) {
                return { ...state, userBio: action.payload, name: action.payload.Name };
            } else {
                return { ...state, userBio: action.paylod };
            }
        case USER_UPDATE_BIO_FAIL: 
            return { ...state, error: action.payload };
        case USER_UPDATE_BIO_SUCCESS:   
            return { ...state, error: '' };
        case USER_NAME_CHANGED:
            return { ...state, name: action.payload };
        case USER_SIGN_OUT_FAIL:
            return { ...state, error: action.payload };
        case USER_LOGOUT:
            return INITIAL_STATE;
        default:
            return state;
    }
};
