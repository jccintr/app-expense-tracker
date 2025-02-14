import { StyleSheet, ActivityIndicator, SafeAreaView,StatusBar } from 'react-native'
import React, {useState,useEffect,useContext} from 'react'
import AssetImage from '../components/reusable/AssetImage'
import HeightSpacer from '../components/reusable/HeightSpacer'
import { cores } from '../styles/core'
import logo from '../assets/logo320.png';
import { AuthContext } from '../context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api'

const Preload = ({navigation}) => {
    const {setLoggedUser,setToken} = useContext(AuthContext);
    const [isLoading,setIsLoading] = useState(false);

    useEffect(()=>{
        const checkToken = async () => {
            setIsLoading(true);
            
            const tokenFromStorage = await AsyncStorage.getItem('token');
            
            if (!tokenFromStorage) {
              setIsLoading(false);
              navigation.reset({routes:[{name:'login'}]});
              return;
            }
            
            try {
    
              let response = await api.validateToken(tokenFromStorage);
              if(response.status !== 200){
                setIsLoading(false);
                navigation.reset({routes:[{name:'login'}]});
                return;
              }
      
              setToken(tokenFromStorage);
              let jsonUser = await response.json(); 
              setLoggedUser(jsonUser);
              setIsLoading(false);
             navigation.reset({routes:[{name:'home'}]});
              
            } catch (error) {
              console.log(error);
              setIsLoading(false);
              Alert.alert('Erro','Falha ao acessar base de dados. Por favor, tente novamente mais tarde.');
            }
           
            
        }
        checkToken();
    }, []);



  return (
    <SafeAreaView style={styles.container}>
        <StatusBar animated={true} backgroundColor={'#fff'} barStyle="dark-content"/>
        <AssetImage radius={0} height={150} width={150} source={logo} mode={'contain'}/>
        <HeightSpacer h={20} />
        {isLoading&&<ActivityIndicator size="large" color={cores.primary}/>}
    </SafeAreaView>
  )
}

export default Preload

const styles = StyleSheet.create({

    container:{
        flex:1,
        paddingHorizontal: 20,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: '#fff'
      },

})