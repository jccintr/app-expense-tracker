import { View,Text } from 'react-native'

const LegendItem = ({color,label}) => {

    return (
    <View style={{flexDirection:'row',alignItems:'center',gap:5}}>    
       <View style={{height: 10,width: 10,borderRadius: 10,backgroundColor: color}}/>
       <Text style={{fontSize:12}}>{label}</Text>
    </View>
  )};

  export default LegendItem;