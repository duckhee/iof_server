var models = require('../models/index');
var user = require('../models/user');

exports.create = function(user_info, callback)
{
    models.user.findOrCreate({
        where:{

        }, 
        default:
        {

        }
    }).spread().catch(function(err)
{

});
};

