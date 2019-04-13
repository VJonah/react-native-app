import React, { Component } from 'react';
import { connect } from 'react-redux';

import { 
    View, 
    FlatList, 
    Text, 
    TouchableOpacity,
    ScrollView, 
    Dimensions,

} from 'react-native';
import { Spinner } from '../reusables';
import { loadCameraRoll, imagePressed, resetImageSelections } from '../actions';
import ImageSelector from '../reusables/ImageSelector';

/* CamerarollSelect is the component which will render the user's cameraroll in a designated format
It fetches the photos of the library, reflects the state of the fetch by rendergin a spinner and offers a user the chance to load more photos
*/


class CameraRollSelect extends Component {
    componentWillMount() {
        if (this.props.reset) {
            this.props.resetImageSelections();
        }
    }
    
    renderSpinner() {
        if (this.props.loading) {
            return (
                <View style={{alignItems: 'center', justifyContent: 'center', paddingTop: 20, paddingBottom: 20}}>
                    <Spinner size="large" />
                </View>
            );
        }
    }

    renderLoadMoreButton() {
        const { textStyle, textContainerStyle } = styles;
        if (!this.props.loading) {
            if (!this.props.allPhotosAreLoaded) {
                return (
                    <TouchableOpacity 
                        onPress={() => {
                            if (!this.props.allPhotosAreLoaded) {
                            this.props.loadCameraRoll(this.props.pageInfo);
                            }
                        }}
                        style={textContainerStyle}
                        >
                            <Text style={textStyle}>
                                Load More...
                            </Text>
                    </TouchableOpacity>
                );
            } 
        }
    }

    render() {
        return (
            <ScrollView>
                <FlatList 
                showsVerticalScrollIndicator={false}
                numColumns={3}
                maxToRenderPerBatch={5}
                removeClippedSubviews 
                keyExtractor={item => item.node.image.uri}
                data={this.props.photos}
                renderItem={({ item }) => {
                    return (
                        <ImageSelector photo={item.node} />
                    );
                }}
                /> 
                {this.renderSpinner()}
                {this.renderLoadMoreButton()}
            </ScrollView>
        );
    }
}
const entireScreenWidth = Dimensions.get('window').width;
const scaleFactor = entireScreenWidth / 380;

const styles = {
    containerStyle: {
        alignItems: 'center'
    },
    textStyle: {
        fontFamily: 'AvenirLTStd-Book',
        fontSize: 17 * scaleFactor,
        color: '#414A53'
    },
    textContainerStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    }
};

const mapStateToProps = (state) => {
    const { photos, error, loading, photosAreLoaded, selectedPhotos, pageInfo, allPhotosAreLoaded } = state.cameraRoll;
    return { photos, error, loading, photosAreLoaded, selectedPhotos, pageInfo, allPhotosAreLoaded };
};

export default connect(mapStateToProps, { loadCameraRoll, imagePressed, resetImageSelections })(CameraRollSelect);
