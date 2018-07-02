# HashGenerator

<img src="https://raw.githubusercontent.com/lucasgferreira/HashGenerator/master/icon%20square/ic_launcher.png" width="150" height="150" />

##### README

Este README normalmente documentaria quaisquer etapas necessárias para que seu aplicativo seja executado.

### Para que é esse repositório?
* Introdução

Criar um aplicativo que Que trasforme uma string em um hash: 

* MD5
* SHA-1
* SHA-256
* SHA-384
* SHA-512 

<img src="https://raw.githubusercontent.com/lucasgferreira/HashGenerator/master/gif-images/print.png" width="272" height="480" />

![HashGenerator](https://raw.githubusercontent.com/lucasgferreira/HashGenerator/master/gif-images/videotogif.gif)

### Como faço para configurar?

* Clonar o projeto
```sh
git clone https://github.com/lucasgferreira/HashGenerator.git
cd HashGenerator
```
* Dependências
```sh
npm install
npm install --save-dev eslint-config-rallycoding
npm install node-forge
npm install react-native-parallax-scroll-view --save
```
* Como executar
```sh
react-native run-android
```

### Diretrizes de contribuição

* Versão 1.0

### index.android.js / index.ios.js
```js
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import { AppRegistry } from 'react-native';

import App from "./src/App";

const HashGenerator = props => (
    <App/>
);

AppRegistry.registerComponent('HashGenerator', () => HashGenerator);
```
### App.js
```js
import React from 'react';
import { View, Text } from 'react-native';
import Generator from './components/Generator';

export default props => (
    <Generator/>
);
```
### Generator.js
```js
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
    Component
} from 'react';
import forge from 'node-forge';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image,
    WebView,
    Linking,
    Picker,
    Switch,
    Alert
} from 'react-native';

export default class Generator extends Component {

    constructor(props) {
        super(props);

        this.state = {
            text: "",
            hash: "",
            digests: "md5",
            switchValue: false
        }
    }

    toggleSwitch = (value) => this.setState({
        switchValue: value
    });

    updateDigests = (digest) => {
        this.setState({
            digests: digest
        });
    }

    clear = () => {
        this.setState({
            text: null,
            hash: ''
        });
        this.refs['text'].clear();
        this.refs['hash'].clear();
    }

    digest = (text, digests) => {
        if (text == "" || text == null) {
            Alert.alert('', 'preencha o texto!');
        } else {
            if (digests == 'md5') {
                var md = forge.md.md5.create();
            }
            if (digests == 'sha1') {
                var md = forge.md.sha1.create();
            }
            if (digests == 'sha256') {
                var md = forge.md.sha256.create();
            }
            if (digests == 'sha384') {
                var md = forge.md.sha384.create();
            }
            if (digests == 'sha512') {
                var md = forge.md.sha512.create();
            }
            md.update(text);
            text = md.digest().toHex();
            this.setState({
                hash: text
            });
        }

    }

    open = (url) => {
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    }
    render() {
        const url = 'https://github.com/lucasgfserreira/HashGenerator';
        return (
            <ParallaxScrollView
                backgroundColor="#222"
                contentBackgroundColor="white"
                parallaxHeaderHeight={200}
                renderBackground={() => <Image style={styles.imageParallax} source={require('../drawable/background.jpg')}/>}
                renderForeground={() => (
                <View style={{ height: 200, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                        style={styles.icon}
                        source={require('../drawable/ic_launcher.png')}
                    />
                    <Text style={styles.title}>
                    Message Digests
                    </Text>
                
                <TouchableOpacity
                            onPress = { () => this.open(url)}>
                            <Text style = {styles.submitButtonText}>
                                Open GitHub project
                            </Text>
                        </TouchableOpacity>
                </View>
                )}>
    
                <Picker style={styles.picker}
                        selectedValue={this.state.digests}
                        onValueChange={this.updateDigests}>
                <Picker.Item label="MD5" value="md5" />
                <Picker.Item label="SHA-1" value="sha1" />
                <Picker.Item label="SHA-256" value="sha256" />
                <Picker.Item label="SHA-384" value="sha384" />
                <Picker.Item label="SHA-512" value="sha512" />
                </Picker>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 40 }}>
                    <Text style={{ flex: 2, margin: 3 }}>Esconder Texto</Text>
                    <Switch style={{ flex: 1, margin: 3 }}
                            onValueChange = {this.toggleSwitch} 
                            value = {this.state.switchValue}/>
                </View>
                    <TextInput style={styles.textInput}
                               ref={'text'}
                               underlineColorAndroid = "transparent"
                               placeholder = "Texto"
                               placeholderTextColor = "#43A047"
                               autoCapitalize = "none"
                               multiline={true}
                               autoCorrect={false}
                               numberOfLines={2}
                               secureTextEntry={this.state.switchValue ? true : false}
                               onChangeText = {(text) => this.setState({text})}/>
                    <View style={styles.container}>
                        <TouchableOpacity
                            style = {styles.submitButton}
                            onPress = { () => this.digest(this.state.text, this.state.digests)}>
                            <Text style = {styles.submitButtonText}>
                                Gerar Hash
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style = {styles.submitButton}
                            onPress = { () => this.clear()}>
                            <Text style = {styles.submitButtonText}>
                                Reset
                            </Text>
                        </TouchableOpacity>
                    </View> 
                    <TextInput style={styles.textInput}
                               ref={'hash'}
                               underlineColorAndroid = "transparent"
                               placeholderTextColor = "#9a73ef"
                               autoCapitalize = "none"
                               multiline={true}
                               numberOfLines={4}
                               autoCorrect={false}
                               value={this.state.hash}/>          
                    <View style={styles.containerButton}>
                </View>
            </ParallaxScrollView>
        );
    }
}

const styles = StyleSheet.create({
    submitButton: {
        backgroundColor: '#222',
        alignItems: 'center',
        padding: 15,
        height: 50,
        marginBottom: 5,
        flex: 1,
    },
    submitButtonText: {
        color: 'white'
    },
    container: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: 'white',
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
        color: 'white',
        margin: 10,
        textAlign: 'left',
    },
    textInput: {
        textAlign: 'auto',
        textAlignVertical: 'top',
        margin: 3,
        borderRadius: 3,
        borderColor: '#81C784',
        borderWidth: 1,
    },
    icon: {
        height: 100,
        width: 100,
    },
    picker: {
        backgroundColor: '#222',
        color: 'white',
        flex: 1,
    },
    imageParallax: {
        width: window.width,
        height: 350,
    },
});

AppRegistry.registerComponent('HashGenerator', () => HashGenerator);
```