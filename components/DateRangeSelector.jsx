import { StyleSheet, Text, View,Pressable } from 'react-native'
import React, {useState} from 'react'
import { cores } from '../styles/core'
import  DateTimePicker  from '@react-native-community/datetimepicker';
import { formataData } from '../util/util';


const DateRangeSelector = ({label,fromDate,setFromDate,untilDate,setUntilDate}) => {
     const [datePickerFromVisible, setDatePickerFromVisible] = useState(false);
     const [datePickerUntilVisible, setDatePickerUntilVisible] = useState(false);


 const onChangeFromDatePicker = (event, selectedDate) => {
    
      const currentDate = selectedDate;
      setDatePickerFromVisible(false);
      setFromDate(currentDate);
           
    };

    const onChangeUntilDatePicker = (event, selectedDate) => {
    
        const currentDate = selectedDate;
        setDatePickerUntilVisible(false);
        setUntilDate(currentDate);
             
      };
  

  return (
    <View style={{height:80,width:'100%'}}>
           <Text style={styles.label}>{label}</Text>
           <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
              <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
                    <Text style={styles.subLabel}>From:</Text>
                    <Pressable style={styles.dateButton} onPress={()=>setDatePickerFromVisible(true)}>
                            <Text style={{fontSize:16,}}>{formataData(fromDate)}</Text>
                    </Pressable>
              </View>
              <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
                    <Text style={styles.subLabel}>Until:</Text>
                    <Pressable style={styles.dateButton} onPress={()=>setDatePickerUntilVisible(true)}>
                            <Text style={{fontSize:16,}}>{formataData(untilDate)}</Text>
                    </Pressable>
              </View>
           </View>
           {datePickerFromVisible && (<DateTimePicker
                  value={fromDate}
                  mode="date"
                  is24Hour={true}
                  onChange={onChangeFromDatePicker}
                  display="default"
                />
              )}
            {datePickerUntilVisible && (<DateTimePicker
                  value={untilDate}
                  mode="date"
                  is24Hour={true}
                  onChange={onChangeUntilDatePicker}
                  display="default"
                />
              )}
      </View>
  )
}

export default DateRangeSelector

const styles = StyleSheet.create({
    container:{
        height: 50,
        borderWidth:1,
        borderColor: '#c1c1c1',
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        gap:5,
        alignItems:'center'
    },
    label:{
        fontWeight:'bold',
        marginLeft:5,
        marginBottom:5,
        color: cores.primary,
    },
    subLabel:{
        fontWeight:'bold',
        color: cores.primary,
        marginLeft:5,
    },
    dateButton:{
        borderWidth:0.5,
        borderStyle:'dotted',
        paddingVertical:10,
        paddingHorizontal:15,
        borderRadius:10
    }
})