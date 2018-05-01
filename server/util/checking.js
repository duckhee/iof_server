var bcrypt = require('bcrypt-nodejs');

// if (!bcrypt.compareSync(inputpw, row.user_password)) {
//     console.log('not match password');
//     callback(null, null, 1);
// } else {
//     console.log('login suesss', row);
//     callback(null, row, 2);
// }

//checking url 
exports.Checking = function(url) {
    console.log('url info :::: ', url);
    var pwUrl = bcrypt.hashSync(url);
    return pwUrl;
}