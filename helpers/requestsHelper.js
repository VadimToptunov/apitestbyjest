const request = require("superagent");
    async function get(url){
        return await getPrivate(url, {'Content-Type': 'application/json'});
    }

async function getWithoutHeaders(url){
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
    return await getPrivate(url, headers);
}

    async function getPrivate(url, header){
        return await request.get(url)
            .set(header)
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
        get, getFullHeaders: getWithoutHeaders, post, put, patch, deleteItem
    }