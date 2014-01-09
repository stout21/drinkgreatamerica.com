// Generated on 2013-12-04 using generator-webapp 0.4.4
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

var reworkVars = require('rework-vars');

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    // configurable paths
    yeoman: {
      app: 'app',
      dist: 'dist'
    },
    watch: {
      options: {
        spawn: false
      },
      jade: {
        files: ['<%= yeoman.app %>/{,*/}*.jade'],
        tasks: ['jade:server']
      },
      styl: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.styl'],
        tasks: ['styl', 'autoprefixer']
      },
      styles: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
        tasks: ['copy:styles', 'autoprefixer']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/*.html',
          '.tmp/styles/{,*/}*.css',
          '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
          '<%= yeoman.app %>/images/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'
        ]
      }
    },
    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        // change this to 'localhost' to be private
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '<%= yeoman.app %>'
          ]
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= yeoman.dist %>',
          livereload: false
        }
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish'),
        ignores: [
          '<%= yeoman.app %>/scripts/locations.js',
          '<%= yeoman.app %>/scripts/polyfills.js',
        ]
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/scripts/{,*/}*.js',
        '!<%= yeoman.app %>/scripts/vendor/*',
      ]
    },
    styl: {
      options: {
        whitespace: true,
        compress: true,
        configure: function (styl) {
          styl.use(reworkVars());
        }
      },
      build: {
        files: {
          '.tmp/styles/main.css': '<%= yeoman.app %>/styles/main.styl'
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },
    jade: {
      options: {

      },
      //files: [{
        //expand: true,
        //cwd: '<%= yeoman.app %>',
        //src: '{,*/}*.jade',
        //dest: '.tmp'
      //}],
      server: {
        files: {
          '.tmp/index.html': '<%= yeoman.app %>/index.jade'
        },
      },
      dist: {
        options: {
          compileDebug: false,
          pretty: true
        },
        files: {
          '.tmp/index.html': '<%= yeoman.app %>/index.jade'
        }
      }
    },
    'bower-install': {
      app: {
        html: '<%= yeoman.app %>/index.html',
        ignorePath: '<%= yeoman.app %>/'
      }
    },
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%= yeoman.dist %>/styles/{,*/}*.css',
            '<%= yeoman.dist %>/images/{,*/}*.{gif,jpeg,jpg,png,webp}',
            '<%= yeoman.dist %>/styles/fonts/{,*/}*.*'
          ]
        }
      }
    },
    useminPrepare: {
      options: {
        dest: '<%= yeoman.dist %>'
      },
      html: '.tmp/index.html'
    },
    usemin: {
      options: {
        assetsDirs: ['<%= yeoman.dist %>']
      },
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css']
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    htmlmin: {
      fake: {
        options: {},
        files: [
          {
            expand: true,
            cwd: '<%= yeoman.app %>',
            src: '*.html',
            dest: '<%= yeoman.dist %>'
          },
          {
            expand: true,
            cwd: '.tmp',
            src: '*.html',
            dest: '<%= yeoman.dist %>'
          }
        ]
      },
      dist: {
        options: {
          collapseWhitespace: true,
        },
        files: [
          {
            expand: true,
            cwd: '<%= yeoman.dist %>',
            src: '*.html',
            dest: '<%= yeoman.dist %>'
          }
        ]
      }
    },
    // Put files not handled in other tasks here
    copy: {
      'bower-prebuild': {
        files: {
          '.tmp/bower_components/normalize-css/normalize.css': 'app/bower_components/normalize-css/normalize.css',
          '.tmp/bower_components/league-gothic/webfonts/stylesheet.css': 'app/bower_components/league-gothic/webfonts/stylesheet.css'
        }
      },
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'images/{,*/}*.{webp,gif,jpg,png}',
            'styles/fonts/{,*/}*.*'
          ]
        }]
      },
      assets: {
        files: [{
          expand: true,
          dot: true,
          cwd: '.tmp/concat',
          dest: '<%= yeoman.dist %>',
          src: [
            '{,*/}*/*.*',
          ]
        }]
      },
      styles: {
        expand: true,
        dot: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      },
      'league-gothic': {
        expand: true,
        dot: true,
        cwd: '<%= yeoman.app %>/bower_components/league-gothic/webfonts/',
        dest: 'dist/styles/',
        src: '*.{woff,eot,ttf,svg}'
      }
    },
    modernizr: {
      devFile: '<%= yeoman.app %>/bower_components/modernizr/modernizr.js',
      outputFile: '<%= yeoman.dist %>/bower_components/modernizr/modernizr.js',
      files: [
        '<%= yeoman.dist %>/scripts/{,*/}*.js',
        '<%= yeoman.dist %>/styles/{,*/}*.css',
        '!<%= yeoman.dist %>/scripts/vendor/*'
      ],
      uglify: true
    },
    'gh-pages': {
      options: {
        base: 'dist'
      },
      src: '**/*'
    },
    'ftp-deploy': {
      deploy: {
        auth: {
          host: 'drinkgreatamerica.com',
          port: 21,
          authKey: 'ftp'
        },
        src: 'dist',
        dest: '',
        exclusions: []
      }
    }
  });

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'jade:server',
      'styl',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function () {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'copy:bower-prebuild',
    'jade:dist',
    'useminPrepare',
    'styl',
    'autoprefixer',
    'concat',
    //'uglify',
    'modernizr',
    'copy:dist',
    'rev',
    'svgmin',
    'htmlmin:fake',
    'copy:assets',
    'copy:league-gothic',
    'usemin',
    'htmlmin:dist',
    //'cssmin',
  ]);

  grunt.registerTask('deploy', [
    'build',
    'ftp-deploy'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'build'
  ]);

  grunt.registerTask('noop', ['Empty commit to measure grunt setup time'], function() {});
};
