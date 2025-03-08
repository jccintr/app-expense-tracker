import { StyleSheet, Text, View,TouchableOpacity,ActivityIndicator } from 'react-native'
import React,{useState,useEffect,useContext} from 'react'
import { cores } from '../../styles/core'
import { PieChart  } from "react-native-gifted-charts";
import { AuthContext } from '../../context/AuthContext';
import HeightSpacer from '../reusable/HeightSpacer';
import LegendItem from './LegendItem';
import api from '../../api/api';
import Entypo from '@expo/vector-icons/Entypo';

//const chartData = [{value: 15}, {value: 30}, {value: 26}, {value: 40}];
const months = ['January','February','March','April','May','June','July','August','September','November','December'];

function gerarCorHexAleatoria() {
    const caracteres = '0123456789ABCDEF';
    let cor = '#';
    
    for (let i = 0; i < 6; i++) {
      cor += caracteres[Math.floor(Math.random() * 16)];
    }
  
    return cor;
  }

  function calcularPercentual(total, valor) {

    if (total === 0) {
      return "0%"; // Evita divisão por zero
    }
    
    const percentual = Math.round((valor / total) * 100);
    return `${percentual}%`;

  }

const DonutChart = () => {
     const [isLoading,setIsLoading] = useState(false);
     const {token} = useContext(AuthContext);
     const [chartData,setChartData] = useState([]);
     const [total,setTotal] = useState(0);
     const [date,setDate] = useState(null)



useEffect(()=>{
            const today = new Date(Date.now());
            setDate(today);
            const mes = today.getMonth()+1;
            const ano = today.getFullYear();
            getData(mes,ano);
},[]);

  const getData = async (mes,ano) => {

    setIsLoading(true);
 //  console.log('no getData',mes,ano);
    const response = await api.donutChart(token,mes,ano);
   // console.log(response.status);
    if(response.ok){
      const json = await response.json();
      if(json.categories.length>0){
      createChartData(json.categories,json.total_amount);
      }
      else {
        setChartData([]);
      }
     //console.log(json.total_amount);
      setTotal(json.total_amount);
    }
    setIsLoading(false)
    
}

    const createChartData = (arr,total) => {
        let arrData = [];
        for(let i=0;i<arr.length;i++){
        arrData.push(
            {
                value: arr[i].total_amount, 
                color: gerarCorHexAleatoria(),
                legend: arr[i].category,
                text: calcularPercentual(total, arr[i].total_amount)
            })
        }
        setChartData(arrData);
    }



    const nextMonth =  () => {
     
      const newDate = new Date(date);
      newDate.setMonth(date.getMonth() + 1);
      setDate(newDate);
      const mes = newDate.getMonth()+1;
      const ano = newDate.getFullYear();
     // console.log(mes,ano)
     getData(mes,ano);
    }

    const previousMonth =  () => {
     
      const newDate = new Date(date);
      newDate.setMonth(date.getMonth() - 1);
      setDate(newDate);
      const mes = newDate.getMonth()+1;
      const ano = newDate.getFullYear();
      console.log(mes,ano)
      getData(mes,ano);
    }


  return (
     <View style={styles.container}>
      {isLoading&&<ActivityIndicator color={cores.primary} size={'large'} />}
       {!isLoading&&<View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
              <Text style={styles.title}>{months[date?.getMonth()]+' '+date?.getFullYear()}</Text>
              <Text style={styles.title}>{total.toFixed(2)}</Text>
        </View>}
        <HeightSpacer h={20} />
            {chartData.length>0&&<View style={{flexDirection:'row',justifyContent:'space-around'}}>
              <PieChart
                donut data={chartData} 
                showText
                textSize={12}
                radius={100}
                textColor={'#fff'}
              />
              <View>
                {chartData.map((data,index)=><LegendItem key={index} color={data.color} label={data.legend}/>)}
              </View>
            </View>}
        <HeightSpacer h={10}/>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
          <View style={{alignItems:'center',justifyContent:'center'}}>
              <TouchableOpacity style={styles.navButton} onPress={previousMonth}>
                  <Entypo name="chevron-left" size={30} color={cores.inputPlaceholderColor} />
              </TouchableOpacity>
              <Text style={styles.navText}>Previous month</Text>
          </View>
          {chartData.length==0&&<Text style={{fontWeight:'bold',color:cores.primary}}>No data found.</Text>}
          <View style={{alignItems:'center',justifyContent:'center'}}>
              <TouchableOpacity style={styles.navButton} onPress={nextMonth}>
                <Entypo name="chevron-right" size={30} color={cores.inputPlaceholderColor} />
              </TouchableOpacity>
              <Text style={styles.navText}>Next month</Text>
          </View>
      </View>
     
    </View>
  )
}

export default DonutChart

const styles = StyleSheet.create({
      container:{
          backgroundColor: '#fff',
          borderColor:cores.inputBackground,
          width:'100%',
          padding:10,
          borderRadius:10,
          elevation: 6,
      },
      title:{
        fontSize: 18,
        fontWeight:'bold'
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