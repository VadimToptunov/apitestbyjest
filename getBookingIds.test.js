const pack = require('./package.json');
const globs = pack.jest.globals;
const helpers = require('./helpers/requestsHelper');

jest.setTimeout(50000);

describe('Get booking ids tests:', () => {
    it.each(['/booking',
        '/booking?firstname=sally&lastname=brown',
        '/booking?firstname=sally',
        '/booking?lastname=brown',
        '/booking?checkin=2014-03-13&checkout=2014-05-21',
        '/booking?checkin=2014-03-13',
        '/booking?checkout=2014-05-21',
    ])
    ('Should return 200OK on correct input ', async (paramerers) => {
        const endpoint = globs.BASICURL + paramerers;
        const res = await helpers.get(endpoint);
        expect(res.statusCode).toEqual(200);
        expect(res.body[0]).toHaveProperty('bookingid');
        expect(res.body.length).toBeGreaterThan(0);
    });

    it.each([
        '/booking?firstname=dfaasdafsa',
        '/booking?firstname=999',
        '/booking?lastname=dsadfa',
        '/booking?lastname=999',
        '/booking?checkin=1714-03-13&checkout=2014-05-21',
        '/booking?checkin=2099-03-13&checkout=2014-05-21',
        '/booking?checkin=2014-03-13&checkout=1010-05-21',
        '/booking?checkin=2014-03-13&checkout=9999-05-21',
        '/booking?checkin=0000-03-13',
        '/booking?checkout=9999-05-21',
        '/booking?firstname=&lastname=',
        '/booking?checkin=&checkout=',
        '/booking?checkin=',
        '/booking?checkout='
    ])
    ('Should return error message on incorrect input data', async (falseParameters) =>{
        console.log(falseParameters);
        const endpoint = globs.BASICURL + falseParameters;
        const res = await helpers.get(endpoint);
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(0);
    });
});
