import axios from 'axios';

const api = axios.create({
    baseURL: 'http://spmedgroup-kaue.azurewebsites.net/api'
});

export default api;