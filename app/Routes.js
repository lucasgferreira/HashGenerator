import React from "react";
//import { StyleSheet } from "react-native";
import { Router, Scene, Stack } from 'react-native-router-flux';
//import { StackNavigator } from "react-navigation";

import Principal from "./components/Principal";
import TextoHash from "./components/TextoHash";
import NavBarTextoHash from "./tabBar/NavBarTextoHash";

export default props => (
    <Router>
        <Stack key='root' navigationBarStyle={{backgroundColor:'#3F51B5'}}
                          titleStyle={{color : "#FFF"}}
                          navBarButtonColor="#FFF">

            <Scene key='principal' component={Principal} hideNavBar/>

            <Scene key='textohash' component={TextoHash} title='Principal' navBar={NavBarTextoHash}/>
        </Stack>
    </Router>
);

// const Routes = StackNavigator(
//   {
//     principal: { screen: Principal },
//     textohash: { screen: TextoHash }
//   }
// );

// export default Routes;
