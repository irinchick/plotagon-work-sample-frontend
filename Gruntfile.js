/*global module:false*/
module.exports = function(grunt) {

  var jsFolder = 'js';

  // Project configuration.
  grunt.initConfig({
    // Metadata.

    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      all: [
        'Gruntfile.js',
        jsFolder + '/**/*.js'
      ],
      options: {
        // config provided in .jshintrc so that ide's etc. can pick it up
        jshintrc: true
      }
    },

    watch: {
      scripts: {
        files: [jsFolder + '/**/*.js'],
        tasks: ['bundle', 'jshint'],
        options: {
          spawn: true
        }
      },
    },

    connect: {
      dev: {
        options: {
          port: 9001,
          base: ''
        }
      }
    },

    open: {
      dev: {
        path: 'http://localhost:9001/index.html',
        app: 'Google Chrome'
      }
    },

    browserify: {
      options: {
        browserifyOptions: {
          debug: true,
        },

      },
      'app.js': [jsFolder + '/index.js'],
    },

  notify: {
      browserify: {
        options: {
          title: 'Bundling Complete',  // optional
          message: 'JavaScript bundling completed', //required
        }
      },
    }

  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-notify');

  // Builds the UI
  grunt.registerTask('default', ['server']);

  // The normal workflow task
  grunt.registerTask('server', function () {
    grunt.task.run([
      'bundle',
      'connect',
      'open',
      'watch'
    ]);
  });

  // Bundle scripts
  grunt.registerTask('bundle', ['browserify', 'notify:browserify']);

};
