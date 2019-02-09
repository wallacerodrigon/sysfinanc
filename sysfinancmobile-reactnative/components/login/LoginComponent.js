import React, { Component } from 'react';
import {View, Text, StyleSheet, TextInput, Image} from 'react-native';

import Botao from '../botao/Botao';
import EstilosComuns from '../../assets/estilos/estilos';
import AppScreenNames from '../../constantes/AppScreenNames';
import {Speech} from 'expo';

const imgLogo = require('../../assets/img/logo-login.png');
 
export default class LoginComponent extends Component {
   
    static navigationOptions = {
        title: 'Sysfinanc VI',
        headerTitleStyle: {
            fontWeight: 'bold',
          },
      };

    constructor(){
        super()
    }

    efetuarLogin = () => {
        this.props.navigation.navigate(AppScreenNames.TELA_HOME);
    }

    executarNovoCadastro= () => {
        this.props.navigation.navigate(AppScreenNames.TELA_CADASTRO);
    }

    executarEsqueciSenha = ()=> {
        this.props.navigation.navigate(AppScreenNames.TELA_ESQUECI_SENHA);
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
                <TextInput style={styles.inputText} placeholder="Login"  maxLength = {10}></TextInput>
                <TextInput style={styles.inputText} placeholder="Senha"  maxLength = {10} secureTextEntry textContentType="password" ></TextInput>

                <Botao tituloBotao='Login'  onClick={()=>this.efetuarLogin()}/>
            </View>

            <View style={styles.footer}>
                <Botao tituloBotao='Cadastrar-me'  onClick={() => this.executarNovoCadastro()}/>
                <Botao tituloBotao='Esqueci a senha' onClick={() =>this.executarEsqueciSenha()}/>
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
  });