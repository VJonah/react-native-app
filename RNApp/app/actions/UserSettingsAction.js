import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';
import { 
    USER_FETCH_BIO,
    USER_NAME_CHANGED,
    USER_UPDATE_BIO_FAIL,
    USER_UPDATE_BIO_SUCCESS, 
    USER_SIGN_OUT_FAIL,
    USER_LOGOUT
} from './types';

export const userNameChanged = (text) => {
    return {
        type: USER_NAME_CHANGED,
        payload: text,
    };
};

export const signOutUser = () => {
    return (dispatch) => {
        firebase.auth().signOut()
            .then(() => signOutSuccess(dispatch))
            .catch((error) => signOutFail(dispatch, error));
    };
};   

export const fetchUsersBio = () => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/bio`)
            .on('value', snapshot => {
                dispatch({ type: USER_FETCH_BIO, payload: snapshot.val() });
            });
    };
};

//saves the changes a user has made to his name and to his profile picture
export const saveChanges = (name, image) => {
    return (dispatch) => {
        const { currentUser } = firebase.auth();
        //if a new image has been selected from cameraroll the user's profile picture will be uploaded to their designated directory in storage
        if (image !== null) {
            const storage = firebase.storage();
            storage.ref(`users/${currentUser.uid}/bio/profilePicture`).putFile(image.image.uri)
                .then((uploadTask) => {
                    //once the file is uploaed the timestamp and downloadURL of the existing profile picture is replaced in the database
                    firebase.database().ref(`/users/${currentUser.uid}/bio/profilePicture`)
                        .set({ downloadURL: uploadTask.downloadURL, path: uploadTask.path, timestamp: image.timestamp })
                        .then(() => profileUpdateSuccess(dispatch))
                        .catch((error) => profileUpdateFail(dispatch, error));
                });
        }
        //user's name is updated in the database
        firebase.database().ref(`users/${currentUser.uid}/bio/Name`)
            .set(name);
    };
};

const signOutSuccess = (dispatch) => {
    dispatch({
        type: USER_LOGOUT
    });
    Actions.reset('auth');
};

const signOutFail = (dispatch, error) => {
    dispatch({
        type: USER_SIGN_OUT_FAIL,
        payload: error
    });
};

const profileUpdateFail = (dispatch, error) => {
    dispatch({
        type: USER_UPDATE_BIO_FAIL,
        payload: error
    });
};

const profileUpdateSuccess = (dispatch) => {
    dispatch({
        type: USER_UPDATE_BIO_SUCCESS
    });
};
