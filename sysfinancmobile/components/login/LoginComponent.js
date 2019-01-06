import React, { Component } from 'react';
import {View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, Image} from 'react-native';

import Botao from '../botao/Botao';
import EstilosComuns from '../../assets/estilos/estilos';
const imgLogo = require('../../assets/img/logo-login.png');
 
export default class LoginComponent extends Component {

    constructor(props){
        super(props);
      
    }

    render() {

        return (
            <View
            style={[EstilosComuns.container]}>
            <View style={styles.header}>
                <Image source={imgLogo}/>
                <Text style={[EstilosComuns.fontePadrao, styles.headerEntrada]}>Para entrar,</Text>
                <Text style={[EstilosComuns.fontePadrao, styles.headerMensagem]}>informe seu login e senha</Text>
            </View>

            <View style={styles.central}>
                <TextInput style={styles.inputText} placeholder="Login"></TextInput>
                <TextInput style={styles.inputText} placeholder="Senha"></TextInput>

                <Botao tituloBotao='Entrar'  onClick={()=> alert('entrar')}/>
            </View>

            <View style={styles.footer}>
                <Botao tituloBotao='Cadastrar-me' styles={styles.botoesFooter} onClick={()=> alert('cadastrar')}/>
                <Botao tituloBotao='Esqueci a senha' styles={styles.botoesFooter} onClick={()=> alert('esqueci')}/>
            </View>
          </View>            
        )
    }
};


const styles = StyleSheet.create({
    header: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center',
        padding: 3
    },

    headerEntrada: {
        fontWeight: 'bold',
        fontSize: 35,
    },
    headerMensagem: {
        fontSize: 20
    },
    central: {
        flex: 3,
        flexDirection: 'column',
        padding: 5
    },
    footer: {
        flex: 1,
        flexDirection: 'row', 
        justifyContent: 'space-between',
    },
    inputText: {
        borderBottomWidth: 1,
        borderColor: '#666',
        textAlign: 'center'
    },

    botoesFooter: {
        backgroundColor: '#fff',
        borderWidth: 0,
        borderBottomWidth: 1
    }
  });