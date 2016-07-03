hyfNews.factory('news', function($http) {

    this.getArticles = function() {
        return $http.get('/data/news.json', { cache: true });
    };
    return this;
});
