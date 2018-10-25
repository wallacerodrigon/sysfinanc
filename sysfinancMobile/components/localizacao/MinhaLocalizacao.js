import React, { Component } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MapView from 'react-native-maps';

export default class MinhaLocalizacao extends Component {


    render(){
      return (
        <MapView
            style={{ flex: 1 }}
          >
          </MapView>       
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f00',
      alignItems: 'center',
      justifyContent: 'center'
    },
  });