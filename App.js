import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator';
import { useState } from 'react';
import { AuthContext } from './context/AuthContext';

export default function App() {
  const [loggedUser,setLoggedUser] = useState(null);
  const [token,setToken] = useState(null);


  return (
    <AuthContext.Provider value={{loggedUser,setLoggedUser,token,setToken}}>
        <NavigationContainer>
           <StackNavigator/>
        </NavigationContainer>
    </AuthContext.Provider>
  );
}

