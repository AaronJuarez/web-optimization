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

  });

  grunt.registerTask('default', ['clean','responsive_images']);

};