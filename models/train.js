/**
 * Created by SANTOSH on 10/26/2016.
 */
var mongoose = require('mongoose');
var trainSchema = new mongoose.Schema({
    trainName: { type: String, default: "",index: true},
    trainNo: Number,
    runningDays: [{type:Number}],
    fromStation : String,
    toStation: String,
    trainType: String,
    markDelete:{type:Boolean,default:false},

})
module.exports = mongoose.model('train', trainSchema);