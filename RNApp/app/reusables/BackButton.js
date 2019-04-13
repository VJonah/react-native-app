import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { IconButton } from './';

class BackButton extends Component {
    
    render() {
        const { backButtonViewStyle, backButtonHeaderStyle } = styles;
        return (
            <IconButton 
            style={backButtonViewStyle} 
            name='left-open' 
            iconStyle={backButtonHeaderStyle} 
            onPress={() => {
                if (this.props.tabs) {
                    Actions.jump('feed'); 
                } else if (this.props.specificJump) {
                    Actions.jump(this.props.jumpKey);
                } else {
                    Actions.pop();
                }
            }}
            />
        );
    }

}

const entireScreenWidth = Dimensions.get('window').width;
const scaleFactor = entireScreenWidth / 380;

const styles = {
    backButtonHeaderStyle: {
        color: '#7966FF',
        fontSize: 35 * scaleFactor,
        
    },
    backButtonViewStyle: {
        width: 45 * scaleFactor,
        height: 45 * scaleFactor,
        borderRadius: 22.5 * scaleFactor,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
};

export { BackButton };
