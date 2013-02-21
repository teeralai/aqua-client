var AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "list",
        "fishs/page/:page"	: "list",
        "fishs/add"         : "addFish",
        "fishs/:id"         : "fishDetails",
        "about"             : "about"
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

	//list: function(page) {
      list: function() {
        //var p = page ? parseInt(page, 10) : 1;
        //var fishList = new FishCollection();
        this.familyListView = new FamilyListView();
        //fishList.fetch({success: function(){
        //    $("#content").html(new FishListView({model: fishList, page: p}).el);
       // }});
        $('#content').html(this.familyListView.el);
        this.headerView.selectMenuItem('home-menu');
    },

    fishDetails: function (id) {
        var fish = new Fish({id: id});
        fish.fetch({success: function(){
            $("#content").html(new FishView({model: fish}).el);
        }});
        this.headerView.selectMenuItem();
    },

	addFish: function() {
        var fish = new Fish();
        $('#content').html(new FishView({model: fish}).el);
        this.headerView.selectMenuItem('add-menu');
	},

    about: function () {
        if (!this.aboutView) {
            this.aboutView = new AboutView();
        }
        $('#content').html(this.aboutView.el);
        this.headerView.selectMenuItem('about-menu');
    }

});

utils.loadTemplate(['HeaderView', 'FamilyListView', 'FishView', 'FishListItemView', 'AboutView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});
