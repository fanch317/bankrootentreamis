angular.module('bankroot')

    .controller('ProjectCtrl', function($scope, $log, FactoryAppData, FactoryProject,FactoryParticant, $stateParams, $state, $location, $ionicHistory) {

        $log.debug('ProjectCtrl..');
        $log.debug($stateParams);

        $scope.projects = FactoryAppData.getProjects();

        if( $stateParams.projectId !== undefined ){
            //Get project object
            $scope.project = FactoryAppData.getProject($stateParams.projectId);
            $scope.projectId = $stateParams.projectId;
            $scope.pageTitle = 'Modifier le projet '+$scope.project.title;
        }else{
            //Instanciate a new project
            $scope.project = FactoryProject.createProject('Nouveau project');
            delete $scope.projectId;
            $scope.pageTitle = 'Nouveau projet ';
        }




        // Remove a project
        $scope.deleteProject = function(){

            $log.debug('deleteProject..');

            FactoryAppData.deleteProject($scope.projectId);
            FactoryAppData.save();

            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('app.projectnew');

        };

        // Create a project
        $scope.createProject = function(){

            $log.debug('createProject..');

            //Send project to storage
            var projectId = FactoryAppData.addProject($scope.project);

            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('app.projectedit', {projectId: projectId});

        };

        // Update a project
        $scope.updateProject = function(){

            $log.debug('updateProject..');

            //Send project to storage
            FactoryAppData.save();

            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('app.projectedit', {projectId: $scope.projectId});
        };

        // Add Participant to theproject
        $scope.addParticipant = function(){

            $log.debug('addParticipant..');
            $log.debug( $scope.project);
            newParticipant = FactoryParticant.createParticipant("Bob");
            $scope.project.addParticipant(newParticipant);

            //Send project to storage
            FactoryAppData.save();
        };

        // Add Participant to theproject
        $scope.deleteParticipant = function(participantId){

            $log.debug('deleteParticipant..');

            $scope.project.deleteParticipant(participantId);

            //Send project to storage
            FactoryAppData.save();
        };

    });