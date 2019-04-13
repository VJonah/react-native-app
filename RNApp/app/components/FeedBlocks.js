import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { ExperienceBlock } from '../reusables';


//FeedBlocks is a reusable class which formats ExperienceBlocks into the desired style/ grid pattern
class FeedBlocks extends Component {

    //gets the relevant experience object data from the array of experience objects
    getBlockExperience(blockNumber) {
        const experienceObjects = Object.values(this.props.data);
        return experienceObjects[blockNumber];
    }

    rotateBlocks() {
        const { 
            bigBlockContainerStyle, 
            bigBlockStyle, 
            twoSmallBlockContainerStyle, 
            twoSmallBlockStyle 
        } = styles;
    
        const {
            twoSmallBlockContainerStyleR,
            twoSmallBlockStyleR,
            bigBlockStyleR
        } = rotatedStyles;

        if (this.props.rotate === 'true') {
            return (
                <View style={bigBlockContainerStyle}>
                    <View style={twoSmallBlockContainerStyleR}>
                        <ExperienceBlock 
                        source={this.renderBlockImage(0)}
                        style={twoSmallBlockStyleR}
                        experience={this.getBlockExperience.bind(this)(0)}
                        />
                        <ExperienceBlock 
                        source={this.renderBlockImage(2)}
                        style={twoSmallBlockStyleR}
                        experience={this.getBlockExperience.bind(this)(2)}
                        />
                    </View>

                    <View style={{ flex: 2, aspectRatio: 1 }}>
                        <ExperienceBlock 
                        source={this.renderBlockImage(1)}
                        style={bigBlockStyleR}
                        experience={this.getBlockExperience.bind(this)(1)}
                        />
                    </View>
                </View>
            );
        } else {
            return (
                <View style={bigBlockContainerStyle}>  
                    <View style={{ flex: 2, aspectRatio: 1 }}>
                        <ExperienceBlock 
                        source={this.renderBlockImage(0)}
                        style={bigBlockStyle}
                        experience={this.getBlockExperience.bind(this)(0)}
                        />
                    </View>
                    <View style={twoSmallBlockContainerStyle}>
                        <ExperienceBlock 
                        source={this.renderBlockImage(1)}
                        style={twoSmallBlockStyle}
                        experience={this.getBlockExperience.bind(this)(1)}
                        />
                        <ExperienceBlock 
                        source={this.renderBlockImage(2)}
                        style={twoSmallBlockStyle}
                        experience={this.getBlockExperience.bind(this)(2)}
                        />
                    </View>
                </View>
            );
        }
    }
    /*decides whether to render a block image, in case the experiences are less than 6 no all blocks may be filled and must therefor be empty. This function checks the amount of experience objects being passed to this feed block and only generates the relavant amount.
    */
    renderBlockImage(blockNumber) {
        const experienceObjects = Object.values(this.props.data);
        if (experienceObjects.length - 1 >= blockNumber) { 
            if (typeof experienceObjects[blockNumber].media !== 'undefined') {
                if (Object.values(experienceObjects[blockNumber].media).length !== 0) {
                    const firstImageRefKey = Object.keys(experienceObjects[blockNumber].media)[0];
                    const firstImageDonwloadURL = experienceObjects[blockNumber].media[firstImageRefKey].downloadURL;
                    return firstImageDonwloadURL;
                }
            } else {
                return '';
            }
            
        } else {
            return '';
        }
    }
    
    render() {
        const { 
            containerStyle, 
            smallBlocksContainerStyle, 
            smallBlockStyle, 
        } = styles;

        return (
            <View style={containerStyle}>
                {this.rotateBlocks()}
                <View style={smallBlocksContainerStyle}> 
                    <ExperienceBlock 
                    source={this.renderBlockImage(3)}
                    style={smallBlockStyle}
                    experience={this.getBlockExperience.bind(this)(3)}
                    />
                    <ExperienceBlock 
                    source={this.renderBlockImage(4)}
                    style={smallBlockStyle}
                    experience={this.getBlockExperience.bind(this)(4)}
                    />
                    <ExperienceBlock 
                    source={this.renderBlockImage(5)}
                    style={smallBlockStyle}
                    experience={this.getBlockExperience.bind(this)(5)}
                    />
                </View>
            </View>

        );
    }
}
const entireScreenWidth = Dimensions.get('window').width;
const scaleFactor = entireScreenWidth / 380;
const spacing = 5 * scaleFactor;

const styles = {
    containerStyle: {
        flexDirection: 'column',
    },

    bigBlockContainerStyle: {
        flexDirection: 'row',
        marginBottom: spacing,
    },
    bigBlockStyle: {
        borderRadius: 10 * scaleFactor,
        aspectRatio: 1,
        flex: 1,
        marginTop: spacing,
        marginLeft: spacing,
    },
    
    twoSmallBlockStyle: {
        borderRadius: 10 * scaleFactor,
        aspectRatio: 1,
        flex: 1,
        marginTop: spacing,
        marginRight: spacing,
    },
    twoSmallBlockContainerStyle: {
        flex: 1,
        flexDirection: 'column',
        aspectRatio: 1 / 2,
        marginLeft: spacing
    },

    smallBlocksContainerStyle: {
        flexDirection: 'row',
        paddingRight: spacing,
    },
    smallBlockStyle: {
        borderRadius: 10 * scaleFactor,
        aspectRatio: 1,
        flex: 1,
        marginLeft: spacing
    }
};
const rotatedStyles = {
    twoSmallBlockStyleR: {
        borderRadius: 10 * scaleFactor,
        aspectRatio: 1,
        flex: 1,
        marginTop: spacing,
    },
    twoSmallBlockContainerStyleR: {
        flex: 1,
        flexDirection: 'column',
        aspectRatio: 1 / 2,
        marginLeft: spacing,
    },
    bigBlockStyleR: {
        borderRadius: 10 * scaleFactor,
        aspectRatio: 1,
        flex: 1,
        marginTop: spacing,
        marginRight: spacing,
    },
};

export { FeedBlocks };
