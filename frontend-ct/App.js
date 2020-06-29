import {AppLoading, registerRootComponent} from 'expo';
import {Root} from 'native-base';
import * as Font from 'expo-font';
import {Ionicons} from '@expo/vector-icons';

import React from 'react';

import Home from "./src/Containers/HomeScreen";
import SignIn from "./src/Containers/SignInScreen";
import SignUp from "./src/Containers/SignUpScreen";

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {BACKEND_APP_API} from 'react-native-dotenv';
import {AsyncStorage} from "react-native";
import {createStore} from 'redux';
import {Provider,connect} from 'react-redux'
import reducers from './reducers';
import Navigation from "./src/Navigation/Navigation";

const store = createStore(reducers);
const Stack = createStackNavigator();

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            isSignedIn: false,
        };

    }

    setIsSignIn() {
        this.setState({isSignedIn: true})
    }

    async componentDidMount() {
        await AsyncStorage.clear()
        await Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        });
        this.setState({isReady: true});
        const token = await this.getToken();
        if (token) {
            console.log('Keep Login:', token)
            this.setState({isSignedIn: true})
        }
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

// registerRootComponent(App);
