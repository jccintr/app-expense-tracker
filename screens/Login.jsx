import { StyleSheet, SafeAreaView,StatusBar,TouchableOpacity,Text,Alert } from 'react-native'
import React, {useState,useContext} from 'react'
import AssetImage from '../components/reusable/AssetImage'
import HeightSpacer from '../components/reusable/HeightSpacer'
import { cores } from '../styles/core'
import logo from '../assets/logo320.png';
import InputField from '../components/InputField'
import Botao from '../components/reusable/Botao'
import { AuthContext } from '../context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api'


const Login = ({navigation}) => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [isLoading,setIsLoading] = useState(false);
  const {setLoggedUser,setToken} = useContext(AuthContext);


  const login = async () => {
   
    if(email.trim().length === 0){
      Alert.alert('Atenção',"Informe o email por favor.");
      return;
    }
    
    if(password.trim().length === 0){
      Alert.alert('Atenção',"Informe todos os campos por favor.");
      return;
    }
  
    setIsLoading(true);
  
    try {
       var response = await api.login(email, password);
    } catch (error) {
      Alert.alert('Erro','Serviço indisponível. Tente novamente mais tarde.')
      setIsLoading(false);
      return;
    }
   
    
    if(response.status!==200){
      Alert.alert('Atenção','Email e ou senha inválidos.')
      setPassword('');
      setIsLoading(false);
      return;
    }
   
     const jsonToken = await response.json();
     if (jsonToken.token) await AsyncStorage.setItem('token', jsonToken.token);
     setToken(jsonToken.token);

     try {
       response = await api.validateToken(jsonToken.token);
     } catch (error) {
       Alert.alert('Erro','Serviço indisponível. Tente novamente mais tarde.')
       setIsLoading(false);
       return;
     }
    
     if(response.ok){
        let jsonUser = await response.json();
        setLoggedUser(jsonUser);
        setIsLoading(false);
        navigation.reset({routes:[{name:'home'}]}); 
     }
    
  
  }



  return (
    <SafeAreaView style={styles.container}>
         
    <StatusBar animated={true} backgroundColor={cores.background} barStyle="dark-content"/>
    <AssetImage radius={0} height={150} width={150} source={logo} mode={'contain'}/>
    <HeightSpacer h={40}/>
    <InputField 
        label={'Email:'} 
        placeholder={'Informe o seu Email'} 
        valule={email} 
        onChangeText={t=>setEmail(t)} 
        password={false} 
        keyboard={'email-address'}
    />
    <InputField 
        label={'Senha:'} 
        placeholder={'Informe a sua Senha'} 
        valule={password} 
        onChangeText={t=>setPassword(t)} 
        password={true} 
        keyboard={'default'}
    />
    <Botao 
        onPress={login} 
        text={'ENTRAR'} 
        textSize={16} 
        textColor={cores.white} 
        width={'100%'} 
        backgroundColor={cores.primary} 
        borderWidth={0} 
        borderRadius={10} 
        isLoading={isLoading}
    />
    <HeightSpacer h={10}/>
   
    <TouchableOpacity onPress={()=>navigation.navigate('cadastro')} >
          <Text>Não tem uma conta ? <Text style={{color:cores.primary,fontWeight:'bold'}}>Cadastre-se !</Text></Text>
    </TouchableOpacity>
 
</SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingHorizontal: 20,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: cores.background
  },

  
})