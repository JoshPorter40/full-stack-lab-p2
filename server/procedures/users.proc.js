var db = require('../config/db');

exports.readByEmail = function(email) {
    return db.row('GetUserByEMail', [email]);
}

exports.all = function() {
    return db.rows('GetUsers');
}

exports.read = function(id) {
    return db.row('GetUser', [id]);
}

exports.create = function(firstname, lastname, email, hash) {
    return db.row('InsertUser', [firstname, lastname, email, hash]);
}
