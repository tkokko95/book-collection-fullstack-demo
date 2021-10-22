const info = (...params) => {
    console.log(...params)
}

const error = (...params) => {
    // We don't want the console to get spammed full of error messages during the unit tests.
    // Why Jest still doesn't have a clean way of suppressing console.errors is anyone's guess
    process.env.NODE_ENV === 'test' ? null : console.error(...params)
}

module.exports = {
    info, error
}