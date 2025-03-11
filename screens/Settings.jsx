import { StyleSheet, Text, View,StatusBar,SafeAreaView } from 'react-native'
import React,{useContext} from 'react'
import { cores } from '../styles/core'
import { AuthContext } from '../context/AuthContext'
import Botao from '../components/reusable/Botao'
import HeightSpacer from '../components/reusable/HeightSpacer'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Settings = ({navigation}) => {
  const {loggedUser,setLoggedUser,setToken} = useContext(AuthContext);

  const logout = async  () => {
    await AsyncStorage.removeItem('token');
    setToken(null);
    setLoggedUser(null);
    navigation.reset({routes:[{name:'login'}]})
}

  return (
    <SafeAreaView style={styles.container}>
          <StatusBar animated={true} backgroundColor={cores.background} barStyle="dark-content"/>
          <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
             <Text style={styles.title}>Settings</Text>
          </View>
         
          <View style={styles.body}>
          <Botao 
            onPress={()=>navigation.navigate('categories')} 
            text={'CATEGORIES'} 
            textSize={16} 
            textColor={cores.primary} 
            width={'100%'} 
            backgroundColor={cores.whiteSmoke} 
            borderColor={cores.primary}
            borderWidth={2} 
            borderRadius={10} 
            isLoading={false}
          />
          <HeightSpacer h={10}/>
          <Botao 
            onPress={()=>navigation.navigate('accounts')} 
            text={'ACCOUNTS'} 
            textSize={16} 
            textColor={cores.primary} 
            width={'100%'} 
            backgroundColor={cores.whiteSmoke} 
            borderColor={cores.primary}
            borderWidth={2} 
            borderRadius={10} 
            isLoading={false}
          />
         
          <HeightSpacer h={20}/>
          
          </View>
          <View style={styles.footer}>
              
              <Text style={styles.userName}>{loggedUser.name}</Text>
              <Text style={styles.userName}>{loggedUser.email}</Text>
              <HeightSpacer h={10}/>
              <Botao 
                onPress={logout} 
                text={'LOGOUT'} 
                textSize={16} 
                textColor={cores.ghostWhite} 
                width={'100%'} 
                backgroundColor={cores.primary} 
              
                borderWidth={0} 
                borderRadius={10} 
                isLoading={false}
              />
          </View>
          
         
    </SafeAreaView>
  )
}

export default Settings

const styles = StyleSheet.create({
 container:{
    flex:1,
     paddingHorizontal: 20,
     alignItems:'center',
    // justifyContent:'center',
     paddingTop: 10,
     backgroundColor: cores.background,
    
   },
   title:{
     fontSize: 26,
     fontWeight:'bold',
     color: cores.onyxBlack
    
   },
   body:{
    flex:1,
    width:'100%',
    alignItems:'center',
    justifyContent:'center'
   },
   subTitle:{
    fontSize: 20,
   fontWeight:'bold',
   color: cores.onyxBlack
 },
 userName:{
  fontSize: 16,
  color: cores.primary,
  fontWeight:'bold'
},
footer:{
  width:'100%',
  alignItems:'center',
  paddingBottom:20,
}
})