'use strict';
var yeoman = require('yeoman-generator');
var util = require('util');
var path = require('path');
var _ = require('lodash');

var safename = function (name, patterns) {
  var prefixes = ['grunt', 'plugin', 'assemble-plugin', 'mixin', 'assemble-contrib', 'assemble'];
  var remove = _.unique(_.flatten(_.union([], prefixes, patterns || [])));
  var re = new RegExp('^(?:' + remove.join('|') + ')[-_]?');
  return name.replace(re, '').replace(/[\W_]+/g, '_').replace(/^(\d)/, '_$1');
}

var processTemplate = function(tmpl) {
  return function(answers) {
    return this._.template(tmpl, answers);
  };
};

var PluginGenerator = module.exports = function PluginGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));

  this._.mixin({ 'safename': safename });
};

util.inherits(PluginGenerator, yeoman.generators.Base);

PluginGenerator.prototype.askFor = function askFor() {
  var cb = this.async();
  var self = this;

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [
    {
      name: 'pluginName',
      message: 'What do you want to call your plugin?',
      'default': 'myPlugin'
    },
    {
      name: 'fullName',
      message: 'What will the full name be?',
      'default': processTemplate('assemble-plugin-<%= _.slugify(pluginName) %>').bind(self)
    },
    {
      name: 'description',
      message: 'How would you describe your plugin?'
    },
    {
      type: 'checkbox',
      name: 'stages',
      message: 'What stages will your plugin run in?',
      'default': 'assemble:before:page',
      choices: [
        'options:before:configuration',
        'options:after:configuration',
        'assemble:before:layout',
        'assemble:after:layout',
        'assemble:before:partials',
        'assemble:after:partials',
        'assemble:before:data',
        'assemble:after:data',
        'assemble:before:pages',
        'assemble:before:page',
        'assemble:after:page',
        'assemble:after:pages',
        'render:before:pages',
        'render:before:page',
        'render:after:page',
        'render:after:pages'
      ]
    },
    {
      name: 'user',
      message: 'What user/org will your plugin live under?'
    },
    {
      name: 'homepage',
      message: 'What is the homepage for your plugin?',
      'default': processTemplate('https://github.com/<%= user %>/<%= _.slugify(fullName) %>').bind(self)
    },
    {
      name: 'repositoryUrl',
      message: 'Where will your plugin be stored?',
      'default': processTemplate('https://github.com/<%= user %>/<%= _.slugify(fullName) %>.git').bind(self)
    },
    {
      name: 'bugUrl',
      message: 'Where can people submit bugs for your plugin?',
      'default': processTemplate('https://github.com/<%= user %>/<%= _.slugify(fullName) %>/issues').bind(self)
    },
    {
      name: 'licenseType',
      message: 'What type of license does your plugin have?',
      'default': 'MIT'
    },
    {
      name: 'licenseUrl',
      message: 'Where can the license be found?',
      'default': processTemplate('https://github.com/<%= user %>/<%= _.slugify(fullName) %>/blob/master/LICENSE-<%= licenseType %>').bind(self)
    },
    {
      name: 'contributors',
      message: 'Who are the contributors on your plugin?',
      'default': processTemplate('<%= user %>').bind(self)
    }
  ];

  this.prompt(prompts, function (answers) {

    for (var key in answers) {
      if (answers.hasOwnProperty(key)) {
        self[key] = answers[key];
      }
    }
    
    // calculated answers
    self.repositoryType = 'git'
    cb();
  }.bind(this));
};

/**
 * Setup any configuration files that have to do with package manangers.
 * eg: package.json, bower.json
 * @return {undefined}
 */
PluginGenerator.prototype.packageManagerConfigs = function packageManagerConfigs() {
  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');
};

/**
 * Setup any configuration files that have to do with the project
 * eg: editor settings, development settings (jshint, gruntfile)
 * @return {[type]} [description]
 */
PluginGenerator.prototype.projectConfigs = function projectConfigs() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
  this.copy('gitignore', '.gitignore');
  this.copy('npmignore', '.npmignore');
  this.copy('LICENSE-MIT', 'LICENSE-MIT');
  this.template('Gruntfile.js', 'Gruntfile.js');
};

PluginGenerator.prototype.testSetup = function testSetup() {
    this.mkdir('test');
    this.template('test/_main.js', 'test/main.js');
};

PluginGenerator.prototype.docsSetup = function docsSetup() {
  this.mkdir('docs');
};

PluginGenerator.prototype.helperFiles = function helperFiles() {
  this.template('_index.js', 'index.js');
};