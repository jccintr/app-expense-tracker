import { StyleSheet, Text, View,TouchableOpacity,ActivityIndicator,Dimensions } from 'react-native'
import React,{useState,useEffect,useContext} from 'react'
import { BarChart  } from "react-native-gifted-charts";
import { cores } from '../../styles/core';
import HeightSpacer from '../reusable/HeightSpacer';
import Entypo from '@expo/vector-icons/Entypo';
import api from '../../api/api';
import { AuthContext } from '../../context/AuthContext';
import { getWeekNumber } from '../../util/util';
/*
const barData = [
  {value: 15, label:'D'},
  {value: 0 , label:'S'},
  {value: 30 , label:'T'}, 
  {value: 125 , label:'Q'}, 
  {value: 0 , label:'Q'}, 
  {value: 85 , label:'S'}, 
  {value: 40 , label:'S'}
];
*/


const weekDays = ['S','M','T','W','T','F','S'];
const months = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];

const WeeklyChart = () => {
  const [week,setWeek] = useState(0);
  const [firstDay,setFirstDay] = useState(null);
  const [lastDay,setLastDay] = useState(null);
  const [total,setTotal] = useState(0);
  const {token} = useContext(AuthContext);
  const [barData,setBarData] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const window_width = Dimensions.get('window').width;


   useEffect(()=>{
              const today = new Date(Date.now());
              const weekAtual = getWeekNumber(today);
             
              setWeek(weekAtual);
              getData(weekAtual);
    },[]);

    const createBarData = (arr) => {
        let arrData = [];
        for(let i=0;i<arr.length;i++){
          arrData.push({value: arr[i].total_amount,label:weekDays[arr[i].day_of_week]})
        }
        setBarData(arrData);
    }

    const getData = async (w) => {
          setIsLoading(true);
          const response = await api.weekChart(token,w);
          if(response.ok){
            const json = await response.json()
            createBarData(json.week_days)
            setTotal(json.total_amount);
         
           setFirstDay(new Date(json.first_day+'T00:00:00'));
           setLastDay(new Date(json.last_day +'T00:00:00'));
           
          }
          setIsLoading(false)
    }

    const previousWeek = async () => {
     
        const w = week - 1;
        setWeek(w);
        getData(w);
    }

    const nextWeek = async () => {
      const w = week + 1;
      setWeek(w);
      getData(w);
  }

  return (
    <View style={styles.container}>
      {isLoading&&<ActivityIndicator color={cores.primary} size={'large'} />}
      {!isLoading&&<View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
         <Text style={styles.weekText}>{`Week ${firstDay?.getDate()} ${months[firstDay?.getMonth()]} - ${lastDay?.getDate()} ${months[lastDay?.getMonth()]}`}</Text>
         <Text style={styles.amountText}>{total.toFixed(2)}</Text>
      </View>}
      <HeightSpacer h={10} />
      <BarChart
        width={window_width*.7}
        height={150}
        barWidth={20}
        //stepHeight={2}
        spacing={15}
        showFractionalValues
        data={barData}
        showGradient
        frontColor={'#1B6BB0'}
        gradientColor={'#FFEEFE'}
      />
      <HeightSpacer h={10}/>
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
          <View style={{alignItems:'center'}}>
              <TouchableOpacity style={styles.navButton} onPress={previousWeek}>
                  <Entypo name="chevron-left" size={30} color={cores.inputPlaceholderColor} />
              </TouchableOpacity>
              <Text style={styles.navText}>Previous week</Text>
          </View>
          <View style={{alignItems:'center'}}>
              <TouchableOpacity style={styles.navButton} onPress={nextWeek}>
                <Entypo name="chevron-right" size={30} color={cores.inputPlaceholderColor} />
              </TouchableOpacity>
              <Text style={styles.navText}>Next week</Text>
          </View>
      </View>
    </View>
  )
}

export default WeeklyChart

const styles = StyleSheet.create({
  container:{
      backgroundColor: '#fff',
      borderColor:cores.inputBackground,
      width:'100%',
      padding:10,
      borderRadius:10,
      elevation: 6,
  },
  weekText:{
     fontSize: 20,
     fontWeight:'bold'
  },
  amountText:{
     fontSize: 20,
     fontWeight:'bold',
     
  },
  navButton:{
    backgroundColor: cores.inputBackground,
    borderRadius: 50,
   
    width:35,
    height:35,
    alignItems:'center',
    justifyContent:'center'
  },
  navText:{
    fontSize: 14,
    color: cores.inputPlaceholderColor
  }
})