import React, { Component } from 'react';
import { View, Dimensions, Platform } from 'react-native';
import { SearchBar, TagsList } from '../reusables';

//FilterHeader Class which displays a search bar with a taglist that user's could choose from

class FilterHeader extends Component {
    render() {
        const { containerStyle } = styles;
        return (
            <View style={containerStyle}>
                <SearchBar />
                <View>
                    <TagsList />
                </View>
            </View>

        );
    }
}
const entireScreenWidth = Dimensions.get('window').width;
const scaleFactor = entireScreenWidth / 380;

const styles = {
    containerStyle: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        elevation: 10,
        ...Platform.select({
            ios: {
                paddingTop: 45 * scaleFactor
            }
        }),
    },
    tagsListContainerStyle: {
        paddingLeft: 15 * scaleFactor,
        paddingRight: 15 * scaleFactor,
    },

};


export { FilterHeader };
