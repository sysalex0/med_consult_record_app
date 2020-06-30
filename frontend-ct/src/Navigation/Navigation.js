import Home from "../Containers/HomeScreen";
import SignIn from "../Containers/SignInScreen";
import SignUp from "../Containers/SignUpScreen";
import {createStackNavigator} from "@react-navigation/stack";
import React from 'react';
import {connect} from 'react-redux'
import {NavigationContainer} from "@react-navigation/native";
import {AsyncStorage} from "react-native";
import createConsultationRecord from "../Containers/CreateConsultationRecordScreen";
import {setLoginId} from "../../actions/login";

const Stack = createStackNavigator();

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignedIn: false,
        };
    }

    async componentDidMount() {
        const loginId = await this.getToken()
        if(loginId){
            this.props.setLoginId(loginId)
        }
    }

    async getToken() {
        try {
            let userId = await AsyncStorage.getItem("userId");
            return userId
        } catch (error) {
            console.error("Something went wrong", error);
        }
    }
    render(){
        return(
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown: false}}>
                    {this.props.loginId ? (
                        <>
                        <Stack.Screen name={'Home'} component={Home}/>
                        <Stack.Screen name={'createConsultationRecord'} component={createConsultationRecord}/>
                        </>
                    ) : (
                        <>
                            <Stack.Screen name={'SignIn'} component={SignIn}/>
                            <Stack.Screen name={'SignUp'} component={SignUp}/>
                        </>
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}
const mapStateToProps = state => {
    return {
        loginId: state.login.id,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        setLoginId: id=>dispatch(setLoginId(id))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Navigation);

