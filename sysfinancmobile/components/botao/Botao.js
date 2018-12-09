import React from 'react';
import {Button, TouchableOpacity, Text, StyleSheet} from 'react-native';

export class Botao extends React.Component {

    constructor(props){
        super(props); 
    }

    render() {
        return (
          <TouchableOpacity onPress={()=> this.props.aoClicar()} style={[styles.botaoDefault, styles.sombra]} >
            <Text>{this.props.tituloBotao}</Text>
         </TouchableOpacity>
        )
    };
}

const styles = StyleSheet.create({
    botaoDefault: {
        //backgroundColor: '#fff'
    },
    sombra: {
        shadowColor: '#666',
        shadowOpacity: 0.3,
        shadowRadius:30
    },    
})

/**
 *   <TouchableOpacity onPress={props.onPress} style={styles.touchable} disabled={props.loading}>
      <Text>{props.loading ? '↻' : props.content}</Text>
    </TouchableOpacity>
 * 
 */