const pack = require('./package.json');
const globs = pack.jest.globals;
const startup = require('./helpers/startup');
const teardown = require('./helpers/teardown');
const helpers = require("./helpers/requestsHelper");
const endpoints = require("./testInput/endpoints/endpoints.json");
const payloads = require("./testInput/payloads/correctPayloads.json");

let endpoint = endpoints.booking;
let bookingId;
let bookingUrl;
let token;

jest.setTimeout(globs.TIMEOUT);

describe('(happypath): Delete booking tests:', () => {
    beforeEach(async () => {
        const res = await startup.createBookingPayload(endpoint);
        bookingId = await res.body['bookingid'].toString();
        bookingUrl = `${endpoint}/${bookingId}`;
        const payloadAuth = payloads.authPayload;
        const resAuth = await helpers.post(endpoints.auth, payloadAuth);
        token = resAuth.body['token'];
    });

    it('Should delete created booking with cookie header', async () =>{
        const result = await helpers.deleteItem(bookingUrl, token);
        expect(result.statusCode).toEqual(201);
    });

    it('Should delete created booking with Auth header', async () =>{
        const result = await teardown.deleteBooking(bookingUrl);
        expect(result.statusCode).toEqual(201);
    });
});

describe('(negativeflow) Cases on error 403: ', () => {
    beforeEach(async () => {
        const res = await startup.createBookingPayload(endpoint);
        bookingId = await res.body['bookingid'].toString();
        bookingUrl = `${endpoint}/${bookingId}`;
    });

    it('Should return error 403 on delete with incorrect headers', async () => {
        await helpers.deleteItemWithoutOptionalHeaders(bookingUrl)
            .catch(function (res){
            expect(res.status).toEqual(403);
        });
    });
});