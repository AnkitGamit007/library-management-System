// app.js

angular.module('LibraryApp', [])
  .controller('LibraryController', ['$http', function($http) {
    var self = this;
    self.newBook = {};
    self.books = [];

    self.addBook = function() {
      $http.post('/api/books', self.newBook)
        .then(function(response) {
          self.books.push(response.data);
          self.newBook = {};
        })
        .catch(function(error) {
          console.error('Error adding book:', error);
        });
    };

    $http.get('/api/books')
      .then(function(response) {
        self.books = response.data;
      })
      .catch(function(error) {
        console.error('Error fetching books:', error);
      });
  }]);
