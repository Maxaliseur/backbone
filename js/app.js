define([
	'marionette'
], function (Marionette){
	"use strict";

	var app = new Marionette.Application();

	app.addRegions({
		header	: '#header',
		main 	: '#main'
	});
	app.vent.on("search:term", function(model){
		backbone.history.navigate('search/'+moedl.get('id'));

		
	});


	return app;

})