import { StyleSheet, Text, View,StatusBar,SafeAreaView,TouchableOpacity,ActivityIndicator,Alert } from 'react-native'
import React,{useState,useEffect,useContext,createRef} from 'react'
import { cores } from '../styles/core'
import AntDesign from '@expo/vector-icons/AntDesign';
import { AuthContext } from '../context/AuthContext';
import api from '../api/api';
import CategoryList from '../components/CategoryList';
import HeightSpacer from '../components/reusable/HeightSpacer';
import Modal from 'react-native-modalbox';
import InputField from '../components/InputField';
import Botao from '../components/reusable/Botao';



const Categories = ({navigation}) => {
  const {token} = useContext(AuthContext);
  const [isLoading,setIsLoading] = useState(false);
  const [isLoadingCategory,setIsLoadingCategory] = useState(false);
  const [categories,setCategories] = useState([]);
  const [name,setName] = useState('');
  const [selectedCategory,setSelectedCategory] = useState(null);
  const modalNewRef = createRef();
  const modalEditRef = createRef();
  const [modalNewOpen,setModalNewOpen] = useState(false);
  const [modalEditOpen,setModalEditOpen] = useState(false);
  

   useEffect(()=>{
          getCategories();
      },[]);

    const onEdit = (category) =>{
         setSelectedCategory(category);
         setName(category.name);
         setModalEditOpen(true);
     }
    const update = async () => {

      if(name.trim().length===0){
        Alert.alert("Error","Please, enter a valid category name.");
        return;
       }
        setIsLoadingCategory(true);
        const response = await api.updateCategory(token,selectedCategory.id,name);
        if(response.ok){
           getCategories();
           setIsLoadingCategory(false);
           setModalEditOpen(false);
        }
      }

  
    const add = async () => {

         if(name.trim().length===0){
          Alert.alert("Error","Please, enter a valid category name.");
          return;
         }
          setIsLoadingCategory(true);
          const response = await api.addCategory(token,name);
          if(response.ok){
             getCategories();
             setIsLoadingCategory(false);
             setModalNewOpen(false);
          }
         
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
    <TouchableOpacity onPress={() => setModalNewOpen(true)}>
       <Text style={{color:cores.blueGray,fontSize:16}}>Add Category</Text>
    </TouchableOpacity>
    <HeightSpacer h={20} />
     {isLoading&&<ActivityIndicator color={cores.primary} size={'large'} style={{position:'absolute',top:'50%'}}/>}
     {!isLoading&&<CategoryList onPress={onEdit} categories={categories}/>}
    <Modal isOpen={modalNewOpen} onClosed={()=>setModalNewOpen(false)} style={styles.modalNew} backgroundColor={'#ff0'} coverScreen={true} position={"bottom"} ref={modalNewRef}>
         <Text style={styles.modalTitle}>New Category</Text>
         <HeightSpacer h={20}/>
         <InputField 
            label={'Name:'} 
            placeholder={'Enter new category name'} 
            value={name} 
            onChangeText={t=>setName(t)} 
            password={false} 
            keyboard={'default'}
          />
          <Botao 
        onPress={()=>add()} 
        text={'ADD CATEGORY'} 
        textSize={16} 
        textColor={cores.white} 
        width={'100%'} 
        backgroundColor={cores.primary} 
        borderWidth={0} 
        borderRadius={10} 
        isLoading={isLoadingCategory}
    />
    </Modal>
    <Modal isOpen={modalEditOpen} onClosed={()=>setModalEditOpen(false)}  style={styles.modalNew} backgroundColor={'#ff0'} coverScreen={true} position={"bottom"} ref={modalEditRef}>
         <Text style={styles.modalTitle}>Edit Category</Text>
         <HeightSpacer h={20}/>
         <InputField 
            label={'Name:'} 
            placeholder={'Enter category name'} 
            value={name} 
            onChangeText={t=>setName(t)} 
            password={false} 
            keyboard={'default'}
          />
          <Botao 
        onPress={()=>update()} 
        text={'UPDATE CATEGORY'} 
        textSize={16} 
        textColor={cores.white} 
        width={'100%'} 
        backgroundColor={cores.primary} 
        borderWidth={0} 
        borderRadius={10} 
        isLoading={isLoadingCategory}
    />
    </Modal>
    
   
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
     modalNew: {
      alignItems:'center',
      height: 250,
      padding:20
    },
    modalTitle:{
     
      fontSize: 22,
      fontWeight:'bold',
      color: cores.onyxBlack
    }
})