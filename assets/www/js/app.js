angular.module('songDroid', ['ionic', 'songDroid.controllers', 'songDroid.services'])

.config(function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.navBar.alignTitle('center');
    $ionicConfigProvider.views.maxCache(0);
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

})

.config(function($provide) {
    $provide.decorator('$state', function($delegate, $stateParams) {
        $delegate.forceReload = function() {
            return $delegate.go($delegate.current, $stateParams, {
                reload: true,
                inherit: false,
                notify: true
            });
        };
        return $delegate;
    });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

    .state('tab', {
    url: "/tab",
    abstract: true,
    cache: false,
    templateUrl: "templates/tabs.html"
    })

        .state('tab.search', {
            url: '/search',
            cache: false,
            views: {
                'search': {
                    templateUrl: 'templates/search.html',
                    controller: 'SearchCtrl'
                }
            }
        })

        .state('tab.songs', {
            url: '/browse',
            cache: false,
            views: {
                'songs': {
                    templateUrl: 'templates/browse.html',
                    controller: 'BrowseCtrl'
                }
            }
        })

            .state('tab.new-song', {
                url: '/browse/new',
                cache: false,
                views: {
                    'songs': {
                        templateUrl: 'templates/new-song.html',
                        controller: 'AddSongCtrl'
                    }
                }
            })

            .state('tab.song-landing', {
                url: '/:songId/landing',
                cache: false,
                views: {
                    'songs': {
                        templateUrl: 'templates/song-landing.html',
                        controller: 'SongLandingCtrl'
                    }
                }
            })

                .state('song', {
                    url: "/song",
                    cache: false,
                    abstract: true,
                    templateUrl: "templates/song.html"
                })

                    .state('song.song-info', {
                        url: '/:songId/info',
                            cache: false,
                            views: {
                            'song-info': {
                                templateUrl: 'templates/song-info.html',
                                controller: 'SongInfoCtrl'
                            }
                        }
                    })

                    .state('song.song-action', {
                        url: '/:songId/action',
                            cache: false,
                            views: {
                            'song-action': {
                                templateUrl: 'templates/song-action.html',
                                controller: 'SongActionCtrl'
                            }
                        }
                    })

                    .state('song.song-setlist', {
                        url: '/:songId/add',
                        cache: false,
                        views: {
                            'song-action': {
                                templateUrl: 'templates/add-to-setlist.html',
                                controller: 'SongAddToSetlistCtrl'
                            }
                        }
                    })

                .state('song-edit', {
                    url: "/song-edit",
                    cache: false,
                    abstract: true,
                    templateUrl: "templates/song-edit.html"
                })

                    .state('song-edit.edit-info', {
                        url: '/:songId/edit-info',
                        cache: false,
                        views: {
                            'edit-info': {
                                templateUrl: 'templates/edit-song.html',
                                controller: 'SongEditCtrl'
                            }
                        }
                    })

                    .state('song-edit.edit-action', {
                        url: '/:songId/edit-action',
                        cache: false,
                        views: {
                            'edit-action': {
                                templateUrl: 'templates/edit-action.html',
                                controller: 'SongEditActionCtrl'
                            }
                        }
                    })

                        .state('song-edit.sheet-music', {
                            url: '/:songId/sheet-music',
                            cache: false,
                            views: {
                                'edit-action': {
                                    templateUrl: 'templates/sheet-music.html',
                                    controller: 'SheetMusicCtrl'
                                }
                            }
                        })

        .state('tab.practice', {
        url: '/practice',
        cache: false,
        views: {
                'practice': {
                    templateUrl: 'templates/practice.html',
                    controller: 'PracticeCtrl'
                }
            }
        })

        .state('tab.setlists', {
            url: '/setlists',
            cache: false,
            views: {
                'setlists': {
                  templateUrl: 'templates/setlists.html',
                  controller: 'SetlistsCtrl'
                }
            }
        })
            .state('tab.setlist-new', {
                url: '/setlists/new',
                cache: false,
                views: {
                    'setlists': {
                        templateUrl: 'templates/new-setlist.html',
                        controller: 'AddSetlistCtrl'
                    }
                }
            })

            .state('setlist', {
                url: "/setlist",
                cache: false,
                abstract: true,
                templateUrl: "templates/setlist.html"
            })

                .state('setlist.setlists-items', {
                    url: '/setlists/:setlistId',
                    cache: false,
                    views: {
                        'setlist-info': {
                            templateUrl: 'templates/setlist-items.html',
                            controller: 'SetlistItemsCtrl'
                        }
                    }
                })

                .state('setlist.setlists-actions', {
                    url: '/setlists/:setlistId/action',
                    cache: false,
                    views: {
                        'setlist-action': {
                            templateUrl: 'templates/setlist-action.html',
                            controller: 'SetlistActionCtrl'
                        }
                    }
                })

                .state('setlist.setlists-details', {
                    url: '/setlists/:setlistId/info',
                    cache: false,
                    views: {
                        'setlist-action': {
                            templateUrl: 'templates/setlist-details.html',
                            controller: 'SetlistDetailsCtrl'
                        }
                    }
                })

                .state('setlist.setlists-details-edit', {
                    url: '/setlists/:setlistId/edit',
                    cache: false,
                    views: {
                        'setlist-action': {
                            templateUrl: 'templates/edit-setlist.html',
                            controller: 'EditSetlistDetailsCtrl'
                        }
                    }
                })

                .state('setlist.setlists-roles-edit', {
                    url: '/setlists/roles',
                    cache: false,
                    views: {
                        'setlist-action': {
                            templateUrl: 'templates/set-roles.html',
                            controller: 'EditRolesCtrl'
                        }
                    }
                })

  $urlRouterProvider.otherwise('tab/search');
});
