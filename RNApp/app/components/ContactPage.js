import React, { Component } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    ScrollView, 
    Dimensions, 
    FlatList,
} from 'react-native';
import firebase from 'react-native-firebase';
import CustomIcon from './CustomIcon';
import { UserPicture, ExperienceBlock, Spinner, Header } from '../reusables/';


//Contact serves as the page where a user's contact's profile is displayed alongside the experience objects they have created. In this case, the profile picture, name and phone number are displayed.
class ContactPage extends Component {

    constructor(props) {
        super(props);
        this.state = { loading: true, usersExperiences: [] };
    }

    componentWillMount() {
        firebase.database().ref(`/users/${this.props.contactUid}/experiences`)
            .on('value', snapshot => {
                if (snapshot.val() !== null) {
                    this.setState({
                        loading: false,
                        usersExperiences: Object.values(snapshot.val())
                    });
                } else {
                    this.setState({
                        loading: true
                    });
                } 
                
            });
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
    renderChatButton() {
        if (!this.props.isCurrentUser) {
            const { chatViewStyle, chatIconStyle } = styles;
            return (
                <TouchableOpacity>
                    <View style={chatViewStyle}>
                        <CustomIcon name='chat-2' style={chatIconStyle}/>
                    </View>
                </TouchableOpacity>
            );
        }
    }
    renderSpinner() {
        if (this.state.loading) {
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
            listStyle,
            chatIconStyle,
            chatViewStyle
        } = styles;
        return (
            <View>
                <Header 
                back
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

                        <TouchableOpacity>
                            <View style={chatViewStyle}>
                                <CustomIcon 
                                name='chat-2' 
                                style={chatIconStyle}
                                />
                            </View>
                        </TouchableOpacity>  
                        
                        {this.renderSpinner()}

                        <FlatList
                        style={listStyle}
                        numColumns={3}
                        keyExtractor={item => item.uid}
                        data={this.state.usersExperiences}
                        renderItem={({ item }) => {
                            return (
                                <ExperienceBlock 
                                source={this.renderBlockImage(item)}
                                style={smallBlockStyle}
                                experience={item}
                                isCurrentUser={false}
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

export { ContactPage };
