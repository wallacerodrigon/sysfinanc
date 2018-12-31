/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, Text} from 'react-native';
import LoginComponent from './components/login/LoginComponent';

export default class App extends Component {
  render() {
    return (
      <View>
	      <LoginComponent/>
      </View>
    );
  }
}


