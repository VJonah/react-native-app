import { 
    EXPERIENCE_TITLE_CHANGED,
    EXPERIENCE_DESCRIPTION_CHANGED,
    EXPERIENCE_TAG_CHANGED,
    EXPERIENCE_ADD_TAG,
    EXPERIENCE_RESTART_CREATOR,
    EXPERIENCE_CREATE,
    EXPERIENCE_CREATE_FAIL,
    EXPERIENCE_CREATE_SUCCESS,
    USER_LOGOUT
} from '../actions/types';

const INITIAL_STATE =
 {
    title: '',
    tag: '',
    description: '',
    tagData: [],
    addNewTagError: '',
    loading: false,
    uploadError: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EXPERIENCE_TITLE_CHANGED:
            return { ...state, title: action.payload };
        case EXPERIENCE_TAG_CHANGED:
            return { ...state, tag: action.payload };
        case EXPERIENCE_DESCRIPTION_CHANGED:
            return { ...state, description: action.payload };
        case EXPERIENCE_ADD_TAG:
            //tests for a hashtag at the start of the string
            if (action.payload.charAt(0) !== '#') {
                return { ...state, tag: '', addNewTagError: 'Invalid Tag' };
            }
            return { ...state, tagData: [...state.tagData, { key: action.payload }], tag: '', addNewTagError: '' };
        case EXPERIENCE_RESTART_CREATOR:
            return { ...INITIAL_STATE };
        case EXPERIENCE_CREATE_SUCCESS:
            return { ...INITIAL_STATE };
        case EXPERIENCE_CREATE_FAIL:
            return { ...state, loading: false, uploadError: action.payload };
        case EXPERIENCE_CREATE:
            return { ...state, loading: true, uploadError: '' };
        case USER_LOGOUT:
            return INITIAL_STATE;
        default: 
            return state;
    }
};
