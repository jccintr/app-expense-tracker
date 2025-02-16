import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Charts = () => {
  return (
    <View style={styles.container}>
      <Text>Charts</Text>
    </View>
  )
}

export default Charts

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})