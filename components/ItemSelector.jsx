import { StyleSheet, Text,FlatList,TouchableOpacity,View } from 'react-native';
import React from 'react';
import { cores } from '../styles/core';

const Item = ({item,selected,onSelect}) => {

  const handlePress = (item) => {
    if(item.id == selected){
       onSelect(null);
    } else {
      onSelect(item);
    }
     
  }
 
    return (
        <TouchableOpacity onPress={()=>handlePress(item)} style={[styles.container,item.id==selected?{borderColor:cores.primary,borderWidth:2}:'']}>
        <Text style={item.id==selected?{color:cores.primary,fontWeight:'bold'}:''}>{item.name}</Text>
        </TouchableOpacity>
    )
}

const ItemSelector = ({label,items,selectedItem,onSelect}) => {
  
  return (
    <View style={{height:80}}>
        <Text style={styles.label}>{label}</Text>
        <FlatList
        data={items}
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={{gap:10}}
        keyExtractor={(item)=>item.id}
        renderItem={({item})=><Item item={item} selected={selectedItem?.id} onSelect={onSelect}/>}
      />
   </View>
  )
}

export default ItemSelector

const styles = StyleSheet.create({
    container:{
        height: 50,
        borderWidth:1,
        borderColor: '#c1c1c1',
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        gap:5,
        alignItems:'center'
   },
   label:{
    fontWeight:'bold',
    marginLeft:5,
    marginBottom:5,
    color: cores.primary,
   },
})