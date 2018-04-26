var t_profile = require("raw-loader!../../../templates/user/profile.html")


var UserProfile = Backbone.View.extend({

    initialize: function(params) {
        this.eventBus = params.eventBus;
        this.template = _.template(t_profile);
    },

    className: 'container',

    render: function () {
        this.$el.html(this.template({user: this.model}))
        return this
    }
})

module.exports = UserProfile