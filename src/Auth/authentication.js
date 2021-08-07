import axios from 'axios';
import {auth} from './firebase-auth';


export const createUserAccount = (data) => {
    console.log(data)
  return axios.post('http://192.168.1.221:3000/auth/signup', data)
    .then(res => console.log('DATA', res.data))
}


export const loginUser = (email, password) => {
  return auth().signInWithEmailAndPassword(email, password);
}

//export const getArticles = async () => {
    // const token = await auth.currentUser.getIdToken();
    
    // return axios.get('http://localhost:9000/articles', {headers:  
    //   { authorization: `Bearer ${token}` }})
    //   .then(res => console.log(res.data));
    // }