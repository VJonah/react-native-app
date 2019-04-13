import React, { Component } from 'react';
import { View, Image } from 'react-native';
import CustomIcon from '../components/CustomIcon.js';

//Template and styling for the user picture for when it is reused in other components
class UserPicture extends Component {
    renderImage() {
        if (this.props.source) {
            return (
            <View style={this.props.circleStyle}>
                <Image 
                style={{ width: undefined, height: undefined, flex: 1, borderRadius: 100000 }}
                source={{ uri: this.props.source }}
                />
            </View>
            );
        } else {
            return (
                <View style={[{ alignItems: 'center', justifyContent: 'center', borderRadius: 10000, backgroundColor: '#9EB7FF'}, this.props.circleStyle]}>
                    <CustomIcon name='user-1' style={[{ color: '#ffffff' }, this.props.iconSize]} />
                </View>
            );
        }
    }

    render() {
        return (
            <View>
                {this.renderImage()}
            </View>
        );
    }
 }

export { UserPicture };
