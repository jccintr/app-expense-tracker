import { StyleSheet, Text, View,SafeAreaView,ToastAndroid,TouchableOpacity,ActivityIndicator } from 'react-native'
import React,{useState,useEffect,useContext,createRef} from 'react'
import { cores } from '../styles/core'
import SearchField from '../components/SearchField'
import HeightSpacer from '../components/reusable/HeightSpacer'
import api from '../api/api'
import ItemSelector from '../components/ItemSelector'
import { AuthContext } from '../context/AuthContext'
import DateRangeSelector from '../components/DateRangeSelector'
import Botao from '../components/reusable/Botao'
import { formataDataAPI } from '../util/util'
import Modal from 'react-native-modalbox';
import AntDesign from '@expo/vector-icons/AntDesign';
import SearchResultsList from '../components/SearchResultsList'

const Search = () => {
  const {token} = useContext(AuthContext);
  const [searchText,setSearchText] = useState('');
  const [categories,setCategories] = useState([]);
  const [selectedCategory,setSelectedCategory] = useState(null);
  const [accounts,setAccounts] = useState([]);
  const [selectedAccount,setSelectedAccount] = useState(null);
  const [isLoading,setIsLoading] = useState(false);
  const [isLoadingScreen,setIsloadingScreen] = useState(false);
  const [fromDate,setFromDate] = useState(null);
  const [untilDate,setUntilDate] = useState(null);
  const modalResultsRef = createRef();
  const [modalResultsOpen,setModalResultsOpen] = useState(false);
  const [searchResults,setSearchResults] = useState([]);
  


    useEffect(()=>{
       setIsloadingScreen(true)
        getCategories();
       getAccounts();
       setIsloadingScreen(false);
    },[]);

      useEffect(()=>{
          const hoje = new Date(Date.now());
          const y = hoje.getFullYear();
          const startDate = new Date(y+'-01-01'+'T00:00:00.000Z');
          setFromDate(startDate);
          setUntilDate(hoje);
      },[]);

    const selectCategory = (category) => {
     
      setSelectedCategory(category);
    }

    const selectAccount = (account) => {
      
      setSelectedAccount(account);
    }

  const getCategories = async () => {
    
      const response = await api.getCategories(token);
      if(response.ok){
          const json = await response.json();
          setCategories(json);
      }       
          
    }

      const getAccounts = async () => {
      
       
        const response = await api.getAccounts(token);
        if(response.ok){
            const json = await response.json();
            setAccounts(json);
            
        }       
            
    }

  const onSearch = async  () => {

    let qs = `description=${searchText}`;

   
   
    if(fromDate){
      qs += `&minDate=${formataDataAPI(fromDate)}`;
    }
    if(untilDate){
      qs += `&maxDate=${formataDataAPI(untilDate)}`;
    }
    if(selectedCategory){
      qs += `&category=${selectedCategory.id}`;
   }
   if(selectedAccount){
    qs += `&account=${selectedAccount.id}`;
   }
     setIsLoading(true);
     console.log(qs)

    const response = await api.search(token,qs);
    if (response.ok){
      var json = await response.json();
      setSearchResults(json);
    }
    setIsLoading(false);
    if(json.length===0){
       ToastAndroid.show(`No results found.`, ToastAndroid.LONG);
       return;
    }
    setModalResultsOpen(true);

  }

  return (
    <SafeAreaView style={styles.container}>
       <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
            <Text style={styles.title}>Search</Text>
       </View>
        {isLoadingScreen&&<ActivityIndicator color={cores.primary} size={'large'} style={{position:'absolute',top:'50%'}}/>}
       {!isLoadingScreen&&<View style={{width:'100%'}}>
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
        onPress={()=>onSearch()} 
        text={'SEARCH'} 
        textSize={16} 
        textColor={cores.white} 
        width={'100%'} 
        backgroundColor={cores.primary} 
        borderWidth={0} 
        borderRadius={10} 
        isLoading={isLoading}
    />
    </View>}
    <Modal isOpen={modalResultsOpen} onClosed={()=>setModalResultsOpen(false)} style={styles.modal} backgroundColor={'#ff0'} swipeToClose={false} coverScreen={true} position={"bottom"} ref={modalResultsRef}>
            <Text style={styles.modalTitle}>Found {searchResults.length} result{searchResults.length>1?'s':''}</Text>
            <TouchableOpacity style={styles.closeBtn} onPress={()=>setModalResultsOpen(false)}>
               <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
            <SearchResultsList transactions={searchResults} onPress={()=>{}}/>
          
    </Modal>
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
  modal: {
    alignItems:'center',
    height: '80%',
    padding:20
  },
  modalTitle:{
    fontSize: 22,
    fontWeight:'bold',
    color: cores.onyxBlack
  },
  closeBtn:{
    position:'absolute',
    top:15,
    right:25,
    backgroundColor:cores.inputBackground,
    padding:5,
    borderRadius:10,
  }
})