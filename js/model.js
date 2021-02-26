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
        console.log('model.read execute!');
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
    };

    Model.prototype.remove = function(id, callback){
        console.log('Model.remove method execute!');
        this.storage.remove(id, callback);
    };

    Model.prototype.update = function(id, data, callback){
        console.log('Model.update execute!');
        this.storage.save(data, callback, id);
    }

    window.app = window.app || {};
    window.app.Model = Model;
})(window);