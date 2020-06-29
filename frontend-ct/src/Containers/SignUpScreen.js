import React from 'react'

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
    Icon,
    Left,
    Body,
    Right,
    Title,
    Segment,
    Toast,
    View
} from 'native-base';
import axios from 'axios';
import {api} from "../../shared";

export default class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: {
                valid: false,
                val: ``
            },
            password: {
                valid: false,
                val: ``
            },
            clinic_name: {
                valid: false,
                val: ``
            },
            phone_num: {
                valid: false,
                val: ``
            },
            address: {
                valid: false,
                val: ``
            },
            errorMsg: ``
        }
    }

    validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email)
    }
    validatePhoneNumber = phone_number => {
        const re = /^[23569][0-9]{7}$/
        return re.test(phone_number)
    }
    handleEmailOnChange = (text) => {
        const valid = this.validateEmail(text)
        this.setState({
            email: {
                valid: valid,
                val: text
            }
        })
    }
    handlePasswordOnChange = (text) => {
        const valid = text.length >= 1 ? true : false
        this.setState({
            password: {
                valid: valid,
                val: text
            }
        })
    }
    handleClinicNameOnChange = (text) => {
        const valid = text.length >= 1 ? true : false
        this.setState({
            clinic_name: {
                valid: valid,
                val: text
            }
        })
    }
    handlePhoneNumberOnChange = (text) => {
        const valid = this.validatePhoneNumber(text)
        this.setState({
            phone_num: {
                valid: valid,
                val: text
            }
        })
    }
    handleAddressOnChange = (text) => {
        const valid = text.length >= 1 ? true : false
        this.setState({
            address: {
                valid: valid,
                val: text
            }
        })
    }

    handleRegisterOnPress = () => {
        if (this.state.email.valid &&
            this.state.password.valid &&
            this.state.clinic_name.valid &&
            this.state.phone_num.valid &&
            this.state.address.valid
        ) {
            const body = {
                email: this.state.email.val,
                password: this.state.password.val,
                clinic_name: this.state.clinic_name.val,
                phone_number: this.state.phone_num.val,
                address: this.state.address.val
            }
            axios.post(`${api}auth/signup`, body)
                .then((response) => {
                    // console.log('response:', response)
                    if (response.status === 200) {
                        const {id, message} = response.data;
                        Toast.show({
                            text: "Registered!",
                            buttonText: "Okay",
                        })
                        this.props.navigation.pop();
                    }
                }).catch((error) => {
                if (error.response) {
                    const errorMsg = error.response.data.message
                    this.setState({
                        errorMsg: errorMsg
                    })
                }
            });
        } else {
            Toast.show({
                text: "Fail! Please check carefully.",
                buttonText: "Warning",
            })
        }
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name='arrow-back' onPress={() => this.props.navigation.goBack()}/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Register</Title>
                    </Body>
                    <Right/>
                </Header>
                <Content>
                    <Form>
                        <Item stackedLabel
                              success={this.state.email.valid ? true : false}
                              error={!this.state.email.valid ? true : false}
                        >
                            <Label>E-mail</Label>
                            <Input onChangeText={(text) => this.handleEmailOnChange(text)}/>
                        </Item>
                        <Item stackedLabel
                              success={this.state.password.valid ? true : false}
                              error={!this.state.password.valid ? true : false}
                        >
                            <Label>Password</Label>
                            <Input onChangeText={(text) => this.handlePasswordOnChange(text)}/>
                        </Item>
                        <Item stackedLabel
                              success={this.state.clinic_name.valid ? true : false}
                              error={!this.state.clinic_name.valid ? true : false}
                        >
                            <Label>Clinic name</Label>
                            <Input onChangeText={text => this.handleClinicNameOnChange(text)}/>
                        </Item>
                        <Item stackedLabel
                              success={this.state.phone_num.valid ? true : false}
                              error={!this.state.phone_num.valid ? true : false}
                        >
                            <Label>Phone number</Label>
                            <Input onChangeText={text => this.handlePhoneNumberOnChange(text)}/>
                        </Item>
                        <Item stackedLabel last
                              success={this.state.address.valid ? true : false}
                              error={!this.state.address.valid ? true : false}
                        >
                            <Label>Address</Label>
                            <Input onChangeText={text => this.handleAddressOnChange(text)}/>
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
                    <View>
                        <Button full onPress={() => this.handleRegisterOnPress()}>
                            <Text>Register</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        )
    }
}
