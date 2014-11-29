module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        serve: {
            options: {
                port: 1234
            }
        },

        watch: {
            css: {
                options: {
                  livereload: true
                },
                files: ["Gruntfile.js", "src/**", "readme.md"],
                tasks: ['git:add', 'git:commit']
            },
        },

        git: {
            add: {
                options: {
                  all: true
                }
            },
            commit: {
                options: {
                  message: 'Automated commit'
                }
            }
        },

    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-simple-git');
    grunt.loadNpmTasks('grunt-serve');
    
    grunt.registerTask('default', ['watch']);

};
