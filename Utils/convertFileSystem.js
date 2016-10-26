/**
 * Created by SANTOSH on 10/26/2016.
 */
var convertBytesToKb = function (bytes, si) {
    var thresh = si ? 1000 : 1024;
    var units = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    if (Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }


    var u = -1;
    do {
        bytes /= thresh;
        ++u;
    } while (Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1) + ' ' + units[u];

}
var getFileType  = function(originalFileName){

    if(originalFileName != undefined ||  originalFileName != null || originalFileName!="")
        return originalFileName.split('.').pop();
    else
        return false
}

var customConverter = {
    convertBytesToKb: convertBytesToKb,
    getFileType :getFileType
}



module.exports = customConverter;