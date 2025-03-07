import { StyleSheet, Text, View } from 'react-native'
import React,{useState,useEffect,useContext} from 'react'
import { cores } from '../../styles/core'
import { PieChart  } from "react-native-gifted-charts";
import { AuthContext } from '../../context/AuthContext';
import HeightSpacer from '../reusable/HeightSpacer';
import LegendItem from './LegendItem';
import api from '../../api/api';

//const chartData = [{value: 15}, {value: 30}, {value: 26}, {value: 40}];

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
     const [month,setMonth] = useState(null);
     const [year,setYear] = useState(null);
     const [total,setTotal] = useState(0);



useEffect(()=>{
            const today = new Date(Date.now());
            const mes = today.getMonth()+1;
            const ano = today.getFullYear();
            setMonth(mes);
            setYear(ano);
            
            getData(mes,ano);
    },[]);

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

const getData = async (mes,ano) => {
          setIsLoading(true);
          const response = await api.donutChart(token,mes,ano);
          if(response.ok){
            const json = await response.json();
            createChartData(json.categories,json.total_amount);
            setTotal(json.total_amount);
         
          
           
          }
          setIsLoading(false)
    }



  return (
     <View style={styles.container}>
       {!isLoading&&<View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
              <Text style={styles.title}>March 2025</Text>
              <Text style={styles.title}>{total.toFixed(2)}</Text>
        </View>}
        <HeightSpacer h={20} />
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <PieChart
            donut data={chartData} 
            showText
            textSize={12}
            radius={120}
            textColor={'#fff'}
          />
          <View>
            {chartData.map((data,index)=><LegendItem key={index} color={data.color} label={data.legend}/>)}
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
        fontSize: 20,
        fontWeight:'bold'
     },
})