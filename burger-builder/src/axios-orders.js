import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-af823.firebaseio.com'
});

export default instance;