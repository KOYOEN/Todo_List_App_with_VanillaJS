(function (window) {
    'use strict';
    function Model(storage){
        console.log('Model created!');
        this.storage = storage;

    }

    Model.prototype.create = function(title, callback) {
        title = title || '';
        callback = callback || function() {};

        var newItem = {
            title: title.trim(),
            completed: false
        };
        this.storage.save(newItem, callback);
    };

    Model.prototype.read = function (query, callback) {
        var queryType = typeof query;
        callback = callback || function () {};

        if (queryType === 'function') {
            callback = query;
            return this.storage.findAll(callback);
        }else if (queryType === 'string' || queryType === 'number') {
            query = parseInt(query, 10);
            this.storage.find({ id: query }, callback);
        }else {
            this.storage.find(query, callback);
        }
    }

    window.app = window.app || {};
    window.app.Model = Model;
})(window);