import { FlatList } from 'react-native'
import React from 'react'
import SearchResultCard from './cards/SearchResultCard'
import HeightSpacer from './reusable/HeightSpacer'


const SearchResultsList = ({transactions,onPress}) => {
  return (
    <>
    <HeightSpacer h={10}/>
    <FlatList 
        showsVerticalScrollIndicator={false}
        style={{width:'100%'}}
        data={transactions}
        keyExtractor={(item)=> item.id.toString()}
        renderItem={({item})=><SearchResultCard transaction={item} />}
        ItemSeparatorComponent={<HeightSpacer h={8}/>}
        contentContainerStyle={transactions.length===0?{flexGrow:1,alignItems:'center',justifyContent:'center'}:''}
    />
    </>
  )
}

export default SearchResultsList
