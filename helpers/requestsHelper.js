const headers = require('../testInput/headers/headers.json');
const request = require("superagent");

let cookieHeader = headers;

    async function get(url){
        return await getPrivate(url, headers.contentTypeHeader);
    }

    async function getFullHeaders(url){
        return await getPrivate(url, headers.contentTypeAndAcceptHeader);
    }

    async function post(endpoint, payload){
        return await postPrivate(endpoint, payload, headers.contentTypeHeader);
    }

    async function postFullHeaders(endpoint, payload){
        return await postPrivate(endpoint, payload, headers.contentTypeAndAcceptHeader);
    }

    async function put(url, token, payload){
        cookieHeader = cookieHeader.headersWithToken.Cookie = token;
        return await putPrivate(url, cookieHeader, payload);
    }

    async function putWithAuthHeader(url, token, payload){
        cookieHeader = cookieHeader.headersWithAuth;
        return await putPrivate(url, cookieHeader, payload);
    }

    async function patch(url, token, payload){
        cookieHeader = cookieHeader.headersWithToken.Cookie = token;
        return patchPrivate(url, cookieHeader, payload);
    }

    async function patchWithAuthHeader(url, token, payload){
        cookieHeader = cookieHeader.headersWithAuth;
        return patchPrivate(url, cookieHeader, payload);
    }

    async function deleteItem(url, token){
        const header = cookieHeader.contentTypeAndCookieHeaders;
        header.Cookie = `token=${token}`;
        return await deletePrivate(url, header);
    }

    async function deleteItemWithAuth(url){
        cookieHeader = cookieHeader.headersWithAuth;
        return await deletePrivate(url, cookieHeader);
    }

    async function deleteItemWithoutOptionalHeaders(url){
        const header = headers.contentTypeHeader;
        return await deletePrivate(url, header);
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

    async function putPrivate(url, cookieHeader, payload){
        return await request.put(url)
            .set(cookieHeader)
            .send(payload);
    }

    async function patchPrivate(url, cookieHeader, payload){
        return await request.patch(url)
            .set(cookieHeader)
            .send(payload);
    }

    async function deletePrivate(url, cookieHeader){
        return await request.delete(url)
            .set(cookieHeader)
            .send();
    }

    module.exports = {
        get,
        getFullHeaders,
        post,
        postFullHeaders,
        put,
        putWithAuthHeader,
        patch,
        deleteItem,
        deleteItemWithAuth,
        deleteItemWithoutOptionalHeaders
    }