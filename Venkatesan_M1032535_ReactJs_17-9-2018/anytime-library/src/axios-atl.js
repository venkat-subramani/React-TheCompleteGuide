import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://atl-anytime-library.firebaseio.com/'
});

export default instance;