angular.module('blog.controllers', [])
.controller('PostListController', ['$scope', 'Post', function($scope, Post) {
    $scope.posts = Post.query();
}])
.controller('SinglePostController', ['$scope', '$routeParams', '$location', 'Post', function($scope, $routeParams, $location, Post) {
    $scope.post = Post.get({ id: $routeParams.id});

    $scope.edit = function() {
        $location.path('/' + $routeParams.id + '/update');
    }

    $scope.delete = function() {
        if(confirm('Are you sure you want to delete this blog post?')) {
            $scope.post.$delete(function() {
                $location.replace().path('/');
            });
        }
    }
}])
.controller('ComposePostController', ['$scope', 'Post', 'Category', 'User', '$location', function($scope, Post, Category, User, $location) {
    $scope.users = User.query();
    $scope.categories = Category.query();

    $scope.save = function() {
        var p = new Post($scope.post);
        p.$save(function() {
            $location.path('/');
        }, function(err) {
            console.log(err);
        });
    }

}])
.controller('UpdatePostController', ['$scope', 'Post', 'Category', '$location', '$routeParams', function($scope, Post, Category, $location, $routeParams) {
    $scope.categories = Category.query();
    $scope.post = Post.get({ id: $routeParams.id }, function() {
        $scope.post.categoryid = String($scope.post.categoryid);
    });

    $scope.save = function() {
        $scope.post.$update(function() {
            $location.replace().path('/' + $routeParams.id);
        })
    }
}])
.controller('DonationController', ['$scope', 'Donation', function($scope, Donation) {
    var elements = stripe.elements();
    var card = elements.create('card');
    card.mount('#card-field');

    $scope.errorMessage = '';

    $scope.processDonation = function() {
        stripe.createToken(card, {
            name: $scope.name,
            address_line1: $scope.line1,
            address_line2: $scope.line2,
            address_city: $scope.city,
            address_state: $scope.state
        }).then(function(result) {
            if (result.error) {
                $scope.errorMessage = result.error.message;
            } else {
                // result.token is the card token
                var d = new Donation({
                    token: result.token.id,
                    amount: $scope.amount
                });
                d.$save(function() {
                    alert('Thank you for the donation!');
                    $location.path('/');
                }, function(err) {
                    console.log(err);
                });
            }
        });
    }
}]);