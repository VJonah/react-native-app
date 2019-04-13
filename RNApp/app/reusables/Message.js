import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';

class Message extends Component {
    render() {
        const { viewStyle, textStyle } = styles;
        return (
            <View style={viewStyle}>
                <Text style={textStyle}>
                    {this.props.children}
                </Text>
            </View>
            
        );
    }
}

const entireScreenWidth = Dimensions.get('window').width;
const scaleFactor = entireScreenWidth / 380;

const styles = {
    viewStyle: {
        backgroundColor: '#9EB7FF',
        borderRadius: 17 * scaleFactor,
        padding: 20 * scaleFactor,
        maxWidth: '95%',
        alignSelf: 'flex-start'
    },
    textStyle: {
        fontFamily: 'AvenirLTStd-Book',
        fontSize: 18 * scaleFactor, 
        color: '#FFFFFF',
        lineHeight: 20 * scaleFactor,

    }
};

export { Message };
