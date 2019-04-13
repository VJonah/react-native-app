import React, { Component } from 'react';
import { View, TextInput, Dimensions } from 'react-native';

class SearchBar extends Component {
    render() {
        const { buttonStyle, containerStyle, placeholderStyle } = styles;

        return (
            <View style={containerStyle}>
                <TextInput 
                multiline={false} 
                style={buttonStyle} 
                placeholderTextColor='#414A53' 
                placeholder='Search...' 
                autocorrect={false} 
                placeholderStyle={placeholderStyle}
                />
            </View>
        );  
    }
}

const entireScreenWidth = Dimensions.get('window').width;
const scaleFactor = entireScreenWidth / 380;

const styles = {
    buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#FFFFFF',
        borderRadius: 10 * scaleFactor,
        borderWidth: 1.5 * scaleFactor,
        borderColor: '#7966FF',
        paddingLeft: 20 * scaleFactor,
        fontSize: 15 * scaleFactor,
        height: 40 * scaleFactor
    },
    containerStyle: {
        padding: 15 * scaleFactor,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        position: 'relative',
    },
    placeholderStyle: {
        fontFamily: 'AvenirLTStd-Book'
    }
};

export { SearchBar };

