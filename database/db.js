/**
 * Created by SANTOSH on 10/26/2016.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/smartSchool', function(error) {
    if (error) {
        console.log('Error in Connection', error);
    } else {
        console.log('Connection Successfully');
    }
});

