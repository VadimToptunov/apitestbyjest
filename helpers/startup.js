const helpers = require("./requestsHelper");
const endpoints = require("../testInput/endpoints/endpoints.json");
const payloads = require("../testInput/payloads/correctPayloads.json");
const generator = require("./commonHelper");

async function getCorrectBookingId() {
    const res = await helpers.getFullHeaders(endpoints.booking);
    return `${endpoints.booking}/${res.body[0]['bookingid'].toString()}`;
}

async function createBookingPayload(bookingEndpoint){
    let payload = payloads.createBookingPayload;
    payload.firstname = "sally";
    payload.lastname = "brown";
    payload.totalprice = generator.generatePrice();
    payload.bookingdates.checkin = "2014-03-13";
    payload.bookingdates.checkout = "2014-05-21";
    return await helpers.postFullHeaders(bookingEndpoint, payload);
}

module.exports ={
    getCorrectBookingId,
    createBookingPayload
}