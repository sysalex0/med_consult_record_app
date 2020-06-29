import React from 'react'

import {
    Text,
    Content,
    Button,
    Container,
    Header,
    Icon,
    Left,
    Body,
    Right,
    Title,
    Card,
    CardItem
} from 'native-base';

import {Agenda} from 'react-native-calendars';
import createConsultationRecord from "./CreateConsultationRecordScreen";
import TouchableOpacity from "react-native-web/dist/exports/TouchableOpacity";
import axios from "axios";
import {api} from "../../shared";
import {connect} from "react-redux";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            agendaItems: null
        }
    }

    async componentDidMount(){
        await this.getAgendaItems();
    }

    async handleAddOnPress() {
        this.props.navigation.navigate('createConsultationRecord')
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log('componentDidUpdate, this.state.agendaItems:',this.state.agendaItems)
    }

    async getAgendaItems() {
        try {
            // const items = await axios.get(`${api}consult_records/${this.props.loginId}`)
            const items = await axios.get(`${api}consult_records/1`)
            // console.log(items.data.message)
            if(items){
                const itemsArray = items.data.message;
                let dict = {}
                for(let i=0;i<itemsArray.length;i++){
                    const date = itemsArray[i].created_at;
                    if(dict[date] === undefined){
                        dict[date] = itemsArray[i];
                    }
                }
                // console.log('dict:',dict)
                this.setState({
                    agendaItems:dict
                },()=>this.forceUpdate())
            }
        } catch (e) {
            console.error(e)
        }
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left/>
                    <Body>
                        <Title>Home</Title>
                    </Body>
                    <Right/>
                </Header>
                <Content>
                    <Agenda
                        items={this.state.agendaItems?this.state.agendaItems:{
                            doctor_name: 'fake',
                            patient_name:'fake',
                            follow_up:false
                        }}
                        renderItem={(item, firstItemInDay) => {
                            // console.log('agendaItem:', item);
                            return (
                                <Card>
                                    <CardItem header bordered>
                                        <Text>Doctor Name: {item.doctor_name}</Text>
                                    </CardItem>
                                    <CardItem header bordered>
                                        <Text>Patient Name: {item.patient_name}</Text>
                                    </CardItem>
                                    <CardItem header bordered>
                                        <Text>Follow Up: {item.follow_up ? 'Yes' : 'No'}</Text>
                                    </CardItem>
                                </Card>
                            );
                        }}
                    />
                    <Button rounded style={{justifyContent: 'center'}} onPress={() => this.handleAddOnPress()}>
                        <Icon name='add'/>
                    </Button>
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
export default connect(mapStateToProps, mapDispatchToProps)(Home);
