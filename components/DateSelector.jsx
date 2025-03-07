import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import { cores } from '../styles/core';
import { formataData } from '../util/util';
import  DateTimePicker  from '@react-native-community/datetimepicker';

const DateSelector = ({data,setData}) => {
   const [datePickerVisible, setDatePickerVisible] = useState(false);


   const onChangeDatePicker = (event, selectedDate) => {
    
      const currentDate = selectedDate;
      setDatePickerVisible(false);
      setData(currentDate);
      setDataDisplay(formataData(currentDate));
      
    };

    const nextDay = () => {
        const newDate = new Date(data);
        newDate.setDate(data.getDate() + 1);
        setData(newDate);
    }

    const previousDay = () => {
        const newDate = new Date(data);
        newDate.setDate(data.getDate() - 1);
        setData(newDate);
    }


  return (
    <View style={styles.container}>
       <TouchableOpacity style={styles.navButton} onPress={previousDay}>
          <Entypo name="chevron-left" size={36} color={cores.inputPlaceholderColor} />
       </TouchableOpacity>
       <TouchableOpacity style={styles.dateButton} onPress={()=>setDatePickerVisible(true)}>
          <Text style={{fontSize:20,fontWeight:'bold'}}>{formataData(data)}</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.navButton} onPress={nextDay}>
          <Entypo name="chevron-right" size={36} color={cores.inputPlaceholderColor} />
       </TouchableOpacity>
       {datePickerVisible && (<DateTimePicker
                  value={data}
                  mode="date"
                  is24Hour={true}
                  onChange={onChangeDatePicker}
                  display="default"
                  //minimumDate={minimumDate}
                />
              )}
    </View>
  )
}

export default DateSelector

const styles = StyleSheet.create({
    container:{
       width:'100%',
       flexDirection:'row',
       alignItems:'center',
       justifyContent:'space-around'
    },
    dateButton:{
       borderWidth:0.5,
       borderStyle:'dotted',
       paddingVertical:5,
       paddingHorizontal:15,
       borderRadius:10
    },
    navButton:{
      backgroundColor: cores.inputBackground,
      borderRadius: 50,
      padding:5,
    }
})