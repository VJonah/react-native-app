import { 
    EXPERIENCES_FETCH_SUCCESS,
    USER_LOGOUT,
    EXPERIENCES_FETCH_FAIL
} from '../actions/types';

const INITIAL_STATE = 
{
    fetching: true,
    experiences: {},
    feedData: [],
    error: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EXPERIENCES_FETCH_SUCCESS:
            const newExperiences = { ...state.experiences, ...action.payload };
            return {
                ...state, 
                experiences: newExperiences, 
                feedData: formatExperiencesData(newExperiences), 
                fetching: false 
            };
        case EXPERIENCES_FETCH_FAIL:    
            return { ...state, error: action.payload };
        case USER_LOGOUT:
            return INITIAL_STATE;
        default:
            return state;
    }
};


//formats the experiences objects into an array that can be passed into the FeedList component and properly displayed
const formatExperiencesData = (experiences) => {
    const formattedData = [];
    let tempData = [];
    if (experiences !== null) {
        const originalData = Object.values(experiences);
        if (originalData.length <= 6) {
            return [{ ...originalData }];
        } else {
            //since each FeedBlock is made of 6 sub ExperienceBlocks each chunk can take a maximum of 6 experience objects, this step ensures that arrays of length of less than or equal to 6 are created with the data objects
            for (let i = 0; i < Object.values(experiences).length; i += 6) {
                tempData = originalData.splice(0, 6);
                formattedData.push({ ...tempData });
                if (originalData.length < 6) {
                    formattedData.push({ ...originalData });
                    break;
                }
            }
            return formattedData;
        }
    }
};

