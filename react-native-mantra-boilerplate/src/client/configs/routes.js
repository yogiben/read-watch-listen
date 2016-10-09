import React, { Component } from 'react';
import { Navigator } from 'react-native';
import { Scene, Router } from 'react-native-router-flux';

import Home from '../modules/core/containers/home';

export default class Routes extends Component {
  render() {
    console.log(Navigator.NavigationBar.Styles.General)
    return (
      <Router sceneStyle={{paddingTop: Navigator.NavigationBar.Styles.General.StatusBarHeight}}>
        <Scene key="root">
          <Scene key="home" initial={true} component={Home} hideNavBar={true} />
        </Scene>
      </Router>
    );
  }
}
