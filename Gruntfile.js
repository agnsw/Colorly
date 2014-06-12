
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
				tasks: ['shell','less','sass','stylus']
			}
		},


		// compile sass
		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: { 
					// process demo styles
					'demo.css': '_dev/demo.scss',
					'scss/test.css': 'scss/test.scss',
				}
			}
		},


		// compile stylus
		stylus: {
			compile: {
				files: {
					'stylus/test.css': 'stylus/test.styl',
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
					"less/test.css": "less/test.less"
				}
			},
		},


		// generate the sass and html files with node scripts
		shell: {
			build_cmd: {
				command: './build.sh'
			}
		}

	});

	// register task
	grunt.registerTask('default', ['watch']);
};