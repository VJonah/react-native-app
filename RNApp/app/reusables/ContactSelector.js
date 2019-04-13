import React, { Component } from 'react';
import { connect } from 'react-redux';
import { contactPressed } from '../actions';
import { Contact } from './';

//Contact Selector is the component used when contacts need to be selected. 
//It manages its own local state to know when it has been selected or not then communicates with the application level 
//state so that multiple contacts may be selected and referenced
class ContactSelector extends Component {
    constructor(props) {
        super(props);
        if (this.isSameContact(this.props.selectedContacts, this.props.contact)){
            this.state = {
                pressed: true,
                color: '#7966FF',
                underlayColor: '#9EB7FF'
            };
        } else {
            this.state = initialState;
        }
    }

    onContactPressed = () => {
        this.props.contactPressed(this.props.contact);
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

    isSameContact = (selectedContacts, contact) => {
        for (let i = 0; i < selectedContacts.length; i++) {
            if (selectedContacts[i].phoneNumber === contact.phoneNumber) {
                return (true);
            }
        }
        return (false);
    };

    render() {
        return (
            <Contact onPress={this.onContactPressed} backgroundColor={this.state.color}>
                {this.props.contact.Name}
            </Contact>
        );
    }
}

const initialState = { pressed: false, color: '#9EB7FF', underlayColor: '#7966FF' };

const mapStateToProps = (state) => {
    const { selectedContacts } = state.contacts;
    return { selectedContacts };
};

export default connect(mapStateToProps, { contactPressed })(ContactSelector);
