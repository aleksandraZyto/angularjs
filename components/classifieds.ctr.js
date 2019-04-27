(function(){
  
    "use strict";
    
    angular
    .module("ngClassifieds")
    .controller("classifiedsCtrl", function($scope, $http, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog){
        
        classifiedsFactory.getClassifieds().then(function(classifieds){
            $scope.classifieds = classifieds.data;    
        });
        
        var contact = {
            name:"Ola Zyto",
            phone:"667939808",
            email:"aleksadra.zyto@gmail.com"
        };
        
        $scope.openSidebar = function(){
            $mdSidenav('left').open();
        }
        
        $scope.closeSidebar = function(){
            $mdSidenav('left').close();
        }
        
        $scope.saveClassified = function(classified){
            if(classified){
                $scope.classifieds.push(classified);
                $scope.classified.contact = contact;
                $scope.classified = {};
                $scope.closeSidebar();
                showToast("Saved new Classified");
            }
        }
        
        $scope.editClassified = function(classified){
            $scope.editing = true;
            $scope.openSidebar();
            $scope.classified = classified;
        }
        
        $scope.saveEdit = function(){
            $scope.editing = false;
            $scope.classified = {}
            $scope.closeSidebar();
            showToast("Edit saved!");
        }
        
        $scope.deleteClassified = function(even, classified){
            var confirm = $mdDialog.confirm()
                .title('are you sure you want to delete?')
                .ok('yes')
                .cancel('no')
                .targetEvent(event);
            
            $mdDialog.show(confirm).then(function(){
                
                var index = $scope.classifieds.indexOf(classified);
                $scope.classifieds.splice(index,1);
              
            }, function(){
                
            });
        }
        
        function showToast(message){
            $mdToast.show(
                    $mdToast.simple()
                    .content(message)
                    .hideDelay(3000)
                    .position("top, right")
            );
        }
    });
})();