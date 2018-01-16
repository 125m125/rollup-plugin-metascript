export default {
	input: 'src/metascript.js',
	external: ['rollup-pluginutils', 'metascript'],
	output: [{
			file: 'target/rollup-plugin-metascript.cjs.js',
			format: 'cjs'
		},
		{
			file: 'target/rollup-plugin-metascript.es.js',
			format: 'es'
		}
	]
};