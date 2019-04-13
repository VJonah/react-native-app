import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Dimensions, Text } from 'react-native';
import { TextButton, Input, Spinner } from '../reusables';
import { phoneNumberChanged, passwordChanged, loginUser, confirmPhoneNumber } from '../actions';

/*the component is the page for a user to sign into and verify their phone number in order to gain access to the app and network*/
class SignInForm extends Component {
    onPhoneNumberChange(text) {
        this.props.phoneNumberChanged(text);
    }
    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onConfirmButtonPress() {
        const { phoneNumber } = this.props;
        this.props.confirmPhoneNumber(phoneNumber);
    }
    
    onSignInButtonPress() {
        const { confirmResult, password } = this.props;
        this.props.loginUser({ confirmResult, password });
    }

    renderError() {
        if (this.props.error) {
            return (
                <View style={{ padding: 20 }}>
                    <Text style={styles.errorTextStyle}>
                        {this.props.error}
                    </Text>
                </View>
            );
        }
    }
    //renders the text input box for a user to type in the verification code that was sent to their phone number
    renderVerification() {
        if (this.props.numberConfirmed) {
            return (
                <Input 
                onChangeText={this.onPasswordChange.bind(this)}
                placeholder='Verification Number'
                value={this.props.password}
                />
            );
        }
    }
    //renders the appropriate button for the different authentication stages: phone number verification, code verificaiton...
    renderButton() {
        if (this.props.loading) {
            return (
                <Spinner size="large" />
            );
        }
        if (!this.props.numberConfirmed) {
            return (
                <TextButton onPress={this.onConfirmButtonPress.bind(this)}>
                    Verify Number
                </TextButton>
            );
        }
        return (
            <TextButton onPress={this.onSignInButtonPress.bind(this)}>
                Sign In
            </TextButton>
        );
    }

    render() {
        const { inputAndButtonContainerStyle, buttonContainerStyle } = styles;
        return (
            <View style={{flex: 1}}>
                <ScrollView style={{height: '55%'}} />

                <View style={inputAndButtonContainerStyle}>
                    <Input 
                    onChangeText={this.onPhoneNumberChange.bind(this)}
                    placeholder='+44 1234567890'
                    value={this.props.phoneNumber}
                    />
                    {this.renderVerification()}
                </View>
                {this.renderError()}
                <View style={buttonContainerStyle}>
                    {this.renderButton()}
                </View>
            </View>

        );
    }
}
const entireScreenWidth = Dimensions.get('window').width;
const scaleFactor = entireScreenWidth / 380;

const styles = {
    inputAndButtonContainerStyle: {
        alignItems: 'center',
        marginBottom: 40 * scaleFactor,
    },
    buttonContainerStyle: {
        padding: 20 * scaleFactor,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },
    errorTextStyle: {
        fontSize: 20 * scaleFactor,
        alignSelf: 'center',
        color: 'red',
        fontFamily: 'AvenirLTStd-Book'
    }
};

const mapStateToProps = state => {
    const { phoneNumber, password, error, loading, numberConfirmed, confirmResult } = state.auth;
    return { phoneNumber, password, error, loading, numberConfirmed, confirmResult };
};


export default connect(mapStateToProps, { 
    phoneNumberChanged, 
    passwordChanged, 
    loginUser,
    confirmPhoneNumber,

})(SignInForm);
