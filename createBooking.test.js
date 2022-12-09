const pack = require('./package.json');
const globs = pack.jest.globals;
const helpers = require('./helpers/requestsHelper');
const generator = require('./helpers/commonHelper')

describe('Create booking tests:', () => {
    let endpoint;
    let payload;
    let firstname;
    let lastname;
    let price;
    let checkin;
    let checkout;
    beforeEach(async () => {
        endpoint = globs.BASICURL + '/booking';
        firstname = generator.generateRandomString();
        lastname = generator.generateRandomString();
        price = generator.generatePrice();
        checkin = '2099-01-01';
        checkout = '2099-10-01';

        payload = {
            "firstname": firstname,
            "lastname": lastname,
            "totalprice": price,
            "depositpaid": true,
            "bookingdates": {
                "checkin": checkin,
                "checkout": checkout
            },
            "additionalneeds": "Breakfast"
        }
    });
    it('Should successfully create a booking', async () => {
        const res = await helpers.postFullHeaders(endpoint, payload);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('bookingid');
        expect(res.body['bookingid']).toEqual(expect.any(Number));

        const booking = res.body['booking'];

        expect(booking).toHaveProperty('firstname');
        expect(typeof booking['firstname']).toBe('string');
        expect(booking['firstname']).toEqual(firstname);
        expect(booking).toHaveProperty('lastname');
        expect(typeof booking['lastname']).toBe('string');
        expect(booking['lastname']).toEqual(lastname);
        expect(booking).toHaveProperty('totalprice');
        expect(typeof booking['totalprice']).toBe('number');
        expect(booking['totalprice']).toEqual(price);
        expect(booking).toHaveProperty('depositpaid');
        expect(typeof booking['depositpaid']).toEqual('boolean');

        const bookingdates = res.body['booking']['bookingdates'];

        expect(booking).toHaveProperty('bookingdates');
        expect(bookingdates).toHaveProperty('checkin');
        expect(typeof bookingdates['checkin']).toBe('string');
        expect(bookingdates['checkin']).toEqual(checkin);
        expect(bookingdates).toHaveProperty('checkout');
        expect(typeof bookingdates['checkout']).toBe('string');
        expect(bookingdates['checkout']).toEqual(checkout);

        expect(booking).toHaveProperty('additionalneeds');
        expect(typeof booking['additionalneeds']).toBe('string');
    });

    it('Should return error 418 on an incorrect header', async () => {
        await helpers.post(endpoint, payload).catch(function (res) {
            expect(res.status).toEqual(418);
        });
    });

    it.each([
        ["Incorrect firstname type", {"firstname": 111, "lastname": lastname, "totalprice": price, "depositpaid": true, "bookingdates": {"checkin": checkin, "checkout": checkout},
            "additionalneeds": "Breakfast"
        }],
        ["Incorrect lastname type", {"firstname": firstname, "lastname": 222, "totalprice": price, "depositpaid": true, "bookingdates": {"checkin": checkin, "checkout": checkout},
            "additionalneeds": "Breakfast"
        }],
        ["Incorrect price type", {"firstname": firstname, "lastname": lastname, "totalprice": "one", "depositpaid": true, "bookingdates": {"checkin": checkin, "checkout": checkout},
            "additionalneeds": "Breakfast"
        }],
        ["Incorrect checkin type", {"firstname": firstname, "lastname": lastname, "totalprice": "one", "depositpaid": true, "bookingdates": {"checkin": 2022-12-12, "checkout": checkout},
            "additionalneeds": "Breakfast"
        }],
        ["Incorrect checkout type", {"firstname": firstname, "lastname": lastname, "totalprice": "one", "depositpaid": true, "bookingdates": {"checkin": checkin, "checkout": 2011-12-12},
            "additionalneeds": "Breakfast"
        }],
    ])
    ('Should return error 500 on incorrect payload: %s', async (faultName, falsePayload) =>{
        await helpers.post(endpoint, falsePayload).catch(function (res) {
            expect(res.status).toEqual(500);
        });
    });
});