const formatToWeatherDate = (date) => {
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = date.getFullYear();
    let formattedDate = mm + '/' + dd + '/' + yyyy;
    return formattedDate
}

module.exports = formatToWeatherDate