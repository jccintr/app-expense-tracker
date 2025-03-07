import { FlatList,View } from 'react-native'
import React from 'react'
import TransactionCard from './cards/TransactionCard'
import EmptyList from './reusable/EmptyList'
import HeightSpacer from './reusable/HeightSpacer'



const TransactionsList = ({transactions,onPress}) => {
  return (
    <>
    <HeightSpacer h={10}/>
    <FlatList 
        showsVerticalScrollIndicator={false}
        style={{width:'100%'}}
        data={transactions}
        keyExtractor={(item)=> item.id.toString()}
        renderItem={({item})=><TransactionCard transaction={item} onPress={onPress}/>}
        ItemSeparatorComponent={<HeightSpacer h={8}/>}
        ListEmptyComponent={<EmptyList title="No transactions found" mensagem={'Please, change the date or create a new transaction'}/>}
        contentContainerStyle={transactions.length===0?{flexGrow:1,alignItems:'center',justifyContent:'center'}:''}
    />
    </>
  )
}

export default TransactionsList
