import React, { Component } from 'react';
import {View, Text, StyleSheet, TextInput, Button, Image} from 'react-native';

import Botao from '../botao/Botao';
import EstilosComuns from '../../assets/estilos/estilos';
const imgLogo = require('../../assets/img/logo-login.png');
 
export default class LoginComponent extends Component {

    render() {
        return (
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                <View style={estiloLogin.blocoLembrete}>
                    <Text>Header</Text>
                    {/* <Image source={imgLogo}/>
                    <Text style={estiloLogin.chamadaEntrada}>Para entrar,</Text>
                    <Text style={estiloLogin.chamadaEntrada}>informe seu login e senha.</Text> */}
                </View>

                <View style={estiloLogin.blocoCentral}>
                    <Text>Login</Text>
                     {/* <TextInput style={estiloLogin.inputText} placeholder="Login"></TextInput>
                     <TextInput style={estiloLogin.inputText} placeholder="Senha"></TextInput>
                     <Botao tituloBotao="Entrar" aoClicar={()=> null}/> */}
                 </View>

                 <View style={estiloLogin.blocoRodape}>
                     <Text>Rodapé</Text>
                     {/* <Botao tituloBotao="Cadastrar-me" aoClicar={()=> alert('ok')}/>
                     <Botao tituloBotao="Esqueci a senha" aoClicar={()=> null}/> */}
                 </View> 
            </View>
        )
    }
}


const estiloLogin = StyleSheet.create({
    sombra: {
        shadowColor: '#666',
        shadowOpacity: 0.3,
        shadowRadius:30
    },
    margem: {
        margin: 5,
    },
    blocoLembrete: {
        flex: 3,
        color: '#666',
        // justifyContent:'center',
        // alignItems: 'center',
        // alignSelf: "stretch",
        backgroundColor: '#666'
    },
    blocoCentral: {
        flex: 5,
        // width: 200,
        // justifyContent: 'flex-start',
        // alignItems: 'center',
        backgroundColor: '#00f'
    },
    blocoRodape: {
        flex: 1, 
        // alignSelf: 'stretch',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        backgroundColor: '#f00'
    },

})