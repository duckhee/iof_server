//craete apikey
exports.createApikey = function() {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var string_length = 15;
    var randomstring = '';
    for (var i = 0; i < string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
    }
    //document.randform.randomfield.value = randomstring;
    return randomstring;
}

//craete serial
exports.createserial = function() {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var string_length = 5;
    var randomstring = '';
    for (var i = 0; i < string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
    }
    //document.randform.randomfield.value = randomstring;
    return randomstring;
}


//null checking
exports.isEmpty = function(value) {
    if (value == "" || value == null || value == undefined || (value != null && typeof value == "object" && !Object.keys(value).length)) {
        return true;
    } else {
        return false;
    }
};

//phone checking
exports.phone_number = function(phone_info) {
    var phone = new Array;
    if (phone_info) {
        if (phone_info.indexOf('-') != -1) {
            phone = phone_info.split('-');
        } else {
            phone[0] = phone_info.substr(0, 3);
            phone[1] = phone_info.substr(3, 4);
            phone[2] = phone_info.substr(7, 4);
        }

        return phone;
    } else {
        phone[0] = 000;
        phone[1] = 0000;
        phone[2] = 0000;
        return phone;
    }

}

//checking device IoF
exports.GetDeviceIoF = function(deviceInfo) {
    if (deviceInfo.device_type === 'IoF') {
        return true;
    }
    return false;
}