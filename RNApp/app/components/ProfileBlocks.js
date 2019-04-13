import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';


class ProfileBlocks extends Component {
    render() {
        const { containerStyle, blockStyle } = styles;
        return (
            <View style={containerStyle}> 
                <View style={blockStyle} />
                <View style={blockStyle} />
                <View style={blockStyle} />
            </View>
        );
    }
}
const entireScreenWidth = Dimensions.get('window').width;
const scaleFactor = entireScreenWidth / 380;

const styles = {
    containerStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingRight: 5 * scaleFactor,
    },
    blockStyle: {
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        flex: 1,
        aspectRatio: 1,
        marginLeft: 5 * scaleFactor
    }
};

export { ProfileBlocks };