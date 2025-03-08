import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import { cores } from '../styles/core';

const NavButton = ({label,type,onPress}) => {
  return (
    <View style={{alignItems:'center',justifyContent:'center'}}>
        <TouchableOpacity style={styles.navButton} onPress={onPress}>
        <Entypo name={type=='next'?'chevron-right':'chevron-left'} size={30} color={cores.inputPlaceholderColor} />
        </TouchableOpacity>
        <Text style={styles.navText}>{label}</Text>
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