const pack = require('./package.json');
const globs = pack.jest.globals;
const startup = require("./helpers/startup");
const helpers = require("./helpers/requestsHelper");
const endpoints = require("./testInput/endpoints/endpoints.json");
const payloads = require("./testInput/payloads/correctPayloads.json");
const teardown = require("./helpers/teardown");
const {generateRandomString, generatePrice, generateDate} = require("./helpers/commonHelper");

let endpoint = endpoints.booking;
let bookingId;
let token;

let firstname;
let lastname;
let price;
let checkin;
let checkout;

jest.setTimeout(globs.TIMEOUT);

describe('(happypath) Tests on update of a created Booking:', function () {
    let bookingUrl;
    beforeAll(async () => {
        const res = await startup.createBookingPayload(endpoint);
        bookingId = await res.body['bookingid'].toString();
        bookingUrl = `${endpoint}/${bookingId}`;
        const payloadAuth = payloads.authPayload;
        const resAuth = await helpers.post(endpoints.auth, payloadAuth);
        token = resAuth.body['token'];

        firstname = generateRandomString();
        lastname = generateRandomString();
        price = generatePrice();
        checkin = generateDate(2019);
        checkout = generateDate(2022);
    });

    afterAll(async () =>{
        await teardown.deleteBooking(bookingUrl);
    });

    it('Should update the created booking with the Cookie header', async () =>{
        const payload = startup.createBookingPayloadForUpdate(firstname, lastname, price, checkin, checkout);
        const resp = await helpers.put(bookingUrl, token, payload);
        expect(resp.statusCode).toEqual(200);
        expect(resp.body['firstname']).toEqual(firstname);
        expect(resp.body['lastname']).toEqual(lastname);
        expect(resp.body['totalprice']).toEqual(price);

        const bookingdates = resp.body['bookingdates'];

        expect(bookingdates['checkin']).toEqual(checkin);
        expect(bookingdates['checkout']).toEqual(checkout);
    });

    it('Should update the created booking with the Auth header', async () =>{
        const payload = startup.createBookingPayloadForUpdate(firstname, lastname, price, checkin, checkout);
        const response = await helpers.putWithAuthHeader(bookingUrl, payload);
        expect(response.statusCode).toEqual(200);
        expect(response.body['firstname']).toEqual(firstname);
        expect(response.body['lastname']).toEqual(lastname);
        expect(response.body['totalprice']).toEqual(price);

        const bookingdates = response.body['bookingdates'];

        expect(bookingdates['checkin']).toEqual(checkin);
        expect(bookingdates['checkout']).toEqual(checkout);
    });
});

describe('(negativeflow) Cases on error 403: ', () => {
    let bookingUrl;
    beforeEach(async () => {
        const res = await startup.createBookingPayload(endpoint);
        bookingId = await res.body['bookingid'].toString();
        bookingUrl = `${endpoint}/${bookingId}`;
    });

    it('Should return error 403 on update with incorrect headers', async () => {
        await helpers.putWithoutOptionalHeaders(bookingUrl)
            .catch(function (res){
                expect(res.status).toEqual(403);
            });
    });
});

