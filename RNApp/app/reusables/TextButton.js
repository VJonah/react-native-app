//Imports
import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Dimensions } from 'react-native';

class TextButton extends Component {
    render() {
        const { textStyle, buttonStyle } = styles;
        return (
            <TouchableOpacity style={[buttonStyle, this.props.extraStyle]} onPress={this.props.onPress}>
                <Text style={textStyle} numberOfLines={1}> {this.props.children}</Text>
            </TouchableOpacity>
        );
    }
}

const entireScreenWidth = Dimensions.get('window').width;
const scaleFactor = entireScreenWidth / 380;

const styles = {
    textStyle: {
        color: '#FFFFFF',
        fontFamily: 'AvenirLTStd-Book',
        fontSize: 17 * scaleFactor,
        alignSelf: 'center',
        paddingTop: 15 * scaleFactor,
        paddingBottom: 15 * scaleFactor
    },
    buttonStyle: {
        width: '100%',
        alignSelf: 'stretch',
        backgroundColor: '#7966FF',
        borderRadius: 1000 * scaleFactor,
    },
};

export { TextButton };
