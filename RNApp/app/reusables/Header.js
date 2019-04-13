import React, { Component } from 'react';
import { View, Text, Dimensions, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { IconButton, BackButton } from '../reusables';

//A custom header component which can have a multitude of stylings
//It can have a title, a back button and a button on the right hand side
//It can either be superposed onto another component 
//It can either have a white or transparent background
class Header extends Component {

    headerOverlaps() {
        if (this.props.overlap) {
            return { position: 'absolute', top: 0, right: 0, left: 0 };
        }
        return {};
    }

    renderBackButton() {
        if (this.props.back) {
            if (this.props.forTabs) {
                return (
                    <View 
                    style={{
                        ...Platform.select({
                            ios: {
                                paddingTop: 45 * scaleFactor
                            }
                        }),
                    }}
                    >
                        <BackButton tabs specificJump={this.props.notPop} jumpKey={this.props.specificKey} />
                    </View>
                );
            } 
            return (
                <View 
                style={{
                    ...Platform.select({
                        ios: {
                            paddingTop: 45 * scaleFactor
                        }
                    }),
                }}
                >
                    <BackButton tabs={false} specificJump={this.props.notPop} jumpKey={this.props.specificKey}/>
                </View>
            );
        }
    }

    renderRightButton() {
        const { rightButtonViewStyle, rightButtonIconStyle } = styles;
        if (this.props.right) {
            return (
            <IconButton 
            style={rightButtonViewStyle} 
            name={this.props.rightTitle} 
            iconStyle={rightButtonIconStyle} 
            onPress={this.props.rightButtonPressed}
            />
            );
        }
    }

    render() {
        const { viewStyle, textStyle } = styles;
        return (
            <View style={[viewStyle, { backgroundColor: this.props.backgroundColor }, this.headerOverlaps() ]}>
                <View style={{ position: 'absolute', left: 0, height: '100%', justifyContent: 'center', paddingLeft: 5}}>
                    {this.renderBackButton()}
                </View>
                <View style={{ position: 'absolute', top: 0, alignSelf: 'center', height: '100%'}}>
                    <Text style={textStyle}>
                            {this.props.title}
                    </Text>
                </View>
                <View style={{ position: 'absolute', right: 0, height: '100%', justifyContent: 'center', paddingRight: 5}}>
                    {this.renderRightButton()}
                </View>
            </View>
        );
    }
}

const entireScreenWidth = Dimensions.get('window').width;
const scaleFactor = entireScreenWidth / 380;

const styles = {
    viewStyle: {
        ...Platform.select({
            ios: {
                height: 85 * scaleFactor,
            },
            android: {
                height: 60 * scaleFactor,
            },
        }),
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {width: 0, height: 5},
        elevation: 10,
    },
    textStyle: {
        fontFamily: 'AvenirLTStd-Book',
        fontSize: 25 * scaleFactor,
        color: '#414A53',
        ...Platform.select({
            ios: {
                paddingTop: 45 * scaleFactor,
            },
            android: {
                paddingTop: 15 * scaleFactor,
            },
        }),
    },
    rightButtonViewStyle: {
        width: 45 * scaleFactor,
        height: 45 * scaleFactor,
        borderRadius: 22.5 * scaleFactor,
        alignItems: 'center',
        justifyContent: 'center',
        ...Platform.select({
            ios: {
                paddingTop: 45 * scaleFactor
            }
        }),
    },
    rightButtonIconStyle: {
        color: '#7966FF',
        fontSize: 25 * scaleFactor,
    },
    
};


export { Header };
