import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import { Header, Title, Right, Body, Button, Fab } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
//import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import FileHash from './FileHash';
import StringHash from './StringHash';
import ComparaCodigos from './ComparaCodigos';
import {
  apagaValores,
  localizaPath
} from '../actions/HashActions';

const styles = require('../styles/style');

const File = () => <FileHash />;
const String = () => <StringHash />;

class TabView extends PureComponent {
  state = {
    index: 0,
    routes: [
      { key: '1', title: 'Text' },
      { key: '2', title: 'File' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => <TabBar
    style={styles.tabbar}
    indicatorStyle={styles.indicator}
    labelStyle={styles.label}
    {...props}
  />;

  _renderScene = SceneMap({
    '1': String,
    '2': File,
  });

  _handleIndexChange = index => {
    this.setState({
      index,
    });
  };

  renderFab() {
    if (this.state.index === 0) {
      return (
        <Fab
        direction="up"
        containerStyle={{}}
        style={styles.fab}
        position="bottomRight"
        onPress={() => this.props.navigation.navigate('textohash')}>
        <MaterialIcons name='edit' size={24} color="#fff" />
      </Fab>
      );
    }
    else {
      return (
        <Fab
        direction="up"
        containerStyle={{}}
        style={styles.fab}
        position="bottomRight"
        onPress={() => this.props.localizaPath()}>
        <MaterialIcons name='folder' size={24} color="#fff" />
      </Fab>
      );
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header hasTabs style={styles.tabbar} androidStatusBarColor="#263238">
          <Body>
            <Title style={{ color: '#fff' }}>HashGenerator</Title>
          </Body>
          <Right>
            <Button 
              transparent
              onPress={() => this.props.apagaValores(this.state.index)}
            >
              <MaterialCommunityIcons name='broom' size={24} style={styles.icon} />
            </Button>
          </Right>
        </Header>

        <TabViewAnimated
          style={styles.container}
          navigationState={this.state}
          renderScene={this._renderScene}
          renderHeader={this._renderHeader}
          onIndexChange={this._handleIndexChange}
        />
        <ComparaCodigos />
        {this.renderFab()}
      </View>
    );
  }
}

const mapStateToProps = state => (
  {
    path: state.HashReducer.path,
    hashFile: state.HashReducer.hashFile,
    digestsFile: state.HashReducer.digestsFile,
  }
);

export default connect(mapStateToProps, {
  apagaValores,
  localizaPath
})(TabView);