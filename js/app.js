(function () {
    'use strict';
    function App(name) {
        console.log('App created!');
        this.storage = new app.Store(name);
        this.model = new app.Model(this.storage);
        this.template = new app.Template();
        this.view = new app.View(this.template);
        this.controller = new app.Controller(this.model, this.view);
    }

    var todo = new App('todos-vanillajs');

    function setView() {
        todo.controller.setView(document.location.hash);
    }

    window.addEventListener('load', setView);
    window.addEventListener('hashchange', setView);
})();