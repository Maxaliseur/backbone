define([
	'backbone',
	'backboneLocalStorage'
], function (Backbone){
	'use strict';

	return Backbone.Model.extend({
		localStorage : new Backbone.LocalStorage("Exo_MVC")
	});
});