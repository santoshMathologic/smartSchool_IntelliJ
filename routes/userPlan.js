/**
 * Created by SANTOSH on 10/26/2016.
 */

var mongoose = require('mongoose');
var planModel = require('../models/userPlan.js');
var q = require('q');
require('mongoose-query-paginate');

var userplans = {

    getUserPlan: function (req, res) {
        var options = {
            perPage: parseInt(req.query.limit) || 10,
            page: parseInt(req.query.page) || 1,
            order: req.query.order || 'planName'
        };
        var query;
        var query = planModel.find({}).sort(options.sortBy);
        query.paginate(options, function (err, result) {
            res.json(result);
        });
    },


}


module.exports = userplans;