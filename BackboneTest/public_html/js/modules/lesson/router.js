// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'views/lesson/lessonIntroView',

], function($, _, Backbone, LessonIntroView) {
  
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      '/:idCategory/:idLesson/intro'   : 'showIntro',
      '/:idCategory/:idLesson/:idStep' : 'showStep',
      '/:idCategory/:idLesson/end'     : 'showEnd',
      
      // Default
      '*actions': 'defaultAction'
    }
  });
  
  var initialize = function(){

    var app_router = new AppRouter;
    
    app_router.on('route:showIntro', function(idCategory,idLesson){
        var view = new LessonIntroView();
        view.render(idCategory,idLesson);
    });

    app_router.on('route:showContributors', function () {
    
        // Like above, call render but know that this view has nested sub views which 
        // handle loading and displaying data from the GitHub API  
        var contributorsView = new ContributorsView();
    });

    app_router.on('route:defaultAction', function (actions) {
     
       // We have no matching route, lets display the home page 
        var homeView = new HomeView();
        homeView.render();
    });

    // Unlike the above, we don't call render on this view as it will handle
    // the render call internally after it loads data. Further more we load it
    // outside of an on-route function to have it loaded no matter which page is
    // loaded initially.
    var footerView = new FooterView();

    Backbone.history.start();
  };
  return { 
    initialize: initialize
  };
});
