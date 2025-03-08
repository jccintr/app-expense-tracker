import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import { cores } from '../styles/core';

const NavButton = ({label,type,onPress}) => {
  return (
    <View>
      <Text>NavButton</Text>
    </View>
  )
}

export default NavButton

const styles = StyleSheet.create({
    navButton:{
        backgroundColor: cores.inputBackground,
        borderRadius: 50,
        width:35,
        height:35,
        alignItems:'center',
        justifyContent:'center'
      },
      navText:{
        fontSize: 14,
        color: cores.inputPlaceholderColor
      }
})