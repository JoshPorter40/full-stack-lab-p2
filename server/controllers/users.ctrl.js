var express = require('express');
var procedures = require('../procedures/users.proc');
var auth = require('../middleware/auth.mw');

var router = express.Router();

router.get('/', function(req, res) {
    procedures.all()
    .then(function(users) {
        res.send(users);
    }, function(err) {
        console.log(err);
        res.sendStatus(500);
    });
});

module.exports = router;