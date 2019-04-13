import firebase from 'react-native-firebase';
import { FAVOURITES_FETCH_SUCCESS, FAVOURITES_RESET, FAVOURITES_FETCH_EMPTY } from './types';

//gets the references to the experience object a user favourited in the logged in user's favourites directory
export const fetchUsersFavourites = () => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/favourites`)
            .on('value', snapshot => {
                dispatch({ type: FAVOURITES_RESET });
                getFullExperienceObjects(snapshot.val(), dispatch);
            });
    };
};

//takes the experience object references that were fetched and goes to their directory in the database structure and retrieves the referenced experience's data
const getFullExperienceObjects = (favourites, dispatch) => {
    if (favourites !== null) {
        const allFavouritedExperiences = Object.values(favourites);
        if (allFavouritedExperiences.length !== 0) {
            //gets the experience object for each favourited experience
            for (let i = 0; i < allFavouritedExperiences.length; i++) {
                const currentExperienceUser = allFavouritedExperiences[i].user;
                const currenExperienceID = allFavouritedExperiences[i].experienceId;
                firebase.database().ref(`/users/${currentExperienceUser}/experiences/${currenExperienceID}`)
                    .on('value', (snapshot) => {
                        const favouriteObject = snapshot.val();
                        //gets the bio of the user who created the favourite
                        firebase.database().ref(`users/${currentExperienceUser}/bio`)
                            .on('value', (snap) => {
                                const data = { object: favouriteObject, userBio: snap.val() };
                                dispatch({ type: FAVOURITES_FETCH_SUCCESS, payload: data });
                            });
                    });
            }
        }
    } else {
        dispatch({ type: FAVOURITES_FETCH_EMPTY });
    }
};
