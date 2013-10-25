(function(){
	'use strict';

	var librairieDir = '../libs/';

	require.config({
		urlArgs : 'bust=' + new Date().getTime(),
		paths	: {
			jquery					: librairieDir + 'jquery.min',
			underscore				: librairieDir + 'underscore.min',
			backbone				: librairieDir + 'backbone.min',
			backboneLocalStorage	: librairieDir + 'backbone.localstorage',
			mustache				: librairieDir + 'mustache',
			marionette				: librairieDir + 'backbone.marionette.min',
			text 					: librairieDir + 'require.text'
		},

		shim	: {
			backbone	: {
				deps	: ['jquery', 'underscore'],
				exports	: 'Backbone'
			},

			marionette	: {
				deps	: ['backbone'],
				exports	: 'Marionette'
			},

			backboneLocalStorage	: {
				deps	: ['backbone']
			},

			mustache 	: {
				exports	: 'Mustache'
			}
		}
	});

	require([
		'./app',
		'marionette',
		'mustache',
		'models/person',
		'collections/persons',
		'views/headerView',
		'views/mainView',
		'utils/routers'
	], function (app, Marionette, Mustache, Person, Persons, headerView, mainView, Router) {

		Marionette.Renderer.render = function (template, data) {
			return Mustache.to_html(template, data); 
		};

		app.addInitializer(function (){
			window.app = app;
			app.persons = new Persons();

			app.persons.fetch();

			app.header.show(new headerView({model : app.persons.get(0)}));
			app.main.show(new mainView({collection : app.persons}));

			console.log(app.persons)
		});
		app.Router = Router;
		backbon.history.start();
		app.start();
	});

})();