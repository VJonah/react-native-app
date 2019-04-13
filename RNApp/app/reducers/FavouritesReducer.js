import { 
    FAVOURITES_FETCH_SUCCESS, 
    FAVOURITES_RESET, 
    FAVOURITES_FETCH_EMPTY,
    USER_LOGOUT 
} from '../actions/types';

const INITIAL_STATE =
 {
    favouritedObjects: [],
    loading: true,
    error: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FAVOURITES_RESET: 
            return INITIAL_STATE;
        case FAVOURITES_FETCH_SUCCESS:
            return { ...state, favouritedObjects: [...state.favouritedObjects, action.payload], loading: false };
        case FAVOURITES_FETCH_EMPTY:
            return { ...state, loading: false };
        case USER_LOGOUT:
            return INITIAL_STATE;
        default:
            return state;
    }
};
