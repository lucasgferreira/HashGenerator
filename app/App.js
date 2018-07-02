import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Root } from 'native-base';
import reducers from './reducers';
import Routes from './Routes';

export default class App extends Component {

    // componentDidMount() {
    //     MyModule.setDefaultTheme();
    // }
    render() {
        return (
            <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
                <Root>
                    <Routes />
                </Root>
            </Provider>
        );
    }
}
