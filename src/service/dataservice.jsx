import axios from 'axios';

import { navigation } from '../config/path';

const METHODS = {
    GET: 'GET',
    POST: 'POST'
}

const BASE_URL = 'http://localhost:8080';

const CONFIG = {
    'signin': {
        method: METHODS.POST,
        url: `${BASE_URL}/api/v1/auth/signin`,
        autheticated: false
    }
}

const makeRequest = (httpCall, payload = {}) => {
    return new Promise(async (resolve, reject) => {
        const requestData = CONFIG[httpCall];

        if (!requestData) {
            return reject('No config');
        }

        if (requestData.autheticated) {
            const token = localStorage.getItem('token');

            if (!token) {
                window.location.replace(navigation.login);
                return reject('No token');
            }

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }

        try {
            const response = await axios({
                method: requestData.method,
                url: requestData.url,
                ...payload,
            })

            return resolve(response.data.result || response.data);
        } catch (err) {
            if (err.response.status === 401 && httpCall !== 'signin') {
                window.location.replace(navigation.login);
                localStorage.removeItem('token');
            }
            return reject(err.response.data.error || "Something went wrong please refresh");
        }
    })

}

export default makeRequest;