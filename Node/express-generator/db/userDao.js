var mysql = require('mysql');

var config = require('../conf/db.js');
var $sql = require('./userSql');

var pool = mysql.createPool( config.mysql );
module.exports = {
    add: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            var param = req.query || req.params;
            connection.query($sql.insert, [param.name, param.age], function(err, result) {
                if(err) {
                    res.send(err); 
                }else{
                    res.send('add success');
                }
                // 释放连接 
                connection.release();
            });
        });
    },
    query: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryAll, function(err, result) {
                console.log(result)
                if(err) {
                    res.send(err); 
                }else{
                    res.json(result);
                }
                // 释放连接 
                connection.release();
            });
        })
    }
};
