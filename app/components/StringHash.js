import React, {
  Component
} from 'react';
import {
  TouchableOpacity,
  View,
  ScrollView,
  Picker,
  Clipboard
} from 'react-native';
import {
  Button,
  Text,
  Card,
  CardItem,
  Body,
  Toast
} from 'native-base';
import { connect } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  modificaDigestsText,
  modificaText,
  calculaHashTexto,
  modificaModalVisible,
  modificaTextoComparacao,
 } from '../actions/HashActions';

const styles = require('../styles/style');

class StringHash extends Component {

  constructor() {
        super();
        this.state = {
            switchValue: false,
        };
    }

  setModalVisible() {
    if (this.props.textHash !== '') {
        this.props.modificaTextoComparacao(this.props.textHash);
        this.props.modificaModalVisible(!this.props.modalVisible);
        //this.setState({visibleModal: true})
    } else {
      Toast.show({
        text: 'Realize o calculo!',
        position: 'bottom',
        duration: 3000
      });
    }
  }

  _setContent(texto) {
    Clipboard.setString(texto);
  }

  _calculaHashTexto() {
    const { text, textDigests } = this.props;
    this.props.calculaHashTexto({ text, textDigests });
  }

  modificaSwitchValue(value) {
    this.setState({ switchValue: value });
  }

  renderHash() {
    if (this.props.text !== '') {
      return (
        <CardItem style={styles.card}>
          <Body style={styles.card}>
                <Text style={styles.textCard}>
                  {this.props.text}
                </Text>
          </Body>
        </CardItem>
      );
    }
  }

  render() {
    return (
      <ScrollView>
        <Card style={styles.card}>
         {this.renderHash()}
          <CardItem footer style={styles.footer}>
            <View
              style={styles.spaceCard}
            >
              <Picker
                style={styles.picker}
                selectedValue={this.props.textDigests}
                onValueChange={texto => this.props.modificaDigestsText(texto)}
              >
                <Picker.Item label="MD5" value="md5" />
                <Picker.Item label="SHA-1" value="sha1" />
                <Picker.Item label="SHA-256" value="sha256" />
                <Picker.Item label="SHA-384" value="sha384" />
                <Picker.Item label="SHA-512" value="sha512" />
                <Picker.Item label="BASE64 ENCODE" value="base64encode" />
                <Picker.Item label="BASE64 DECODE" value="base64decode" />
              </Picker>
                <Button
                  transparent
                  onPress={() => this._calculaHashTexto()}
                >
                  <Text>
                    Calcular
                </Text>
                </Button>
            </View>
          </CardItem>
        </Card>

        <View style={{ paddingBottom: 50 }}>
        <Card style={styles.card}>
          <CardItem style={styles.card}>
            <Body style={styles.card}>
              <Text style={styles.textCard}>
                {this.props.textHash}
              </Text>
            </Body>
          </CardItem>

          <CardItem footer style={styles.footer}>
            <TouchableOpacity onPress={() => this._setContent(this.props.textHash)}>
              <MaterialCommunityIcons 
                style={styles.iconmarginRight} 
                name="content-copy" 
                size={24}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => this.setModalVisible()}
            >
              <MaterialIcons style={styles.iconmarginRight} name="compare-arrows" size={24} color="#666" />
            </TouchableOpacity>
          </CardItem>
        </Card>
        </View>
      </ScrollView>
      
    );
  }

}

const mapStateToProps = state => (
  {
    text: state.HashReducer.text,
    textHash: state.HashReducer.textHash,
    textDigests: state.HashReducer.textDigests,
    modalVisible: state.HashReducer.modalVisible,
    textComparacao: state.HashReducer.textComparacao
  }
);

export default connect(mapStateToProps, {
  modificaDigestsText,
  modificaText, 
  calculaHashTexto, 
  modificaModalVisible, 
  modificaTextoComparacao
})(StringHash);
