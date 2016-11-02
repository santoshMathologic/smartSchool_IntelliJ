/**
 * Created by SANTOSH on 10/26/2016.
 */
var convertDateTimeObjToNumber = function(dateTimeObj, target) {
    if (dateTimeObj === null || typeof dateTimeObj !== 'object') {
        throw new Error("Not valid dateTimeObject passed to convertDateTimeObj()");
    }
    if (dateTimeObj.day === null || dateTimeObj.time === null) {
        throw new Error("Not valid dateTimeObject passed to convertDateTimeObj()");
    }
    if (target == null) {
        target = "";
    }
    target = target.toLowerCase();

    var timeParts = dateTimeObj.time.split(':');
    timeParts[0] = parseInt(timeParts[0]);
    timeParts[1] = parseInt(timeParts[1]);
    if((timeParts[0]>23 || timeParts[0]<0)&&(timeParts[1]>59 || timeParts[1]<0)){
        throw new Error("Not valid dateTimeObj.time passed to convertDateTimeObj()");
    }

    var mins = (dateTimeObj.day * 1440)
        + (timeParts[0] * 60)
        + (timeParts[1]);

    var result = null;
    switch (target) {
        case 'mins': case 'min': case 'minutes': case 'minute':
        result = mins;
        break;
        case 'hrs': case 'hr': case 'hours': case 'hour':
        result = (mins / 60);
        break;
        case 'days': case 'day':
        result = (mins / 1440);
        break;
        default:
            result = mins;
            break;
    }
    return result;


}

var convertNumberToDateTimeObj = function(number, type) {

    if (type == null) {
        type = "";
    }
    type = type.toLowerCase();

    if (number == null) {
        throw new Error("Number not sent to convertNumberToDateTimeObj()");
    }
    var day = -1;
    var hrs = -1;
    var mins = -1;
    switch (type) {
        case 'mins': case 'min': case 'minutes': case 'minute':
        day = Math.floor(number / 1440);
        number = number % 1440;
        hrs = Math.floor(number / 60);
        number = number % 60;
        mins = Math.floor(number);
        if (mins > 60) {
            throw new Error("Number not in correct type given");
        }
        break;
        case 'hrs': case 'hr': case 'hours': case 'hour':
        day = Math.floor(number / 1440);
        number = number % 1440;
        hrs = Math.floor(number / 60);
        if (hrs > 24) {
            throw new Error("Number not in correct type given");
        }
        break;
        case 'days': case 'day':
        day = Math.floor(number / 1440);
        if (day > 24) {
            throw new Error("Number not in correct type given");
        }
        break;
        default:
            day = Math.floor(number / 1440);
            number = number % 1440;
            hrs = Math.floor(number / 60);
            number = number % 60;
            mins = Math.floor(number);
            if (mins > 60) {
                throw new Error("Number not in correct type given");
            }
            break;
    }
    var result = {};
    if (day != -1) {
        result.days = day;
        result.day = day % 7;
    }
    if (hrs != -1 && mins == -1) {
        result.time = (hrs < 10) ? '0' : '' + hrs + ':00';
    }
    else if (hrs != -1 && mins != -1) {
        result.time = "";
        result.time += ((hrs < 10) ? '0' : '') + hrs.toString();
        result.time += ':' + ((mins < 10) ? '0' : '') + mins.toString();
    }
    return result;

}


var timeCal = {
    convertDateTimeObjToNumber: convertDateTimeObjToNumber,
    convertNumberToDateTimeObj: convertNumberToDateTimeObj,


}

module.exports = timeCal;