const startup = require("./helpers/startup");
const helpers = require("./helpers/requestsHelper");
describe('(happypath):', function () {
    beforeEach(() =>{
       //Create a booking;
    });

    afterEach(() =>{
        //Delete the booking
    });

    it('', async () =>{
        //Update the booking with Cookie
    });

    it('', async () =>{
        //Update the booking with Auth header
    });
});

describe('(negativeflow) Cases on error 403: ', () => {
    beforeEach(async () => {
        const res = await startup.createBookingPayload(endpoint);
        bookingId = await res.body['bookingid'].toString();
        bookingUrl = `${endpoint}/${bookingId}`;
    });

    it('Should return error 403 on update with incorrect headers', async () => {
        await helpers.putWithoutOptionalHeaders(bookingUrl)
            .catch(function (res){
                expect(res.status).toEqual(403);
            });
    });
});

