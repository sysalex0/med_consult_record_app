import React from 'react';

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
    View,
    Picker
} from 'native-base';
import {isBoolean, isNumber} from "lodash";
import {setLoginId} from "../../actions/login";
import {connect} from "react-redux";
import axios from "axios";
import {api} from "../../shared";
import {TouchableOpacity} from 'react-native';

class createConsultationRecord extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            doctor_name: {
                valid: false,
                val: ``
            },
            patient_name: {
                valid: false,
                val: ``
            },
            diagnosis: {
                valid: false,
                val: ``
            },
            medication: {
                valid: false,
                val: ``
            },
            consultation_fee: {
                valid: false,
                val: ``
            },
            follow_up: {
                valid: true,
                val: true
            },
            errmsg: ``,
            selected: "true"
        }
    }

    onValueChange(value) {
        // console.log(value)
        this.setState(prevState => ({
            selected: value,
            follow_up: {
                ...prevState.follow_up,
                val: (value === 'true')
            }
        }));
    }

    handleDoctorNameOnChange(text) {
        const valid = text.length >= 1 ? true : false
        this.setState({
            doctor_name: {
                valid: valid,
                val: text
            }
        })
    }

    handlePatientNameOnChange(text) {
        const valid = text.length >= 1 ? true : false
        this.setState({
            patient_name: {
                valid: valid,
                val: text
            }
        })
    }

    handleDiagnosisOnChange(text) {
        const valid = text.length >= 1 ? true : false
        this.setState({
            diagnosis: {
                valid: valid,
                val: text
            }
        })
    }

    handleMedicationOnChange(text) {
        const valid = text.length >= 1 ? true : false
        this.setState({
            medication: {
                valid: valid,
                val: text
            }
        })
    }

    handleConsultationFeeOnChange(num) {
        num = parseInt(num)
        const valid = isNumber(num) && num >= 0;
        this.setState({
            consultation_fee: {
                valid: valid,
                val: num
            }
        })
    }

    handleFollowUpOnChange(bool) {
        const valid = isBoolean(bool)
        this.setState({
            follow_up: {
                valid: valid,
                val: bool
            }
        })
    }

    async handleAddOnPress() {
        if (this.state.doctor_name.valid &&
            this.state.patient_name.valid &&
            this.state.diagnosis.valid &&
            this.state.medication.valid &&
            this.state.consultation_fee.valid &&
            this.state.follow_up.valid
        ) {
            // console.log('valid record')
            const body = {
                userId: this.props.loginId,
                doctor_name: this.state.doctor_name.val,
                patient_name: this.state.patient_name.val,
                diagnosis: this.state.diagnosis.val,
                medication: this.state.medication.val,
                consultation_fee: this.state.consultation_fee.val,
                follow_up: this.state.follow_up.val,
            }
            try {
                const response = await axios.post(`${api}consult_records`, body)
                if (response.status === 200) {
                    const {id, message} = response.data;
                    Toast.show({
                        text: "Record Added!",
                        buttonText: "Okay",
                    })
                    this.props.navigation.pop();
                }
            } catch (e) {
                if (error.response) {
                    const errorMsg = error.response.data.message
                    this.setState({
                        errorMsg: errorMsg
                    })
                }
            }
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
                        <Title>Add record</Title>
                    </Body>
                    <Right/>
                </Header>
                <Content>
                    <Form>
                        <Item stackedLabel
                              success={this.state.doctor_name.valid ? true : false}
                              error={!this.state.doctor_name.valid ? true : false}
                        >
                            <Label>Doctor name</Label>
                            <Input onChangeText={(text) => this.handleDoctorNameOnChange(text)}/>
                        </Item>
                        <Item stackedLabel
                              success={this.state.patient_name.valid ? true : false}
                              error={!this.state.patient_name.valid ? true : false}
                        >
                            <Label>Patient name</Label>
                            <Input onChangeText={text => this.handlePatientNameOnChange(text)}/>
                        </Item>
                        <Item stackedLabel
                              success={this.state.diagnosis.valid ? true : false}
                              error={!this.state.diagnosis.valid ? true : false}
                        >
                            <Label>Diagnosis</Label>
                            <Input onChangeText={text => this.handleDiagnosisOnChange(text)}/>
                        </Item>
                        <Item stackedLabel last
                              success={this.state.medication.valid ? true : false}
                              error={!this.state.medication.valid ? true : false}
                        >
                            <Label>Medication</Label>
                            <Input onChangeText={text => this.handleMedicationOnChange(text)}/>
                        </Item>
                        <Item stackedLabel last
                              success={this.state.consultation_fee.valid ? true : false}
                              error={!this.state.consultation_fee.valid ? true : false}
                        >
                            <Label>Consultation fee</Label>
                            <Input onChangeText={text => this.handleConsultationFeeOnChange(text)}/>
                        </Item>
                        <Item stackedLabel last
                              success={this.state.follow_up.valid ? true : false}
                              error={!this.state.follow_up.valid ? true : false}
                        >
                            <Label>Follow up</Label>
                            <Item>
                                <Picker
                                    note
                                    mode="dropdown"
                                    style={{width: 120}}
                                    selectedValue={this.state.selected}
                                    onValueChange={this.onValueChange.bind(this)}
                                >
                                    <Picker.Item label="Yes" value="true"/>
                                    <Picker.Item label="No" value="false"/>
                                </Picker>
                            </Item>
                        </Item>
                        <Item>
                            {/*<View>*/}
                            {/*    {this.state.errorMsg.split('\n').map(msg => {*/}
                            {/*        return (*/}
                            {/*            <Text key={msg} style={{color: 'red'}}>{msg}</Text>*/}
                            {/*        )*/}
                            {/*    })}*/}
                            {/*</View>*/}
                        </Item>
                    </Form>
                    <View>
                        <Button full onPress={() => this.handleAddOnPress()}>
                            <Text>Add</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        loginId: state.login.id,
    };
};
const mapDispatchToProps = dispatch => {
    return {}
};
export default connect(mapStateToProps, mapDispatchToProps)(createConsultationRecord);
