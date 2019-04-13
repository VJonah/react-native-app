import React from 'react';
import { Scene, Router, Tabs } from 'react-native-router-flux';
import SignInForm from './components/SignInForm';
import firebase from 'react-native-firebase';
import ExperienceCreator from './components/ExperienceCreator';
import FeedList from './components/FeedList';
import UserPage from './components/UserPage';
import FavouritesList from './components/FavouritesList';
import { 
    ActiveMessages, 
    ExperienceViewer,
    FilterHeader, 
    MessagesList,
    ContactList,
    ContactPage
} from './components';
import { Header, Icon } from './reusables';
import CameraRollSelect from './components/CameraRollSelect';
import UserSettings from './components/UserSettings';

//Manages the routes and navigation through the application
const RouterComponent = () => {
    return (
        <Router>
            <Scene key="root" hideNavBar>
                <Scene key="main">
                    <Tabs 
                    hideNavBar 
                    showLabel={false}
                    tabBarStyle={{ backgroundColor: '#FFFFFF', height: 65, borderTopWidth: 0 }}
                    iconStyle={{ fontSize: 25, color: '#7966FF' }}
                    >
                        
                        <Scene 
                        icon={Icon} 
                        name="heart-2"
                        key="favourites" 
                        >
                            <Scene 
                            key="favouritesList"
                            component={FavouritesList} 
                            title="Favourites"
                            navBar={FilterHeader}
                            />
                            <Scene 
                            key="contactPage"
                            component={ContactPage}
                            back
                            hideNavBar
                            />
                        </Scene>

                        <Scene 
                        icon={Icon} 
                        name="home-2"
                        key="home" 
                        initial
                        >
                            <Scene 
                            key="feed" 
                            component={FeedList} 
                            title="Feed" 
                            navBar={FilterHeader}
                            back
                            />
                            <Scene 
                            key="experienceViewer"
                            component={ExperienceViewer}
                            hideNavBar
                            hideTabBar
                            title="ExperienceViewer"
                            />
                        </Scene>
                        
                        <Scene
                        key="experienceCreator"
                        icon={Icon} 
                        name="plus-1"
                        >
                            <Scene 
                            key="form"
                            hideNavBar
                            back
                            component={ExperienceCreator}
                            />
                            <Scene 
                            key="cameraroll"
                            navBar={Header}
                            backgroundColor='#FFFFFF'
                            title="Your Photos"
                            component={CameraRollSelect}
                            back
                            forTabs={false}
                            notPop
                            specificKey="form"
                            />

                            <Scene 
                            key="experienceCreatorContacts"
                            navBar={Header}
                            backgroundColor="#FFFFFF"
                            title="People"
                            component={ContactList}
                            back
                            notPop={false}
                            forTabs={false}
                            notPop
                            specificKey="form"
                            />
                            
                        </Scene>

                        <Scene 
                        key="messages"
                        icon={Icon} 
                        name="chat-2"
                        >
                            <Scene 
                            key="activeMessages" 
                            component={ActiveMessages} 
                            title="Messages" 
                            navBar={Header} 
                            right
                            backgroundColor='#FFFFFF'
                            rightTitle='plus-1'
                            />
                            <Scene 
                            key="messagesList"
                            component={MessagesList}
                            title="John"
                            navBar={Header}
                            />
                            <Scene 
                            key="messageContacts" 
                            component={ContactList}
                            title="Contacts"
                            navBar={Header}
                            />
                        </Scene>

                        <Scene 
                        icon={Icon}
                        name="user-1"
                        key="user" 
                        >
                            <Scene 
                            key="userPage"
                            component={UserPage}
                            title="You"
                            hideNavBar
                            initial
                            isCurrentUser
                            />
                            <Scene 
                            key="userSettings"
                            component={UserSettings}
                            title="Your Settings"
                            hideNavBar
                            hideTabBar
                            />
                            <Scene 
                            key="cameraroll"
                            navBar={Header}
                            backgroundColor='#FFFFFF'
                            title="Your Photos"
                            component={CameraRollSelect}
                            back
                            forTabs={false}
                            notPop
                            specificKey="userSettings"
                            />

                            <Scene 
                            key="experienceViewer"
                            hideTabBar
                            component={ExperienceViewer}
                            hideNavBar
                            title="ExperienceViewer"
                            />
                        </Scene>
                        
                    </Tabs>
                </Scene>
                <Scene key="auth" initial={firebase.auth().currentUser === null}>
                    <Scene key="login" component={SignInForm} title="Please Login" hideNavBar />
                </Scene>
            </Scene>
        </Router>
    );
};

export default RouterComponent;
