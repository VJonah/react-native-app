import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { View, Text, Dimensions, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { UserPicture, TextButton, Header } from '../reusables';
import { userNameChanged, fetchUsersBio, loadCameraRoll, saveChanges, resetImageSelections, signOutUser } from '../actions';

//UserSettings is the component responsible for allowing the user to change their name and profile picture as well as sign out of their account.
class UserSettings extends Component {
    componentWillMount() {
        this.props.fetchUsersBio();
    }

    onNameChange(text) {
        this.props.userNameChanged(text);
    }

    onChangeImagePressed() {
        if (this.props.photos.length === 0) {
            this.props.loadCameraRoll({ has_next_page: true });
        }
        Actions.jump('cameraroll', { reset: true });
    }

    onSavePressed() {
        if (this.props.selectedPhotos.length === 0) {
            this.props.saveChanges(this.props.name, null);
        } else {
            this.props.saveChanges(this.props.name, this.props.selectedPhotos[0]);
        }
        this.props.resetImageSelections();
    }

    onLogOutPressed() {
        this.props.signOutUser();
    }
    //gets the uri of the new image a user has selected to change their profile picture to
    getSelectedImageUri() {
        const { profilePicture } = this.props.userBio;
        if (!(profilePicture === undefined)) {
            if (profilePicture.timestamp !== '' && profilePicture.downloadURL !== '') {
                if (this.props.selectedPhotos.length !== 0) {
                    return this.props.selectedPhotos[0].image.uri;
                } 
                return profilePicture.downloadURL;
            }
        }
        return '';
    }

    render() {
        const {
            userIconStyle,
            changeTextStyle,
            buttonContainerStyle,
            userPictureContainerStyle,
            userNameViewStyle,
            nameInputStyle,
        } = styles;

        return (
            <View style={{ flex: 1 }}>
                <Header 
                back
                />
                <ScrollView style={{ paddingTop: 20 }}>
                    <View style={userPictureContainerStyle}>
                        <UserPicture 
                        iconSize={userIconStyle}
                        circleStyle={{ width: 90, height: 90, borderRadius: 10000 }} 
                        source={this.getSelectedImageUri()}
                        />
                        <TouchableOpacity onPress={this.onChangeImagePressed.bind(this)}>
                            <Text style={changeTextStyle}>
                                change...
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={userNameViewStyle}>
                        <Text style={{ fontFamily: 'AvenirLTStd-Book', fontSize: 20, color: '#414A53' }}>
                            Name
                        </Text>
                        <TextInput 
                        onChangeText={this.onNameChange.bind(this)}
                        style={nameInputStyle}
                        autocorrect={false}
                        placeholderTextColor='#414A53'
                        value={this.props.name}
                        placeholderStyle={{ fontFamily: 'AvenirLTStd-Book' }}
                        />
                    </View>
                    <View style={buttonContainerStyle}>
                        <TextButton onPress={this.onSavePressed.bind(this)}>
                            Save Changes
                        </TextButton>
                    </View>
                </ScrollView>
                
                <View style={buttonContainerStyle}>
                        <TextButton onPress={this.onLogOutPressed.bind(this)}>
                            Sign Out
                        </TextButton>
                </View>
            </View>
            
        );
    }
}

const entireScreenWidth = Dimensions.get('window').width;
const scaleFactor = entireScreenWidth / 380;

const styles = {
    userIconStyle: {
        fontSize: 40 * scaleFactor,
    },
    changeTextStyle: {
        fontFamily: 'AvenirLTStd-Book',
        fontSize: 18 * scaleFactor,
        color: '#414A53',
        marginTop: 15 * scaleFactor
    },
    buttonContainerStyle: {
        alignItems: 'center',
        padding: 15 * scaleFactor,
        marginBottom: 50
    },
    userPictureContainerStyle: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    userNameViewStyle: {
        padding: 20,
    },
    nameInputStyle: {
        padding: 20,
        fontSize: 30,
        fontFamily: 'AvenirLTStd-Book',
        borderBottomWidth: 1.6 * scaleFactor,
        borderColor: '#414A53',
    }
};
const mapStateToProps = state => {
    const { name, userBio, error } = state.userSettings;
    const { selectedPhotos, photos } = state.cameraRoll;
    return { name, userBio, error, selectedPhotos, photos };
};

export default connect(mapStateToProps, {
    userNameChanged,
    fetchUsersBio,
    loadCameraRoll,
    saveChanges,
    resetImageSelections,
    signOutUser
})(UserSettings);
