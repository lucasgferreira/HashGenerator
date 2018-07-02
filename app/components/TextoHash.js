import React, {
  PureComponent
} from 'react';
import {
  View
} from 'react-native';
import { Input } from 'native-base';
import { connect } from 'react-redux';
import NavBarTextoHash from "../tabBar/NavBarTextoHash";
import {
  modificaText
 } from '../actions/HashActions';

class StringHash extends PureComponent {

  constructor() {
    super();
    this.state = {
      height: 0
    };
  }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
             <NavBarTextoHash />
                <Input
                    style={{ textAlignVertical: 'top', height: Math.max(35, this.state.height) }}
                    value={this.props.text}
                    onChangeText={texto => this.props.modificaText(texto)}
                    multiline
                    onContentSizeChange={(event) => {
                        this.setState({ height: event.nativeEvent.contentSize.height });
                    }}
                    autoCorrect={false}
                    underlineColorAndroid="transparent"
                    placeholder="Texto"
                    placeholderTextColor="#888"
                />
            </View>
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
})(StringHash);
