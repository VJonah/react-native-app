import {
    CAMERAROLL_LOAD_SUCCESS,
    CAMERAROLL_LOAD,
    CAMERAROLL_LOAD_FAIL,
    CAMERAROLL_IMAGE_PRESSED,
    EXPERIENCE_CREATE_SUCCESS,
    CAMERAROLL_SELECTION_RESET,
    USER_LOGOUT
    
} from '../actions/types';


const INITIAL_STATE = 
{
    photos: [],
    loading: false,
    error: '',
    photosAreLoaded: false,
    selectedPhotos: [],
    count: 0,
    pageInfo: {},
    allPhotosAreLoaded: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) { 
        case CAMERAROLL_LOAD:
            return { ...state, loading: true };
        case CAMERAROLL_SELECTION_RESET: 
            return { ...state, selectedPhotos: [] };
        case CAMERAROLL_LOAD_SUCCESS:
            if (action.payload.length === 0) {
                return { ...state, loading: false, photosAreLoaded: true, pageInfo: action.payload.pageInfo, allPhotosAreLoaded: true };
            } else {
                return { ...state, loading: false, photos: [...state.photos, ...action.payload.edges], photosAreLoaded: true, pageInfo: action.payload.page_info };
            }
        case CAMERAROLL_LOAD_FAIL:
            return { ...state, loading: false, error: action.payload };
        //adds images to the selected list if they are not already there, removes them if they are
        case CAMERAROLL_IMAGE_PRESSED:
            if (isSameImage(state.selectedPhotos, action.payload)) {
                const index = getIndexOfImage(state.selectedPhotos, action.payload);
                state.selectedPhotos.splice(index, 1); 
                return { ...state, count: state.count - 1, selectedPhotos: state.selectedPhotos };
            } else {
                return { ...state, count: state.count + 1, selectedPhotos: [...state.selectedPhotos, action.payload] };
            }
        case EXPERIENCE_CREATE_SUCCESS:
            return { ...state, selectedPhotos: [] };
        case USER_LOGOUT:
            return INITIAL_STATE;
        default:
            return state;
    }
};

const getIndexOfImage = (images, photo) => {
    for (let i = 0; i < images.length; i++) {
        if (images[i].timestamp === photo.timestamp) {
            return i;
        }
    }
};


//custom compare function to compare a pictures by their uri 
const isSameImage = (images, photo) => {
    for (let i = 0; i < images.length; i++) {
        if (images[i].image.uri === photo.image.uri) {
            return (true);
        }
    }
    return (false);
};