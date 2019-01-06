import {createStackNavigator, createAppContainer} from 'react-navigation';
import LoginComponent from './components/login/LoginComponent';
import HomeScreen from './components/home/Home';
import React from 'react';

import TELA_HOME from './constantes/AppConstantes';
//import EsqueciSenha from './components/esqueci-senha/EsqueciSenha';
//import Cadastro from './components/perfil/Cadastro';

const AppNavigator = createStackNavigator(
    {
        login: {screen: LoginComponent},
        home: {screen: HomeScreen},
       // esqueciSenha: {screen: EsqueciSenha},
        //cadastro: {screen: Cadastro}
    },
    {
        initialRouteName: 'login',
    }
     
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
 