(function(window){
    'use strict';
    function View(template){
        console.log('view created!');
        this.template = template;

        this.$todoList = document.querySelector(".todo-list");
        this.$newTodo = document.querySelector('.new-todo');
    }


    View.prototype.render = function(viewCmd, parameter) {
        var self = this;
        var viewCommands = {
            showEntries: function (){
                self.$todoList.innerHTML = self.template.show(parameter);
            },
            clearNewTodo: function (){
                self.$newTodo.value = '';
            },
            setFilter: function() {
                self._setFilter(parameter);
            }
        }
        viewCommands[viewCmd]();
    }

    View.prototype.bind = function(event, handler) {
        var self = this;
        if (event === 'newTodo'){
            self.$newTodo.addEventListener('change', function() {
                handler(self.$newTodo.value);
            });
        }
    }

    View.prototype._setFilter = function (currentPage) {
        // var listItem = document.querySelector(".filters")
    }
    window.app = window.app || {};
    window.app.View = View;
})(window);