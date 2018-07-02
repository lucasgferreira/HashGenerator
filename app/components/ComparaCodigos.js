import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import {
    View,
    TextInput,
    Clipboard,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import {
    Button,
    Text,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { modificaTextoComparacao, modificaModalVisible } from '../actions/HashActions';

const styles = require('../styles/style');

class ComparaCodigos extends PureComponent {

    constructor() {
        super();
        this.state = {
            textHash: '',
            height: 0
        };
    }

    setModalVisible(visible) {
        this.setState({ textHash: '' });
        this.props.modificaModalVisible(visible);
    }

    modificaTexto(texto) {
        this.setState({ textHash: texto });
    }

    async _getContent() {
        const content = await Clipboard.getString();
        this.setState({ textHash: content });
    }

    renderCompareCodigos() {
        
        if (this.state.textHash === this.props.textComparacao) {
          return (
            <View 
                style={{ 
                    flexDirection: 'row', 
                    alignItems: 'center', 
                    justifyContent: 'flex-end', 
                    padding: 10 }}
            >
              <Text style={{ fontSize: 18, marginRight: 5, color: '#00796B' }}>
                Igual
              </Text>
              <MaterialCommunityIcons 
                name="checkbox-marked-circle-outline" size={30} color="#00796B" 
              />
            </View>
          );
        } else {            
          return (
            <View 
                style={{ 
                    flexDirection: 'row', 
                    alignItems: 'center', 
                    justifyContent: 'flex-end', 
                    padding: 10 }}
            >
              <Text style={{ fontSize: 18, marginRight: 5, color: '#F44336' }}>
                Diferente
              </Text>
              <MaterialCommunityIcons name="close-circle-outline" size={30} color="#F44336" />
            </View>
          );
        }
      }

      render() {
    return (
        <Modal isVisible={this.props.modalVisible} backdropOpacity={0.50}>
            
            <View 
                style={{ 
                    backgroundColor: '#fff',
                    borderRadius: 3, 
                    padding: 10, 
                    justifyContent: 'space-between' }}
            >
            <ScrollView>
                <Text style={styles.titleCard}>
                    Código 1
                </Text>
                <Text style={styles.textCard}>
                    {this.props.textComparacao}
                </Text>
                <View 
                    style={{ 
                        flexDirection: 'row', 
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingVertical: 10 }}
                >
                    <Text style={styles.titleCard}>
                        Código 2
                    </Text>
                    <TouchableOpacity
                        onPress={() => this._getContent()}
                    >
                        <MaterialCommunityIcons name='content-paste' size={24} color="#666" />
                    </TouchableOpacity>
                </View>
                <TextInput 
                    style={{ paddingTop: 5, paddingBottom: 10, textAlign: 'auto', height: Math.max(35, this.state.height) }}
                    value={this.state.textHash}
                    onChangeText={texto => {
                        this.modificaTexto(texto),
                        this.renderCompareCodigos()
                    }}
                    onContentSizeChange={(event) => {
                        this.setState({ height: event.nativeEvent.contentSize.height })
                    }}
                    multiline={true}
                    numberOfLines={4}
                    autoCorrect={false}
                    underlineColorAndroid="#009688"
                />
                {this.renderCompareCodigos()}
                <Button 
                    onPress={() => { this.setModalVisible(!this.props.modalVisible)}}
                    transparent block
                >
                    <Text>
                        OK
                    </Text>
                </Button>
                </ScrollView>
            </View>
        </Modal>
    );
}

}

const mapStateToProps = state => (
    {
      textComparacao: state.HashReducer.textComparacao,
      modalVisible: state.HashReducer.modalVisible
    }
);

export default connect(mapStateToProps, {
    modificaTextoComparacao,
    modificaModalVisible
})(ComparaCodigos);