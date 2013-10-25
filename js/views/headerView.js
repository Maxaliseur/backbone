define([
	'marionette',
	'text!../../templates/header.html'
], function (Marionette, headerTemplate){
	"use strict";

	return Marionette.ItemView.extend({
		template : headerTemplate,

		modelEvents : {
			"change" : "render"
		}
	})

});