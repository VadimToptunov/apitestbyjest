const pack = require('./package.json');
const globs = pack.jest.globals;
const helpers = require('./helpers/requestsHelper');
const endpoints = require('./testInput/endpoints/endpoints.json');
const payloads = require('./testInput/payloads/correctPayloads.json');
const falseInputs = require('./testInput/inputs/falseInputs.json')

describe('Authentication tests:', () => {
    jest.setTimeout(globs.TIMEOUT);
    let endpoint = endpoints.auth;
    let incorrectInputs = falseInputs.authFalseInputs;
    it('Should receive token', async () => {
        const payload = payloads.authPayload;
        const res = await helpers.post(endpoint, payload);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });

    it.each(incorrectInputs)
    ('Should return error on incorrect payload %p', async (payload) => {
        const res = await helpers.post(endpoint, payload);
        expect(res.statusCode).toEqual(200);
        expect(res.text).toContain("Bad credentials");
    });
});
