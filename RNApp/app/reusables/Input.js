 import React, { Component } from 'react';
import { View, Dimensions, TextInput } from 'react-native';

class Input extends Component {
    render() {
        const { buttonStyle, containerStyle, placeholderStyle } = styles;
        return (    
            <View style={containerStyle}>
                <TextInput 
                multiline={false} 
                style={buttonStyle} 
                placeholderTextColor='#414A53' 
                placeholder={this.props.placeholder} 
                autocorrect={false} 
                placeholderStyle={placeholderStyle} 
                onChangeText={this.props.onChangeText}
                value={this.props.value}
                secureTextEntry={this.props.secureTextEntry}
                />
            </View>
        );
    }
};

const entireScreenWidth = Dimensions.get('window').width;
const scaleFactor = entireScreenWidth / 380;

const styles = {
    buttonStyle: {
        width: '100%',
        alignSelf: 'stretch',
        backgroundColor: '#FFFFFF',
        borderRadius: 100 * scaleFactor,
        paddingLeft: 20 * scaleFactor,
        fontSize: 19 * scaleFactor,
        borderColor: '#414A53',
        borderWidth: 1 * scaleFactor,
        padding: 10
    },
    containerStyle: {
        padding: 20,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        position: 'relative'
    },
    placeholderStyle: {
        fontFamily: 'AvenirLTStd-Book'
    }
};

export { Input };
