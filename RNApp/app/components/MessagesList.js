import React, { Component } from 'react';
import { View, Text, SectionList, ScrollView, Dimensions } from 'react-native';
import { Header, Input, UserPicture, Message } from '../reusables';

//This class serves to dispaly the users messages in the predesignated formatting and styling
class MessagesList extends Component {
    messageSide(title) {
        if (title === 0) {
            return ('flex-start');
        } else {
            return ('flex-end');
        }
    }

    render() {
        const { 
            containerStyle, 
            headerIconStyle, 
            dateTextStyle,
            userCircleStyle,
            messagesViewStyle,
            headerContainerStyle,
            inputContainerStyle
        } = styles;
        return (
            
            <View style={containerStyle}>
                <ScrollView>
                    <Text style={dateTextStyle}>
                        Monday, 11:41am
                    </Text>
                    <SectionList
                    contentContainerStyle={{marginBottom: 20}}
                    renderItem={({item, section: {title} }) => {
                            let position = 'flex-start';

                            if (title === 'user2') {
                                position = 'flex-end';
                            }
                            const positionStyle = {
                                justifyContent: position
                            };
                            return (
                                <View style={[messagesViewStyle, positionStyle]}>
                                    <Message>{item.key}</Message>
                                </View>
                            );
                        }
                    }
                    //renders the section header, in this case, the name of the user that sent the message
                    renderSectionHeader={({section: {title}}) => {
                        let position = 'flex-start';
                        if (title === 'user2') {
                            position = 'flex-end';
                        };
                        const positionStyle = {
                            justifyContent: position
                        };
                        return (
                            <View style={[headerContainerStyle, positionStyle]}>
                                <UserPicture circleStyle={userCircleStyle} iconSize={headerIconStyle} />
                            </View>
                        );
                    }}
                    sections={[
                    {
                        title: 'user1', 
                        data: [
                            {key:'Hey, how are you?'}, 
                            {key:'I just finished working, I will be home soon.'}, 
                            {key:'Did my package arrive?'}, 
                            {key:'If so, can you leave it in my room please.'}, 
                        ]
                    },
                    {
                        title:'user2', 
                        data: [
                            {key:'I am fine thanks.'}, 
                            {key:'Your package did arrive.'},
                            {key:'See you when you get home.'}, 
                        ]
                    },
                    {
                        title:'user1', 
                        data: [
                            {key:'I am fine thanks.'}, 
                        ]
                    },
                    {
                        title:'user2', 
                        data: [
                            {key:'Good to here!'}, 
                        ]
                    },
                    {
                        title:'user1', 
                        data: [
                            {key:'Are you free Friday?'}, 
                        ]
                    },
                    {
                        title:'user2', 
                        data: [
                            {key:'Yes.'}, 
                        ]
                    },
                    ]}
                    keyExtractor={(item, index) => item + index}
                    />
                    <View style={{marginBottom: 20}}>
                        <Input placeholder='Say something...' /> 
                    </View>
                </ScrollView>
                
            </View>
        );
    }
}

const entireScreenWidth = Dimensions.get('window').width;
const scaleFactor = entireScreenWidth / 380;

const styles = {
    containerStyle: {
        width: '100%',
        height: '100%'
    },
    headerIconStyle: {
        fontSize: 20 * scaleFactor,
    },
    userCircleStyle: {
        width: 40 * scaleFactor,
        height: 40 * scaleFactor,
        backgroundColor: '#7966FF',
    },
    dateTextStyle: {
        fontFamily: 'AvenirLTStd-Book',
        fontSize: 17  * scaleFactor,
        color: '#7966FF',
        alignSelf: 'center',
        marginTop: 20 * scaleFactor
    },
    messagesViewStyle: {
        marginLeft: 40 * scaleFactor, 
        marginTop: 20 * scaleFactor, 
        flexDirection: 'row', 
        flex: 1,
        marginRight: 40 * scaleFactor,
    },
    headerContainerStyle: {
        flexDirection: 'row',
        paddingLeft: 15 * scaleFactor,
        paddingRight: 15 * scaleFactor,
        paddingTop: 20 * scaleFactor,
    },
    inputContainerStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#FFFFFF',
        width: '100%'        
    }
};

export { MessagesList }
