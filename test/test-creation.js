/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;


describe('plugin generator', function () {

    beforeEach(function (done) {
        helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
            if (err) {
                return done(err);
            }

            this.app = helpers.createGenerator('plugin:app', [
                '../../app'
            ]);
            done();
        }.bind(this));
    });

    it('creates expected files', function (done) {

        var expected = [
            // add files you expect to exist here.
            '.jshintrc',
            '.editorconfig',
            '.gitignore',
            '.npmignore',
            'LICENSE-MIT',
            'bower.json',
            'test/main.js',
            'index.js'
        ];

        helpers.mockPrompt(this.app, {
            pluginName: 'myPlugin',
            fullName: 'assemble-plugin-myPlugin',
            description: 'The best plugin ever',
            user: 'assemble',
            events: ['assemble:after:render'],
            homepage: 'https://github.com/assemble/assemble-plugin-myPlugin',
            repositoryUrl: 'https://github.com/assemble/assemble-plugin-myPlugin.git',
            bugUrl: 'https://github.com/assemble/assemble-plugin-myPlugin/issues',
            licenseType: 'MIT',
            licenseUrl: 'https://github.com/assemble/assemble-plugin-myPlugin/blob/master/LICENSE-MIT',
            contributors: 'assemble'
        });

        this.app.options['skip-install'] = true;

        this.app.run({}, function () {
            helpers.assertFile(expected);
            done();
        });
    });
});
