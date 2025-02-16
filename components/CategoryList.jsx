import { StyleSheet,FlatList } from 'react-native'
import React from 'react'
import EmptyList from './reusable/EmptyList'
import CategoryCard from './cards/CategoryCard'
import HeightSpacer from './reusable/HeightSpacer'

const CategoryList = ({categories}) => {
  return (
    <FlatList 
        showsVerticalScrollIndicator={false}
        style={{width:'100%'}}
        data={categories}
        keyExtractor={(item)=> item.id.toString()}
        renderItem={({item})=><CategoryCard category={item} />}
        ItemSeparatorComponent={<HeightSpacer h={8}/>}
        ListEmptyComponent={<EmptyList title="No categories found" mensagem={'Please, create a new category'}/>}
        contentContainerStyle={categories.length===0?{flexGrow:1,alignItems:'center',justifyContent:'center'}:''}
    />
  )
}

export default CategoryList

const styles = StyleSheet.create({})