module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            all: {
                options: {
                  livereload: true
                },
                files: ["*/**"],
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
    grunt.registerTask('default', ['watch']);

};
