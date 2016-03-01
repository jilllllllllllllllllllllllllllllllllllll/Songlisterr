angular.module('songDroid.controllers', [])

.controller('BrowseCtrl', function($scope, Songs, $location, $stateParams, sharedProperties, $ionicSideMenuDelegate) {
    $scope.songs = Songs.active();
    $scope.go = function(id) {
        sharedProperties.setProperty(id);
        $location.path('tab/' + id + '/landing');
    };

    $scope.addNewSong = function() {
        $location.path('/tab/browse/new');
    }

    $scope.delete = function(id) {
        deleteItem(id);
        $location.path('/tab/browse');
    }

    $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };

    $scope.addToSetlist = function(id) {
          console.log("Hi");
          $location.path('song/' + id + '/add');
    };
})

.controller('SetlistsCtrl', function($scope, Setlists, $location, $stateParams, sharedProperties2) {
   $scope.setlists = Setlists.active();
   $scope.addSetlist = function() {
        $location.path('/tab/setlists/new');
   };
    $scope.go = function(id) {
        sharedProperties2.setProperty(id);
        $location.path('/setlist/setlists/' + id);
    }

    $scope.practice = function(){
        var pin = pinSetlist(sharedProperties2.getProperty());
        $location.path('tab/practice');
    }

    $scope.deleteItem = function(id) {
        deleteSetlist(id);
        $location.path('tab/setlists');
    }
})

.controller('AddSetlistCtrl', function($scope, Setlists, $location, $stateParams, $state, Users) {
   $scope.setlists = Setlists.active();

   $scope.vocals = Users.roles("isVocals");
   $scope.guitar = Users.roles("isGuitar");
   $scope.bass = Users.roles("isBass");
   $scope.keyboard = Users.roles("isKeyboard");
   $scope.drums = Users.roles("isDrums");

   var count = Setlists.count();

          $scope.model = { name: '' };
          $scope.form = {};

     $scope.verify = function() {

         $scope.req = $scope.form.newSetlist.$invalid;
         if($scope.form.newSetlist.$valid == true) {
             var info = new Object();

               if(!angular.isUndefinedOrNull($scope.model.name)) {
                 info.name = $scope.model.name;
               } else {
                 info.name = "";
               }

               if(!angular.isUndefinedOrNull($scope.model.vocals1)) {
                 info.vocals1 = $scope.model.vocals1;
               } else {
                 info.vocals1 = "Unassigned";
               }

               if(!angular.isUndefinedOrNull($scope.model.vocals2)) {
                 info.vocals2 = $scope.model.vocals2;
               } else {
                 info.vocals2 = "Unassigned";
               }

               if(!angular.isUndefinedOrNull($scope.model.guitar1)) {
                 info.guitar1 = $scope.model.guitar1;
               } else {
                 info.guitar1 = "Unassigned";
               }

               if(!angular.isUndefinedOrNull($scope.model.guitar2)) {
                 info.guitar2 = $scope.model.guitar2;
               } else {
                 info.guitar2 = "Unassigned";
               }

               if(!angular.isUndefinedOrNull($scope.model.bass)) {
                 info.bass = $scope.model.bass;
               } else {
                 info.bass = "Unassigned";
               }

               if(!angular.isUndefinedOrNull($scope.model.keyboard)) {
                 info.keyboard = $scope.model.keyboard;
               } else {
                 info.keyboard = "Unassigned";
               }

               if(!angular.isUndefinedOrNull($scope.model.drums)) {
                 info.drums = $scope.model.drums;
               } else {
                 info.drums = "Unassigned";
               }

               if(!angular.isUndefinedOrNull($scope.model.notes)) {
                 info.notes = $scope.model.notes;
               } else {
                 info.notes = "";
               }

               info.count = count++;

              saveNewSetlist(info);
              $state.go('tab.setlists', {}, {cache: false});
         }
     }
})

.controller('SetlistItemsCtrl', function($scope, Setlists, Songs, $location, $stateParams, sharedProperties, sharedProperties2, $state, $window) {
   $scope.title = getSetlist($stateParams.setlistId).setlistName;

   var objectId = getSetlist($stateParams.setlistId).objectId;
   $scope.songs = Setlists.listed(objectId);

   $scope.go = function(id) {
       sharedProperties.setProperty(id);
       $location.path('song/' + id + '/info');
   };

  $scope.goSpotify = function() {
    var url = Setlists.get(sharedProperties2.getProperty()).setlistSpotify;
    console.log(url);
    $window.open(url);
  };

   var id = $stateParams.setlistId;

   $scope.editSetlist = function(id){
        $location.path('setlist/setlists/' + id + '/edit')
   }

   $scope.delete = function(songId) {
      spliceFromSetlist(id, songId);
      $state.reload();
   }
})

.controller('AddSongCtrl', function($scope, Songs, $location, $stateParams, $state) {
   $scope.songs = Songs.all();

   var count = Songs.count();

       $scope.model = { title: '' };
       $scope.form = {};

       $scope.verify = function() {
//            console.log($scope.form.newSong.$invalid);
            $scope.req = $scope.form.newSong.$invalid;

            if($scope.form.newSong.$valid == true) {
                var  info = new Object();
                     info.title = $scope.model.songtitle;
                     info.artist = $scope.model.artist;
                     info.albumName = $scope.model.albumName;
                     info.key = $scope.model.key;

                     if(!angular.isUndefinedOrNull($scope.model.albumArt)){
                         info.albumArt = $scope.model.albumArt;
                     } else {
                         info.albumArt = "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";
                     }

                     info.youtube = $scope.model.youtube;
                     info.spotify = $scope.model.spotify;
                     info.count = count++;

                saveNewSong(info);
                $state.go('tab.songs', {}, {cache: false});
            }
       }
})

.controller('SongInfoCtrl', function($scope, $stateParams, Songs, $location, $state, sharedProperties) {
  $scope.song = Songs.get(sharedProperties.getProperty());
  $scope.editSong = function(id) {
      $location.path('song-edit/' + id + '/edit-info');
  };
})

.controller('SongLandingCtrl', function($scope, $stateParams, Songs, $location, $state, sharedProperties, $window) {
  $scope.song = Songs.get(sharedProperties.getProperty());
  $scope.go = function(id) {
      $location.path('song/' + id + '/info');
  };

  $scope.goSpotify = function() {
    var url = Songs.get(sharedProperties.getProperty()).songSpotify;
    console.log(url);
    $window.open(url);
  };
})

.controller('SongActionCtrl', function($scope, $stateParams, Songs, sharedProperties, $location) {
  $scope.song = Songs.get(sharedProperties.getProperty());
  $scope.delete = function (id) {
    deleteItem(id);
  };

  $scope.addToSetlist = function(id) {
    $location.path('song/' + id + '/add');
  };
})

.controller('SongEditActionCtrl', function($scope, $stateParams, Songs, sharedProperties, $location) {
  $scope.song = Songs.get(sharedProperties.getProperty());
  $scope.go = function(id) {
    $location.path('song-edit/' + id + '/sheet-music');
  }
})

.controller('SongCtrl', function($scope, sharedProperties) {
  $scope.sharedProperty = sharedProperties.getProperty();
  console.log(sharedProperties.getProperty());
})

.controller('SetlistCtrl', function($scope, sharedProperties2) {
  $scope.sharedProperty = sharedProperties2.getProperty();
  $scope.setProperty = sharedProperties2.setProperty;
})

.controller('SongEditCtrl', function($scope, sharedProperties, Songs, $location, $state) {
  $scope.song = Songs.get(sharedProperties.getProperty());

       $scope.model = { title: '' };
       $scope.form = {};

  $scope.saveEditSong = function() {
      var  info = new Object();
           info.title = $scope.model.title;
           info.artist = $scope.model.artist;
           info.albumName = $scope.model.albumName;
           info.key = $scope.model.key;
           info.albumArt = $scope.model.albumArt;
           info.youtube = $scope.model.youtube;
           info.spotify = $scope.model.spotify;

      saveEditSong(sharedProperties.getProperty(), info);
      $location.path('song/' + sharedProperties.getProperty() + '/info');
  };
})

.controller('SongAddToSetlistCtrl', function($scope, sharedProperties, Setlists, $location) {
  $scope.setlists = Setlists.active();
  $scope.go = function(id) {
      var update = addSongToSetlist(sharedProperties.getProperty(), id);
      $location.path('tab/browse');
  }
})

.controller('SetlistActionCtrl', function($scope, $stateParams, Setlists, sharedProperties2, $location) {
  $scope.title = getSetlist(sharedProperties2.getProperty()).setlistName;
  $scope.song = Setlists.get(sharedProperties2.getProperty());

  var id = getSetlist(sharedProperties2.getProperty()).setlistId;
  $scope.viewDetails = function() {
     $location.path('setlist/setlists/' + sharedProperties2.getProperty() + '/info');
  }
  $scope.deleteItem = function() {
    deleteSetlist(id);
    $location.path('tab/setlists');
  }

  $scope.practice = function(){
    var pin = pinSetlist(sharedProperties2.getProperty());
    $location.path('tab/practice');
  }

    $scope.viewDetails = function() {
        $location.path('setlist/setlists/' + id + '/info');
    }

    $scope.editRoles = function() {
     $location.path('setlist/setlists/' + id + '/edit')
    }
})

.controller('SetlistDetailsCtrl', function($scope, $stateParams, Setlists, $location, $state, sharedProperties2) {
  console.log(sharedProperties2.getProperty());
  $scope.setlist = Setlists.get( sharedProperties2.getProperty() );

  $scope.editBandRoles = function(id) {
        $location.path('setlist/setlists/'+ id + '/roles');
  }
})

.controller('EditSetlistDetailsCtrl', function($scope, Setlists, $location, $stateParams, $state, sharedProperties2, Users) {
   $scope.setlists = Setlists.get( sharedProperties2.getProperty() );
   var id = Setlists.get(sharedProperties2.getProperty()).setlistId;

           $scope.vocals = Users.roles("isVocals");
           $scope.guitar = Users.roles("isGuitar");
           $scope.bass = Users.roles("isBass");
           $scope.keyboard = Users.roles("isKeyboard");
           $scope.drums = Users.roles("isDrums");

       $scope.back = function() {
            $location.path('setlist/setlists' + id);
       }

          $scope.model = { name: '' };
          $scope.form = {};

     $scope.verify = function() {
         $scope.req = $scope.form.newSetlist.$invalid;
         if($scope.form.newSetlist.$valid == true) {
             var info = new Object();
                 info.name = $scope.model.name;

                 if(!angular.isUndefinedOrNull($scope.model.tags)) {
                   info.tags = $scope.model.tags;
                 } else {
                   info.tags = "";
                 }
                 if(!angular.isUndefinedOrNull($scope.model.notes)) {
                   info.notes = $scope.model.notes;
                 } else {
                   info.notes = "";
                 }
                 if(!angular.isUndefinedOrNull($scope.model.vocals1)) {
                   info.vocals1 = $scope.model.vocals1;
                 } else {
                   info.vocals1 = getSetlist(sharedProperties2.getProperty()).setlistVocals1;
                 }

                 if(!angular.isUndefinedOrNull($scope.model.vocals2)) {
                   info.vocals2 = $scope.model.vocals2;
                 } else {
                   info.vocals2 = getSetlist(sharedProperties2.getProperty()).setlistVocals2;
                 }

                 if(!angular.isUndefinedOrNull($scope.model.guitar1)) {
                   info.guitar1 = $scope.model.guitar1;
                 } else {
                   info.guitar1 = getSetlist(sharedProperties2.getProperty()).setlistGuitar1;
                 }

                 if(!angular.isUndefinedOrNull($scope.model.guitar2)) {
                   info.guitar2 = $scope.model.guitar2;
                 } else {
                   info.guitar2 = getSetlist(sharedProperties2.getProperty()).setlistGuitar2;
                 }

                 if(!angular.isUndefinedOrNull($scope.model.bass)) {
                   info.bass = $scope.model.bass;
                 } else {
                   info.bass = getSetlist(sharedProperties2.getProperty()).setlistBass;
                 }

                 if(!angular.isUndefinedOrNull($scope.model.keyboard)) {
                   info.keyboard = $scope.model.keyboard;
                 } else {
                   info.keyboard = getSetlist(sharedProperties2.getProperty()).setlistKeyboard;
                 }

                 if(!angular.isUndefinedOrNull($scope.model.drums)) {
                   info.drums = $scope.model.drums;
                 } else {
                   info.drums = getSetlist(sharedProperties2.getProperty()).setlistDrums;
                 }
              saveEditedSetlist(info, id);
              $location.path('setlist/setlists/' + id + '/info');
         } else if ($scope.form.newSetlist.$pristine == true) {
            $location.path('tab/setlists');
         }
     }
})

.controller('EditRolesCtrl', function($scope, Setlists, $location, $stateParams, $state, sharedProperties2) {
   $scope.setlists = Setlists.get( sharedProperties2.getProperty() );
   var id = Setlists.get(sharedProperties2.getProperty()).setlistId;

          $scope.model = { name: '' };
          $scope.form = {};

     $scope.verify = function() {
         $scope.req = $scope.form.newSetlist.$invalid;
         if($scope.form.newSetlist.$valid == true) {
             var info = new Object();
                 info.name = $scope.model.name;

               if(!angular.isUndefinedOrNull($scope.model.notes)) {
                 info.notes = $scope.model.notes;
               } else {
                 info.notes = "";
               }

              if(!angular.isUndefinedOrNull($scope.model.vocals1)) {
                info.vocals1 = $scope.model.vocals1;
              } else {
                info.vocals1 = "Unassigned";
              }

              if(!angular.isUndefinedOrNull($scope.model.vocals2)) {
                info.vocals2 = $scope.model.vocals2;
              } else {
                info.vocals2 = "Unassigned";
              }

              if(!angular.isUndefinedOrNull($scope.model.guitar1)) {
                info.guitar1 = $scope.model.guitar1;
              } else {
                info.guitar1 = "Unassigned";
              }

              if(!angular.isUndefinedOrNull($scope.model.guitar2)) {
                info.guitar2 = $scope.model.guitar2;
              } else {
                info.guitar2 = "Unassigned";
              }

              if(!angular.isUndefinedOrNull($scope.model.bass)) {
                info.bass = $scope.model.bass;
              } else {
                info.bass = "Unassigned";
              }

              if(!angular.isUndefinedOrNull($scope.model.keyboard)) {
                info.keyboard = $scope.model.keyboard;
              } else {
                info.keyboard = "Unassigned";
              }

              if(!angular.isUndefinedOrNull($scope.model.drums)) {
                info.drums = $scope.model.drums;
              } else {
                info.drums = "Unassigned";
              }
              saveEditedSetlist(info, id);
              $location.path('setlist/setlists/' + id + '/info');
         }
     }
})

.controller('SearchCtrl', function($scope, Songs, Setlists, $location, $stateParams, sharedProperties, sharedProperties2, $state, $ionicScrollDelegate ) {

          $scope.model = { query: '' };
          $scope.form = {};

   $scope.search = function(column, type) {
        var string = $scope.model.query;

        console.log(column +"/"+ string);

        if( type == 'songs') {
            $scope.songs = Songs.search(column, string);
            console.log(JSON.stringify($scope.results));
        } else if ( type == 'setlists') {
            $scope.setlists = Setlists.search(column, string);
        } else if ( type == 'tags'){
            var tag = Tags.search(column, string);
        } else {
            console.log("wut");
        }
   }

   $scope.goSong = function(id) {
        sharedProperties.setProperty(id);
        $location.path('song/' + id + '/info');
   }

   $scope.goSetlist = function(id) {
        sharedProperties2.setProperty(id);
        $location.path('setlist/setlists/' + id);
   }

   $scope.delete = function(id) {
       deleteItem(id);
       $state.reload();
   }

    $scope.addToSetlist = function(id) {
        $location.path('song/' + id + '/add');
    };
})

.controller('PracticeCtrl', function($scope, Setlists, $location, $stateParams, sharedProperties2, $state, $window) {

   var user = "F2AC443E-7F6D-4D8E-FFD1-5BEA2E195300";
   $scope.setlists = Setlists.pinned(user);

    var pinned = Setlists.pinned(user);
        pinned = pinned[0].

   $scope.addSetlist = function() {
        $location.path('/tab/setlists/new');
   };
    $scope.go = function(id) {
        sharedProperties2.setProperty(id);
        $location.path('/setlist/setlists/' + id);
    }
    $scope.unpin = function(setlistId) {
        spliceFromUser(user, setlistId);
        $state.reload();
    }

  $scope.goSpotify = function() {
    var url = Setlists.get(sharedProperties2.getProperty()).setlistSpotify;
    console.log(url);
    $window.open(url);
  };
})

.controller('SheetMusicCtrl', function($scope, sharedProperties, Songs, $location, $state, $stateParams) {
  $scope.song = Songs.get(sharedProperties.getProperty());
  var id = sharedProperties.getProperty();
    console.log(id);
       $scope.model = { sheet: '' };
       $scope.form = {};

  $scope.verify = function() {
      var  info =  $scope.model.sheet;
           info = processSheetMusic(info, id);

      $location.path('song/' + id + '/info');
  };
})