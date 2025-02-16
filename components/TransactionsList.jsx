import { FlatList } from 'react-native'
import React from 'react'
import TransactionCard from './cards/TransactionCard'
import Separator from './reusable/Saparator'
import EmptyList from './reusable/EmptyList'



const TransactionsList = ({transactions}) => {
  return (
    <FlatList 
        showsVerticalScrollIndicator={false}
        style={{width:'100%'}}
        data={transactions}
        keyExtractor={(item)=> item.id.toString()}
        renderItem={({item})=><TransactionCard transaction={item} />}
        ItemSeparatorComponent={Separator}
        ListEmptyComponent={<EmptyList title="No transactions found" mensagem={'Please, change the date or create a new transaction'}/>}
        contentContainerStyle={transactions.length===0?{flexGrow:1,alignItems:'center',justifyContent:'center'}:''}
    />
  )
}

export default TransactionsList
