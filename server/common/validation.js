function Namevalidation(key, value) {
    let nameval = /^[a-zA-Z]+$/
    if (value == '' || value == undefined || value == false) {
        return [false, ` ${key} cant be empty`]
    } else if (value.length < 2) {
        return [false, ` ${key} need to be more than 2 character`]
    } else if (value.length > 10) {
        return [false, ` ${key} can'texceed than 10 character`]
    } else if (!nameval.test(value)) {
        return [false, ` ${key} needs to be character`]
    } else {
        return [true]
    }

}

function passwordval(key, value) {
    if (value == '' || value == undefined || value == false) {
        console.log('yess');

        return [false, ` ${key} cant be empty`]
    } else if (value.length < 6) {
        console.log('y here');

        return [false, `minimum length of ${key}  is  6 `]
    } else {
        return [true]
    }

}

function validateEmail(value) {
    let emailPattern = /^([a-zA-Z]*)([a-zA-Z0-9_-]*)@([a-z]{4,7}).([a-z]{1,3})$/

    if (value == '' || value == 'undefined' || value == false) {
        return [false, ` email cant be empty`]
    } else if (!emailPattern.test(value)) {
        return [false, ` enter valid email`]
    } else {
        return [true];
    }

}

module.exports = { Namevalidation, validateEmail, passwordval }
