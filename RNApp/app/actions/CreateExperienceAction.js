import firebase from 'react-native-firebase';
import { NetInfo } from 'react-native';

import { 
    EXPERIENCE_DESCRIPTION_CHANGED,
    EXPERIENCE_TAG_CHANGED,
    EXPERIENCE_TITLE_CHANGED,
    EXPERIENCE_ADD_TAG,
    EXPERIENCE_RESTART_CREATOR,
    EXPERIENCE_CREATE,
    EXPERIENCE_CREATE_FAIL,
    EXPERIENCE_CREATE_SUCCESS
} from './types';

export const restartCreator = () => {
    return ({
        type: EXPERIENCE_RESTART_CREATOR,
    });
};

export const addTag = (tagText) => {
    return ({
        type: EXPERIENCE_ADD_TAG,
        payload: tagText
    });
};

export const titleChanged = (text) => {
    return ({
        type: EXPERIENCE_TITLE_CHANGED,
        payload: text,
    });
};

export const tagChanged = (text) => {
    return ({
        type: EXPERIENCE_TAG_CHANGED,
        payload: text,
    });
};

export const descriptionChanged = (text) => {
    return ({
        type: EXPERIENCE_DESCRIPTION_CHANGED,
        payload: text,
    });
};

//uploads the experience a user has created to the database
//formats all the data beforehand
//checks if a user is connected 
//uploads the basic string and integer data to a user's experiences directory in the database
export const experienceCreate = ({ title, selectedPhotos, tagData, description, selectedContacts }) => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const fullDate = { day, month, year };
    const { currentUser } = firebase.auth();
    const createdBy = currentUser.uid;
    const taggedContacts = formatContactData(selectedContacts);
    const tags = formatTagData(tagData);
    return (dispatch) => {
        NetInfo.isConnected.fetch().then(isConnected => {
            if (isConnected === false) {
                experienceCreateFail(dispatch, 'Not Connected');
            } else {
                dispatch({ type: EXPERIENCE_CREATE });
                //uploads basic data to the user's experiences directory in the databsae
                firebase.database().ref(`/users/${currentUser.uid}/experiences`)
                    .push({ title, description, tags, taggedContacts, fullDate, createdBy })
                    //takes the path reference of the newly pushed data and adds the uid of the experience to the experience's data
                    .then((reference) => {
                        firebase.database().ref(`${reference.path}`)
                            .update({ uid: reference.key });
                        //calls function to upload the media to storage
                        uploadImagesToStorage(reference, selectedPhotos, currentUser.uid, dispatch)
                    })
                    .catch(err => experienceCreateFail(dispatch, err));
            }
        });
    };
};


const uploadImagesToStorage = (reference, images, userId, dispatch) => {
    const storage = firebase.storage();
    const experienceId = reference.key;
    for (let i = 0; i < images.length; i++) {
        //appropriate space in storage is referenced and files are uploaded
        storage.ref(`users/${userId}/${experienceId}/images/media${i}`).putFile(images[i].image.uri)
            .then((uploadTask) => {
                //once complete the downloadURL and the timestamp of the newly updated photos are uploaded to the database in the object of the appropritate experience that is beigng created
                firebase.database().ref(`${reference.path}/media`)
                    .push({ downloadURL: uploadTask.downloadURL, path: uploadTask.path, timestamp: images[i].timestamp })
                    .then(() => experienceCreateSuccessfull(dispatch))
                    .catch(err => experienceCreateFail(dispatch, err));
            })
            .catch(err => experienceCreateFail(dispatch, err));
    }
};

export const invalidInput = () => {
    return ({
        type: EXPERIENCE_CREATE_FAIL,
        payload: 'Please make sure to provide a title, media and a description'
    });
};

const experienceCreateFail = (dispatch, error) => {
    dispatch({
        type: EXPERIENCE_CREATE_FAIL,
        payload: error
    });
};

const experienceCreateSuccessfull = (dispatch) => {
    dispatch({
        type: EXPERIENCE_CREATE_SUCCESS
    });
};

//takes the array data and formats it to an object
const formatContactData = (array) => {
    const resultantObject = {};
    if (array.length !== 0){
        for (let i = 0; i < array.length; i++) {
            resultantObject[i] = { ...array[i] };
        }
    }
    return resultantObject;
};

//takes the array data and formats it to an object
const formatTagData = (array) => {
    const resultantObject = {};
    if (array.length !== 0){
        for (let i = 0; i < array.length; i++) {
            resultantObject[i] = { tag: array[i].key };
        }
    }
    return resultantObject;
};

