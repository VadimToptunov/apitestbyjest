const helpers = require("./requestsHelper");

async function deleteBooking(url){
    return await helpers.deleteItemWithAuth(url);
}

module.exports = {
    deleteBooking
}