import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Picker,
  TouchableOpacity,
  Clipboard
} from 'react-native';
import { Button, Text, Card, CardItem, Body, Toast } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { 
  modificaPath, 
  modificaHashFile, 
  modificaDigestsFile, 
  calculaHashArquivo, 
  localizaPath, 
  modificaModalVisible, 
  modificaTextoComparacao,
} from '../actions/HashActions';

const styles = require('../styles/style');

class FileHash extends Component {

    setModalVisible() {
        if (this.props.fileHash !== '') {
            this.props.modificaTextoComparacao(this.props.fileHash);
            this.props.modificaModalVisible(!this.props.modalVisible);
            //this.setState({visibleModal: true});
        } else {
            Toast.show({
                text: 'Realize o calculo!',
                position: 'bottom',
                duration: 3000
            });
        }
    }

  setContent(texto) {
    Clipboard.setString(texto);
  }

  _calculaHashArquivo() {
    const { filePath, fileDigests } = this.props;
    this.props.calculaHashArquivo({ filePath, fileDigests });
  }

  renderFileState() {
    if (this.props.filePath !== '') {
      return (
        <CardItem style={styles.card}>
          <Body style={styles.card}>
            <View style={{ justifyContent: 'space-between', flex: 1 }}>
              <Text style={styles.titleCard}>Name</Text>
              <Text style={styles.subTitleCard}>{this.props.fileName}</Text>
              <Text style={styles.titleCard}>Path</Text>
              <Text style={styles.subTitleCard}>{this.props.filePath}</Text>
              <Text style={styles.titleCard}>Size</Text>
              <Text style={styles.subTitleCard}>{this.props.fileSize}</Text>
            </View>
          </Body>
        </CardItem>
      );
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Card style={styles.card}>
             {this.renderFileState()}
          <CardItem footer style={styles.footer}>
            <View
              style={styles.spaceCard}
            >
              
              <Picker
                style={styles.picker}
                selectedValue={this.props.fileDigests}
                onValueChange={texto => this.props.modificaDigestsFile(texto)}
              >
                <Picker.Item label="MD5" value="md5" />
                <Picker.Item label="SHA-1" value="sha1" />
                <Picker.Item label="SHA-256" value="sha256" />
                <Picker.Item label="SHA-384" value="sha384" />
                <Picker.Item label="SHA-512" value="sha512" />
              </Picker>
                <Button transparent onPress={() => this._calculaHashArquivo()}>
                  <Text> Calcular </Text>
                </Button>
            </View>
          </CardItem>
        </Card>

        <View style={{ paddingBottom: 50 }}>
        <Card style={styles.card}>
          <CardItem style={styles.card}>
            <Body style={styles.card}>
              <Text style={styles.textCard}>
                {this.props.fileHash}
              </Text>
            </Body>
          </CardItem>
          <CardItem footer style={styles.footer}>
            <TouchableOpacity onPress={() => this.setContent(this.props.hashFile)}>
              <MaterialCommunityIcons 
                style={styles.iconmarginRight} 
                name="content-copy" 
                size={24} color="#666"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setModalVisible()}>
              <MaterialIcons style={styles.iconmarginRight} name="compare-arrows" size={24} />
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
    filePath: state.HashReducer.filePath,
    fileName: state.HashReducer.fileName,
    fileSize: state.HashReducer.fileSize,
    fileHash: state.HashReducer.fileHash,
    fileDigests: state.HashReducer.fileDigests,
    modalVisible: state.HashReducer.modalVisible,
  }
);

export default connect(mapStateToProps, {
  modificaPath,
  modificaHashFile,
  modificaDigestsFile, 
  calculaHashArquivo, 
  localizaPath, 
  modificaModalVisible, 
  modificaTextoComparacao
})(FileHash);
