import React, { Component } from 'react';
import { View, SectionList, FlatList, Text, ScrollView } from 'react-native';
import { contacts } from '../tests/ContactsTestData';
import ContactSelector from '../reusables/ContactSelector';

/*
ContactList component serves to take formatted Contact data and display the contacts so that they may be selected to be used in other stages of the application.
*/

class ContactList extends Component {
    render() {
        const { 
            containerStyle, 
            headerTextStyle, 
            headerContainerStyle, 
            flatListContainerStyle 
        } = styles;

        
        return (
            <ScrollView style={containerStyle}>
                <SectionList
                renderItem={({ index, item }) => 
                    <View style={flatListContainerStyle}>
                        <FlatList
                        key={index}
                        numColumns={3}
                        data={item.data}
                        renderItem={(data) => <ContactSelector contact={data.item} />} 
                        />
                    </View>
                }
                renderSectionHeader={({section: {title}}) => (
                    <View style={headerContainerStyle}>
                        <Text style={headerTextStyle}>{title}</Text>
                    </View>
                )}
                sections={contacts}
                keyExtractor={(item, index) => item + index}
                />
            </ScrollView>
        );
    }
}

const styles = {
    containerStyle: {
        width: '100%',
        height: '100%'
    },
    headerTextStyle: {
        fontFamily: 'AvenirLTStd-Book',
        fontWeight: 'bold',
        color: '#7966FF',
        fontSize: 17,
        paddingLeft: 20,
        paddingTop: 15
    },
    headerContainerStyle: {
        width: '100%',
        marginBottom: 10,
        alignItems: 'flex-start'
    },
    flatListContainerStyle: {
        width: '100%',
        marginBottom: 10,
        alignItems: 'center',
    }
    
};

export { ContactList };
