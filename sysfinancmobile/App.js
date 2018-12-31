import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginComponent from './components/login/LoginComponent';

export default class App extends React.Component {
  render() {
    return (
      <View>
        <LoginComponent/>
      </View>
    );
  }
}

