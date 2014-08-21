require({
	//The top level directory that contains your app. If this option is used
	//then it assumed your scripts are in a subdirectory under this path.
	//This option is not required. If it is not specified, then baseUrl
	//below is the anchor point for finding things. If this option is specified,
	//then all the files from the app directory will be copied to the dir:
	//output area, and baseUrl will assume to be a relative path under
	//this directory.
	appDir: "../src/app/Cockpit.Experiments.Web",

	//By default, all modules are located relative to this path. If baseUrl
	//is not explicitly set, then all modules are loaded relative to
	//the directory that holds the build file. If appDir is set, then
	//baseUrl should be specified as relative to the appDir.
	baseUrl: "./App",

	//By default all the configuration for optimization happens from the command
	//line or by properties in the config file, and configuration that was
	//passed to requirejs as part of the app's runtime "main" JS file is *not*
	//considered. However, if you prefer the "main" JS file configuration
	//to be read for the build so that you do not have to duplicate the values
	//in a separate configuration, set this property to the location of that
	//main JS file. The first requirejs({}), require({}), requirejs.config({}),
	//or require.config({}) call found in that file will be used.
	//As of 2.1.10, mainConfigFile can be an array of values, with the last
	//value's config take precedence over previous values in the array.
	mainConfigFile: '../src/app/Cockpit.Experiments.Web/App/Main.js',

	//The directory path to save the output. If not specified, then
	//the path will default to be a directory called "build" as a sibling
	//to the build file. All relative paths are relative to the build file.
	dir: "./Experiments",

	//As of RequireJS 2.0.2, the dir above will be deleted before the
	//build starts again. If you have a big build and are not doing
	//source transforms with onBuildRead/onBuildWrite, then you can
	//set keepBuildDir to true to keep the previous dir. This allows for
	//faster rebuilds, but it could lead to unexpected errors if the
	//built code is transformed in some way.
	keepBuildDir: false,

	//As of 2.1.11, shimmed dependencies can be wrapped in a define() wrapper
	//to help when intermediate dependencies are AMD have dependencies of their
	//own. The canonical example is a project using Backbone, which depends on
	//jQuery and Underscore. Shimmed dependencies that want Backbone available
	//immediately will not see it in a build, since AMD compatible versions of
	//Backbone will not execute the define() function until dependencies are
	//ready. By wrapping those shimmed dependencies, this can be avoided, but
	//it could introduce other errors if those shimmed dependencies use the
	//global scope in weird ways, so it is not the default behavior to wrap.
	//More notes in http://requirejs.org/docs/api.html#config-shim
	wrapShim: false,

	//Used to inline i18n resources into the built file. If no locale
	//is specified, i18n resources will not be inlined. Only one locale
	//can be inlined for a build. Root bundles referenced by a build layer
	//will be included in a build layer regardless of locale being set.
	locale: "en-us",

	//How to optimize all the JS files in the build output directory.
	//Right now only the following values
	//are supported:
	//- "uglify": (default) uses UglifyJS to minify the code.
	//- "uglify2": in version 2.1.2+. Uses UglifyJS2.
	//- "closure": uses Google's Closure Compiler in simple optimization
	//mode to minify the code. Only available if running the optimizer using
	//Java.
	//- "closure.keepLines": Same as closure option, but keeps line returns
	//in the minified files.
	//- "none": no minification will be done.
	optimize: "uglify",

	//Introduced in 2.1.2: If using "dir" for an output directory, normally the
	//optimize setting is used to optimize the build bundles (the "modules"
	//section of the config) and any other JS file in the directory. However, if
	//the non-build bundle JS files will not be loaded after a build, you can
	//skip the optimization of those files, to speed up builds. Set this value
	//to true if you want to skip optimizing those other non-build bundle JS
	//files.
	skipDirOptimize: false,

	//Introduced in 2.1.2 and considered experimental.
	//If the minifier specified in the "optimize" option supports generating
	//source maps for the minified code, then generate them. The source maps
	//generated only translate minified JS to non-minified JS, it does not do
	//anything magical for translating minified JS to transpiled source code.
	//Currently only optimize: "uglify2" is supported when running in node or
	//rhino, and if running in rhino, "closure" with a closure compiler jar
	//build after r1592 (20111114 release).
	//The source files will show up in a browser developer tool that supports
	//source maps as ".js.src" files.
	generateSourceMaps: false,

	//Introduced in 2.1.1: If a full directory optimization ("dir" is used), and
	//optimize is not "none", and skipDirOptimize is false, then normally all JS
	//files in the directory will be minified, and this value is automatically
	//set to "all". For JS files to properly work after a minification, the
	//optimizer will parse for define() calls and insert any dependency arrays
	//that are missing. However, this can be a bit slow if there are many/larger
	//JS files. So this transport normalization is not done (automatically set
	//to "skip") if optimize is set to "none". Cases where you may want to
	//manually set this value:
	//1) Optimizing later: if you plan on minifying the non-build bundle JS files
	//after the optimizer runs (so not as part of running the optimizer), then
	//you should explicitly this value to "all".
	//2) Optimizing, but not dynamically loading later: you want to do a full
	//project optimization, but do not plan on dynamically loading non-build
	//bundle JS files later. In this case, the normalization just slows down
	//builds, so you can explicitly set this value to "skip".
	//Finally, all build bundles (specified in the "modules" or "out" setting)
	//automatically get normalization, so this setting does not apply to those
	//files.
	normalizeDirDefines: "skip",

	//If using UglifyJS for script optimization, these config options can be
	//used to pass configuration values to UglifyJS.
	//See https://github.com/mishoo/UglifyJS for the possible values.
	uglify: {
		toplevel: true,
		ascii_only: true,
		beautify: true,
		max_line_length: 1000,

		//How to pass uglifyjs defined symbols for AST symbol replacement,
		//see "defines" options for ast_mangle in the uglifys docs.
		defines: {
			DEBUG: ['name', 'false']
		},

		//Custom value supported by r.js but done differently
		//in uglifyjs directly:
		//Skip the processor.ast_mangle() part of the uglify call (r.js 2.0.5+)
		no_mangle: true
	},

	//Allow CSS optimizations. Allowed values:
	//- "standard": @import inlining and removal of comments, unnecessary
	//whitespace and line returns.
	//Removing line returns may have problems in IE, depending on the type
	//of CSS.
	//- "standard.keepLines": like "standard" but keeps line returns.
	//- "none": skip CSS optimizations.
	//- "standard.keepComments": keeps the file comments, but removes line
	//returns.  (r.js 1.0.8+)
	//- "standard.keepComments.keepLines": keeps the file comments and line
	//returns. (r.js 1.0.8+)
	//- "standard.keepWhitespace": like "standard" but keeps unnecessary whitespace.
	optimizeCss: "standard.keepLines.keepWhitespace",

	//If optimizeCss is in use, a list of files to ignore for the @import
	//inlining. The value of this option should be a string of comma separated
	//CSS file names to ignore (like 'a.css,b.css'. The file names should match
	//whatever strings are used in the @import calls.
	cssImportIgnore: null,

	//If "out" is not in the same directory as "cssIn", and there is a relative
	//url() in the cssIn file, use this to set a prefix URL to use. Only set it
	//if you find a problem with incorrect relative URLs after optimization.
	cssPrefix: "",

	//Inlines the text for any text! dependencies, to avoid the separate
	//async XMLHttpRequest calls to load those dependencies.
	inlineText: true,

	//Allow "use strict"; be included in the RequireJS files.
	//Default is false because there are not many browsers that can properly
	//process and give errors on code for ES5 strict mode,
	//and there is a lot of legacy code that will not work in strict mode.
	useStrict: false,

	//Skip processing for pragmas.
	skipPragmas: false,

	//If skipModuleInsertion is false, then files that do not use define()
	//to define modules will get a define() placeholder inserted for them.
	//Also, require.pause/resume calls will be inserted.
	//Set it to true to avoid this. This is useful if you are building code that
	//does not use require() in the built project or in the JS files, but you
	//still want to use the optimization tool from RequireJS to concatenate modules
	//together.
	skipModuleInsertion: false,

	//If it is not a one file optimization, scan through all .js files in the
	//output directory for any plugin resource dependencies, and if the plugin
	//supports optimizing them as separate files, optimize them. Can be a
	//slower optimization. Only use if there are some plugins that use things
	//like XMLHttpRequest that do not work across domains, but the built code
	//will be placed on another domain.
	optimizeAllPluginResources: false,

	//Finds require() dependencies inside a require() or define call. By default
	//this value is false, because those resources should be considered dynamic/runtime
	//calls. However, for some optimization scenarios, it is desirable to
	//include them in the build.
	//Introduced in 1.0.3. Previous versions incorrectly found the nested calls
	//by default.
	findNestedDependencies: false,

	//If set to true, any files that were combined into a build bundle will be
	//removed from the output folder.
	removeCombined: false,

	//Another way to use wrap, but uses default wrapping of:
	//(function() { + content + }());
	wrap: true,

	//When the optimizer copies files from the source location to the
	//destination directory, it will skip directories and files that start
	//with a ".". If you want to copy .directories or certain .files, for
	//instance if you keep some packages in a .packages directory, or copy
	//over .htaccess files, you can set this to null. If you want to change
	//the exclusion rules, change it to a different regexp. If the regexp
	//matches, it means the directory will be excluded. This used to be
	//called dirExclusionRegExp before the 1.0.2 release.
	//As of 1.0.3, this value can also be a string that is converted to a
	//RegExp via new RegExp().
	fileExclusionRegExp: /^\./,

	//By default, comments that have a license in them are preserved in the
	//output when a minifier is used in the "optimize" option.
	//However, for a larger built files there could be a lot of
	//comment files that may be better served by having a smaller comment
	//at the top of the file that points to the list of all the licenses.
	//This option will turn off the auto-preservation, but you will need
	//work out how best to surface the license information.
	//NOTE: As of 2.1.7, if using xpcshell to run the optimizer, it cannot
	//parse out comments since its native Reflect parser is used, and does
	//not have the same comments option support as esprima.
	preserveLicenseComments: true,

	//Sets the logging level. It is a number. If you want "silent" running,
	//set logLevel to 4. From the logger.js file:
	//TRACE: 0,
	//INFO: 1,
	//WARN: 2,
	//ERROR: 3,
	//SILENT: 4
	//Default is 0.
	logLevel: 0,

	//Introduced in 2.1.3: Some situations do not throw and stop the optimizer
	//when an error occurs. However, you may want to have the optimizer stop
	//on certain kinds of errors and you can configure those situations via
	//this option
	throwWhen: {
		//If there is an error calling the minifier for some JavaScript,
		//instead of just skipping that file throw an error.
		optimize: true
	},

	//Defines the loading time for modules. Depending on the complexity of the
	//dependencies and the size of the involved libraries, increasing the wait
	//interval may be required. Default is 7 seconds. Setting the value to 0
	//disables the waiting interval.
	waitSeconds: 7,

	//Introduced in 2.1.9: normally r.js inserts a semicolon at the end of a
	//file if there is not already one present, to avoid issues with
	//concatenated files and automatic semicolon insertion  (ASI) rules for
	//JavaScript. It is a very blunt fix that is safe to do, but if you want to
	//lint the build output, depending on the linter rules, it may not like it.
	//Setting this option to true skips this insertion. However, by doing this,
	//you take responsibility for making sure your concatenated code works with
	//JavaScript's ASI rules, and that you use a minifier that understands when
	//to insert semicolons to avoid ASI pitfalls.
	skipSemiColonInsertion: false,

	//Introduced in 2.1.10: if set to true, will not strip amdefine use:
	//https://github.com/jrburke/amdefine
	//Normally you should not need to set this. It is only a concern if using
	//a built .js file from some other source, that may have included amdefine
	//in the built input. If you get a build error like
	//"undefined is not a function" and the file that generated the error
	//references amdefine, then set this to true.
	keepAmdefine: false,

	//Introduced in 2.1.11. As part of fixing a bug to prevent possible
	//overwrites of source code, https://github.com/jrburke/r.js/issues/444,
	//it prevented some cases where generated source is used for a build, and
	//it was OK to overwrite content in this source area as it was generated
	//from another source area, and not allowing source overwrites meant taking
	//another file copy hit. By setting this to true, it allows this sort of
	//source code overwriting. However, use at your own risk, and be sure you
	//have your configuration set correctly. For example, you may want to
	//set "keepBuildDir" to true.
	allowSourceOverwrites: false
})