import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';

import { 
    CONFIRM_PHONE_NUMBER,
    CONFIRM_PHONE_NUMBER_SUCCESS,
    CONFIRM_PHONE_NUMBER_FAIL,
    PHONE_NUMBER_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER 
} from './types';

export const phoneNumberChanged = (text) => {
    return {
            type: PHONE_NUMBER_CHANGED,
            payload: text
    };
};

export const passwordChanged = (text) => {
    return { 
        type: PASSWORD_CHANGED,
        payload: text
    };
};

//takes the current number in the text input tests it using a regular expression before attempting to sign in using firebase authentication, in which case the confirmation is passed to the confirmationSuccess function
export const confirmPhoneNumber = (phoneNumber) => {
    const phoneNumberTest = /\+[0-9]{2}\s[0-9]{10}\b/;
    if (phoneNumber.match(phoneNumberTest)){
        return (dispatch) => {
            dispatch({ type: CONFIRM_PHONE_NUMBER });
            firebase.auth().signInWithPhoneNumber(phoneNumber)
                .then(confirmResult => confirmationSuccess(dispatch, confirmResult))
                .catch((error) => confirmationFail(dispatch, error));
        };
    } else {
        return (dispatch) => {
            const error = 'Phone number is invalid, please follow the example.';
            confirmationFail(dispatch, error);
        };
    }
};


//takes firebase's confirmation and the verification password a user inputed in the text field and then calls the confirmation with the password to verify the user and log them in
export const loginUser = ({ confirmResult, password }) => {
    const passwordTest = /\b[0-9]{6}\b/g;
    if (confirmResult !== null && passwordTest.test(password)) {
        return (dispatch) => {
            dispatch({ type: LOGIN_USER });
            confirmResult.confirm(password)
                .then(user => loginUserSuccess(dispatch, user))
                .catch((error) => loginUserFail(dispatch, error));
        };
    } else {
        return (dispatch) => {
            const error = 'Something went wrong. Maybe check your verification code or close and repoen the application.';
            confirmationFail(dispatch, error);
        };
    }
};

const confirmationSuccess = (dispatch, confirmResult ) => {
    dispatch({
        type: CONFIRM_PHONE_NUMBER_SUCCESS,
        payload: confirmResult
    });
};

const confirmationFail = (dispatch, error) => {
    dispatch({
        type: CONFIRM_PHONE_NUMBER_FAIL,
        payload: error
    });
};

//checks if the user that is attempting to login is a new user if so it creates a basic bio object in the database or it simply logs in an existing user
const loginUserSuccess = (dispatch, user) => {
    const { currentUser } = firebase.auth();
    firebase.database().ref(`/users/${currentUser.uid}`)
        .once('value', (snapshot) => {
            if (!(snapshot.val() === null)) {
                Actions.main();
                dispatch({
                    type: LOGIN_USER_SUCCESS,
                    payload: user
                });
            } else {
                firebase.database().ref(`/users/${currentUser.uid}/bio`)
                    .set({ Name: 'Unknown', phoneNumber: currentUser.phoneNumber, profilePicture: { downloadURL: '', timestamp: '' } })
                    .then(() => {
                        Actions.main();
                        dispatch({
                            type: LOGIN_USER_SUCCESS,
                            payload: user
                        });
                    });
            }
        });
    
};

const loginUserFail = (dispatch, error) => {
    dispatch({
        type: LOGIN_USER_FAIL,  
        payload: error
    });
};
