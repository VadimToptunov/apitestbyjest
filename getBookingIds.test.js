const pack = require('./package.json');
const globs = pack.jest.globals;
const helpers = require('./helpers/requestsHelper');
const endpoints = require('./testInput/endpoints/endpoints.json');
const falseInputs = require('./testInput/inputs/falseInputs.json')
const correctInputs = require('./testInput/inputs/correctInputs.json')
const startup = require('./helpers/startup');

jest.setTimeout(globs.TIMEOUT);
let bookingEndpoint = endpoints.booking;
let correctInputData = correctInputs.bookingCorrectInputs;
let incorrectInput = falseInputs.bookingFalseInputs;
let incorrectDateInput = falseInputs.bookingIncorrectDateFalseInputs;
let emptyDataInput = falseInputs.bookingEmptyDataFalseInputs;

describe('(happypath): Get booking ids tests:', () => {
    let payload;
    beforeEach(async () => {
        payload = await startup.createBookingPayload(bookingEndpoint);
    });

    it.each(correctInputData)
    ('Should return 200OK on correct input %s', async (parameter) => {
        const endpoint = bookingEndpoint + parameter;
        const res = await helpers.get(endpoint);
        expect(res.statusCode).toEqual(200);
        expect(res.body[0]).toHaveProperty('bookingid');
        expect(res.body.length).toBeGreaterThan(0);
    });
});

describe('(negativeflow): Negative flow getBookingIds tests: ', () => {
    it.each(incorrectInput)
    ('Should return error message on incorrect input data: %s', async (falseParameters) =>{
        const endpoint = bookingEndpoint + falseParameters;
        const res = await helpers.get(endpoint);
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(0);
    });

    it.each(incorrectDateInput)
    ('Should return empty list on incorrect dates and date ranges: %s', async (falseDateParameter) => {
        const endpoint = bookingEndpoint + falseDateParameter;
        const res = await helpers.get(endpoint);
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(0);
    });

    it.each(emptyDataInput)
    ('Should receive error 500 on incorrect input data: %s', async (falseParameters) =>{
        const endpoint = bookingEndpoint + falseParameters;
        await helpers.get(endpoint).catch(function (res) {
            expect(res.status).toEqual(500)
        });
    });
});
