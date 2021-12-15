import React from "react";

import{
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native'

export default function Perfil() {
    return(
        <View style={styles.main}>
            <Text style={styles.mainText}>{"Tela em construção...".toUpperCase()}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    main:{
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        height: '100%',
        backgroundColor: "#F6F6F6"
    },
    mainText:{
        fontFamily:'TitilliumWeb-Regular',
        fontSize: 28,
        color: '#000'
    }
})