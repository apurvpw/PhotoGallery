
var app = angular.module("photoApp", ['ngResource']);
/*
 * Creating new service for fetching upcoming movie details
 */
app.factory('moviePosters', function($resource){

    return {
        getPhotos: function(callback){

            /*
             * Could not find free Twitter API (Twitter API Requires Oauth authentication for version 1.1)
             * Using Rotten Tomatoes API instead, to get upcoming movies
             *
             */
            var api = $resource('http://api.rottentomatoes.com/api/public/v1.0/lists/movies/upcoming?apikey=:api_key&callback=JSON_CALLBACK',{
                api_key: 'zxmhhkp6r52w73cm78zcusum'
            },{

                get:{method:'JSONP'}
            });

            api.get(function(response){
                callback(response.movies);

            });
        }
    }

});
/*
 * Controller uses the moviePosters service to get the upcoming movies posters
 */
function PhotoAppController($scope, moviePosters){

    $scope.photos = [];

    moviePosters.getPhotos(function(data){

        $scope.photos = data;
    });

}