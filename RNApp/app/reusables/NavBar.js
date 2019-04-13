import React, { Component } from 'react';
import { View, Dimensions, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { IconButton } from './';

//A custom navigation bar component
class NavBar extends Component {
    onHeartPressed() {
        Actions.jump('favourites');
    }
    onHomePressed() {
        Actions.jump('feed');

    }
    onNewPressed() {
        Actions.jump('experienceCreator');

    }
    onMessagesPressed() {
        Actions.jump('messages');

    }
    onUserPagePressed() {
        Actions.jump('user');
    }

    render() {
        const { 
            viewStyle,
            iconStyle, 
            profileStyle, 
            iconsStyle, 
        } = styles;
        return (
                <View style={viewStyle}>
                    <View style={iconsStyle}>
                        <IconButton name='heart-2' iconStyle={iconStyle} onPress={this.onHeartPressed} />
                    </View>

                    <View style={iconsStyle}>
                        <IconButton name='home-2' iconStyle={iconStyle} onPress={this.onHomePressed} />
                    </View>

                    <View style={iconsStyle}>
                        <IconButton name='plus-1' iconStyle={iconStyle} onPress={this.onNewPressed} />
                    </View>
                    
                    <View style={iconsStyle}>
                        <IconButton name='chat-2' iconStyle={iconStyle} onPress={this.onMessagesPressed}/>
                    </View>
                    
                    <View style={iconsStyle}>
                        <TouchableOpacity style={profileStyle} onPress={this.onUserPagePressed} />
                    </View>
                </View>
        );            
    }
}

//Icon have a default button component and can use fontSize for
const entireScreenWidth = Dimensions.get('window').width;
const scaleFactor = entireScreenWidth / 380;

const styles = {
    viewStyle: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 * scaleFactor },
        shadowOpacity: 0.2,
        flexDirection: 'row',
        paddingTop: 15 * scaleFactor,
        paddingBottom: 15 * scaleFactor,
    },
    iconStyle: {
        color: '#7966FF',
        fontSize: 25 * scaleFactor,
    },
    iconButtonStyle: {
        underlayColor: '#9EB7FF',
    },
    iconsStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileStyle: {
        width: 40 * scaleFactor,
        height: 40 * scaleFactor,
        borderRadius: 40,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        borderWidth: 3 * scaleFactor,
        borderColor: '#7966FF',
    }
};

export { NavBar };
