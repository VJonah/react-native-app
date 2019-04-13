import React, { Component } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';

class ExperienceBlock extends Component {
    onBlockPressed() {
        if (typeof this.props.experience !== 'undefined') {
            Actions.jump('experienceViewer', { ...this.props.experience, isCurrentUser: this.props.isCurrentUser });
        }
    }

    render() {
        return (
            <TouchableOpacity style={this.props.style} onPress={this.onBlockPressed.bind(this)}>
                <Image 
                style={{ width: undefined, height: undefined, flex: 1 }}
                source={{ uri: this.props.source }}
                />
            </TouchableOpacity>

        );
    }
}

export { ExperienceBlock };
