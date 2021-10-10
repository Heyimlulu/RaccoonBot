module.exports = async function () {
    let date;
    let today = new Date();

    let dd = today.getDate(); // Day
    let mm = today.getMonth() + 1; // Month
    let yyyy = today.getFullYear(); // Year

    today = yyyy + '-' + mm + '-' + dd;

    // Get current hour
    let time = new Date();
    let currentTime = time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();

    date = today + ' ' + currentTime;

    return date;
}