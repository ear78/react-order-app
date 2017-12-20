import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-order-app.firebaseio.com/'
})

export default instance;
