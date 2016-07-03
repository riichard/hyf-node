hyfNews.config(['$routeProvider', function($routeProvider) {
    $routeProvider

    // Route for the home page
    .when('/', {
        templateUrl: 'pages/articles.html',
        controller: 'articlesController'
    })
    .when('/article/:articleId', {
        templateUrl: 'pages/article.html',
        controller: 'articleController'
    })
    .when('/category/:categoryId', {
        templateUrl: 'pages/articles.html',
        controller: 'articlesController'
    })
    .otherwise({
        redirectTo: '/'
    });

}]);
