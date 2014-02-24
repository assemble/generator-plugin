/*
 * Assemble Plugin: <%= _.slugify(fullName) %>
 * <%= homepage %>
 * Assemble is the 100% JavaScript static site generator for Node.js, Grunt.js, and Yeoman.
 *
 * Copyright (c) <%= (new Date).getFullYear() %> <%= contributors %>
 * Licensed under the <%= licenseType %> license.
 */

var options = {
  events: ['<%= events.join("','") %>']
};

var plugin = module.exports = function(assemble) {

  assemble.registerPlugin(
    '<%= _.slugify(fullName) %>',
    '<%= description %>',
    options,
    function (params, next) {
     console.log('<%= fullName %>', params.event);
     next();
    }
  );

};