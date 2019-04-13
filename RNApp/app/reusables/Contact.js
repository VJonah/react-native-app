import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { UserPicture } from './';
//a basic styling template of what a contact should look likes
class Contact extends Component {

    
   Component() {
        this.props.lineCount = 1;
    }
    
    render() {
        const { 
            circleStyle,
            textStyle, 
            containerStyle,
            iconSize 
        } = styles;

        return (
            <View style={containerStyle}>
                <TouchableOpacity onPress={this.props.onPress}>
                    <UserPicture circleStyle={[circleStyle, { backgroundColor: this.props.backgroundColor }]} iconSize={iconSize} />
                    <Text style={textStyle} numberOfLines={this.props.lineCount}>{this.props.children}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


const entireScreenWidth = Dimensions.get('window').width;
const scaleFactor = entireScreenWidth / 380;

const styles = {
    circleStyle: {
        width: 80 * scaleFactor,
        height: 80 * scaleFactor,
    },
    textStyle: {
        color: '#414A53',
        fontFamily: 'AvenirLTStd-Book',
        fontSize: 17 * scaleFactor,
        alignSelf: 'center',
        marginTop: 10 * scaleFactor,
        textAlign: 'center'
    },
    containerStyle: {
        paddingTop: 20 * scaleFactor,
        paddingBottom: 10 * scaleFactor,
        paddingLeft: 20 * scaleFactor,
        paddingRight: 20 * scaleFactor,
        width: 120 * scaleFactor,
    },
    iconSize: {
        fontSize: 40 * scaleFactor
    }
};

export { Contact };

