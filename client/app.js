angular.module('blog', ['ngRoute', 'ngResource', 'blog.controllers', 'blog.factories'])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
    .when('/', {
        templateUrl: 'views/list.html',
        controller: 'PostListController'
    })
    .when('/compose', {
        templateUrl: 'views/compose.html',
        controller: 'ComposePostController'
    })
    .when('/:id/update', {
        templateUrl: 'views/update.html',
        controller: 'UpdatePostController'
    })
    .when('/:id', {
        templateUrl: 'views/single.html',
        controller: 'SinglePostController'
    })
    .otherwise({
        redirectTo: '/'
    });
}]);

var express = require('express');
var users = require('./controllers/users.ctrl');
var router = express.Router();

router.use('/users', users);
module.exports = router;

