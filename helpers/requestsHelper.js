const headers = require('../testInput/headers/headers.json');

const request = require("superagent");
    async function get(url){
        return await getPrivate(url, headers.contentTypeHeader);
    }

async function getFullHeaders(url){
    return await getPrivate(url, headers.contentTypeAndAcceptHeader);
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
        return await postPrivate(endpoint, payload, headers.contentTypeHeader);
    }

    async function postFullHeaders(endpoint, payload){
        return await postPrivate(endpoint, payload, headers.contentTypeAndAcceptHeader);
    }

    async function put(url, token, payload){
        const cookieHeader = headers;
        cookieHeader.headersWithToken.Cookie = token;
        return await request.put(url)
            .set(cookieHeader)
            .send(payload);
    }

    async function patch(url, token, payload){
        const cookieHeader = headers;
        cookieHeader.headersWithToken.Cookie = token;
        return await request.patch(url)
            .set(cookieHeader)
            .send(payload);
    }

    async function deleteItem(url, token){
        const cookieHeader = headers;
        cookieHeader.Cookie = token;
        return await request
            .delete(url)
            .set(cookieHeader)
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