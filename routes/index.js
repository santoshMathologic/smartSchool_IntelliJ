var express = require('express');
var router = express.Router();
var userPlan = require('./userPlan.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// Routes for UserPlan
router.get("/api/v1/userPlans", userPlan.getUserPlan);

module.exports = router;
