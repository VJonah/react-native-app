//Imports
import React, { Component } from 'react';
import { Text, View, Dimensions, TouchableHighlight } from 'react-native';


//Tag button which is the component which makes up the taglists
//It has its own local state to change when it is selected and unselected
class TagButton extends Component {

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    onTagPressed = () => {
        if (this.state.color === '#9EB7FF') {
            this.setState({
                pressed: true,
                color: '#7966FF',
                underlayColor: '#9EB7FF'
            });
        } else {
            this.setState(initialState);
        }
    }

    render() {
        const { textStyle, buttonStyle, containerStyle } = styles;
        return (
            <View style={containerStyle}>
                <TouchableHighlight style={[buttonStyle, { backgroundColor: this.state.color }]} underlayColor={this.state.underlayColor} onPress={this.onTagPressed}>
                    <Text style={textStyle} numberOfLines={1}> {this.props.children}</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const initialState = { pressed: false, color: '#9EB7FF', underlayColor: '#7966FF' };


const entireScreenWidth = Dimensions.get('window').width;
const scaleFactor = entireScreenWidth / 380;

const styles = {
    textStyle: {
        color: '#FFFFFF',
        fontFamily: 'AvenirLTStd-Book',
        fontSize: 14 * scaleFactor,
        marginTop: 10 * scaleFactor,
        marginBottom: 10 * scaleFactor,
        marginLeft: 25 * scaleFactor,
        marginRight: 25 * scaleFactor
    },
    buttonStyle: {
        borderRadius: 100000 * scaleFactor,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5 * scaleFactor
    },
    containerStyle: {
        justifyContent: 'center',
        alignItems: 'center'
    }
};

export { TagButton };
