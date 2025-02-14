import { StyleSheet, SafeAreaView,StatusBar,TouchableOpacity,Text,ToastAndroid,Alert } from 'react-native'
import React, {useState} from 'react'
import AssetImage from '../components/reusable/AssetImage'
import HeightSpacer from '../components/reusable/HeightSpacer'
import { cores } from '../styles/core'
import logo from '../assets/logo320.png';
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
    <HeightSpacer h={40}/>
    <InputField 
        label={'Nome:'} 
        placeholder={'Informe o seu Nome'} 
        valule={name} 
        onChangeText={t=>setName(t)} 
        password={false} 
        keyboard={'default'}
    />
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
    <InputField 
        label={'Confirme a Senha:'} 
        placeholder={'Confirme a sua Senha'} 
        valule={password2} 
        onChangeText={t=>setPassword2(t)}
        password={true} 
        keyboard={'default'}
    />
    <Botao 
        onPress={()=>cadastrar()} 
        text={'CADASTRAR'} 
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
    <Text>Já tem uma conta ? <Text style={{color:cores.primary,fontWeight:'bold'}}>Entre !</Text></Text>
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

  
})