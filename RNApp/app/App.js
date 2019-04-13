import React, { Component } from 'react';
import ReduxThunk from 'redux-thunk';
import { View } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import Router from './Router';


class App extends Component {
    render() {
        return (
            //creates the react-native-redux store
            <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
                <Router />
            </Provider>
        );
    }
}

export default App;