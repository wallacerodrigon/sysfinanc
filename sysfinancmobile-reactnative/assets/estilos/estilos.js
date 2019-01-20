import {StyleSheet, Dimensions} from 'react-native';

const EstilosComuns = StyleSheet.create({
    container: {
        height: '100%',
        padding: 5,
        flexDirection: 'column',
        borderWidth: 1,
        borderColor: '#666'
    },
    sombra: {
        shadowColor: '#666',
        shadowOpacity: 0.3,
        shadowRadius:30
    },
    fontePadrao: {
        fontFamily:'Roboto'
    },
    botao: {
        backgroundColor: '#fff',
        borderColor: '#666',
        height: 30,
        marginTop: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        shadowColor: '#666',
        
    }
});

export default EstilosComuns;

