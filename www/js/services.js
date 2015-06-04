angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    },
    getAll: function() {
      var all = [];
      for (var key in $window.localStorage) {
        var myObject = JSON.parse($window.localStorage[key]);
        if (myObject.title) {
          all.push(myObject);
        }
      }

      return all;
    },
    length: function() {
      return $window.localStorage.length;
    }
  }
}])

.factory('JobService', function($localstorage) { 
  return {
    all: function() {
      return $localstorage.getAll(); 
    },
    get: function(jobId) {
      // Simple index lookup
      return $localstorage.getObject(jobId);
    },
    set: function(key, value) {
      $localstorage.setObject(key, value);
    }
  }
});
