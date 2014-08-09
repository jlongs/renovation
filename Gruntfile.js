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
                files: [
                	{ expand: true, cwd: "src/less/css", src: ["*"], dest: "dist/css/" },
                	{ expand: true, cwd: "font/Font-Awesome-3.2.1/css", src: ["*"], dest: "dist/font/" },
                    { expand: true, cwd: "font/Font-Awesome-3.2.1/font", src: ["*"], dest: "dist/font/" }
                ]
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
        },

        compress: {
            dist: {
                options: {
                    archive: ("publish/renovation-<%= pkg.version %>.zip")
                },
                files: [
                    { expand: true, cwd: "", src: ["dist/css/Renovation.min.css", "dist/font/**/*", "!dist/font/font-awesome.css", "!dist/font/font-awesome-ie7.css"], dest: "" },
                    { expand: true, cwd: "", src: ["html/**/*", "images/**/*"], dest: "" }
                ]
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-banner");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-compress");

    grunt.registerTask('default', ['less:development', 'usebanner', 'copy', 'cssmin']);
    grunt.registerTask('build', ['less:development']);
    grunt.registerTask('publish', ['compress']);
}