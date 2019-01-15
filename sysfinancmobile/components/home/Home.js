import React from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import EstilosComuns from '../../assets/estilos/estilos';
import AppScreenNames from '../../constantes/AppScreenNames';
import menus from '../../assets/menus-home.json';
import WidgetMenu from '../widgets/widgetMenu';
import Botao from '../botao/Botao';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Home',
      };

    constructor(){
        super()
    }

    retornarLogin = () => {
        this.props.navigation.navigate(AppScreenNames.TELA_LOGIN);
        
    }

    abrirTela(){
       // this.props.navigation.navigate(item.screen);
       alert('ok')
    }

    render() {
        return (
            <View style={EstilosComuns.container}>
                <View style={styles.lista}>
                    <FlatList
                        data={menus}
                        renderItem = {({ item }) => 
                            <WidgetMenu itemMenu={item} onClick={()=> this.abrirTela()}
                                icone={require("../../assets/icons/lancamentos.jpeg")}
                            />
                        }
                        keyExtractor={item => item.key}
                        numColumns={2}
                    />
                </View>

                <View style={styles.footer}>
                    <Botao tituloBotao='Sair' onClick={() => this.retornarLogin()}/>

                </View>
            </View>
        )
    };
}

const styles = StyleSheet.create({
    lista: {
        flex: 6
    },
    footer: {
        flex: 1,
        flexDirection: 'row', 
        justifyContent: 'flex-end', 
        padding: 5       
    }, 

})

//axios.get(url)
//retorna promise --> then(resp => resp.data)

