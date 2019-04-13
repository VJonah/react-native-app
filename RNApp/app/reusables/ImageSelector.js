import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity, Image, View, Text, Dimensions } from 'react-native';
import { imagePressed } from '../actions';
import { Icon } from './';

//ImageSelector is the component used when contacts need to be selected. 
//It manages its own local state to know when it has been selected or not then communicates with the application level 
//state so that multiple images may be selected and referenced
class ImageSelector extends Component {

    constructor(props) {
        super(props);
        this.state = { pressed: false };
    }

    onImagePressed = () => {
        if (!this.state.pressed) {
            this.props.imagePressed(this.props.photo);
            this.setState({ pressed: true });
        } else {
            this.props.imagePressed(this.props.photo);
            this.setState({ pressed: false });
        }
    }


    
    
    isSameImage(images, photo) {
        for (let i = 0; i < images.length; i++) {
            if (images[i].image.uri === photo.image.uri) {
                return (true);
            }
        }
        return (false);
    }

    renderCounter() {
        const { counterCircleStyle, checkIconStyle } = styles;
        if (this.isSameImage(this.props.selectedPhotos, this.props.photo)) {
            return (
                <View style={counterCircleStyle}>
                    <Icon name='check' iconStyle={checkIconStyle} />
                </View>
            );
        }
    }

    render() {
        const { blockContainerStyle } = styles;
        return (
            <TouchableOpacity style={blockContainerStyle} onPress={this.onImagePressed}>
                <Image 
                style={{ width: undefined, height: undefined, flex: 1 }}
                source={{ uri: this.props.photo.image.uri }}
                />
                {this.renderCounter()}
            </TouchableOpacity>
        );
    }
}
const entireScreenWidth = Dimensions.get('window').width;
const scaleFactor = entireScreenWidth / 380;

const styles = {
    blockContainerStyle: {
        borderRadius: 5 * scaleFactor,
        aspectRatio: 1,
        width: entireScreenWidth / 3,
        padding: 5
    },
    counterCircleStyle: {
        width: 20 * scaleFactor,
        height: 20 * scaleFactor,
        borderRadius: 100 * scaleFactor,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#9EB7FF',
        position: 'absolute',
        top: 0,
        left: 0,
        marginTop: 10 * scaleFactor,
        marginLeft: 10 * scaleFactor,
    },
    counterTextStyle: {
        fontFamily: 'AvenirLTStd-Book',
        fontSize: 12 * scaleFactor,
        color: '#414A53',
    },
    checkIconStyle: {
        fontSize: 17 * scaleFactor,
        color: '#414A53'
    }
};

const mapStateToProps = (state) => {
    const { selectedPhotos, photosAreLoaded } = state.cameraRoll;
    return { selectedPhotos, photosAreLoaded };
};

export default connect(mapStateToProps, { imagePressed })(ImageSelector);
