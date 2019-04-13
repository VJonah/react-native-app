import React, { Component } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    ScrollView, 
    Dimensions, 
    FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import CustomIcon from './CustomIcon';
import { fetchUsersExperiences, getUserBio } from '../actions';
import { UserPicture, ExperienceBlock, Spinner, Header } from '../reusables/';


//UserPage serves as the page where a user's profile is displayed alongside the experience objects they have created. In this case, the profile picture, name and phone number are displayed.
class UserPage extends Component {

    componentWillMount() {
        this.props.fetchUsersExperiences();
        this.props.getUserBio();
    }

    settingsPressed() {
        Actions.jump('userSettings');
    }

    getProfilePictureSource() { 
        if (!(this.props.userBio === null)) {
            const { profilePicture } = this.props.userBio;
            if (!(profilePicture === undefined)) {
                if (profilePicture.timestamp !== '' && profilePicture.downloadURL !== '') {
                        return profilePicture.downloadURL;
                }
            }
        }
        return '';
    }

    getPhoneNumber() {
        if (!(this.props.userBio === null)) {
            return this.props.userBio.phoneNumber;
        }
        return '';
    }

    getUserName() {
        if (!(this.props.userBio === null)) {
            return this.props.userBio.Name;
        }
        return '';
    }
    //renders the first image of an experience object the user created
    renderBlockImage(currentExperience) {
        if (typeof currentExperience.media !== 'undefined') {
            if (Object.values(currentExperience.media).length !== 0) {
                const firstImageRefKey = Object.keys(currentExperience.media)[0];
                const firstImageDonwloadURL = currentExperience.media[firstImageRefKey].downloadURL;
                return firstImageDonwloadURL;
            }
        } else {
            return '';
        }
    }
    // renders the chat button when the page isn't the logged in user's page but one of his contacts
    
    renderSpinner() {
        if (this.props.loading) {
            return (
                <Spinner size="large" />
            );
        }
    }

    render() {
        const { 
            containerStyle, 
            circleStyle, 
            userNameStyle, 
            phoneNumberStyle, 
            descriptionStyle,
            userIconStyle,
            smallBlockStyle,
            listStyle
        } = styles;
        return (
            <View>
                <Header 
                right
                rightTitle='cog'
                rightButtonPressed={this.settingsPressed.bind(this)}
                />
                <ScrollView>
                    <View style={containerStyle}>
                        <UserPicture 
                        circleStyle={circleStyle} 
                        iconSize={userIconStyle}
                        source={this.getProfilePictureSource()}
                        />

                        <Text style={userNameStyle} numberOfLines={1}>
                            {this.getUserName()}
                        </Text>

                        <Text style={phoneNumberStyle}>
                            {this.getPhoneNumber()}
                        </Text>
                        
                        {this.renderSpinner()}

                        <FlatList
                        style={listStyle}
                        keyExtractor={item => item.uid}
                        numColumns={3}
                        data={this.props.usersExperiences}
                        renderItem={({ item }) => {
                            return (
                                <ExperienceBlock 
                                source={this.renderBlockImage(item)}
                                style={smallBlockStyle}
                                experience={item}
                                isCurrentUser
                                />
                            );
                        }}
                        />
                    </View>
                </ScrollView>
            </View>
            
        );
    }
}


UserPage.defaultProps = {
    forCurrentUser: true
};

const entireScreenWidth = Dimensions.get('window').width;
const scaleFactor = entireScreenWidth / 380;

const styles = {
    listStyle: {
        marginRight: 10 * scaleFactor,
        marginTop: 10 * scaleFactor
    },
    containerStyle: {
        alignItems: 'center',
    },
    circleStyle: {
        width: 90 * scaleFactor,
        height: 90 * scaleFactor,
        marginTop: 20 * scaleFactor,
        marginLeft: 20 * scaleFactor,
        marginRight: 20 * scaleFactor,
        marginBottom: 15 * scaleFactor,
        borderRadius: 10000
    },
    userNameStyle: {
        fontSize: 25 * scaleFactor,
        color: '#414A53',
        marginBottom: 5 * scaleFactor,
        paddingLeft: 20 * scaleFactor,
        paddingRight: 20 * scaleFactor
    },
    phoneNumberStyle: {
        fontSize: 11 * scaleFactor,
        color: '#414A53'
    },
    chatViewStyle: {
        width: 45 * scaleFactor,
        height: 45 * scaleFactor,
        borderRadius: 22.5 * scaleFactor,
        backgroundColor: '#7966FF',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10 * scaleFactor
    },
    descriptionStyle: {
        fontFamily: 'AvenirLTStd-Book',
        fontSize: 17 * scaleFactor,
        color: '#414A53',
        marginBottom: 30 * scaleFactor,
        paddingLeft: 20 * scaleFactor,
        paddingRight: 20 * scaleFactor,
        lineHeight: 25 * scaleFactor
    },
    userIconStyle: {
        fontSize: 35 * scaleFactor,
    },
    chatIconStyle: {
        fontSize: 20 * scaleFactor,
        color: '#FFFFFF'
    },
    smallBlockStyle: {
        width: (entireScreenWidth / 3) - 15,
        borderRadius: 10 * scaleFactor,
        aspectRatio: 1,
        marginLeft: 10 * scaleFactor,
        marginBottom: 10 * scaleFactor
    }
};

const mapStateToProps = (state) => {
    const { usersExperiences, userBio, loading } = state.userPage;
    return { usersExperiences, userBio, loading };
};

export default connect(mapStateToProps, { fetchUsersExperiences, getUserBio })(UserPage);

