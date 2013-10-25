define([
	'marionette',
	'text!../../templates/mainitemview.html'
], function (Marionette, mainItemTemplate){
	"use strict";

	return Marionette.ItemView.extend({
		tagName : 'li',
		
		className :  'main-item-template',

		template : mainItemTemplate,

		events : {
			"click" : "change_person"
		},

		modelEvents : {
			"change" : "render"
		},

		change_person : function(){
			//console.log();
		}
	})

});