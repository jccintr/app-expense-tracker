import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { cores } from '../../styles/core'
import FontAwesome from '@expo/vector-icons/FontAwesome';

const CategoryCard = ({category}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{category.name}</Text>
      <TouchableOpacity onPress={()=>{}}>
         <FontAwesome name="trash-o" size={20} color={cores.vermelho} />
      </TouchableOpacity>
    </View>
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