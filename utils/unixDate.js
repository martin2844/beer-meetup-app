const convertDate = (unixTS) => {
    const unixTimestamp = unixTS
    const milliseconds = unixTimestamp * 1000 // 1575909015000
    const dateObject = new Date(milliseconds)
    const humanDateFormat = dateObject.toLocaleString() //2019-12-9 10:30:15
    return humanDateFormat;
}

module.exports = convertDate;