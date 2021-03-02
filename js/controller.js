(function (window) {
    'use strict';
    function Controller(model, view){
        console.log('controller created!');
        var self = this;
        self.model = model;
        self.view = view;

        self.view.bind('newTodo', function (title) {
            self.addItem(title);
        });
        self.view.bind('itemRemove', function (item){
            self.removeItem(item.id);
        });
        self.view.bind('itemEdit', function(item){
            self.editItem(item.id);
        });
        self.view.bind('itemEditDone', function(item){
            self.editItemSave(item.id, item.title);
        });
        self.showAll();
    }

    Controller.prototype.showAll = function(){
        console.log('Controller showAll execute!');
        var self = this;
        self.model.read(function (data) {
            self.view.render('showEntries', data);
        });
    };

    Controller.prototype.addItem = function (title) {
        console.log('Controller addItem execute!');
        var self = this;
        if(title.trim() === '') {
            return;
        }

        self.model.create(title, function() {
            self.view.render('clearNewTodo');
        });
        this.showAll();
    };

    Controller.prototype.removeItem = function(id){
        console.log("Controller.removeItem execute!");
        var self = this;
        self.model.remove(id, function(){
            self.view.render('removeItem', id);
        });
        this.showAll();
    };

    Controller.prototype.editItem = function(id){
        console.log('Controller.editItem execute!');
        var self = this;
        self.model.read(id, function(data){
            self.view.render('editItem', { id: id, title: data[0].title});
        });
    };

    Controller.prototype.editItemSave = function(id, title){
        console.log('Controller.editItemSave execute!');
        var self = this;
        title = title.trim();

        if(title.length != 0){
            self.model.update(id, {title: title}, function(){
                self.view.render('editItemDone', {id: id, title: title});
            });
        }
    }
    window.app = window.app || {};
    window.app.Controller = Controller;
})(window);
