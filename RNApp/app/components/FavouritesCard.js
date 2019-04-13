import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';
import { IconButton, UserPicture } from '../reusables';


//Favourites Card is the component responsible for displaying a favourited experience in the favourites tab. It displays the the first media item of the object as well as the profile picture and name of the user that created it.
class FavouritesCard extends Component {

    constructor(props) {
        super(props);
        this.state = initialState;
    }
    //unfavourites an object if i has been pressed
    onFavouritesPressed = () => {
        const { currentUser } = firebase.auth();
        if (this.state.color === '#EE5555') {
            //removes the favourited objects from the user's favourites
            firebase.database().ref(`/users/${currentUser.uid}/favourites/${this.props.experience.uid}`)
                .remove();
            this.setState({
                pressed: true,
                underlayColor: '#EE5555',
                color: '#FFFFFF'
            });
        }
    };

    //Gets the user profile data from the online database and navigates to a userPage to display the user's content
    onUserPressed() {
        firebase.database().ref(`/users/${this.props.experience.createdBy}/bio`)
            .on('value', (snapshot) => {
                Actions.jump('contactPage', { userBio: snapshot.val(), contactUid: this.props.experience.createdBy });
            });
    }

    getUserName() {
        if (this.props.userBio.Name === '' || this.props.userBio.Name === undefined) {
            return 'Unknown';
        } else {
            return this.props.userBio.Name;
        }
    }
    
    getUserPicture() {
        const { profilePicture } = this.props.userBio;
        if (!(profilePicture === undefined)) {
            if (profilePicture.timestamp !== '' && profilePicture.downloadURL !== '') {
                    return profilePicture.downloadURL;
            }
        }
        return '';
    }
    

    render() {
        const { 
            cardStyle, 
            containerStyle, 
            iconStyle, 
            circleStyle,
            iconButtonStyle,
            touchableStyle,
            userTextStyle,
            subTextStyle,
            textsStyle,
            userIconStyle,
            touchablesStyle
        } = styles;

        return (
            <View style={cardStyle}>
                <View style={containerStyle}>
                    <Image 
                    style={{ width: undefined, height: undefined, flex: 1 }}
                    source={{ uri: this.props.source }}
                    />
                    <View style={touchablesStyle}>
                        <TouchableOpacity style={touchableStyle} onPress={this.onUserPressed.bind(this)}>
                            <UserPicture 
                            circleStyle={circleStyle} 
                            iconSize={userIconStyle} 
                            source={this.getUserPicture()}
                            />
                            <View style={textsStyle}>
                                <Text style={userTextStyle}>
                                    {this.getUserName()}
                                </Text>
                                <Text style={subTextStyle}>
                                    London
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <IconButton name='heart-2' iconStyle={[iconStyle, { color: this.state.color }]} style={iconButtonStyle} onPress={this.onFavouritesPressed.bind(this)} />
                </View>
            </View>
        );
    }
}
const initialState = { pressed: false, underlayColor: '#FFFFFF', color: '#EE5555' };


const entireScreenWidth = Dimensions.get('window').width;
const scaleFactor = entireScreenWidth / 380;

const styles = {
    cardStyle: {
        aspectRatio: 1,
    },
    containerStyle: {
        justifyContent: 'flex-end', 
        flex: 1, 
        flexDirection: 'column',
        margin: 15 * scaleFactor,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 * scaleFactor },
        shadowOpacity: 0.2,
        elevation: 5,
    },
    contentStyle: {
        flexDirection: 'row',
        aspectRatio: 5 / 1,
        alignItems: 'center',
    },
    iconStyle: {
        color: '#EE5555',
        fontSize: 20 * scaleFactor
    },
    circleStyle: {
        height: 40 * scaleFactor,
        width: 40 * scaleFactor,
        borderRadius: 100000
    },
    touchablesStyle: {
        flexDirection: 'row',
        paddingLeft: 15 * scaleFactor,
        position: 'absolute',
        bottom: 15
    },
    touchableStyle: {
        flexDirection: 'row',
    },
    iconButtonStyle: {
        right: 5,
        position: 'absolute',
        marginRight: 15 * scaleFactor,
        bottom: 20
    },
    userTextStyle: {
        fontFamily: 'AvenirLTStd-Book',
        color: '#414A53',
        fontSize: 14 * scaleFactor,
        fontWeight: 'bold'
    },
    subTextStyle: {
        fontFamily: 'AvenirLTStd-Book',
        color: '#414A53',
        fontSize: 10 * scaleFactor
    },
    textsStyle: {
        marginLeft: 10 * scaleFactor,
    },
    userIconStyle: {
        fontSize: 15 * scaleFactor
    }
};

export { FavouritesCard };
