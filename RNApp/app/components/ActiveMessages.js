import React, { Component } from 'react';
import { View, FlatList, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Header, Message, Contact } from '../reusables';

/*The ActiveMessages component is meant to render all of a user's active messages in either groups
or with their contacts
*/
class ActiveMessages extends Component {
    onMessagePressed() {    
        Actions.jump('messagesList');
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <FlatList
                    contentContainerStyle={{alignItems: 'center'}}
                    numColumns={3}
                    keyExtractor={item => item.key}
                    data={[
                    {key: 'Devin'},
                    {key: 'Jackson'},
                    {key: 'James'},
                    {key: 'Joel'},
                    {key: 'John'},
                    {key: 'Jillian'},
                    ]}
                    renderItem={({ item }) => <Contact onPress={this.onMessagePressed}>{item.key}</Contact>}
                    />
                </ScrollView>
                
            </View>
        );
    }
}


export { ActiveMessages };
