const pack = require('./package.json');
const globs = pack.jest.globals;
const startup = require("./helpers/startup");
const helpers = require("./helpers/requestsHelper");
const payloads = require("./testInput/payloads/correctPayloads.json");
const endpoints = require("./testInput/endpoints/endpoints.json");

let endpoint = endpoints.booking;
let bookingId;
let bookingUrl;
let token;

jest.setTimeout(globs.TIMEOUT);

describe('(happypath):', function () {
    beforeEach(async () => {
        const res = await startup.createBookingPayload(endpoint);
        bookingId = await res.body['bookingid'].toString();
        bookingUrl = `${endpoint}/${bookingId}`;
        const payloadAuth = payloads.authPayload;
        const resAuth = await helpers.post(endpoints.auth, payloadAuth);
        token = resAuth.body['token'];
    });

    afterEach(() =>{
        //Delete the booking
    });

    it('', async () =>{
        //Update the booking with Cookie
    });

    it('', async () =>{
        //Update the booking with Auth header
    });
});

describe('(negativeflow) Cases on error 403: ', () => {
    beforeEach(async () => {
        const res = await startup.createBookingPayload(endpoint);
        bookingId = await res.body['bookingid'].toString();
        bookingUrl = `${endpoint}/${bookingId}`;
    });

    it('Should return error 403 on partial update with incorrect headers', async () => {
        await helpers.patchWithoutOptionalHeaders(bookingUrl)
            .catch(function (res){
                expect(res.status).toEqual(403);
            });
    });
});