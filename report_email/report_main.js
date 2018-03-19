var report = require('./report.js');



//check one day sn status checking 
report.get_status(function(err, result){
    if(err){
        console.log('report get status error :::::::::::::: ', err);
        process.exit();
    }else{
        if(result.length === 0){
            console.log('all connected server');
            process.exit();
        }else{
            for(var i; i < result.length; i++){
                report.status_change(result[i].sn_serial, function(err, rows){
                    if(err){
                        console.log('report change status error ::::::::::::::: ', err);
                        process.exit();
                    }else{
                        console.log('success change status :::::::::::: ', rows);
                        process.exit();
                    }
                });
            }
        }
    }
});

