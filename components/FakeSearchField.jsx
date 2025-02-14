import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { cores } from '../styles/core';

const FakeSearchField = () => {
  return (
    <View style={styles.container}>
        <FontAwesome name="search" size={22} color={cores.searchIconColor} />
      <Text style={{fontSize: 14, color: cores.inputPlaceholderColor}}>Pesquisar</Text>
    </View>
  )
}

export default FakeSearchField

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
    }
})