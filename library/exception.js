/**
 * Created by SANTOSH on 10/26/2016.
 */



var isDebug = false;
var DEBUG = function (val) {
    if (isDebug) {
        console.log("NodeRestApi : LOG : " + val);

    }
};
var ERROR = function (val) {
    console.log("NodeRestApi : ERROR : ");
    console.log(val);
};

var LOG = function (val) {
    console.log("NodeRestApi : LOG : ");
    console.log(val);
};

var customExp = {
    DEBUG: DEBUG,
    ERROR:ERROR,
    LOG:LOG
}

module.exports = customExp;