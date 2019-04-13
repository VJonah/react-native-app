import React, { Component } from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import { TagButton } from './';

//list of TagButtons
class TagsList extends Component {
    render() {
       return (
            <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={[
            {key: '#tags '},
            {key: '#movies '},
            {key: '#videogames '},
            {key: '#food '},
            {key: '#restaurant '},
            {key: '#sports '},
            ]}
            renderItem={({item}) => <TagButton>{item.key}</TagButton>}
            />
       );
    }
}

export { TagsList };