import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList, ScrollView } from 'react-native';
import { FeedBlocks } from './';
import { experiencesFetch } from '../actions';
import { Spinner } from '../reusables';

//FeedList is the page which is displayed on the home tab and displays the user's contacts' experiences by passing the experience objects into the FeedBlock components

class FeedList extends Component {
    componentWillMount() {
        this.props.experiencesFetch();
    }

    renderSpinner() {
        if (this.props.fetching) {
            return (
                <Spinner size="large" />
            );
        }
    }

    render() {   
        const { containerStyle } = styles;
        return (
            <View style={containerStyle}>
                <ScrollView>
                    {this.renderSpinner()}
                    <FlatList
                    extraData={this.props}
                    data={this.props.feedData}
                    renderItem={({ index, item }) => {
                        if (index % 2 === 0) {
                            return (
                                <FeedBlocks rotate='false' data={item} />);
                        } else {
                            return (
                                <FeedBlocks rotate='true' data={item} />);
                        }
                    }}
                    />
                </ScrollView>
            </View>
        );
    }
}
const styles = {
    containerStyle: {
        width: '100%',
        height: '100%',
    },
};

const mapStateToProps = (state) => {
    const { experiences, feedData, fetching } = state.feed;
    return { experiences, feedData, fetching };
};

export default connect(mapStateToProps, { experiencesFetch })(FeedList);

