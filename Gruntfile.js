module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            all: {
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
    // grunt.loadNpmTasks('grunt-contrib-symlink');

    grunt.loadNpmTasks('grunt-browserify');
    
    grunt.registerTask('default', ['watch']);

};
