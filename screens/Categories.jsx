import { StyleSheet, Text, View,StatusBar,SafeAreaView,TouchableOpacity,ActivityIndicator } from 'react-native'
import React,{useState,useEffect,useContext} from 'react'
import { cores } from '../styles/core'
import AntDesign from '@expo/vector-icons/AntDesign';
import { AuthContext } from '../context/AuthContext';
import api from '../api/api';
import CategoryList from '../components/CategoryList';
import HeightSpacer from '../components/reusable/HeightSpacer';



const Categories = ({navigation}) => {
  const {token} = useContext(AuthContext);
  const [isLoading,setIsLoading] = useState(false);
  const [categories,setCategories] = useState([]);

   useEffect(()=>{
          getCategories();
      },[]);
  
  
    const getCategories = async () => {

        setIsLoading(true)
        const response = await api.getCategories(token);
        if(response.ok){
           const json = await response.json();
           setCategories(json);
           setIsLoading(false)
        }       
        
    }

  return (
    <SafeAreaView style={styles.container}>
    <StatusBar animated={true} backgroundColor={cores.background} barStyle="dark-content"/>
    <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
       <Text style={styles.title}>Categories</Text>
       <TouchableOpacity style={{backgroundColor:cores.inputBackground, padding:5,borderRadius:10}} onPress={()=>navigation.goBack()}>
           <AntDesign name="close" size={24} color="black" />
       </TouchableOpacity>
    </View>
    <HeightSpacer h={20} />
    <TouchableOpacity onPress={()=>{}}>
       <Text style={{color:cores.blueGray,fontSize:16}}>Add Category</Text>
    </TouchableOpacity>
    <HeightSpacer h={20} />
     {isLoading&&<ActivityIndicator color={cores.primary} size={'large'} style={{position:'absolute',top:'50%'}}/>}
     {!isLoading&&<CategoryList categories={categories}/>}
   
    
   
</SafeAreaView>
  )
}

export default Categories

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
})