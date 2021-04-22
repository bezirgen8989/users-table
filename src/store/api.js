import * as axios from 'axios';

const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/users/',
})

export const getUsers = (selectedPage = 1, pageSize = 5) => {
    return instance.get(`${selectedPage}`)
        .then(response => {
            return response.data
        });
}