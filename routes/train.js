/**
 * Created by SANTOSH on 10/26/2016.
 */
var express = require('express');
var router = express.Router();
var uploadModel = require("../models/upload.js");
var trainModel = require("../models/train.js");
var Q = require('q');
var trainListArrray = [];


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

    console.log("" + data);




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