/*
 * Assemble Plugin: <%= _.slugify(fullName) %>
 * <%= homepage %>
 * Assemble is the 100% JavaScript static site generator for Node.js, Grunt.js, and Yeoman.
 *
 * Copyright (c) <%= (new Date).getFullYear() %> <%= contributors %>
 * Licensed under the <%= licenseType %> license.
 */

var options = {
  // stages: [
  //   // assemble.utils.plugins.stages.optionsPreConfiguration,
  //   // assemble.utils.plugins.stages.optionsPostConfiguration,
  //   // 'assemble:*:pages'
  // ]
  stages: ['<%= stages.join("','") %>']
};

var plugin = module.exports = function(assemble) {

  assemble.registerPlugin(
    '<%= _.slugify(fullName) %>',
    '<%= description %>',
    options,
    function (params, next) {
     console.log('<%= fullName %>', params.stage);
     next();
    }
  );

};