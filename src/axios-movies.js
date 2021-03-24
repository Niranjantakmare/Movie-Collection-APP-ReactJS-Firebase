import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-myapp-f1d13.firebaseio.com/'
});

export default instance;