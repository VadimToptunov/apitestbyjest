const pack = require('./package.json');
const globs = pack.jest.globals;
const helpers = require('./helpers/requestsHelper')

describe('Healthcheck API test:', () => {
    it('Should receive 201', async () => {
        const endpoint = globs.BASICURL + '/ping';
        const res = await helpers.get(endpoint);
        expect(res.statusCode).toEqual(201);
    });
});