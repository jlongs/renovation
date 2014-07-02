//Gruntfile
module.exports = function(grunt){
    //grunt
    grunt.initConfig({

        //Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/**\n' +
        ' * Renovation one v<%= pkg.version %>\n' +
        ' */\n',
        less: {
            development: {
                options: {
                    path: ["dist/css"]
                },
                files: {
                    "dist/css/<%= pkg.name %>.css": "src/less/main.less"
                }
            }
        },

        watch: {
            src: {
                files: ["src/**/*.less"],
                tasks: ["build"]
            }
        },

        usebanner: {
            dist: {
                options: {
                    position: 'top',
                    banner: "<%= banner %>\n"
                },
                files: {
                    src: [ 'dist/css/**/*.css']
                }
            }
        },

        copy: {
            css: {
                files: [{ expand: true, cwd: "src/less/css", src: ["*"], dest: "dist/css/" }]
            }
        },

        cssmin: {
            add_banner: {
                options: {
                    banner: "<%= banner %>\n"
                },
                files: {
                    //'path/to/output.css': ['path/to/**/*.css']
                    'dist/css/<%= pkg.name %>.min.css': ['dist/css/<%= pkg.name %>.css']
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-banner");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-cssmin");

    grunt.registerTask('default', ['less:development', 'usebanner', 'copy', 'cssmin']);
    grunt.registerTask('build', ['less:development']);
}