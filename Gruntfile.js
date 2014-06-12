
module.exports = function(grunt) {

	// load all grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// our config
	grunt.initConfig({

		// watch for changes and trigger compass, jshint, uglify and livereload
		watch: {
			sass_process: {
				files: ['test/scss/*.scss'],
				tasks: ['sass']
			},
			stylus_process: {
				files: ['test/stylus/*.styl'],
				tasks: ['stylus']
			},
			less_process: {
				files: ['test/less/*.less'],
				tasks: ['less']
			},
			build: {
				files: ['_dev/*.*','json/*.json','build.*'],
				tasks: ['shell:build','less','sass','stylus']
			},
			tests: {
				files: ['test/**/*.{scss|less|styl|js}'],
				tasks: ['shell:test']
			}
		},


		// compile sass
		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: { 
					'test/scss/test.css': 'test/scss/test.scss'
				}
			}
		},


		// compile stylus
		stylus: {
			compile: {
				files: {
					'test/stylus/test.css': 'test/stylus/test.styl'
				}
			}
		},


		// compile less
		less: {
			compile: {
				options: {
					compress: true,
				},
				files: {
					"test/less/test.css": "test/less/test.less"
				}
			},
		},


		// generate the sass and html files with node scripts
		shell: {
			build: {
				command: './build.sh'
			},
			test: {
				command: 'mocha'
			}
		}

	});
	
	// test task
	grunt.registerTask('test', ['shell:test']);
	
	// build task
	grunt.registerTask('build', ['shell:build','stylus','less','shell']);

	// register task
	grunt.registerTask('default', ['watch']);
};