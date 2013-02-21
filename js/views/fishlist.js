window.FishListView = Backbone.View.extend({
    initialize: function() {
        this.render();
    },

    render: function(){
        var fishs = this.model.models;
        var len = fishs.length;
        var startPos = (this.options.page - 1) * 8;
        var endPos = Math.min(startPos + 8, len);
        //$(this.el).html('<div><h2>test</h2></div>');
        $(this.el).html('<ul class="thumbnails"></ul>');

        for(var i = startPos; i < endPos; i++){
            $('.thumbnails', this.el).append(new FishListItemView({model: fishs[i]}).render().el);
        }

        $(this.el).append(new Paginator({model: this.model, page: this.options.page}).render().el);

        return this;
    }
});

window.FishListItemView = Backbone.View.extend({
    tagName: "li",
    className: "span3",

    initialize: function() {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render: function(){
        //$(this.el).html('<h2>test</h2>');
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
});
