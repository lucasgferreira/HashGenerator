import React, { Component } from 'react';
import { Header, Body, Right, Left, Title, Button } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
//import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {
    Clipboard
} from 'react-native';
import {
    modificaText
} from '../actions/HashActions';
  
const styles = require('../styles/style');

class NavBarText extends Component {

    async _getContent() {
        const content = await Clipboard.getString();
        this.props.modificaText(content);
    }

    render() {
        return (
            <Header style={{ backgroundColor: '#eee' }} androidStatusBarColor="#aaa">
                <Left>
                    <Button
                        transparent
                        onPress={() => { this.props.navigation.navigate('principal'), this.props.modificaText('') }}>
                        <MaterialIcons name='arrow-back' size={24} color="#666" />
                    </Button>
                </Left>
                <Body>
                    <Title style={{ color: '#444' }}>Texto</Title>
                </Body>
                <Right>

                    <Button
                        transparent
                        onPress={() => this._getContent()}>
                        <MaterialCommunityIcons name='content-paste' size={24} color="#666" />
                    </Button>
                    <Button
                        transparent
                        onPress={() => this.props.modificaText('')}>
                        <MaterialCommunityIcons name='broom' size={24} color="#666" />
                    </Button>
                    <Button
                        transparent
                        onPress={() => this.props.navigation.navigate('principal')}>
                        <MaterialIcons name='check' size={24} color="#666" />
                    </Button>
                </Right>
            </Header>
        );
    }
}
const mapStateToProps = state => (
    {
        text: state.HashReducer.text,
    }
);

export default connect(mapStateToProps, {
    modificaText
})(NavBarText);
