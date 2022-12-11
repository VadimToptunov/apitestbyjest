const helpers = require('./helpers/requestsHelper');
const endpoints = require('./testInput/endpoints/endpoints.json');

describe('(happypath): Healthcheck API test:', () => {
    it('Should receive 201', async () => {
        const res = await helpers.get(endpoints.healthcheck);
        expect(res.statusCode).toEqual(201);
    });
});