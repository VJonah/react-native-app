import firebase from 'react-native-firebase';
import {
    EXPERIENCES_FETCH_SUCCESS,
    EXPERIENCES_FETCH_FAIL
} from './types';

//does a joint query of the no sql database
export const experiencesFetch = () => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        //for each user in a user's contact it gets all the experience objects that user has created
        firebase.database().ref(`/users/${currentUser.uid}/contacts`)
            .on('child_added', snapshot => {
                if (snapshot.val() !== null) {
                    firebase.database().ref(`/users/${snapshot.val().uid}/experiences`)
                    .once('value', snap => {
                        dispatch({ type: EXPERIENCES_FETCH_SUCCESS, payload: snap.val() });
                    });
                } else {
                    dispatch({type: EXPERIENCES_FETCH_FAIL, payload: 'You have no contacts.' });
                }
            });
    };
};
