import firebase from 'react-native-firebase';
import { 
    USER_EXPERIENCES_FETCH_SUCCESS, 
    USER_FETCH_ACCOUNT_BIO
} from './types';


export const fetchUsersExperiences = () => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/experiences`)
            .on('value', snapshot => {
                dispatch({ type: USER_EXPERIENCES_FETCH_SUCCESS, payload: snapshot.val()
                });
            });
    };
};

export const getUserBio = () => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/bio`)
            .on('value', snapshot => {
                dispatch({ type: USER_FETCH_ACCOUNT_BIO, payload: snapshot.val() 
                });
            });
    };
};
