const pack = require('./package.json');
const globs = pack.jest.globals;
const helpers = require('./helpers/requestsHelper')

describe('Authentication tests:', () => {
    it('Should receive token', async () => {
        const endpoint = globs.BASICURL + '/auth';
        const payload = {
            username: globs.USERNAME,
            password: globs.PASSW,
        };
        const res = await helpers.post(endpoint, payload);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });

    it.each([
        {username: globs.USERNAME, password: "incorrect",},
        {username: "falseAdmin", password: globs.PASSW,},
        {username: "falseAdmin", password: "incorrect",},
    ])
    ('Should return error on incorrect payload %p', async (payload) => {
        const endpoint = globs.BASICURL + '/auth';
        const res = await helpers.post(endpoint, payload);
        expect(res.statusCode).toEqual(200);
        expect(res.text).toContain("Bad credentials");
    });
});
