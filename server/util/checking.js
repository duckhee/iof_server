var bcrypt = require('bcrypt-nodejs');

// if (!bcrypt.compareSync(inputpw, row.user_password)) {
//     console.log('not match password');
//     callback(null, null, 1);
// } else {
//     console.log('login suesss', row);
//     callback(null, row, 2);
// }

//checking url 

const flag = 'right';
const flag2 = 'false';


exports.BcryptUrl = function() {
    console.log('bcrypt url info :::: ', flag);
    var pwUrl = bcrypt.hashSync(flag);
    return pwUrl;
}

exports.CompareUrl = function(flagStatus) {
    console.log('compare url info ::: ', flag);
    if (bcrypt.compareSync(flagStatus, flag)) {
        return true;
    } else {
        return false;
    }
}