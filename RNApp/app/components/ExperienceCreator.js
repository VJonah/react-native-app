import React, { Component } from 'react';
import { View, Text, ScrollView, TextInput, Dimensions, FlatList, PermissionsAndroid, Image } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { TextButton, IconButton, Header, TagButton, Contact, Spinner } from '../reusables';
import { 
    titleChanged, 
    tagChanged, 
    descriptionChanged, 
    addTag, 
    restartCreator, 
    loadCameraRoll, 
    experienceCreate, 
    invalidInput 
} from '../actions';



/*request to access cameraRoll on device*/
async function requestCameraRollPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          'title': 'Allow access to CameraRoll',
          'message': 'Allow the app to access the photos and videos in your cameraroll.'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("CameraRoll Accessed")
      } else {
        console.log("CameraRoll permission denied")
      }
    } catch (err) {
      console.warn(err)
    }
}
  
requestCameraRollPermission();

/*The ExperienceCreator Component is used to generate new Experience objects. Users can select media from their cameraroll, add a title, a description, tags and reference contacts before uploading them to the database. */
class ExperienceCreator extends Component {

    onTitleChange(text) {
        this.props.titleChanged(text);
    }
    onTagChange(text) {
        this.props.tagChanged(text);
    }
    onDescriptionChange(text) {
        this.props.descriptionChanged(text);
    }
 
    renderSelectedPhotos() {
        if(this.props.selectedPhotos.length !== 0) {
            return (
                <FlatList 
                showsHorizontalScrollIndicator={false}
                horizontal
                pagingEnabled
                keyExtractor={item => item.image.uri}
                extraData={this.props}
                data={this.props.selectedPhotos}
                renderItem={({ item }) => {
                const entireScreenWidth = Dimensions.get('window').width;
                    return (
                        <View style={{ width: entireScreenWidth, aspectRatio: 1}}>
                            <Image 
                            resizeMode='cover'
                            style={{ width: undefined, height: undefined, flex: 1 }}
                            source={{ uri: item.image.uri }}
                            />
                        </View>
                    );
                }}
                />
            );
        }
    }

    renderSelectedContacts() {
        if(this.props.selectedContacts.length !== 0) {
            return (
                <FlatList
                keyExtractor={item => item.phoneNumber}
                showsHorizontalScrollIndicator={false}
                horizontal
                extraData={this.props}
                data={this.props.selectedContacts}
                renderItem={({ item }) => <Contact backgroundColor='#9EB7FF' >{item.Name}</Contact>}
                />
            );
        }
    }

    onTagPeoplePressed() {
        Actions.jump('experienceCreatorContacts');
    }

    onAddTagPressed() {
        this.props.addTag(this.props.tag);
    }

    onRestartPressed() {
        this.props.restartCreator();
    }

    onAddImagesPressed() {
        if(this.props.photos.length === 0){
            this.props.loadCameraRoll({has_next_page: true});
        }
        Actions.jump('cameraroll', { reset: true });

    }

    onSharePressed() {
        const { title, selectedPhotos, tagData, description, selectedContacts } = this.props;
        if( title === '' || selectedPhotos.length === 0 || description === '') {
            this.props.invalidInput();
        } else {
            this.props.experienceCreate({ title, selectedPhotos, tagData, description, selectedContacts });
        }
    }
    //Formats the current date into a user friendly string
    getDateText() {
        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'Juin',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];
        const date = new Date();
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear().toString();
        return (`${day} ${month}, ${year}`);
    }

    renderAddNewTagError() {
        if (this.props.addNewTagError) {
            return (
                <View>
                    <Text style={styles.errorTextStyle}>
                        {this.props.addNewTagError}
                    </Text>
                </View>
            );
        }
    }

    renderUploadError() {
        if(this.props.uploadError) {
            return (
                <View style={{ padding: 20 }}>
                    <Text style={styles.errorTextStyle}>
                        {this.props.uploadError}
                    </Text>
                </View>
            );
        }
    }

    renderUploadButtonAndSpinner() {
        if(this.props.loading) {
            return (
                <Spinner size="large" />
            );
        } else {
            return (
                    <TextButton onPress={this.onSharePressed.bind(this)}>
                        Share
                    </TextButton>
            )
        }
    }

    render() {
        const {
            scrollViewStyle,
            mediaViewStyle,
            plusIconStyle,
            dateTimeTextStyle,
            typographyStyle,
            textButtonContainerStyle,
            descriptionInputStyle,
            tagInputStyle,
            tagsListContainerStyle, 
            titleInputStyle,
            addTagIconStyle,
            plusIconContainerStyle
        } = styles;
        return (
            <ScrollView style={scrollViewStyle}>
                <Header 
                backgroundColor='#FFFFFF'
                forTabs
                title="New"
                right
                rightTitle='arrows-ccw'
                rightButtonPressed={this.onRestartPressed.bind(this)}
                />
                <View style={mediaViewStyle}> 
                    {this.renderSelectedPhotos()}
                    <IconButton name='plus-1' iconStyle={plusIconStyle} style={plusIconContainerStyle} onPress={this.onAddImagesPressed.bind(this)} />
                </View>

                <Text style={[dateTimeTextStyle, typographyStyle]}>
                    {this.getDateText()}
                </Text>

                <TextInput 
                style={titleInputStyle}
                multiline
                autocorrect={false}
                placeholderTextColor='#666C72' 
                placeholder='Title it!' 
                placeholderStyle={{ fontFamily: 'AvenirLTStd-Book' }}
                onChangeText={this.onTitleChange.bind(this)}
                value={this.props.title}
                />
                
                <View style={tagsListContainerStyle}>
                    <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={this.props.tagData}
                    renderItem={({ item }) => <TagButton>{item.key}</TagButton>}
                    />
                </View>

                {this.renderAddNewTagError()}

                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <TextInput 
                    style={tagInputStyle}
                    multiline={false} 
                    autocorrect={false} 
                    placeholder='#tag'
                    placeholderStyle={{ fontFamily: 'AvenirLTStd-Book' }}
                    placeholderTextColor='#666C72'  
                    onChangeText={this.onTagChange.bind(this)}
                    value={this.props.tag}
                    onSubmitEditing={this.onAddTagPressed.bind(this)}
                    />
                    <IconButton 
                    style={{alignItems: 'center', justifyContent: 'center', flex: 1}}
                    name='plus-1'
                    iconStyle={addTagIconStyle}
                    onPress={this.onAddTagPressed.bind(this)}
                    />
                </View>
                
                
                <TextInput 
                style={descriptionInputStyle}
                multiline 
                placeholderTextColor='#666C72' 
                placeholder='What happened?' 
                autocorrect={false} 
                placeholderStyle={{fontFamily: 'AvenirLTStd-Book'}} 
                onChangeText={this.onDescriptionChange.bind(this)}
                value={this.props.description}
                />

                {this.renderSelectedContacts()}

                <View style={textButtonContainerStyle}>
                    <TextButton onPress={this.onTagPeoplePressed}>
                        Who was there?
                    </TextButton>
                </View>
                
                {this.renderUploadError()}
                <View style={textButtonContainerStyle}>
                    {this.renderUploadButtonAndSpinner()}
                </View>
            </ScrollView>
        );
    }
}
const entireScreenWidth = Dimensions.get('window').width;
const scaleFactor = entireScreenWidth / 380;

const styles = {
    scrollViewStyle: {

    },
    mediaViewStyle: {
        width: '100%',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    plusIconContainerStyle: {
        alignItems: 'center', 
        justifyContent: 'center', 
        height: 50 * scaleFactor, 
        width: 50 * scaleFactor,
        borderRadius: 25 * scaleFactor,
        position: 'absolute'
    },
    plusIconStyle: {
        color: '#7966FF',
        fontSize: 25,
    },
    dateTimeTextStyle: {
        fontSize: 14 * scaleFactor,
        marginTop: 10 * scaleFactor,
        marginLeft: 15 * scaleFactor
    },
    typographyStyle: {
        color: '#414A53',
        fontFamily: 'AvenirLTStd-Book'
    },
    textButtonContainerStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15 * scaleFactor
    },
    descriptionInputStyle: {
        backgroundColor: '#FFFFFF',
        margin: 15 * scaleFactor,
        fontSize: 22 * scaleFactor,
        paddingTop: 10 * scaleFactor,
        paddingRight: 10 * scaleFactor,
        paddingLeft: 10 * scaleFactor,
        paddingBottom: 30 * scaleFactor,
        borderRadius: 10 * scaleFactor,
        fontFamily: 'AvenirLTStd-Book',
        color: '#414A53',
        
    },
    tagInputStyle: {
        borderBottomWidth: 1.6 * scaleFactor,
        borderColor: '#414A53',
        fontFamily: 'AvenirLTStd-Book',
        marginBottom: 15 * scaleFactor,
        marginLeft: 15 * scaleFactor,
        fontSize: 17 * scaleFactor,
        color: '#414A53',
        paddingLeft: 10 * scaleFactor,
        paddingBottom: 10 * scaleFactor,
        paddingRight: 10 * scaleFactor,
        flex: 5
    },
    tagsListContainerStyle: {
        marginLeft: 15 * scaleFactor,
        marginRight: 15 * scaleFactor,
        marginTop: 20 * scaleFactor
    },
    addTagIconStyle: {
        color: '#7966FF',
        fontSize: 20 * scaleFactor,
    },
    titleInputStyle: {
        borderBottomWidth: 1.6 * scaleFactor,
        borderColor: '#414A53',
        fontFamily: 'AvenirLTStd-Book',
        margin: 15 * scaleFactor,
        fontSize: 40 * scaleFactor,
        color: '#414A53',
        paddingLeft: 10 * scaleFactor,
        paddingBottom: 10 * scaleFactor,
        paddingRight: 10 * scaleFactor,
        fontWeight: 'bold',
        marginBottom: 10 * scaleFactor,
    },
    errorTextStyle: {
        fontSize: 20 * scaleFactor,
        alignSelf: 'center',
        color: 'red',
        fontFamily: 'AvenirLTStd-Book'
    }
};

const mapStateToProps = (state) => {
    const { title, tag, description, tagData, addNewTagError, uploadError, loading } = state.createExp;
    const { selectedPhotos, photos } = state.cameraRoll;
    const { selectedContacts } = state.contacts;
    return { title, tag, description, tagData, addNewTagError, selectedPhotos, photos, selectedContacts, uploadError, loading };
};

export default connect(mapStateToProps, { 
    titleChanged, 
    tagChanged, 
    descriptionChanged, 
    addTag,
    restartCreator, 
    loadCameraRoll,
    experienceCreate,
    invalidInput
})(ExperienceCreator);

