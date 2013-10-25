define([
	'backbone',
	'../models/person',
	'../utils/fixture'
], function (Backbone, PersonModule, fixture){
	'use strict';

	return Backbone.Collection.extend({
		// model : PersonModule,

		storageName : 'multimedia-test-arthur',

		initialize : function (){
			_.bindAll(this, 'createModel');
			this.localStorage = new Backbone.LocalStorage(this.storageName);
			if(!localStorage[this.storageName]){
				this.loadFixture();
			}
		},

		loadFixture : function (){
			_.each(fixture, this.createModel);
		},

		createModel : function (object){
			this.create(object);
		}
	});

});