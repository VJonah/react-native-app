import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import CreateExperienceReducer from './CreateExperienceReducer';
import CameraRollReducer from './CameraRollReducer';
import ContactsReducer from './ContactsReducer';
import FeedReducer from './FeedReducer';
import UserPageReducer from './UserPageReducer';
import FavouritesReducer from './FavouritesReducer';
import UserSettingsReducer from './UserSettingsReducer';

export default combineReducers({
    auth: AuthReducer,
    createExp: CreateExperienceReducer,
    cameraRoll: CameraRollReducer,
    contacts: ContactsReducer,
    feed: FeedReducer,
    userPage: UserPageReducer,
    favourites: FavouritesReducer,
    userSettings: UserSettingsReducer,
});

