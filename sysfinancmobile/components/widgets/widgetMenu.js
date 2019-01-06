import React from 'react';
import {Text, StyleSheet, View, Dimensions, Image} from 'react-native';

const WidgetMenu = ({ itemMenu }) => (
    <View style={styles.conteiner}>
        <View style={styles.widget}>
            <Image source={itemMenu.icon} style={styles.icone}/>
            <Text onPress={() => itemMenu.onClick()} >
                 {itemMenu.title}
            </Text> 
        </View>
    </View>
) 

const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        padding: 5,
        height: Dimensions.get('window').width /2,
    },
    widget: {
        flex: 1,
        borderWidth: 1, 

    },
    icone: {
        width: "100%", 
        height: "50%"
    }
});

export default WidgetMenu;