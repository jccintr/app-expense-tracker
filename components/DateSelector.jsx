import { StyleSheet, Text, View,Pressable } from 'react-native'
import React from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import { cores } from '../styles/core';
import { formataData } from '../util/util';

const DateSelector = ({data,setData}) => {


    const nextDay = () => {
        const newDate = new Date(data);
        newDate.setDate(data.getDate() + 1);
        setData(newDate);
    }

    const previousDay = () => {
        const newDate = new Date(data);
        newDate.setDate(data.getDate() - 1);
        setData(newDate);
    }


  return (
    <View style={styles.container}>
       <Pressable onPress={previousDay}>
          <Entypo name="chevron-left" size={44} color={cores.primary} />
       </Pressable>
       <Pressable  onPress={()=>{}}>
          <Text style={{fontSize:20,fontWeight:'bold'}}>{formataData(data)}</Text>
       </Pressable>
       <Pressable onPress={nextDay}>
          <Entypo name="chevron-right" size={44} color={cores.primary} />
       </Pressable>
    </View>
  )
}

export default DateSelector

const styles = StyleSheet.create({
    container:{
       width:'100%',
       flexDirection:'row',
     
       alignItems:'center',
       justifyContent:'space-around'
    }
})