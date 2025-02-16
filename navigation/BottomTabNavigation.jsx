import { StyleSheet, Text } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Charts from '../screens/Charts';
import Search from '../screens/Search';
import Settings from '../screens/Settings';


import { cores } from '../styles/core';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';

import { useTheme } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const tabBarStyle = {
    borderTopWidth: 1,
    borderRadius:10,
    height: 64,
    //position: 'absolute',
   // bottom:10,
   // left:20,
   // right:20,
   // paddingBottom:5,
}

const tabBarLabelStyle = {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign:'center',
    justifyContent:'center',
    alignContent:'center',
    
}


const BottomTabNavigation = () => {
    const {colors,darkMode} = useTheme();
  return (
    <Tab.Navigator initialRouteName='Home' tabBarHideKeyboard={true} headerShown={false} screenOptions={{tabBarStyle:[tabBarStyle,{backgroundColor: colors.background}],headerShown:false,}} >

         <Tab.Screen name='Home' component={Home} 
          options={
            {  
                tabBarIcon: ({focused})=> (<Entypo name={'home'} color={focused? cores.onyxBlack:cores.ashGray} size={26}/>),
                tabBarLabel:({focused})=><Text style={[styles.tabLabel,{color:focused?cores.onyxBlack:cores.ashGray}]}>Home</Text>
            }
            }
        />

        <Tab.Screen name='Charts' component={Charts} 
          options={
            {  
                tabBarIcon: ({focused})=> (<FontAwesome6 name={'chart-simple'} color={focused? cores.onyxBlack:cores.ashGray} size={26}/>),
                tabBarLabel:({focused})=><Text style={[styles.tabLabel,{color:focused?cores.onyxBlack:cores.ashGray}]}>Charts</Text>
            }
            }
        />

       <Tab.Screen name='Search' component={Search} 
          options={
            {  
                tabBarIcon: ({focused})=> (<FontAwesome name={'search'} color={focused? cores.onyxBlack:cores.ashGray} size={26}/>),
                tabBarLabel:({focused})=><Text style={[styles.tabLabel,{color:focused?cores.onyxBlack:cores.ashGray}]}>Search</Text>
            }
            }
        />

        <Tab.Screen name='Settings' component={Settings} 
          options={
            {  
                tabBarIcon: ({focused})=> (<Ionicons name={'settings-sharp'} color={focused? cores.onyxBlack:cores.ashGray} size={26}/>),
                tabBarLabel:({focused})=><Text style={[styles.tabLabel,{color:focused?cores.onyxBlack:cores.ashGray}]}>Settings</Text>
            }
            }
        />

    </Tab.Navigator>
  )
}

export default BottomTabNavigation

const styles = StyleSheet.create({
    tabLabel:{
        fontSize:14,
        color: cores.gray,
        fontWeight: 'bold',
        alignContent:'center'
    },
    selected: {
        color: cores.blue,
    }
})