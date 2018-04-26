var t_profile = require("raw-loader!../../../templates/user/profile.html")


var UserProfile = Backbone.View.extend({

    initialize: function(params) {
        this.eventBus = params.eventBus;
    },

    template: _.template(t_profile),

    className: 'container',

    events: {
        'click .btn-login': 'modify'
    },

    modify: function () {
        var data = {
            username: this.$('[name=username]').val(),
            password: this.$('[name=password]').val(),
        }
        this.eventBus.trigger('view:modify:request', this.$('#modify-profile').val(), data)
    },

    className: 'container',

    render: function () {
        this.$el.html(this.template({user: this.model}))
        return this
    }
})

module.exports = UserProfile