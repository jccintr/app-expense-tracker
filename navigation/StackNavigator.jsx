import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Preload from '../screens/Preload';
import Login from '../screens/Login';
import Cadastro from '../screens/Cadastro';
import Categories from '../screens/Categories';
import Accounts from '../screens/Accounts';
import BottomTabNavigation from './BottomTabNavigation';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {

    return (
      <Stack.Navigator initialRouteName='preload'>
         <Stack.Screen name='preload' component={Preload} options={{headerShown:false}}/>
         <Stack.Screen name='login' component={Login} options={{headerShown:false}}/>
         <Stack.Screen name='cadastro' component={Cadastro} options={{headerShown:false}}/>
         <Stack.Screen name='categories' component={Categories} options={{headerShown:false}}/>
         <Stack.Screen name='accounts' component={Accounts} options={{headerShown:false}}/>
         {/*<Stack.Screen name='home' component={Home} options={{headerShown:false}}/>*/}
         <Stack.Screen name='home' component={BottomTabNavigation} options={{headerShown:false}}/>
      </Stack.Navigator>
    )
  }
  
  export default StackNavigator