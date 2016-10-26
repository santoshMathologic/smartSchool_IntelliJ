var express = require('express');
var router = express.Router();
var userPlan = require('./userPlan.js');
var userUpload = require('./Upload.js');
var train = require('./train.js');

var upload = multer({
  dest: './uploads',
  /* limits: {
   fileSize: 5 * 1000000
   }
   */
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// Routes for UserPlan
router.get("/api/v1/userPlans", userPlan.getUserPlan);

// Routes for upload
router.post("/api/v1/upload/NewUpload",upload.single('Uploadfile'),userUpload.createNewUpload);


// Routes for Processing

router.get("/api/v1/proTrainTimeTable", train.processUpload);




module.exports = router;
