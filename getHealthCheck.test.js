const pack = require('./package.json');
const globs = pack.jest.globals;
const helpers = require('./helpers/requestsHelper');
const endpoints = require('./testInput/endpoints/endpoints.json');

describe('Healthcheck API test:', () => {
    it('Should receive 201', async () => {
        const res = await helpers.get(endpoints.healthcheck);
        expect(res.statusCode).toEqual(201);
    });
});