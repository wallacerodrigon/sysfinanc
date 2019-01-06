import React from 'react';
import {View, Text} from 'react-native';
import EstilosComuns from '../../assets/estilos/estilos';
import AppScreenNames from '../../constantes/AppScreenNames';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Home',
      };

    render() {
        return (
            <View style={EstilosComuns.container}>
                <Text>Home</Text>
            </View>
        )
    };
}

//axios.get(url)
//retorna promise --> then(resp => resp.data)

