import React from 'react'
import {AsyncStorage} from 'react-native'
import {
    Text,
    Form,
    Label,
    Item,
    Input,
    Content,
    Button,
    Container,
    Header,
    View,
    Left,
    Body,
    Right,
    Title, Segment, Toast
} from 'native-base';
import Home from "./HomeScreen";
import SignUp from "./SignUpScreen";
import axios from "axios";
import {api} from "../../shared";
import {setLoginId} from "../../actions/login";
import {connect} from "react-redux";
import SignUpScreen from "./SignUpScreen";

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ``,
            password: ``,
            errorMsg: ``
        }
    }

    async storeToken(userId) {
        try {
            // console.log('storeToken userId:',userId)
            await AsyncStorage.setItem('userId', JSON.stringify(userId));
        } catch (error) {
            console.error("Something went wrong", error);
        }
    }

    async handleLoginOnPress() {
        const body = {
            email: this.state.email,
            password: this.state.password
        }
        try{
            const response = await axios.post(`${api}auth/signin`, body);
            if (response.data.id) {
                let {id} = response.data;
                // console.log('id:', id);
                await this.storeToken(id);
                Toast.show({
                    text: "Success",
                    buttonText: "Okay",
                })
                this.setState({errorMsg:``})
                this.props.setLoginId(id);
                // this.props.navigation.reset({
                //     index: 0,
                //     routes: [{ name: 'Home' }],
                // });
            }else {
                Toast.show({
                    text: "Incorrect email / password",
                    buttonText: "Warning",
                })
            }
        }
        catch (e) {
            // console.log('hihi',e)
            if (error.response) {
                const errorMsg = error.response.data.message
                console.log('errorMsg:', errorMsg)
                this.setState({
                    errorMsg: errorMsg
                })
            }
        }
    }

    render() {
        return (
            <View>
                <Header>
                    <Left/>
                    <Body>
                        <Title>Sign In</Title>
                    </Body>
                    <Right>
                        <Button hasText transparent onPress={() => this.props.navigation.navigate(SignUp)}>
                            <Title>Register</Title>
                        </Button>
                    </Right>
                </Header>
                <View>
                    <Form>
                        <Item stackedLabel>
                            <Label>E-mail</Label>
                            <Input onChangeText={text => this.setState({email: text})}/>
                        </Item>
                        <Item stackedLabel last>
                            <Label>Password</Label>
                            <Input onChangeText={text => this.setState({password: text})}/>
                        </Item>
                        <Item>
                            <View>
                                {this.state.errorMsg.split('\n').map(msg => {
                                    return (
                                        <Text key={msg} style={{color: 'red'}}>{msg}</Text>
                                    )
                                })}
                            </View>
                        </Item>
                    </Form>
                </View>
                <View>
                    <Button full onPress={() => this.handleLoginOnPress()}>
                        <Text>Log in</Text>
                    </Button>
                </View>
            </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
