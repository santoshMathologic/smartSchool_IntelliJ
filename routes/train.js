/**
 * Created by SANTOSH on 10/26/2016.
 */
var express = require('express');
var router = express.Router();
var uploadModel = require("../models/upload.js");
var trainModel = require("../models/train.js");
var timeCal = require("../library/timeCalculator.js");
var Q = require('q');
var trainListArrray = [];
var trainStationListArrray = [];


var trains = {
    processUpload: function (req, res, next) {

        if (req.query.userChoice != null || req.query.userChoice != "") {
            var userChoice = req.query.userChoice;
            switch (userChoice) {
                case "combine_train_details.csv":
                case "COMBINE_TRAIN_DETAILS.csv":
                    uploadModel.find({ 'originalFileName': userChoice }, function (err, cursor) {
                        for (var count = 0; count < cursor.length; count++) {
                            parseTrainTimeTable(cursor[count].data).then(function (res) {



                            });
                            res.status(201);
                            return res.json({
                                "status": 200,
                                "success": true,
                                "message": "train processing completed successfully",
                            });


                        }
                    });

                    break;

                case "combine_train_details - extraSmall.csv":
                case "COMBINE_TRAIN_DETAILS - EXTRASMALL.csv":
                    uploadModel.find({ 'originalFileName': userChoice }, function (err, cursor) {
                        for (var count = 0; count < cursor.length; count++) {
                            parseTrainTimeTable(cursor[count].data);

                        }
                    });
                    break;

                case "combine_train_stations - extraSmall.csv":
                case 'COMBINE_TRAIN_STATIONS - extraSmall.csv':
                    uploadModel.find({ 'originalFileName': userChoice }, function (err, cursor) {
                        for (var count = 0; count < cursor.length; count++) {
                            parseTrainStation(cursor[count].data);

                        }
                    });

                    break;

                case "combine_train_stations.csv":
                case "COMBINE_TRAIN_STATIONS.csv":

                    uploadModel.find({ 'originalFileName': userChoice }, function (err, cursor) {
                        for (var count = 0; count < cursor.length; count++) {
                            parseTrainStation(cursor[count].data);

                        }
                    });

                    break;

            }


        }


    }



}

function parseTrainTimeTable(data) {
    var deferred = Q.defer();
    data += '\n';
    var re = /\r\n|\n\r|\n|\r/g;
    var rows = data.replace(re, "\n").split("\n");
    for (var i = 1; i < rows.length; i++) {

        var trainNo;
        var trainName;
        var fromStation;
        var toStation;
        var trainType;
        var runningDaysArray = [];
        var rowdata = rows[i].split(",");
        if (rowdata[0] != "") {

            trainNo = rowdata[0];
            trainName = rowdata[1];
            fromStation = rowdata[2];
            toStation = rowdata[3];
            trainType = rowdata[11];

            for (var j = 0; j < 7; j++) {
                var runningDay = rowdata[4 + j];
                if (runningDay != "") {
                    runningDaysArray.push(j);
                }
            }

            pushDataToArray(trainNo, trainName, fromStation, toStation, runningDaysArray, trainType);
            //console.log(" " + trainNo + " " + trainName + " " + fromStation + " " + toStation + " " + runningDaysArray + " " + trainType);



        }
    }
    createTrainList(trainListArrray).then(function (response) {
        console.log("Response" + response);
        deferred.resolve(response);
    })
    return deferred.promise;
}

function parseTrainStation(data) {



    var deferred = Q.defer();
    data += '\n';
    var re = /\r\n|\n\r|\n|\r/g;
    var rows = data.replace(re, "\n").split("\n");
    for (var i = 1; i < rows.length; i++) {
        var trainNo;
        var stop_Number;
        var arrival;
        var departure;
        var stationCode;
        var day_of_journey;
        var distance;
        var arrivalDay;
        var departureDay;
        var departureDate;
        var arrivalDate;

        var rowdata = rows[i].split(",");
        if (rowdata[0] != "") {
            trainNo         =  rowdata[0]
            stop_Number     = rowdata[1];
            stationCode     = rowdata[2];
            day_of_journey  = rowdata[3];
            arrival         = rowdata[4];
            departure       = rowdata[5];
            distance        = rowdata[6];
            arrivalDay      = day_of_journey- 1;
            departureDay    = arrivalDay;

            var arrivalDateTimeObj = { day: arrivalDay, time: arrival };
            var departureDateTimeObj = { day: departureDay, time: departure };
            var arrivalTimeMinutes = timeCal.convertDateTimeObjToNumber(arrivalDateTimeObj);
            var departureTimeMinutes = timeCal.convertDateTimeObjToNumber(departureDateTimeObj);

        }

        arrivalDate = day_of_journey + ' Jan 2012 ' + arrival + ':00 GMT+0000';

        if (arrivalTimeMinutes > departureTimeMinutes) {
            departureDay = parseInt(arrivalDay) + 1;
           // departureDate = (dayOfJourney + 1) + ' Jan 2012 ' + departureTime + ':00 GMT+0000';
        }
        else {
            departureDay = arrivalDay;
            //departureDate = (dayOfJourney) + ' Jan 2012 ' + departureTime + ':00 GMT+0000';
        }

        var arrivalDateTime = new Date(arrivalDate);
        var departureDateTime = new Date(departureDate);

       // pushTrainStationToArray(trainNo,stop_Number,stationCode);


    }




}
function pushTrainStationToArray(trainNo, stop_Number, stationCode, arrivalTime,departureTime,arrivalMinutes,departureMinutes,arrivalDateTime,departureDateTime,arrivalDay,departureDay,day_of_journey,distance) {
    trainStationListArrray.push({
        trainNo: trainNo,
        stopNo: stop_Number,
        stationCode: stationCode,
        arrivalTime: arrivalTime,
        departureTime: departureTime,
        arrivalMinutes: arrivalMinutes,
        departureMinutes: departureMinutes,
        arrivalDateTime: arrivalDateTime,
        departureDateTime: departureDateTime,
        arrivalDay: arrivalDay,
        departureDay: departureDay,
        dayOfJourney: day_of_journey,
        distance: distance

    })
}
function pushDataToArray(trainNo, trainName, fromStation, toStation, runningDays, trainType) {
    trainListArrray.push({
        trainNo: trainNo,
        trainName: trainName,
        fromStation: fromStation,
        toStation: toStation,
        runningDays: runningDays,
        trainType: trainType
    })
}

function createTrainList(data) {
    var deferred = Q.defer();
    trainModel.insertMany(data, function (err, post) {
        if (err) return err;
        console.log("post");
        deferred.resolve(post);

    });
    return deferred.promise;
}

module.exports = trains