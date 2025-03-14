import { StyleSheet, SafeAreaView,StatusBar,TouchableOpacity,Text,ToastAndroid,Alert } from 'react-native'
import React, {useState} from 'react'
import AssetImage from '../components/reusable/AssetImage'
import HeightSpacer from '../components/reusable/HeightSpacer'
import { cores } from '../styles/core'
import logo from '../assets/logo-350x200.png';
import InputField from '../components/InputField'
import Botao from '../components/reusable/Botao'
import api from '../api/api'


const Cadastro = ({navigation}) => {
  
  const [isLoading,setIsLoading] = useState(false);
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [password2,setPassword2] = useState('');

  const cadastrar = async () => {
   
    if(name.trim().length==0){
      Alert.alert('Atenção','Informe o nome por favor.');
      return;
    }

    if(email.trim().length==0){
      Alert.alert('Atenção','Informe o email por favor.');
      return;
    }

    if(password.trim().length==0 || password2.trim().length==0){
      Alert.alert('Atenção','Informe as senhas por favor.');
      return;
    }
    
   
    setIsLoading(true);
  
    try {
  
      var response = await api.cadastro(name,email,password);
     
    } catch (error) {
      console.log(error);
      Alert.alert('Erro','Serviço indisponível. Tente novamente mais tarde.')
      setIsLoading(false);
      return;
    }

    if(!response.ok){
       if(response.status==409){
           Alert.alert('Erro','Email já cadastrado.');
       }
       setIsLoading(false);
       return;
    }
    setIsLoading(false);
    ToastAndroid.show('Conta criada com sucesso !', ToastAndroid.SHORT);
    navigation.reset({routes:[{name:'login'}]});
    return;
  }




  return (
    <SafeAreaView style={styles.container}>
         
    <StatusBar animated={true} backgroundColor={cores.background} barStyle="dark-content"/>
    <AssetImage radius={0} height={150} width={150} source={logo} mode={'contain'}/>
    <Text style={styles.title}>EXPENSE TRACKER REGISTER</Text>
    <HeightSpacer h={40}/>
    <InputField 
        label={'Name:'} 
        placeholder={'Enter your name'} 
        valule={name} 
        onChangeText={t=>setName(t)} 
        password={false} 
        keyboard={'default'}
    />
    <InputField 
        label={'Email:'} 
        placeholder={'Enter your email'} 
        valule={email} 
        onChangeText={t=>setEmail(t)}
        password={false} 
        keyboard={'email-address'}
    />
    <InputField 
        label={'Password:'} 
        placeholder={'Enter your password'} 
        valule={password} 
        onChangeText={t=>setPassword(t)}
        password={true} 
        keyboard={'default'}
    />
    <InputField 
        label={'Confirm Password:'} 
        placeholder={'Confirm your password'} 
        valule={password2} 
        onChangeText={t=>setPassword2(t)}
        password={true} 
        keyboard={'default'}
    />
    <Botao 
        onPress={()=>cadastrar()} 
        text={'REGISTER'} 
        textSize={16} 
        textColor={cores.white} 
        width={'100%'} 
        backgroundColor={cores.primary} 
        borderWidth={0} 
        borderRadius={10} 
        isLoading={isLoading}
    />
    <HeightSpacer h={10}/>
   
    <TouchableOpacity onPress={()=>navigation.navigate('login')} >
    <Text>Already have an account ? <Text style={{color:cores.primary,fontWeight:'bold'}}>Login !</Text></Text>
    </TouchableOpacity>
 
</SafeAreaView>
  )
}

export default Cadastro

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingHorizontal: 20,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: cores.background
  },
  title:{
    fontSize: 18,
    fontWeight:'bold',
    color:cores.primary
  }

  
})