module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    copy: {
      dist: {
        files: [ {src: 'src/index.html', dest: 'dest/index.html'} ]
      }
    },

    'useminPrepare': {
      options: {
        dest: 'dest'
      },
      html: 'src/index.html'
    },

    usemin: {
      html: ['dest/index.html']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-usemin');

  grunt.registerTask('default', ['useminPrepare', 'copy', 'concat', 'uglify', 'usemin']);
};