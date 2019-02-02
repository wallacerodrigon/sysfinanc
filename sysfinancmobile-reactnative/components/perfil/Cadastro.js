import React from 'react';
import {View, Text} from 'react-native';
import EstilosComuns from '../../assets/estilos/estilos';
import { MapView } from 'expo';

export default class Cadastro extends React.Component {
    static navigationOptions = {
        title: 'Novo Cadastro',
        /* No more header config here! */
      };

    render() {
        
        return (
            <View style={EstilosComuns.container}>
                <Text>Cadastro</Text>
                <MapView
                    style={{ flex: 1 }}
                    initialRegion={{
                    latitude: -15.835025,
                    longitude: -48.089085,
                    latitudeDelta: 0.422,
                    longitudeDelta: 0.221,
                    }}
                />                
            </View>
        )
    };
}