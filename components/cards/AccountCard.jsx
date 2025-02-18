import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { cores } from '../../styles/core'
//import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';

const AccountCard = ({account}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{account.name}</Text>
      <TouchableOpacity onPress={()=>{}}>
        <Entypo name="chevron-small-right" size={24} color={cores.jetBlack} />
      </TouchableOpacity>
    </View>
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