const request = require("superagent");
    async function get(url){
        return await request.get(url)
            .set({'Content-Type': "application/json"})
            .send();
    }

    async function post(endpoint, payload){
        return await request.post(endpoint)
            .set({'Content-Type': "application/json"})
            .send(payload);
    }

    async function put(url, token, payload){
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Cookie': token
        }
        return await request.put(url)
            .set(headers)
            .send(payload);
    }

    async function patch(url, token, payload){
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Cookie': token
        }
        return await request.patch(url)
            .set(headers)
            .send(payload);
    }

    async function deleteItem(url, token){
        const headers = {
        'Content-Type': "application/json",
            'Cookie': token
        }
        return await request
            .delete(url)
            .set(headers)
            .send();
    }

    module.exports = {
        get, post, put, patch, deleteItem
    }