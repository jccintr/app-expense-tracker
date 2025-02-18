import { StyleSheet,FlatList } from 'react-native'
import React from 'react'
import EmptyList from './reusable/EmptyList'
import AccountCard from './cards/AccountCard'
import HeightSpacer from './reusable/HeightSpacer'

const AccountList = ({accounts,onPress}) => {
  return (
    <FlatList 
        showsVerticalScrollIndicator={false}
        style={{width:'100%'}}
        data={accounts}
        keyExtractor={(item)=> item.id.toString()}
        renderItem={({item})=><AccountCard account={item} onPress={onPress} />}
        ItemSeparatorComponent={<HeightSpacer h={8}/>}
        ListEmptyComponent={<EmptyList title="No accounts found" mensagem={'Please, create a new account'}/>}
        contentContainerStyle={accounts.length===0?{flexGrow:1,alignItems:'center',justifyContent:'center'}:''}
    />
  )
}

export default AccountList

const styles = StyleSheet.create({})