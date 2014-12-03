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
                tasks: ['symlink', 'git:add', 'git:commit']
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

        symlink: {            
            expanded: {
                files: [
                    {
                        expanded: true,
                        overwrite: true,
                        cwd: 'src',
                        src: ['*.js'],
                        dest: 'node_moduless/',
                        filter: 'isFile'
                    },
                ]
            },
        }


        // browserify: {
        //     dist: {
        //         files: {
        //           'playground/bundle.js': ['playground/api.js'],
        //         }
        //     }
        // }

    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-simple-git');
    grunt.loadNpmTasks('grunt-serve');
    grunt.loadNpmTasks('grunt-contrib-symlink');

//  grunt.loadNpmTasks('grunt-browserify');
    
    grunt.registerTask('default', ['symlink', 'watch']);

};
