import { StyleSheet, Text, SafeAreaView,StatusBar,View,ActivityIndicator,ToastAndroid,TouchableOpacity,Alert } from 'react-native'
import React, {useContext,useState,useEffect,createRef} from 'react'
import HeightSpacer from '../components/reusable/HeightSpacer'
import { cores } from '../styles/core'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext'
import FakeSearchField from '../components/FakeSearchField'
import api from '../api/api'
import TransactionsList from '../components/TransactionsList'
import DateSelector from '../components/DateSelector'
import { formataDataAPI } from '../util/util'
import Modal from 'react-native-modalbox';
import InputField from '../components/InputField';
import Botao from '../components/reusable/Botao';
import ItemSelector from '../components/ItemSelector';
import FontAwesome from '@expo/vector-icons/FontAwesome';


const Home = ({navigation}) => {
    const {setLoggedUser,setToken,loggedUser,token} = useContext(AuthContext);
    const [isLoading,setIsLoading] = useState(false);
    const [isLoadingTransaction,setIsLoadingTransaction] = useState(false);
    const [transactions,setTransactions] = useState([]);
    const [transaction,setTransaction] = useState({description:'',amount:'',category_id:'1',account_id:'1'});
    const [selectedTransaction,setSelectedTransaction] = useState(null);
    const [data,setData] = useState(null);
    const modalNewRef = createRef();
    const modalEditRef = createRef();
    const [modalNewOpen,setModalNewOpen] = useState(false);
    const [modalEditOpen,setModalEditOpen] = useState(false);
    const [categories,setCategories] = useState([]);
    const [selectedCategory,setSelectedCategory] = useState(null);
    const [accounts,setAccounts] = useState([]);
    const [selectedAccount,setSelectedAccount] = useState(null);
   

    useEffect(()=>{
      ToastAndroid.show(`Welcome ${loggedUser.name} !`, ToastAndroid.LONG);
    },[]);


    useEffect(()=>{
      const hoje = new Date(Date.now());
      setData(hoje);
  },[]);

    useEffect(()=>{
        getTransactions();
    },[data]);

    useEffect(()=>{
      getCategories();
      getAccounts();
  },[]);


  const getTransactions = async () => {
      setIsLoading(true)
     
      const response = await api.getTransactions(formataDataAPI(data),token);
      if(response.status===401){ logout();}
     
      const json = await response.json();
      setTransactions(json);
      setIsLoading(false)
  }

  const getCategories = async () => {
  
      setIsLoading(true)
      const response = await api.getCategories(token);
      if(response.ok){
          const json = await response.json();
          setCategories(json);
          setIsLoading(false)
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

  const logout = async  () => {
    await AsyncStorage.removeItem('token');
    setToken(null);
    setLoggedUser(null);
    navigation.reset({routes:[{name:'login'}]})
}

const onEdit = (t) =>{
 
  setSelectedTransaction(transactions);
  setSelectedCategory(t.category);
  setSelectedAccount(t.account);
  setTransaction({id:t.id,description:t.description,amount:t.amount.toFixed(2),category_id:t.category.id,account_id:t.account.id});
  
  setModalEditOpen(true);
}

 const update = async () => {
     
  if(transaction.description.trim().length===0){
    Alert.alert("Error","Please, enter a valid description.");
    return;
   }
   if(transaction.amount.trim().length===0){
    Alert.alert("Error","Please, enter a valid amount.");
    return;
   }
   if(!transaction.category_id){
    Alert.alert("Error","Please, select a category.");
    return;
   }
   if(!transaction.account_id){
    Alert.alert("Error","Please, select a account.");
    return;
   }
   setIsLoadingTransaction(true);
    const response = await api.updateTransaction(token,transaction.id,transaction);
    if(response.ok){
      getTransactions();
      setIsLoadingTransaction(false);
      setModalEditOpen(false);
    }
  }

  const onDelete = async ()=>{
            
             Alert.alert(
              "Warning", // Título do alerta
              "Do you want delete this transaction ?", // Mensagem
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Usuário escolheu Não"),
                  style: "cancel"
                },
                {
                  text: "Delete",
                  onPress: () => deleteTransaction()
                }
              ]
            );
           }
  
        const deleteTransaction = async () => {
         // console.log(transaction);
              setIsLoadingTransaction(true);
              const response = await api.deleteTransaction(token,transaction.id);
              if(response.ok){
                getTransactions();
                setIsLoadingTransaction(false);
                setModalEditOpen(false);
                return;
              }
              const result = await response.json();
              const error = result.error;
              setIsLoadingTransaction(false);
              Alert.alert('Error',error);
              return;
       }

const onAdd = () => {
  setSelectedTransaction(null);
  setSelectedCategory(null);
  setSelectedAccount(null);
  setTransaction({description:'',amount:'',category_id:null,account_id:null});
  setModalNewOpen(true)
}

  const add = async () => {

         if(transaction.description.trim().length===0){
          Alert.alert("Error","Please, enter a valid description.");
          return;
         }
         if(transaction.amount.trim().length===0){
          Alert.alert("Error","Please, enter a valid amount.");
          return;
         }
         if(!transaction.category_id){
          Alert.alert("Error","Please, select a category.");
          return;
         }
         if(!transaction.account_id){
          Alert.alert("Error","Please, select a account.");
          return;
         }
          setIsLoadingTransaction(true);
          const response = await api.addTransaction(token,transaction);
          if(response.ok){
            getTransactions();
             setIsLoadingTransaction(false);
             setModalNewOpen(false);
          }
         
    }

    const selectCategory = (category) => {
      setTransaction({ ...transaction, category_id: category.id });
      setSelectedCategory(category);
    }

    const selectAccount = (account) => {
      setTransaction({ ...transaction, account_id: account.id });
      setSelectedAccount(account);
    }

  return (
     <SafeAreaView style={styles.container}>
          <StatusBar animated={true} backgroundColor={cores.background} barStyle="dark-content"/>
          <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
             <Text style={styles.title}>Expense Tracker</Text>
             <Text style={styles.userName}>{loggedUser.name}</Text>
          </View>
          <HeightSpacer h={10}/>
          <FakeSearchField/>
          <HeightSpacer h={10}/>
          <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between'}}>
             <Text style={styles.subTitle}>Transactions</Text>
             <TouchableOpacity onPress={() => onAdd()}>
                    <Text style={{color:cores.blueGray,fontSize:16}}>Add</Text>
             </TouchableOpacity>
          </View>
          <HeightSpacer h={10}/>
          <DateSelector data={data} setData={setData}/>
          {isLoading&&<ActivityIndicator color={cores.primary} size={'large'} style={{position:'absolute',top:'50%'}}/>}
          {!isLoading&&<TransactionsList transactions={transactions} onPress={onEdit}/>}
          <Modal isOpen={modalNewOpen} onClosed={()=>setModalNewOpen(false)} style={styles.modal} backgroundColor={'#ff0'} coverScreen={true} position={"bottom"} ref={modalNewRef}>
              <Text style={styles.modalTitle}>New Transaction</Text>
              <HeightSpacer h={20}/>
              <InputField 
                  label={'Description:'} 
                  placeholder={'Enter transaction description'} 
                  value={transaction.description} 
                  onChangeText={t=>setTransaction({ ...transaction, description: t })} 
                  password={false} 
                  keyboard={'default'}
                />
                <InputField 
                  label={'Amount:'} 
                  placeholder={'Enter transaction amount'} 
                  value={transaction.amount} 
                  onChangeText={t=>setTransaction({ ...transaction, amount: t })} 
                  password={false} 
                  keyboard={'number-pad'}
                />
                <ItemSelector items={categories}  label="Category" selectedItem={selectedCategory} onSelect={selectCategory}/>
                <ItemSelector items={accounts}  label="Account" selectedItem={selectedAccount} onSelect={selectAccount}/>
                <HeightSpacer h={10}/>
                <Botao 
                    onPress={()=>add()} 
                    text={'ADD TRANSACTION'} 
                    textSize={16} 
                    textColor={cores.white} 
                    width={'100%'} 
                    backgroundColor={cores.primary} 
                    borderWidth={0} 
                    borderRadius={10} 
                    isLoading={isLoadingTransaction}
                />
          </Modal>
          <Modal isOpen={modalEditOpen} onClosed={()=>setModalEditOpen(false)} style={styles.modal} backgroundColor={'#ff0'} coverScreen={true} position={"bottom"} ref={modalEditRef}>
              <Text style={styles.modalTitle}>Edit Transaction</Text>
              <TouchableOpacity style={styles.deleteBtn} onPress={()=>onDelete()}>
                 <FontAwesome name="trash-o" size={24} color={cores.vermelho} />
              </TouchableOpacity>
              <HeightSpacer h={20}/>
              <InputField 
                  label={'Description:'} 
                  placeholder={'Enter transaction description'} 
                  value={transaction.description} 
                  onChangeText={t=>setTransaction({ ...transaction, description: t })} 
                  password={false} 
                  keyboard={'default'}
                />
                <InputField 
                  label={'Amount:'} 
                  placeholder={'Enter transaction amount'} 
                  value={transaction.amount} 
                  onChangeText={t=>setTransaction({ ...transaction, amount: t })} 
                  password={false} 
                  keyboard={'number-pad'}
                />
                <ItemSelector items={categories}  label="Category" selectedItem={selectedCategory} onSelect={selectCategory}/>
                <ItemSelector items={accounts}  label="Account" selectedItem={selectedAccount} onSelect={selectAccount}/>
                <HeightSpacer h={10}/>
                <Botao 
                    onPress={()=>update()} 
                    text={'UPDATE TRANSACTION'} 
                    textSize={16} 
                    textColor={cores.white} 
                    width={'100%'} 
                    backgroundColor={cores.primary} 
                    borderWidth={0} 
                    borderRadius={10} 
                    isLoading={isLoadingTransaction}
                />
          </Modal>
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
  },
  modal: {
    alignItems:'center',
    height: 500,
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
    right:30
  }

  
})