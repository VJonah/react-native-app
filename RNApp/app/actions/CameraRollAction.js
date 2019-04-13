import { CameraRoll } from 'react-native';

import { 
    CAMERAROLL_LOAD_SUCCESS, 
    CAMERAROLL_LOAD,
    CAMERAROLL_LOAD_FAIL,
    CAMERAROLL_IMAGE_PRESSED,
    CAMERAROLL_SELECTION_RESET

} from '../actions/types';

export const imagePressed = (photo) => {
    return {
        type: CAMERAROLL_IMAGE_PRESSED,
        payload: photo,
    };
};

export const resetImageSelections = () => {
    return {
        type: CAMERAROLL_SELECTION_RESET
    };
};

//gets the photos from a user's cameraroll
export const loadCameraRoll = (pageInfo) => {
    return (dispatch) => {
        dispatch({ type: CAMERAROLL_LOAD });
        if (pageInfo.has_next_page) {
            CameraRoll.getPhotos({
                first: 27,
                after: pageInfo.end_cursor,
                assetType: 'Photos',
            })
                .then((r) => photosLoadSuccess(dispatch, r))
                .catch((error) => photosLoadFail(dispatch, error));
        } else {
            photosLoadSuccess(dispatch, []);
        }
    };
};

const photosLoadSuccess = (dispatch, edges) => {
    dispatch({
        type: CAMERAROLL_LOAD_SUCCESS,
        payload: edges,
    });
};

const photosLoadFail = (dispatch, error) => {
    dispatch({
        type: CAMERAROLL_LOAD_FAIL,
        payload: error,
    });
};

