import { StyleSheet, Text, View,StatusBar,SafeAreaView } from 'react-native'
import React,{useState,useEffect,useContext} from 'react'
import { cores } from '../styles/core'
import SearchField from '../components/SearchField'
import HeightSpacer from '../components/reusable/HeightSpacer'
import api from '../api/api'
import ItemSelector from '../components/ItemSelector'
import { AuthContext } from '../context/AuthContext'
import DateRangeSelector from '../components/DateRangeSelector'
import Botao from '../components/reusable/Botao'

const Search = () => {
  const {token} = useContext(AuthContext);
  const [searchText,setSearchText] = useState('');
  const [categories,setCategories] = useState([]);
  const [selectedCategory,setSelectedCategory] = useState(null);
  const [accounts,setAccounts] = useState([]);
  const [selectedAccount,setSelectedAccount] = useState(null);
  const [isLoading,setIsLoading] = useState([]);
  const [fromDate,setFromDate] = useState(null);
  const [untilDate,setUntilDate] = useState(null);
  


    useEffect(()=>{
        getCategories();
       getAccounts();
    },[]);

      useEffect(()=>{
          const hoje = new Date(Date.now());
          setFromDate(hoje);
          setUntilDate(hoje);
      },[]);

    const selectCategory = (category) => {
     
      setSelectedCategory(category);
    }

    const selectAccount = (account) => {
      
      setSelectedAccount(account);
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

  return (
    <SafeAreaView style={styles.container}>
       <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
            <Text style={styles.title}>Search</Text>
       </View>
       <HeightSpacer h={10}/>
       <SearchField value={searchText} onChangeText={(t)=>setSearchText(t)}/>
       <HeightSpacer h={10}/>
       <ItemSelector items={categories}  label="Filter By Category" selectedItem={selectedCategory} onSelect={selectCategory}/>
       <HeightSpacer h={10}/>
       <ItemSelector items={accounts}  label="Filter By Account" selectedItem={selectedAccount} onSelect={selectAccount}/>
       <HeightSpacer h={10}/>
       <DateRangeSelector label={'Select Date Range'} fromDate={fromDate} setFromDate={setFromDate} untilDate={untilDate} setUntilDate={setUntilDate}/>
       <HeightSpacer h={10}/>
       <Botao 
        onPress={()=>{}} 
        text={'SEARCH'} 
        textSize={16} 
        textColor={cores.white} 
        width={'100%'} 
        backgroundColor={cores.primary} 
        borderWidth={0} 
        borderRadius={10} 
        isLoading={false}
    />
    </SafeAreaView>
  )
}

export default Search

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
})