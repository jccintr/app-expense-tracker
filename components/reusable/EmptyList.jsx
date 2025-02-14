import { StyleSheet,Text,View } from 'react-native';
import React from 'react';
import { cores } from '../../styles/core';
import empty from '../../assets/empty.png';
import AssetImage from './AssetImage';
import HeightSpacer from './HeightSpacer';
HeightSpacer


const EmptyList = ({title,mensagem}) => {
    return (
    <View style={styles.container}>
       <AssetImage radius={0} height={120} width={120} source={empty} mode={'contain'}/>
       <HeightSpacer h={20}/>
       <Text style={{fontSize:16,fontWeight:'bold'}}>{title}</Text>
       <HeightSpacer h={10}/>
       <Text style={{color: cores.ashGray, fontWeight:'bold',textAlign:'center'}}>{mensagem}</Text>
    </View>
   
    )
}

export default EmptyList

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingHorizontal: 20,
    alignItems:'center',
    justifyContent:'center'
   
  }

  
})
