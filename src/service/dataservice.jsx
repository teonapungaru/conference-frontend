import axios from 'axios';

import { navigation } from '../components/config/path';

const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
}

const BASE_URL_AUTH = 'http://localhost:4321';
const BASE_URL_ADMIN = 'http://localhost:5000';
const BASE_URL_CONFERENCE = 'http://localhost:5002';

const CONFIG = {
    'signin': {
        method: METHODS.POST,
        url: `${BASE_URL_AUTH}/api/auth`,
        autheticated: false
    },
    'addUser': {
        method: METHODS.POST,
        url: `${BASE_URL_ADMIN}/api/admin/users`,
        autheticated: true
    },
    'editUser': {
        method: METHODS.PUT,
        url: `${BASE_URL_ADMIN}/api/admin/users`,
        autheticated: true
    },
    'deleteUser': {
        method: METHODS.DELETE,
        url: `${BASE_URL_ADMIN}/api/admin/users`,
        autheticated: true
    },
    'addConference': {
        method: METHODS.POST,
        url: `${BASE_URL_ADMIN}/api/admin/conferences`,
        autheticated: true
    },
    'editConference': {
        method: METHODS.PUT,
        url: `${BASE_URL_ADMIN}/api/admin/conferences`,
        autheticated: true
    },
    'deleteConference': {
        method: METHODS.DELETE,
        url: `${BASE_URL_ADMIN}/api/admin/conferences`,
        autheticated: true
    },
    'addEvent': {
        method: METHODS.POST,
        url: `${BASE_URL_ADMIN}/api/admin/conferences/sessions`,
        autheticated: true
    },
    'editEvent': {
        method: METHODS.PUT,
        url: `${BASE_URL_ADMIN}/api/admin/conferences/sessions`,
        autheticated: true
    },
    'deleteEvent': {
        method: METHODS.DELETE,
        url: `${BASE_URL_ADMIN}/api/admin/conferences/sessions`,
        autheticated: true
    },
    'userRoles': {
        method: METHODS.GET,
        url: `${BASE_URL_AUTH}/api/auth`,
        autheticated: true
    },
    'getConferences': {
        method: METHODS.GET,
        url: `${BASE_URL_CONFERENCE}/api/conferences`,
        autheticated: true
    },
    'getUsers': {
        method: METHODS.GET,
        url: `${BASE_URL_ADMIN}/api/admin/users`,
        autheticated: true
    },
    'getEvents': {
        method: METHODS.GET,
        url: `${BASE_URL_CONFERENCE}/api/conferences`,
        autheticated: true
    },
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
                url: httpCall === 'getEvents' ? `${requestData.url}/${payload}/sessions` : requestData.url,
                ...payload,
            })

            return resolve(response.data.result || response.data);
        } catch (err) {
            console.log(err.headers)
            if (err.response.status === 401 && httpCall !== 'signin') {
                window.location.replace(navigation.login);
                localStorage.removeItem('token');
            }
            return reject(err.response.data.msg|| "Something went wrong please refresh");
        }
    })

}

export default makeRequest;