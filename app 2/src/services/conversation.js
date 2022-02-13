import axios from 'axios';

export default class {

    static create = async members => {
        let result = {
            data: null,
            error: null
        };

        const data =  {
            joined: Date.now(),
            members: members
        }

        await axios.post(`${process.env.REACT_APP_API_URL}/conversations/`, data)
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

    static getAll = async id => {
        let result = {
            data: null,
            error: null
        };

        await axios.get(`${process.env.REACT_APP_API_URL}/conversations/all/${id}`)
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