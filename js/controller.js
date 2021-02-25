(function (window) {
    'use strict';
    function Controller(model, view){
        console.log('controller created!');
        this.model = model;
        this.view = view;
        var self = this;
        this.view.bind('newTodo', function (title) {
            self.addItem(title);

        })
        //this.showAll();
    }

    Controller.prototype.showAll = function(){
        var self = this;
        self.model.read(function (data) {
            self.view.render('showEntries', data);
        });
    };

    Controller.prototype.addItem = function (title) {
        var self = this;
        if(title.trim() === '') {
            return;
        }

        self.model.create(title, function() {
            self.view.render('clearNewTodo');
            self._filter(true);
        });
    };

    Controller.prototype.setView = function (locationHash) {
        var route = locationHash.split('/')[1];
        var page = route || '';
        this._updateFilterState(page);
    }

    Controller.prototype._filter = function (force) {
        var activeRoute = this._activeRoute.charAt(0).toUpperCase() + this._activeRoute.substr(1);


    }
    Controller.prototype._updateFilterState = function (currentPage) {
        this._activeRoute = currentPage;

        if(currentPage === '') {
            this._activeRoute = 'All';
        }

        this._filter();

        this.view.render('setFilter', currentPage);
    };

    window.app = window.app || {};
    window.app.Controller = Controller;
})(window);
