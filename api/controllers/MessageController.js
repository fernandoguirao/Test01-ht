var Machine = require("machine");
module.exports = {
    'create': function(req, res) {
        Machine.build({
            inputs: {
                "message": {
                    "example": "*"
                },
                "author": {
                    "example": "*"
                }
            },
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                // Send to all
                sails.machines['9e74ee33-0e44-4494-bbd3-addd4b36573f_1.2.1'].blast({
                    "eventName": "news",
                    "data": {
                        message: inputs.message,
                        author: inputs.author
                    }
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
                            action: "respond_with_status",
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