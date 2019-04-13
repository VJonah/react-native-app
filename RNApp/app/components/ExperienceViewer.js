import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, Dimensions, Image } from 'react-native';
import firebase from 'react-native-firebase';
import { TagButton, UserPicture, Contact, Header, IconButton } from '../reusables';


/*The ExperienceViewer component acts as reusable component which will display the formatted experience object when an experience is selected. It displays all contents of an experience object on the screen including media and allows a user to favourite an object pushing that object to the online database */
class ExperienceViewer extends Component {

    constructor(props) {
        super(props);
        this.state = initialState;
        const { currentUser } = firebase.auth();
        //Check if the current experience object is in the current user's favourites
        firebase.database().ref(`/users/${currentUser.uid}/favourites`).child(this.props.uid)
        .once('value', (snapshot) => {
            if (snapshot.val() !== null) {
                this.setObjectAsFavourite();
            } 
        });
    }

    componentWillMount() {
        const user = this.props.createdBy;
        let downloadURL = '';
        //Fetches the downloadURL for the profile picture of the user that created the experience object that is being viewed
        firebase.database().ref(`/users/${user}/bio/profilePicture`)
            .on('value', (snapshot) => {
                downloadURL = snapshot.val().downloadURL;
                this.setState({ ...this.state, picture: downloadURL });
            });
    }
    //checks if the current experience object is favourited and either favourites or unfavourites it when the user taps the heart button 
    onFavouritesPressed = () => {
        const { currentUser } = firebase.auth();
        const reference = firebase.database().ref(`/users/${currentUser.uid}/favourites/${this.props.uid}`);
        if (this.state.color === '#FFFFFF') {
            const newFavourite = { user: this.props.createdBy, experienceId: this.props.uid };
            reference
                .set({ ...newFavourite });
            this.setState({
                pressed: true,
                color: '#EE5555',
                underlayColor: '#FFFFFF'
            });
        } else {
            firebase.database().ref(`/users/${currentUser.uid}/favourites/${this.props.uid}`)
                .remove();
            this.setState(initialState);
        }
    }

    setObjectAsFavourite = () => {
        this.setState({
            pressed: true,
            color: '#EE5555',
            underlayColor: '#FFFFFF'
        });
    }  
    //formats the date the experience object was created
    renderDate() {
        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];
        const dateElements = this.props.fullDate;
        return `${dateElements.day} ${months[dateElements.month - 1]}, ${dateElements.year}`;
    }
    //checks if the experience was created by the logged in use to dispaly the favourite icon option
    renderFavourite() {
        if (!this.props.isCurrentUser) {
            return (
                    <IconButton 
                    style={{ position: 'absolute', left: (Dimensions.get('window').width / 2) - 15, alignSelf: 'center' }}
                    name='heart-2'
                    iconStyle={[{ fontSize: 30, }, { color: this.state.color }]}
                    onPress={this.onFavouritesPressed.bind(this)}               
                    />
            );
        }
    }

    renderPhotos() {
        return (
            <FlatList 
                keyExtractor={item => item.downloadURL}
                showsHorizontalScrollIndicator={false}
                horizontal
                pagingEnabled
                extraData={this.props}
                data={Object.values(this.props.media)}
                renderItem={({ item }) => {
                const entireScreenWidth = Dimensions.get('window').width;
                    return (
                        <View style={{ width: entireScreenWidth, aspectRatio: 1}}>
                            <Image 
                            resizeMode='cover'
                            style={{ width: undefined, height: undefined, flex: 1 }}
                            source={{ uri: item.downloadURL }}
                            />
                        </View>
                    );
                }}
                />
        );
    }
    render() {
        const {
            scrollViewStyle,
            mediaViewStyle,
            titleTextStyle,
            descriptionTextStyle,
            dateTimeTextStyle,
            userAndTitleContainerStyle,
            userCircleStyle,
            userIconstyle,
            typographyStyle,
            taggedPeopleContainerStyle,
            tagsListContainerStyle,

        } = styles;

        return ( 
            <ScrollView style={scrollViewStyle}>
                <Header 
                backgroundColor='#FFFFFF'
                back
                />
                <View style={mediaViewStyle}> 
                    {this.renderPhotos()}
                    {this.renderFavourite()}
                </View>
                
                <Text style={[dateTimeTextStyle, typographyStyle]}>
                    {this.renderDate()}
                </Text>
                    
                
                <View style={userAndTitleContainerStyle}>
                    <View style={{flex: 4 }}>
                        <Text style={[titleTextStyle, typographyStyle]}>
                            {this.props.title}
                        </Text>
                    </View>
                    <View style={{flex: 1}}>
                        <UserPicture 
                        circleStyle={userCircleStyle} 
                        iconSize={userIconstyle} 
                        source={this.state.picture}
                        />
                    </View>
                </View>
                <View style={tagsListContainerStyle}>
                    <FlatList
                    keyExtractor={item => item.tag}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={this.props.tags}
                    renderItem={({ item }) => <TagButton>{item.tag}</TagButton>}
                    />
                </View>

                <Text style={[descriptionTextStyle, typographyStyle]}>
                    {this.props.description}
                </Text>

                <View style={taggedPeopleContainerStyle}>
                    <FlatList
                    key
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    extraData={this.props}
                    data={this.props.taggedContacts}
                    renderItem={({ item }) => <Contact backgroundColor='#9EB7FF'>{item.Name}</Contact>}
                    />
                </View>

            </ScrollView>
        );
    }
}

const initialState = { pressed: false, color: '#FFFFFF', underlayColor: '#EE5555', picture: '' };

const entireScreenWidth = Dimensions.get('window').width;
const scaleFactor = entireScreenWidth / 380;

const styles = {
    scrollViewStyle: {

    },
    mediaViewStyle: {
        width: '100%',
        aspectRatio: 1,
        flexDirection: 'row',
    },
    typographyStyle: {
        color: '#414A53',
        fontFamily: 'AvenirLTStd-Book'
    },
    titleTextStyle: {
        fontSize: 40 * scaleFactor,
        fontWeight: 'bold'
    },
    descriptionTextStyle: {
        fontSize: 22 * scaleFactor,
        marginTop: 25 * scaleFactor,
        marginBottom: 25 * scaleFactor,
        marginLeft: 15 * scaleFactor,
        marginRight: 15 * scaleFactor,
        lineHeight: 30 * scaleFactor,

    },
    dateTimeTextStyle: {
        fontSize: 14 * scaleFactor,
        marginTop: 10 * scaleFactor,
        marginLeft: 15 * scaleFactor,
    },
    userAndTitleContainerStyle: {
        flexDirection: 'row',
        padding: 15 * scaleFactor,
    },
    userCircleStyle: {
        width: 50 * scaleFactor,
        height: 50 * scaleFactor,
        borderRadius: 1000000
    },
    userIconStyle: {
        fontSize: 12 * scaleFactor
    },
    taggedPeopleContainerStyle: {
        paddingBottom: 10 * scaleFactor

    },
    taggedUserCircleStyle: {
        width: 60 * scaleFactor,
        height: 60 * scaleFactor,
        backgroundColor: '#9EB7FF',
        margin: 10
    },
    taggedUserIconStyle: {
        fontSize: 25 * scaleFactor,
    },
    tagsListContainerStyle: {
        paddingLeft: 5 * scaleFactor,
    },
    backIconStyle: {
        fontSize: 30 * scaleFactor,
        color: '#7966FF',
        paddingTop: 20 * scaleFactor,
        paddingLeft: 20 * scaleFactor,
    },
    heartIconStyle: {
        fontSize: 20 * scaleFactor,
        color: '#FFFFFF',
        paddingTop: 20 * scaleFactor,
        paddingRight: 20 * scaleFactor
    }


};

export { ExperienceViewer };
