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

function generateDate(year){
    const start = new Date(year, 0, 1);
    const end = new Date();
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().slice(0, 10);
}

module.exports = {
    generateRandomString,
    generatePrice,
    generateDate
}