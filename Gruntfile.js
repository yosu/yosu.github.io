// Gruntfile.js
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        shell: {
            jekyllServe: {
                command: 'jekyll serve --drafts'
            }
        },
        watch: {
            files: [
                '_site/*'
            ],
            options: {
                livereload: true
            }
        },
        concurrent: {
            target: {
                tasks: ['shell:jekyllServe', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.registerTask('default', ['concurrent:target']);
};
