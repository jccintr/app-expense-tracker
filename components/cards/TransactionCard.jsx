import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { cores } from '../../styles/core'
import { formataHora, formatarMoeda } from '../../util/util'

const TransactionCard = ({transaction,onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={()=>onPress(transaction)}>
      <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={styles.descriptionText}>{transaction.description}</Text>
        <Text style={styles.amountText}>{formatarMoeda(transaction.amount)}</Text>
      </View>
      <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={styles.dataText}>{formataHora(transaction.createdAt)} - {transaction.category.name}</Text>
        <Text style={styles.accountText}>{transaction.account.name}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default TransactionCard

const styles = StyleSheet.create({
    container:{
     // flexDirection:'row',
      justifyContent:'space-between',
      width:'100%',
      backgroundColor:cores.inputBackground,
      padding: 20,
      borderRadius: 20
    },
    descriptionText:{
        fontSize:16,
        color: cores.jetBlack,
        fontWeight: 'bold'
    },
    amountText:{
        fontSize: 16,
        color: cores.vermelho
    },
    dataText:{
        fontSize: 12,
    },
    accountText:{
        fontSize: 12,
    }
})