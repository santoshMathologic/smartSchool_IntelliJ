var express = require('express');
var router = express.Router();
var fs = require('fs');
var q = require('q');
var multer = require('multer')

var upload = multer({ dest: 'uploads/' })
var customConverter = require('../Utils/convertFileSystem.js');

var uploadModel = require("../models/upload.js");




var UploadObject = {

    createNewUpload: function (req, res) {
        var path = req.file.path;
        var name = req.file.filename;
        var file = __dirname + "/" + req.file.name;
        var originalFileName = req.file.originalname;
        var fileSize = customConverter.convertBytesToKb(req.file.size, true);
        var dirName = 'uploadCSV';
        var fileExtension = customConverter.getFileType(originalFileName);

        if (!fs.existsSync(dirName)) {
            fs.mkdirSync(dirName);
        }

        try {
            isDebug = true;
            customeException.DEBUG("In Debug Mode");
            fs.readFile(path, 'utf8', function (error, data) {
                if (error) {
                    throw new Error("Error Reading in File : " + error)
                } else {
                    buffer = new Buffer(data);
                    var uploadObject = new uploadModel({
                        data: buffer,
                        fileType : fileExtension,
                        fileSize : fileSize,
                        originalFileName : originalFileName,
                        uploadedBy: "santosh",
                        isProcessed: false,
                        status: "Files Uploaded Successfully",
                        description: "Files Uploaded Successfully"

                    })

                    fs.writeFile(dirName+"/"+originalFileName, data, function (err) {
                        if (err) {
                            console.log('Some error occured - file either not saved or corrupted file saved.');
                        } else {
                            console.log('It\'s saved!');
                            fs.unlink('./' + path, function (err) {
                                if (err) throw new Error("Error "+err)
                                else {
                                    console.log("file deleted");
                                    uploadModel.create(uploadObject, function (err) {
                                        if (err) return err;
                                        res.status(201);
                                        return res.json({
                                            "status": 200,
                                            "success": true,
                                            "message": "Upload saved Successfully",
                                        });
                                    });
                                }
                            });
                        }
                    });
                }
            })
        } catch (exception) {
            console.log("Exception :" + exception);
        }
    }
}

module.exports = UploadObject;