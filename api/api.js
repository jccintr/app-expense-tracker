// --host=192.168.0.107

//const BASE_API = 'http://192.168.0.104:3000';
//const BASE_API = 'https://taxibraz.onrender.com';
//const BASE_API = 'http://192.168.1.9:8000/api';
const BASE_API = 'http://192.168.1.9:3333';


export default {

    validateToken: async (token) => {
        const response = await fetch(`${BASE_API}/users/me`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        return response;
    },

     login: async (email, password) => {
        const response = await fetch(`${BASE_API}/auth/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        });
       
        return response;
    },

    cadastro: async (name,email,password) => {
       
        const response = await fetch(`${BASE_API}/auth/register`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name,email, password})
        });
              
        return response;
    },
    getTransactions: async (data,token) => {
        const response = await fetch(`${BASE_API}/transactions/?data=${data}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        return response;
    },
  
  
  
   
};