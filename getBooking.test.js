const pack = require('./package.json');
const globs = pack.jest.globals;
const helpers = require('./helpers/requestsHelper');
const endpoints = require('./testInput/endpoints/endpoints.json');

jest.setTimeout(globs.TIMEOUT);

describe('(happypath): Get booking tests:', () => {
    it('Should return all data by id', async () => {
        const res = await helpers.getFullHeaders(endpoints.correctBookingId);
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty('firstname');
        expect(typeof res.body['firstname']).toBe('string')
        expect(res.body).toHaveProperty('lastname');
        expect(typeof res.body['lastname']).toBe('string');
        expect(res.body).toHaveProperty('totalprice');
        expect(res.body['totalprice']).toEqual(expect.any(Number));
        expect(res.body).toHaveProperty('depositpaid');
        expect(typeof res.body['depositpaid']).toBe('boolean');
        expect(res.body).toHaveProperty('bookingdates');
        expect(res.body['bookingdates']).toHaveProperty('checkin');
        expect(typeof res.body['bookingdates']['checkin']).toBe('string');
        expect(res.body['bookingdates']).toHaveProperty('checkout');
        expect(typeof res.body['bookingdates']['checkout']).toBe('string');
        expect(res.body).toHaveProperty('additionalneeds');
        expect(typeof res.body['additionalneeds']).toBe('string');
    });
});

describe('(negativeflow): Negative flow getBooking tests: ', function () {
    it('Should return error 404 on an id that does not exist', async () => {
        await helpers.getFullHeaders(endpoints.incorrectBookingId).catch(function (res) {
            expect(res.status).toEqual(404);
        });
    });

    it('Should return error 418 on an incorrect header', async () => {
        await helpers.get(endpoints.correctBookingId).catch(function (res) {
            expect(res.status).toEqual(418);
        });
    });
});