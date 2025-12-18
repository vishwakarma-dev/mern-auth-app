import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // your API backend
  withCredentials: true, // only if using cookies
  headers:{
    'Content-Type': 'application/json',
  }
});

export default api;
