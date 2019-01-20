import React from 'react';
import {View, Text} from 'react-native';
import EstilosComuns from '../../assets/estilos/estilos';

export default class EsqueciSenha extends React.Component {
    static navigationOptions = {
        title: 'Esqueci a Senha',
        /* No more header config here! */
      };

    render() {
        return (
            <View style={EstilosComuns.container}>
                <Text>EsqueciSenha</Text>
            </View>
        )
    };
}

