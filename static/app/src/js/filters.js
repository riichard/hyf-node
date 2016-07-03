hyfNews.filter('getCategoryNameById', function() {
    return function(id, categories) {
        for(var i = 0; i < categories.length; i++) {
            if(categories[i].cat_id == id) {
                return categories[i].cat_name;
            }
        }
        return 'General';
    }
});
