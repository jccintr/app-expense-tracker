import { StyleSheet, Text, View,StatusBar,SafeAreaView,TouchableOpacity,ActivityIndicator,Alert } from 'react-native'
import React,{useState,useEffect,useContext,createRef} from 'react'
import { cores } from '../styles/core'
import AntDesign from '@expo/vector-icons/AntDesign';
import { AuthContext } from '../context/AuthContext';
import api from '../api/api';
import AccountList from '../components/AccountList';
import HeightSpacer from '../components/reusable/HeightSpacer';
import Modal from 'react-native-modalbox';
import InputField from '../components/InputField';
import Botao from '../components/reusable/Botao';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Accounts = ({navigation}) => {
    const {token} = useContext(AuthContext);
    const [isLoading,setIsLoading] = useState(false);
    const [accounts,setAccounts] = useState([]);
    const [isLoadingAccount,setIsLoadingAccount] = useState(false);
    const [name,setName] = useState('');
    const [selectedAccount,setSelectedAccount] = useState(null);
    const modalNewRef = createRef();
    const modalEditRef = createRef();
    const [modalNewOpen,setModalNewOpen] = useState(false);
    const [modalEditOpen,setModalEditOpen] = useState(false);

     useEffect(()=>{
              getAccounts();
       },[]);
      

      const onEdit = (account) =>{
          setSelectedAccount(account);
          setName(account.name);
          setModalEditOpen(true);
     }
  
     const onDelete = async ()=>{
          
           Alert.alert(
            "Warning", // Título do alerta
            "Do you want delete this account ?", // Mensagem
            [
              {
                text: "Cancel",
                onPress: () => console.log("Usuário escolheu Não"),
                style: "cancel"
              },
              {
                text: "Delete",
                onPress: () => deleteAccount()
              }
            ]
          );
         }

      const deleteAccount = async () => {
            setIsLoadingAccount(true);
            const response = await api.deleteAccount(token,selectedAccount.id);
            if(response.ok){
              getAccounts();
              setIsLoadingAccount(false);
              setModalEditOpen(false);
              return;
            }
            const result = await response.json();
            const error = result.error;
            setIsLoadingAccount(false);
            Alert.alert('Error',error);
            return;
     }

     const update = async () => {
     
           if(name.trim().length===0){
             Alert.alert("Error","Please, enter a valid account name.");
             return;
            }
             setIsLoadingAccount(true);
             const response = await api.updateAccount(token,selectedAccount.id,name);
             if(response.ok){
                getAccounts();
                setIsLoadingAccount(false);
                setModalEditOpen(false);
             }
           }

      const onAdd = () => {
         setSelectedAccount(null);
         setName('');
         setModalNewOpen(true)
      }

      const add = async () => {

         if(name.trim().length===0){
          Alert.alert("Error","Please, enter a valid account name.");
          return;
         }
          setIsLoadingAccount(true);
          const response = await api.addAccount(token,name);
          if(response.ok){
             getAccounts();
             setIsLoadingAccount(false);
             setModalNewOpen(false);
          }
         
       }

        const getAccounts = async () => {
    
            setIsLoading(true)
            const response = await api.getAccounts(token);
            if(response.ok){
               const json = await response.json();
               setAccounts(json);
               setIsLoading(false)
            }       
            
        }

  return (
    <SafeAreaView style={styles.container}>
    <StatusBar animated={true} backgroundColor={cores.background} barStyle="dark-content"/>
    <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
       <Text style={styles.title}>Accounts</Text>
       <TouchableOpacity style={{backgroundColor:cores.inputBackground, padding:5,borderRadius:10}} onPress={()=>navigation.goBack()}>
           <AntDesign name="close" size={24} color="black" />
       </TouchableOpacity>
    </View>
    <HeightSpacer h={20} />
    <TouchableOpacity onPress={() => onAdd()}>
       <Text style={{color:cores.blueGray,fontSize:16}}>Add Account</Text>
    </TouchableOpacity>
    <HeightSpacer h={20} />
     {isLoading&&<ActivityIndicator color={cores.primary} size={'large'} style={{position:'absolute',top:'50%'}}/>}
     {!isLoading&&<AccountList onPress={onEdit} accounts={accounts}/>}
     <Modal isOpen={modalNewOpen} onClosed={()=>setModalNewOpen(false)} style={styles.modalNew} backgroundColor={'#ff0'} coverScreen={true} position={"bottom"} ref={modalNewRef}>
         <Text style={styles.modalTitle}>New Account</Text>
         <HeightSpacer h={20}/>
         <InputField 
            label={'Name:'} 
            placeholder={'Enter new account name'} 
            value={name} 
            onChangeText={t=>setName(t)} 
            password={false} 
            keyboard={'default'}
          />
          <Botao 
              onPress={()=>add()} 
              text={'ADD ACCOUNT'} 
              textSize={16} 
              textColor={cores.white} 
              width={'100%'} 
              backgroundColor={cores.primary} 
              borderWidth={0} 
              borderRadius={10} 
              isLoading={isLoadingAccount}
          />
    </Modal>
    <Modal isOpen={modalEditOpen} onClosed={()=>setModalEditOpen(false)}  style={styles.modalNew} backgroundColor={'#ff0'} coverScreen={true} position={"bottom"} ref={modalEditRef}>
         <Text style={styles.modalTitle}>Edit Account</Text>
         <TouchableOpacity style={styles.deleteBtn} onPress={()=>onDelete()}>
            <FontAwesome name="trash-o" size={24} color={cores.vermelho} />
         </TouchableOpacity>
         <HeightSpacer h={20}/>
         <InputField 
            label={'Name:'} 
            placeholder={'Enter account name'} 
            value={name} 
            onChangeText={t=>setName(t)} 
            password={false} 
            keyboard={'default'}
          />
          <Botao 
              onPress={()=>update()} 
              text={'UPDATE ACCOUNT'} 
              textSize={16} 
              textColor={cores.white} 
              width={'100%'} 
              backgroundColor={cores.primary} 
              borderWidth={0} 
              borderRadius={10} 
              isLoading={isLoadingAccount}
          />
    </Modal>
    
   
</SafeAreaView>
  )
}

export default Accounts

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
     body:{
      flex:1,
      width:'100%',
      alignItems:'center',
      justifyContent:'center'
     },
     modalNew: {
      alignItems:'center',
      height: 250,
      padding:20
    },
    modalTitle:{
      fontSize: 22,
      fontWeight:'bold',
      color: cores.onyxBlack
    },
    deleteBtn:{
      position:'absolute',
      top:25,
      right:30,
     
    }
})