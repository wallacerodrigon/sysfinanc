import React from 'react';
import {View, Text} from 'react-native';
import EstilosComuns from '../../assets/estilos/estilos';

export default class Cadastro extends React.Component {
    static navigationOptions = {
        title: 'Novo Cadastro',
        /* No more header config here! */
      };

    render() {
        return (
            <View style={EstilosComuns.container}>
                <Text>Cadastro</Text>
            </View>
        )
    };
}