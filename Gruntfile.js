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
          'js/dist/perfmatters.min.js': ['js/src/perfmatters.js'],
          'js/dist/analytics.min.js': ['js/src/analytics.js'],
          'views/js/dist/main.min.js': ['views/js/src/main.js']
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
          'index.html': 'index-src.html',     // 'destination': 'source'
          'project-2048.html': 'project-2048-src.html',
          'project-mobile.html': 'project-mobile-src.html',
          'project-webperf.html': 'project-webperf-src.html'
        }
      },
      views: {                                       // Another target
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'views/pizza.html': 'views/pizza-src.html'
        }
      }
    },

    cssmin: {
      css: {
        files: [{
          expand: true,
          cwd: 'css/src',
          src: ['*.css', '!*.min.css'],
          dest: 'css/dist',
          ext: '.min.css'
        },
        {
          expand: true,
          cwd: 'views/css/src',
          src: ['*.css', '!*.min.css'],
          dest: 'views/css/dist',
          ext: '.min.css'
        }]
      }
    },

    pagespeed: {
      options: {
        nokey: true,
        url: "http://aaronjuarez.github.io/website-optimization/"
      },
      prod: {
        options: {
          url: "http://aaronjuarez.github.io/website-optimization/",
          locale: "en_GB",
          strategy: "desktop",
          threshold: 80
        }
      },
      paths: {
        options: {
          paths: ["/project-2048.html", "/project-webperf.html", "/project-mobile.html", "/pizza.html"],
          locale: "en_GB",
          strategy: "desktop",
          threshold: 80
        }
      }
    }

  });

  grunt.registerTask('images', ['clean', 'responsive_images']);
  grunt.registerTask('default', ['uglify', 'cssmin', 'htmlmin']);
  grunt.registerTask('speed', ['pagespeed']);

};