import { StyleSheet, Text, View,SafeAreaView,ScrollView } from 'react-native'
//import React from 'react'
import { cores } from '../styles/core'
import HeightSpacer from '../components/reusable/HeightSpacer'
import WeeklyChart from '../components/charts/WeeklyChart'
import DonutChart from '../components/charts/DonutChart'



const Charts = () => {
  return (
     <SafeAreaView style={styles.container}>
       <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroolView} >
           <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <Text style={styles.title}>Charts</Text>
           </View>
            <HeightSpacer h={20}/>
            <WeeklyChart/>
            <HeightSpacer h={10}/>
            <DonutChart/>
        </ScrollView> 
    </SafeAreaView>
  )
}

export default Charts

const styles = StyleSheet.create({
  container:{
    flex:1,
     backgroundColor: cores.background,
   },
    scroolView:{
      paddingHorizontal: 20,
      alignItems:'center',
      paddingTop: 10,
      paddingBottom:20
    },
   title:{
     fontSize: 26,
     fontWeight:'bold',
     color: cores.onyxBlack
  },
})