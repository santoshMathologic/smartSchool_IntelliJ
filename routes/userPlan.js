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

    createPlan: function(req,res){

              var userPlan  =  req.body.newPlan;

            var planObject = new planModel({
             planName:userPlan,
                owner:"santosh"


        })

        planModel.create(planObject, function (err) {
            if (err) return err;
            res.status(201);
            return res.json({
                "status": 200,
                "success": true,
                "message": "UserPlan saved Successfully",
            });
        });
    }


}


module.exports = userplans;