angular.module('starter.controllers', [])

// A simple controller that fetches a list of data from a service
.controller('JobIndexCtrl', function($scope, $state, $rootScope, JobService) {
  $rootScope.jobs = JobService.all();
  $scope.goBackHome = function() {
    $state.go('home');
  }
})

// A simple controller that shows a tapped item's data
.controller('GeneralInfoCtrl', function($scope, $rootScope, $state, $stateParams, JobService) {
  $rootScope.job = JobService.get($stateParams.jobId);

  $scope.goToJobList = function() {
    $state.go('tab.in-progress');
  }
})

.controller('QuoteCtrl', function($scope, $rootScope, $state, $stateParams, JobService) {
  $rootScope.job = JobService.get($stateParams.jobId);
  var newJob = $rootScope.job; //JobService.get($stateParams.jobId);
  // $rootScope.job = newJob;//JobService.get($stateParams.jobId);
  // var newJob = $rootScope.job;

  $scope.sendQuote = function() {
    var damageDesc = document.getElementById("damageDesc");
    var estimatedCost = document.getElementById("estimatedCost");
    var estiamtedTime = document.getElementById("estimatedTime");
    if (damageDesc.value.trim() !== "" && estimatedCost.value.trim() !== "" && estimatedTime.value.trim() !== "") {
      newJob.quote.damageDesc = String(damageDesc.value.trim());
      newJob.quote.estimatedCost = String(estimatedCost.value.trim());
      newJob.quote.estimatedTime = String(estimatedTime.value.trim());
      newJob.quote.wasSent = "true";

      JobService.set(newJob.id, newJob);
      $state.go('tab.in-progress');
    }
  }

  $scope.goToJobList = function() {
    $state.go('tab.in-progress');
  }
})

.controller('ReportCtrl', function($scope, $rootScope, $state, $stateParams, JobService) {
  $rootScope.job = JobService.get($stateParams.jobId);
  var newJob = $rootScope.job;//JobService.get($stateParams.jobId);
  // $rootScope.job = newJob;
  // var newJob = $rootScope.job;

  $scope.sendReport = function() {
    var fixDesc = document.getElementById("fixDesc");
    var actualCost = document.getElementById("actualCost");
    var startTime = document.getElementById("startTime");
    var finishTime = document.getElementById("finishTime");

    if (fixDesc.value.trim() !== "" && actualCost.value.trim() !== "" && startTime.value.trim() !== "" && finishTime.value.trim() != "") {
      newJob.report.fixDesc = String(fixDesc.value.trim());
      newJob.report.actualCost = String(actualCost.value.trim());
      newJob.report.startTime = String(startTime.value.trim());
      newJob.report.finishTime = String(finishTime.value.trim());
      newJob.report.wasSent = "true";
      JobService.set(newJob.id, newJob);
      $state.go('tab.in-progress');
    }
  }

  $scope.goToJobList = function() {
    $state.go('tab.in-progress');
  }
})

.controller('JobCreationCtrl', function($scope, $rootScope, $state, $stateParams, JobService, $localstorage) {
  $scope.createJob = function () {
    var title = document.getElementById("title");
    var desc = document.getElementById("desc");
    var location = document.getElementById("location");

    // Simple validation for user input
    if (title.value.trim() !== "" && desc.value.trim() !== "" && location.value.trim() !== "") {
      var newJobId = $localstorage.length() - 1;
      var newJob = {
        id: String(newJobId),
        title: String(title.value.trim()), 
        description: String(desc.value.trim()),
        location: String(location.value.trim()),

        quote: {
          damageDesc: "",
          estimatedCost: "",
          estimatedTime: "",
          wasSent: "false"
        },

        report: {
          fixDesc: "",
          actualCost: "",
          startTime: "",
          finishTime: "",
          wasSent: "false"
        }
      };

      JobService.set(newJob.id, newJob);
      $rootScope.job = JobService.get(newJobId);
      // $rootScope.jobs = JobService.all();
      $state.go('menu.quote', {'jobId' : newJob.id});
    }
  }
});


