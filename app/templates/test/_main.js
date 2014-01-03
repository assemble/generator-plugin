/*
 * Assemble Plugin: <%= _.slugify(fullName) %>
 * <%= homepage %>
 * Assemble is the 100% JavaScript static site generator for Node.js, Grunt.js, and Yeoman.
 *
 * Copyright (c) <%= (new Date).getFullYear() %> <%= contributors %>
 * Licensed under the <%= licenseType %> license.
 */

var expect = require('chai').expect;

var <%= _.safename(fullName) %> = require('../');

describe('<%= _.slugify(fullName) %>', function() {

	before(function(){
		// run any code before tests here
	});

  it('should do something awesome', function() {
    var expected = '<%= _.slugify(fullName) %>';
    var actual = '<%= _.slugify(fullName) %>';
    expect(actual).to.eql(expected);
  });

});