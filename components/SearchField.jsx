import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import { cores } from '../styles/core'
import FontAwesome from '@expo/vector-icons/FontAwesome';

const SearchField = ({value,onChangeText}) => {
  return (
    <View style={styles.container}>
       <FontAwesome name="search" size={22} color={cores.searchIconColor} />
       <TextInput style={styles.input}
            placeholder={'Transaction description'}
            value={value}
            onChangeText={onChangeText}
            placeholderTextColor={'#a1a1a1'}
        />
     </View>
  )
}

export default SearchField

const styles = StyleSheet.create({
    container:{
        backgroundColor: cores.inputBackground,
        width: '100%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        padding: 10,
        gap: 10
    },
    input: {
        flex: 1,
        fontSize: 14,
        color: '#000',
        height: 48,
       // backgroundColor:'#ff0'
      },
})