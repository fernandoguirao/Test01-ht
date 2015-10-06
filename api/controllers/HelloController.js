var Machine = require("machine");
module.exports = {
    'find': function(req, res) {
        Machine.build({
            inputs: {},
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                // Send to all
                sails.machines['9e74ee33-0e44-4494-bbd3-addd4b36573f_1.2.1'].blast({
                    "eventName": "news",
                    "data": "hello world!"
                }).setEnvironment({
                    sails: sails
                }).exec({
                    "error": function(sendToAll) {
                        return exits.error({
                            data: sendToAll,
                            status: 500
                        });

                    },
                    "success": function(sendToAll) {
                        return exits.respond({
                            data: null,
                            action: "respond_with_value_and_status",
                            status: 200
                        });

                    }
                });
            }
        }).configure(req.params.all(), {
            respond: res.response,
            error: res.negotiate
        }).exec();
    }
};