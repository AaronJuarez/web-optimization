module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    responsive_images: {
      dev: {
        options: {
          engine: 'im',
          sizes: [{
            width: '60%',
            suffix: '_small',
            quality: 50
          },{
            width: '80%',
            suffix: '_large_2x',
            quality: 60
          }]
        },
        files: [{
          expand: true,
          src: ['*.{gif,jpg,png}'],
          cwd: 'img/',
          dest: 'images/'
        }]
      }
    },

    clean: {
      dev: {
        src: ['images'],
      },
    },

    uglify: {
      js: {
        files: {
          'js/perfmatters.min.js': ['js/perfmatters.js'],
          'js/analytics.min.js': ['js/analytics.js'],
          'views/js/main.min.js': ['views/js/main.js']
        }
      }
    },

    htmlmin: {                                     // Task
      main: {                                      // Target
        options: {                                 // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        files: {                                   // Dictionary of files
          'index.html': 'index-uncomp.html',     // 'destination': 'source'
          'project-2048.html': 'project-2048-uncomp.html',
          'project-mobile.html': 'project-mobile-uncomp.html',
          'project-webperf.html': 'project-webperf-uncomp.html'
        }
      },
      views: {                                       // Another target
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'views/pizza.html': 'views/pizza-uncomp.html'
        }
      }
    },

    cssmin: {
      css: {
        files: [{
          expand: true,
          cwd: 'css',
          src: ['*.css', '!*.min.css'],
          dest: 'css',
          ext: '.min.css'
        },
        {
          expand: true,
          cwd: 'views/css',
          src: ['*.css', '!*.min.css'],
          dest: 'views/css',
          ext: '.min.css'
        }]
      }
    }

  });

  grunt.registerTask('images', ['clean', 'responsive_images']);
  grunt.registerTask('default', ['uglify', 'cssmin', 'htmlmin']);

};