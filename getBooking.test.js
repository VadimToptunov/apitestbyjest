const pack = require('./package.json');
const globs = pack.jest.globals;
const helpers = require('./helpers/requestsHelper');

jest.setTimeout(50000);

describe('Get booking tests:', () => {
    it('Should return all data by id', async () => {
        const endpoint = globs.BASICURL + "/booking/4171";
        const res = await helpers.getFullHeaders(endpoint);
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

    it('Should return error 404 on an id that does not exist', async () => {
        const endpoint = globs.BASICURL + "/booking/1";
        await helpers.getFullHeaders(endpoint).catch(function (res) {
            expect(res.status).toEqual(404);
        });
    });

    it('Should return error 418 on an incorrect header', async () => {
        const endpoint = globs.BASICURL + "/booking/4171";
        await helpers.get(endpoint).catch(function (res) {
            expect(res.status).toEqual(418);
        });
    });
});