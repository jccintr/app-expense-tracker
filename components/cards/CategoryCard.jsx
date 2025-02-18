import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { cores } from '../../styles/core'
//import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
//<FontAwesome name="trash-o" size={20} color={cores.vermelho} />
const CategoryCard = ({category,onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={()=>onPress(category)}>
      <Text style={styles.label}>{category.name}</Text>
     
           <Entypo name="chevron-small-right" size={24} color={cores.jetBlack} />
     
    </TouchableOpacity>
  )
}

export default CategoryCard

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