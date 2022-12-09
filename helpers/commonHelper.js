function generateRandomString(){
    return (Math.random() + 1).toString(36).substring(2);
}

function generatePrice() {
    const min = 99;
    const max = 799;
    return Math.floor(
        Math.random() * (max - min) + min
    );
}

module.exports = {
    generateRandomString,
    generatePrice,
}