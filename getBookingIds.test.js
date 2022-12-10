const pack = require('./package.json');
const globs = pack.jest.globals;
const helpers = require('./helpers/requestsHelper');
const endpoints = require('./testInput/endpoints/endpoints.json');
const falseInputs = require('./testInput/inputs/falseInputs.json')
const correctInputs = require('./testInput/inputs/correctInputs.json')

jest.setTimeout(globs.TIMEOUT);

describe('Get booking ids tests:', () => {
    let bookingEndpoint = endpoints.booking;
    let correctInputData = correctInputs.bookingCorrectInputs;
    let incorrectInput = falseInputs.bookingFalseInputs;
    let incorrectDateInput = falseInputs.bookingIncorrectDateFalseInputs;
    let emptyDataInput = falseInputs.bookingEmptyDataFalseInputs;
    let nonExistent = falseInputs.bookingNonExistentData;

    it.each(correctInputData)
    ('Should return 200OK on correct input %s', async (parameter) => {
        const endpoint = bookingEndpoint + parameter;
        const res = await helpers.get(endpoint);
        expect(res.statusCode).toEqual(200);
        expect(res.body[0]).toHaveProperty('bookingid');
        expect(res.body.length).toBeGreaterThan(0);
    });

    //Flaky test, depends on input parameters
    it.each(nonExistent)
    ('Should return 200OK and empty list on correct input with not existing data: %s', async (parameter) => {
        const endpoint = bookingEndpoint + parameter;
        const res = await helpers.get(endpoint);
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(0);
    });

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
