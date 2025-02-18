import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { cores } from '../../styles/core'
import Entypo from '@expo/vector-icons/Entypo';

const AccountCard = ({account,onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={()=>onPress(account)}>
       <Text style={styles.label}>{account.name}</Text>
       <Entypo name="chevron-small-right" size={24} color={cores.jetBlack} />
    </TouchableOpacity>
  )
}

export default AccountCard

const styles = StyleSheet.create({
    container:{
            flexDirection:'row',
            justifyContent:'space-between',
            width:'100%',
            backgroundColor:cores.inputBackground,
            padding: 20,
            borderRadius: 20
        },
        label:{
            fontSize:18,
            color: cores.jetBlack,
            fontWeight: 'bold'
        },
})