/**
 * Created by SANTOSH on 10/28/2016.
 */

var hoursToMinutes = function(hr, min) {
    return parseInt(hr * 60 + min);
}

var calculateJourneyDuration = function(arrivalTime,departureTime) {

    var arrivalMinutes = hoursToMinutes(arrivalTime.split(':')[0],arrivalTime.split(':')[1]);
    var departureMinutes = hoursToMinutes(departureTime.split(':')[0],departureTime.split(':')[1]);

     console.log("arrival Minutes"+arrivalMinutes);
     console.log("departure Minutes"+arrivalMinutes);

}
var journeyCal = {
    calculateJourneyDuration : calculateJourneyDuration

}

module.exports = journeyCal;