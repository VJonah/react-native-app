import { 
    USER_EXPERIENCES_FETCH_SUCCESS, 
    USER_FETCH_ACCOUNT_BIO,
    USER_LOGOUT
} from '../actions/types';

const INITIAL_STATE = 
{
    usersExperiences: [],
    userBio: {},
    loading: true,
    error: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_EXPERIENCES_FETCH_SUCCESS:
            if (action.payload !== null) {
                return { ...state, usersExperiences: Object.values(action.payload), loading: false };
            } else {
                return { ...state, loading: false };
            }
        case USER_FETCH_ACCOUNT_BIO:
            return { ...state, userBio: action.payload };
        case USER_LOGOUT:
            return INITIAL_STATE;
        default: 
            return state;
    }
};

