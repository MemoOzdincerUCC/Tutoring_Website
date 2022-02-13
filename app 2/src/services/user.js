import axios from 'axios';
import utils from "../utils/utils";

export default class {

    static getAll = async keyword => {
        let result = {
            data: null,
            error: null
        };

        const data = {
            keyword: keyword
        };

        await axios.post(`${process.env.REACT_APP_API_URL}/users/find-teachers`, data)
            .then(resp => {
                if (resp.status === 200) {
                    result.data = resp.data;
                }
            })
            .catch(err => {
                result.error = err.response.data;
            });

        return result;
    }

    static login = async (email, password) => {
        let result = {
            data: null,
            error: null
        };

        const data = {
            email: email,
            password: password
        };

        await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, data)
            .then(resp => {
                if (resp.status === 200) {
                    result.data = resp.data;
                }
            })
            .catch(err => {
                result.error = err.response.data;
            });

        return result;
    }

    static signup = async (name, email, password, type, subject) => {
        let result = {
            data: null,
            error: null
        };

        const data = {
            name: name,
            email: email,
            password: password,
            type: type,
            subject: subject
        };

        await axios.post(`${process.env.REACT_APP_API_URL}/users/signup`, data)
            .then(resp => {
                if (resp.status === 200) {
                    result.data = resp.data;
                }
            })
            .catch(err => {
                result.error = err.response.data;
            });

        return result;
    }

    static updatePicture = async (file, userId) => {
        let result = {
            data: null,
            error: null
        };

        const fd = new FormData();
        fd.append('file', file);

        await axios.put(`${process.env.REACT_APP_API_URL}/users/upload/${userId}`, fd)
            .then(resp => {
                if (resp.status === 200) {
                    result.data = resp.data;
                }
            })
            .catch(err => {
                result.error = err.response.data;
            });

        return result;
    }

    static bookMeeting = async data => {
        let result = {
            data: null,
            error: null
        };
        await axios.post(`${process.env.REACT_APP_API_URL}/users/book-meeting`, data)
            .then(resp => {
                if (resp.status === 200) {
                    result.data = resp.data;
                }
            })
            .catch(err => {
                result.error = err.response.data;
            });

        return result;
    }

}