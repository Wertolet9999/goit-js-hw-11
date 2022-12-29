import axios from 'axios';
const baseURL = 'https://pixabay.com/api';
const axiosService = axios.create({ baseURL });
export { axiosService };