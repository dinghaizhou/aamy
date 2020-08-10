var express = require('express');
var router = express.Router();
var userDao = require('../db/userDAO');

/* GET users listing. */
router.get('/', function (req, res, next) {
    userDao.query(req, res, next);
});

module.exports = router;
