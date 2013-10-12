module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['build'],
    uglify: {
      build: {
        src: 'public_html/js/index.js',
        dest: 'build/index.js'
        }
    },
    concat: {
		options: {
			separator: ';',
			banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
		},
		js: {
			src: [
				'public_html/js/libs/jquery-1.9.0/jquery.min.js', 
				'public_html/js/libs/jqueryui-1.10.0/jquery-ui.min.js', 
				'public_html/js/jquery.dataTables.min.js',
				'build/index.js'
			],
			dest: 'build/index.bundle.js'
		},
		css: {
			src: [
				'public_html/css/jquery-ui.css', 
				'public_html/css/jquery.ui.theme.css', 
				'public_html/css/bootstrap.min.css',
				'public_html/css/font-awesome.min.css',
				'public_html/css/jquery.dataTables.css',
				'public_html/css/main.css'
			],
			dest: 'build/index.bundle.css'
		}
	},
	copy: {
		main: {
			files: [
				{
					src: [
						'public_html/index.html', 
						'public_html/js/students.js',
						'public_html/js/lectures.js'
					],
					dest: 'build/', 
					flatten: true,
					expand: true
				},
				{
					src: ['public_html/css/images/**'],
					dest: 'build/images/',
					flatten: true,
					expand: true
				}
			]
		}
	}
  });

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-mustache-precompile');

	grunt.registerTask('default', ['clean', 'uglify', 'concat', 'copy']);

};
