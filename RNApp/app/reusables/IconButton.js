import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import CustomIcon from '../components/CustomIcon';

class IconButton extends Component {
    render() {
        return (
            <TouchableOpacity style={this.props.style} onPress={this.props.onPress}>
                <CustomIcon name={this.props.name} style={this.props.iconStyle} />
            </TouchableOpacity>
        );
    }
}


export { IconButton }