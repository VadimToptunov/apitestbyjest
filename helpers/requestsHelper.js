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
        const header = setTokenToHeadersWithToken(token);
        return await putPrivate(url, header, payload);
    }

    async function putWithAuthHeader(url, payload){
        const header = headers.headersWithAuth;
        return await putPrivate(url, header, payload);
    }

    async function putWithoutOptionalHeaders(url, payload){
        const header = headers.contentTypeHeader;
        return await putPrivate(url, header, payload);
    }

    async function patch(url, token, payload){
        return patchPrivate(url, setTokenToHeadersWithToken(token), payload);
    }

    async function patchWithAuthHeader(url, payload){
        cookieHeader = cookieHeader.headersWithAuth;
        return patchPrivate(url, cookieHeader, payload);
    }

    async function patchWithoutOptionalHeaders(url, payload){
        const header = headers.contentTypeHeader;
        return await patchPrivate(url, header, payload);
    }

    async function deleteItem(url, token){
        return await deletePrivate(url, setToken(token));
    }

    async function deleteItemWithAuth(url){
        const header = headers.headersWithAuth;
        return await deletePrivate(url, header);
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

    function setToken(token){
        const header = cookieHeader.contentTypeAndCookieHeaders;
        header.Cookie = `token=${token}`;
        return header;
    }

    function setTokenToHeadersWithToken(token){
        const header = cookieHeader.headersWithToken;
        header.Cookie = `token=${token}`;
        return header;
    }

    module.exports = {
        get,
        getFullHeaders,
        post,
        postFullHeaders,
        put,
        putWithAuthHeader,
        putWithoutOptionalHeaders,
        patch,
        patchWithAuthHeader,
        patchWithoutOptionalHeaders,
        deleteItem,
        deleteItemWithAuth,
        deleteItemWithoutOptionalHeaders
    }