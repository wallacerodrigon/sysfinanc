import {createStackNavigator, createAppContainer} from 'react-navigation';
import LoginComponent from './components/login/LoginComponent';
import HomeScreen from './components/home/Home';
import React from 'react';

import {TELA_LOGIN} from './constantes/AppScreenNames';
import EsqueciSenha from './components/esqueci-senha/EsqueciSenha';
import Cadastro from './components/perfil/Cadastro';
import RubricaScreen from './components/rubricas/RubricaComponent';
import DashboardScreen from './components/dashboard/DashboardScreen';

const AppNavigator = createStackNavigator(
    {
        login: {screen: LoginComponent},
        home: {screen: HomeScreen},
        esqueciSenha: {screen: EsqueciSenha},
        cadastro: {screen: Cadastro},
        listaRubricas: {screen: RubricaScreen},
        dashboardScreen: {screen: DashboardScreen }
    },
    {
        initialRouteName: TELA_LOGIN,
    }
     
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
 