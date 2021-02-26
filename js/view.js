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
            showEntries: function(){
                self.$todoList.innerHTML = self.template.show(parameter);
            },
            clearNewTodo: function(){
                self.$newTodo.value = '';
            },
            setFilter: function() {
                self._setFilter(parameter);
            },
            removeItem: function(){
                self._removeItem(parameter);
            },
            editItem: function(){
                self._editItem(parameter.id, parameter.title);
            },
            editItemDone: function(){
                self._editItemDone(parameter.id, parameter.title);
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
        }else if(event === 'itemRemove'){
            self.$todoList.addEventListener('click', function(event){
                var target = event.target;
                if(target.className === 'destroy'){
                    handler({id: self._getItemId(target.parentNode)});
                }
            })
        }else if(event === 'itemEdit'){
            self.$todoList.addEventListener('dblclick', function(event){
                var target = event.target;
                if(target.tagName.toLowerCase() === 'label'){
                    handler({id: self._getItemId(target.parentNode)});
                }
            })
        }else if(event === 'itemEditDone'){
            self.$todoList.addEventListener('keypress', function(event){
                if(event.keyCode === 13){ // Enter 키는 13
                    var target = event.target;
                    handler({id: self._getItemId(target), title: target.value});
                }
            })
        }
    }

    View.prototype._getItemId = function(element){
        var li;
        if (element.parentNode.tagName.toLowerCase() === 'li'){
            li = element.parentNode;
        }
        return parseInt(li.dataset.id, 10);
    }

    View.prototype._removeItem = function(id) {
        var element = document.querySelector('[data-id="' + id + '"]');
        if (element) {
            this.$todoList.removeChild(element);
        }
    }

    View.prototype._editItem = function(id, title) {
        console.log('View._editItem execute');
        var element = document.querySelector('[data-id="' + id + '"]');

        if (element) {
            element.className = element.className + 'editing';

            var input = document.createElement('input');
            input.className = 'edit';

            element.appendChild(input);
            input.focus();
            input.value = title;
        }

    }

    View.prototype._editItemDone = function(id, title) {
        console.log('View._editItemDone execute');
        var element = document.querySelector('[data-id="' + id + '"]');

        if (element) {
            var input = document.querySelector('input.edit', element);
            element.removeChild(input);
            element.className = element.className.replace('editing', '');

            var label = document.querySelectorAll('label');
            label.forEach(function(label){
                if(label.parentNode.parentNode === element){
                    label.textContent = title;
                }
            });
        }
    };

    window.app = window.app || {};
    window.app.View = View;
})(window);