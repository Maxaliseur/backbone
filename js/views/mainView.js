define([
	'marionette',
	'text!../../templates/main.html',
	'views/mainitemView'
], function (Marionette, mainTemplate, mainItemView){
	"use strict";

	return Marionette.CompositeView.extend({
		itemView : mainItemView,
		template : mainTemplate,
		tagName: "ul",
		/*events : {
			"click" : "change_person"
		},

		modelEvents : {
			"change" : "render"
		},

		change_person : function(){
			
		},*/

		serializeData : function(){
			return {
				persons_number : this.collection.length
			};
		}
	})

});