/*global define*/
define([
	'marionette'
], function(Marionette){
	return Marionette.AppRouter.extend({
		appRoutes:{
			'': 'defaultSearch',
			'search/:searchTerm': 'search'
		},

		defaultSearch: function (){
			console.log('defaultSearch');

		},
		search: function(term){
			console.log('search', term);
		}
	})
});