import {AppLoading} from 'expo';
import {Root} from 'native-base';
import * as Font from 'expo-font';
import {Ionicons} from '@expo/vector-icons';

import React from 'react';

import {AsyncStorage} from "react-native";
import {createStore} from 'redux';
import {Provider} from 'react-redux'
import reducers from './reducers';
import Navigation from "./src/Navigation/Navigation";

const store = createStore(reducers);

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
        };

    }

    async componentDidMount() {
        await AsyncStorage.clear()
        await Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        });
        this.setState({isReady: true});
    }

    render() {
        if (!this.state.isReady) {
            return (
                <Root>
                    <AppLoading/>
                </Root>
            );
        }
        return (
            <Provider store={store}>
                <Root>
                    <Navigation/>
                </Root>
            </Provider>
        );
    }
}
