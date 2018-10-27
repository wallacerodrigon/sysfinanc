import React, { Component } from 'react';
import {View, Text, StyleSheet, TextInput, Button, Image} from 'react-native';

import {Botao} from '../botao/Botao';
import estilosComuns from '../../assets/styles/estilos';

const imgLogo = require('../../assets/img/logo-login.png');

export default class LoginComponent extends Component {

    render() {
        //const {estiloPadrao} = estilos;
       // console.log(EstiloPadrao);

        return (
            <View style={[estilosComuns.container, estiloLogin.margem, estiloLogin.bordaCinza, estiloLogin.bordaArredondada, estiloLogin.sombra]}>
                <View style={[estiloLogin.lembrete, estiloLogin.bordaArredondada, estiloLogin.margem]}>
                    <Image source={imgLogo}/>
                    <Text style={estiloLogin.chamadaEntrada}>Para entrar,</Text>
                    <Text style={estiloLogin.chamadaEntrada}>informe seu login e senha.</Text>
                </View>

                <View style={[estiloLogin.centroLogin, estiloLogin.margem]}>
                     <TextInput style={estiloLogin.inputText} placeholder="Login"></TextInput>
                     <TextInput style={estiloLogin.inputText} placeholder="Senha"></TextInput>
                     <Botao tituloBotao="Entrar" aoClicar={()=> null}/>
                 </View>

                 <View style={[estiloLogin.rodape, estiloLogin.bordaArredondada, estiloLogin.margem]}>
                     <Botao tituloBotao="Cadastrar-me" aoClicar={()=> alert('ok')}/>
                     <Botao tituloBotao="Esqueci a senha" aoClicar={()=> null}/>
                 </View>
            </View>
        )
    }
}

const estiloLogin = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sombra: {
        shadowColor: '#666',
        shadowOpacity: 0.3,
        shadowRadius:30
    },
    margem: {
        margin: 5,
    },
    bordaCinza: {
        borderColor: '#666',
        borderWidth: 3,
    },
    bordaArredondada: {
        borderRadius: 30,
    },
    lembrete: {
        flex: 3,
        justifyContent:'center',
        alignItems: 'center',
        alignSelf: "stretch",
    },
  
    centroLogin: {
        flex: 5,
        width: 200,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    rodape: {
        flex: 1, 
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inputText: {
        flex: 1,
        alignSelf: 'stretch'
    }
})

