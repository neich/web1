var t_profile = require("raw-loader!../../../templates/user/profile_edit.html")


var UserProfile = Backbone.View.extend({

    initialize: function(params) {
        this.eventBus = params.eventBus;
        this.template = _.template(t_profile);
        this.model = params.model;
    },
    className: 'container',

    events: {
        'click #save-changes': 'saveChanges'
    },

    saveChanges: function() {
        var data = {
            first_name: this.$('#first_name').val(),
            last_name: this.$('#last_name').val(),
            email: this.$('#email').val(),
            password: this.$('#password').val(),
            username: this.$('#username').val(),
        }
        console.log(data);

        this.eventBus.trigger('view:update-profile:request', this.model.id, data)

        // window.location.hash = 'profile';
        
    },

    render: function () {
        this.$el.html(this.template({user: this.model}))
        return this
    }
})

module.exports = UserProfile