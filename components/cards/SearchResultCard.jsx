import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { cores } from '../../styles/core'
import { formataHora, formatarMoeda,formataData } from '../../util/util'
import HeightSpacer from '../reusable/HeightSpacer'

const SearchResultCard = ({transaction}) => {
  return (
    <View style={styles.container} >
      <Text style={styles.dateText}>{formataData(transaction.createdAt)}</Text>
      <HeightSpacer h={10}/>
      <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={styles.descriptionText}>{transaction.description}</Text>
        <Text style={styles.amountText}>{formatarMoeda(transaction.amount)}</Text>
      </View>
      <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={styles.dataText}>{formataHora(transaction.createdAt)} - {transaction.category.name}</Text>
        <Text style={styles.accountText}>{transaction.account.name}</Text>
      </View>
    </View>
  )
}

export default SearchResultCard

const styles = StyleSheet.create({
    container:{
     // flexDirection:'row',
      justifyContent:'space-between',
      width:'100%',
      backgroundColor:cores.inputBackground,
      padding: 20,
      borderRadius: 20
    },
    dateText:{
        fontSize:16,
        color: cores.jetBlack,
        fontWeight: 'bold',
        textAlign:'center'
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