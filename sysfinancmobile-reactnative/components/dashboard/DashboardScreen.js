import React from 'react';
import {View, Text} from 'react-native';
import EstilosComuns from '../../assets/estilos/estilos';

export default class DashboardScreen extends React.Component {
    static navigationOptions = {
        title: 'Dashboard',
        /* No more header config here! */
      };

    render() {
        return (
            <View style={EstilosComuns.container}>
                <Text>Dashboard</Text>
            </View>
        )
    };
}