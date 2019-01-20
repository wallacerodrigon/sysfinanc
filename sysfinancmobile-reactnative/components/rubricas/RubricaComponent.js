import React from 'react';
import {View, Text} from 'react-native';
import EstilosComuns from '../../assets/estilos/estilos';

export default class RubricaScreen extends React.Component {
    static navigationOptions = {
        title: 'Rubricas',
        /* No more header config here! */
      };

    render() {
        return (
            <View style={EstilosComuns.container}>
                <Text>RubricaScreen</Text>
            </View>
        )
    };
}