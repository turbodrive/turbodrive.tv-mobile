module.exports = function (grunt) {

    // Configuration de Grunt
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        copy: {
          main: {
            files: [
              {expand: true, cwd: 'src/',  src: ['*.html','images/**','php/**'], dest: 'build/'},

              {expand: true, cwd: 'src/', src: ['css/fonts/**'], dest: 'build/'},
              {expand: true, cwd: 'src/', src: ['js/modernizr.js'], dest: 'build/'},

              
            ]
          }
        },
        
        uglify: {
            my_target: {
                files: {
                    'build/js/turbodrive-mobile.js': ['src/js/turbodrive-mobile.js']
                }
            }
        },
        
        uncss: {
          dist: {
            files: {
             'build/css/turbodrive-mobile.css' : ['src/index.html']
            }
          }
        },
        
        cssmin: {
          minify : {
            src: ['src/css/turbodrive-mobile.css'],
            dest: 'build/css/turbodrive-mobile.css'
          }
        },
        
        
    });
    
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Default task(s).
    grunt.registerTask('css-optimisation', ['cssmin']);
    grunt.registerTask('default', ['copy','uglify','css-optimisation']);

}