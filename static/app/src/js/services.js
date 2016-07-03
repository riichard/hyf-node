hyfNews.service('news', function($http) {

    this.getNews = function() {
        return $http.get('/data/news.json')
        .then(function(response) {
            return response.data;
        });
    };
});

hyfNews.service('categories', function($http) {

    this.getCategories = function() {
        return $http.get('/data/categories.json')
        .then(function(response) {
            return response.data;
        });
    };
});

