define(["app",
        "tpl!apps/contacts/list/templates/layout.tpl",
        "tpl!apps/contacts/list/templates/panel.tpl",
        "tpl!apps/contacts/list/templates/none.tpl",
        "tpl!apps/contacts/list/templates/list.tpl",
        "tpl!apps/contacts/list/templates/list_item.tpl"],
       function(ContactManager, layoutTpl, panelTpl, noneTpl, listTpl, listItemTpl){
  ContactManager.module("ContactsApp.List.View", function(View, ContactManager, Backbone, Marionette, $, _){
    View.Layout = Marionette.Layout.extend({
      template: layoutTpl,

      regions: {
        panelRegion: "#panel-region",
        contactsRegion: "#contacts-region"
      }
    });

    View.Panel = Marionette.ItemView.extend({
      template: panelTpl,

      triggers:{
        "click button.js-new" : 'contact:new'
      },
      events:{
         "submit #filter-form": 'filterPersons',
         
      },

      ui: {
        criterion: "input.js-filter-criterion"
      },

      filterPersons: function(e){
        e.preventDefault();
        this.trigger('contacts:filter', $(this.ui.criterion).val());
      },
      

      onSetFilterCriterion: function(criterion){
        this.ui.criterion.val(criterion);
      }
    });

    View.Contact = Marionette.ItemView.extend({
      tagName: "tr",
      template: listItemTpl,

      events: {
        "click": "highlightName",
        "click .supprimer": 'deletePerson',
      },

      deletePerson: function(e){
        console.log(this.model)
        this.trigger("contact:delete", this.model);
      },

      flash: function(cssClass){
        var $view = this.$el;
        $view.hide().toggleClass(cssClass).fadeIn(800, function(){
          setTimeout(function(){
            $view.toggleClass(cssClass)
          }, 500);
        });
      },

      highlightName: function(e){
        this.$el.toggleClass("warning");
      },

      remove: function(){
        var self = this;
        this.$el.fadeOut(function(){
          Marionette.ItemView.prototype.remove.call(self);
        });
      }
    });

    var NoContactsView = Marionette.ItemView.extend({
      template: noneTpl,
      tagName: "tr",
      className: "alert"
    });

    View.Contacts = Marionette.CompositeView.extend({
      tagName: "table",
      className: "table table-hover",
      template: listTpl,
      emptyView: NoContactsView,
      itemView: View.Contact,
      itemViewContainer: "tbody",

      initialize: function(){
        this.listenTo(this.collection, "reset", function(){
          this.appendHtml = function(collectionView, itemView, index){
            collectionView.$el.append(itemView.el);
          }
        });
      },

      onCompositeCollectionRendered: function(){
        this.appendHtml = function(collectionView, itemView, index){
          collectionView.$el.prepend(itemView.el);
        }
      }
    });
  });

  return ContactManager.ContactsApp.List.View;
});
