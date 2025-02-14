import { StyleSheet, Text, SafeAreaView,StatusBar,View,ActivityIndicator } from 'react-native'
import React, {useContext,useState,useEffect} from 'react'
import Botao from '../components/reusable/Botao'
import HeightSpacer from '../components/reusable/HeightSpacer'
import { cores } from '../styles/core'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext'
import FakeSearchField from '../components/FakeSearchField'
import Entypo from '@expo/vector-icons/Entypo';
import api from '../api/api'
import TransactionsList from '../components/TransactionsList'
import DateSelector from '../components/DateSelector'
import { formataDataAPI } from '../util/util'


const Home = ({navigation}) => {
    const {setLoggedUser,setToken,loggedUser,token} = useContext(AuthContext);
    const [isLoading,setIsLoading] = useState(false);
    const [transactions,setTransactions] = useState([]);
    const [data,setData] = useState(null);
   
    useEffect(()=>{
      const hoje = new Date(Date.now());
      setData(hoje);
  },[]);

    useEffect(()=>{
        getTransactions();
    },[data]);


  const getTransactions = async () => {
      setIsLoading(true)
     
      const response = await api.getTransactions(formataDataAPI(data),token);
      if(response.status===401){ logout();}
     
      const json = await response.json();
      setTransactions(json);
      setIsLoading(false)
  }

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
             <Text style={styles.title}>Home</Text>
             <Text style={styles.userName}>{loggedUser.name}</Text>
          </View>
          <HeightSpacer h={10}/>
          <FakeSearchField/>
          <HeightSpacer h={10}/>
          <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between'}}>
             <Text style={styles.subTitle}>Transações</Text>
            
          </View>
          <HeightSpacer h={10}/>
          <DateSelector data={data} setData={setData}/>
          {isLoading&&<ActivityIndicator color={cores.primary} size={'large'} style={{position:'absolute',top:'50%'}}/>}
          {!isLoading&&<TransactionsList transactions={transactions}/>}
         
    </SafeAreaView>
  )
}

export default Home


const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingHorizontal: 20,
    alignItems:'center',
    paddingTop: 10,
    backgroundColor: cores.background,
   
  },
  title:{
    fontSize: 26,
    fontWeight:'bold',
    color: cores.onyxBlack
   
  },
  userName:{
    fontSize: 16,
    color: cores.blueGray,
    fontWeight:'bold'
  },
  subTitle:{
     fontSize: 22,
    fontWeight:'bold',
    color: cores.onyxBlack
  }

  
})