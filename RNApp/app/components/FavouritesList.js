import React, { Component } from 'react';
import { View, FlatList, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { fetchUsersFavourites } from '../actions';
import { FavouritesCard } from './';
import { Spinner } from '../reusables';

// Favourites list simply displays all of the user's favourited experience object in a list format
class FavouritesList extends Component {
    componentWillMount() {
        this.props.fetchUsersFavourites();
    }
    //Extracts the downloadURL of the first media item of the favourited experience
    getImageSource(experience) {
        if (typeof experience.media !== 'undefined') {
            if (Object.values(experience.media).length !== 0) {
                const firstImageRefKey = Object.keys(experience.media)[0];
                const firstImageDownloadURL = experience.media[firstImageRefKey].downloadURL;
                return firstImageDownloadURL;
            }
        } else {
            return '';
        }
    }

    renderSpinner() {
        if (this.props.loading) {
            return (
                <Spinner size="large" />
            );
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    {this.renderSpinner()}
                    <FlatList
                    keyExtractor={item => item.object.uid}
                    extraData={this.props}
                    data={this.props.favouritedObjects}
                    renderItem={({ item }) => {
                        return (
                            <FavouritesCard 
                            experience={item.object} 
                            source={this.getImageSource(item.object)} 
                            userBio={item.userBio}
                            />
                        );
                    }}
                    />
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { favouritedObjects, loading } = state.favourites;
    return { favouritedObjects, loading };
};

export default connect(mapStateToProps, { fetchUsersFavourites })(FavouritesList);

