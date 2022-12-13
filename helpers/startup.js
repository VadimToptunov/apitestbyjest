const helpers = require("./requestsHelper");
const endpoints = require("../testInput/endpoints/endpoints.json");
const payloads = require("../testInput/payloads/correctPayloads.json");
const generator = require("./commonHelper");

async function getCorrectBookingId() {
    const res = await helpers.getFullHeaders(endpoints.booking);
    return `${endpoints.booking}/${res.body[0]['bookingid'].toString()}`;
}

async function createBookingPayload(bookingEndpoint){
    let payload = payloads.bookingPayload;
    payload.firstname = "sally";
    payload.lastname = "brown";
    payload.totalprice = generator.generatePrice();
    payload.bookingdates.checkin = "2014-03-13";
    payload.bookingdates.checkout = "2014-05-21";
    return await helpers.postFullHeaders(bookingEndpoint, payload);
}

function createBookingPayloadForUpdate(firstname, lastname, price, checkin, checkout){
    let payload = payloads.bookingPayload;
    payload.firstname = firstname;
    payload.lastname = lastname;
    payload.totalprice = price;
    payload.bookingdates.checkin = checkin;
    payload.bookingdates.checkout = checkout;
    return payload
}

function createBookingShortPayload(firstname, lastname){
    let payload = payloads.partialUpdatePayload;
    payload.firstname = firstname;
    payload.lastname = lastname;
    return payload
}

module.exports ={
    getCorrectBookingId,
    createBookingPayload,
    createBookingPayloadForUpdate,
    createBookingShortPayload
}