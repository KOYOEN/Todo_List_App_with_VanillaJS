(function(window) {
    'use strict';

    function Template(){
        console.log('Template created!');
        this.defaultTemplate
        =    `<li data-id="{{id}}" class="{{completed}}">`
        +    '<div class="view">'
        +            '<input class="toggle" type="checkbox" {{checked}}>'
        +            '<label>{{title}}</label>'
        +            '<button class="destroy"></button>'
        +        '</div>'
        +    '</li>';
    }

    Template.prototype.show = function(data){
        console.log('Template.show execute!');
        var i, l;
        var view = '';
        for (i = 0, l = data.length; i < l; i++){
            var template = this.defaultTemplate;
            var completed = '';
            var checked = '';

            if(data[i].completed){ // default : false
                completed = 'completed';
                checked = 'checked';
            }

            template = template.replace('{{id}}', data[i].id);
            template = template.replace('{{title}}', escape(data[i].title));
            template = template.replace('{{completed}}', completed);
            template = template.replace('{{checked}}', checked);

            view = view + template;
        }
        return view;
    };

    window.app = window.app || {};
    window.app.Template = Template;
})(window);
