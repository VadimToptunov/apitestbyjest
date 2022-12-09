const request = require("superagent");
    async function get(url){
        return await getPrivate(url, {'Content-Type': 'application/json'});
    }

async function getFullHeaders(url){
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

async function postPrivate(endpoint, payload, headers){
    return await request.post(endpoint)
        .set(headers)
        .send(payload);
}

    async function post(endpoint, payload){
        const headers = {'Content-Type': "application/json"};
        return await postPrivate(endpoint, payload, headers);
    }

    async function postFullHeaders(endpoint, payload){
        const headers = {
            'Content-Type': "application/json",
            'Accept': "application/json",
        };
        return await postPrivate(endpoint, payload, headers);
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
        get,
        getFullHeaders,
        post,
        postFullHeaders,
        put,
        patch,
        deleteItem
    }