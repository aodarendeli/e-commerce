import { API_URL } from './config.js'
import axios from 'axios'
    let instance = axios.create({
        baseURL: API_URL,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    instance.CancelToken = axios.CancelToken;
    instance.isCancel = axios.isCancel;


export default instance
