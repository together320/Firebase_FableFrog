import React from 'react'
import { TextInput, View, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default function FableSearch(props) {
  return (
    <View style={styles.container}>
        <Icon name="search" size={20} color="#706D8B" style={styles.icon}/>
        <TextInput
            style={styles.input}
            placeholder={"Search"}
            placeholderTextColor="#706D8B"
        />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor : '#EEEDF0',
        flexDirection: 'row',
        width: '100%',
        height : 56,
        padding: 17,
        borderRadius: 8,
        marginTop: 35,
    },
    input: {
        color : '#706D8B',
        fontSize: 14,
        width : 'auto',
        alignSelf: 'center',
        fontFamily : 'Nunito_400Regular'
    },
    icon: {
        marginRight: 12,
        width: '10%',
        alignSelf: 'flex-start',
    },
});