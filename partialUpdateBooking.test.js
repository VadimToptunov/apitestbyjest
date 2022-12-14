const pack = require('./package.json');
const globs = pack.jest.globals;
const startup = require("./helpers/startup");
const helpers = require("./helpers/requestsHelper");
const payloads = require("./testInput/payloads/correctPayloads.json");
const endpoints = require("./testInput/endpoints/endpoints.json");
const {generateRandomString} = require("./helpers/commonHelper");
const teardown = require("./helpers/teardown");

let endpoint = endpoints.booking;
let bookingId;
let bookingUrl;
let token;
let firstname;
let lastname;
let bookingFullUrl;

jest.setTimeout(globs.TIMEOUT);

describe('(happypath): Tests on Partial update', function () {
    beforeAll(async () => {
        const res = await startup.createBookingPayload(endpoint);
        bookingId = await res.body['bookingid'].toString();
        bookingFullUrl = `${endpoint}/${bookingId}`;
        const payloadAuth = payloads.authPayload;
        const resAuth = await helpers.post(endpoints.auth, payloadAuth);
        token = resAuth.body['token'];

        firstname = generateRandomString();
        lastname = generateRandomString();
    });

    afterAll(async () =>{
        await teardown.deleteBooking(bookingFullUrl);
    });

    it('Should partially update the created booking with the Cookie header', async () =>{
        const payload = startup.createBookingShortPayload(firstname, lastname);
        const resp = await helpers.patch(bookingFullUrl, token, payload);
        expect(resp.statusCode).toEqual(200);
        expect(resp.body['firstname']).toEqual(firstname);
        expect(resp.body['lastname']).toEqual(lastname);
    });

    it('Should partially update the created booking with the Auth header', async () =>{
        const payload = startup.createBookingShortPayload(firstname, lastname);
        const response = await helpers.patchWithAuthHeader(bookingFullUrl, payload);
        expect(response.statusCode).toEqual(200);
        expect(response.body['firstname']).toEqual(firstname);
        expect(response.body['lastname']).toEqual(lastname);
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
