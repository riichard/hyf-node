var hyfNews = angular.module('hyfNews', ['angular.filter', 'ngResource', 'ngRoute'])
    .controller('myCtrl', function(news, categories) {
        var ctrl = this;

        categories.getCategories().then(function(categories) {
            ctrl.categories = categories;
        });
    })

    .controller('articleController', function($scope, $routeParams) {
        console.log('this', this);
        console.log('$scope', $scope);

        var articles = $scope.$parent.newMyCtrl.articles;
        var articleId = $routeParams.articleId;
        for(var i = 0; i < articles.length; i++) {
            if( articles[i].news_id == articleId) {
                $scope.article = articles[i];
                break;
            }
        }
    })

    .controller('articlesController', function($scope, news, $routeParams) {
        news.getArticles().then(function(res) {
            var articles = res.data;
            var categoryId = $routeParams.categoryId;
            var displayArticles = [];

            if(categoryId) {
                console.log('has category id', categoryId);
                for(var i = 0; i < articles.length; i++) {
                    if( articles[i].category_id == categoryId) {
                        displayArticles.push(articles[i]);
                    }
                }
            }
            else {
                displayArticles = articles;
            }
            $scope.displayArticles = displayArticles;
            
        }) 
    });
