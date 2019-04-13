import React, { Component } from 'react';
import CustomIcon from '../components/CustomIcon';

class Icon extends Component {
    render() {
        return (
            <CustomIcon name={this.props.name} style={this.props.iconStyle} />
        );
    }
}

export { Icon };
