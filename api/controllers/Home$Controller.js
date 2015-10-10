var Machine = require("machine");
module.exports = {
    'find': function(req, res) {
        Machine.build({
            inputs: {},
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                // Pick random item
                sails.machines['c646f5e7-9c6f-49a5-91f6-7e1eabfd1186_5.2.0'].sample({
                    "array": ["is destined to change lives", "is the wave of the future", "has world-changing potential", "loves to party", "never quits", "just can&rsquo;t stop", "doesn&rsquo;t know the meaning of &ldquo;failure&rdquo;", "smells like rich mahagony", "can bench press twice its body weight—IN GOLD", "slays dragons"]
                }).exec({
                    "error": function(pickRandomItem) {
                        return exits.error({
                            data: pickRandomItem,
                            status: 500
                        });

                    },
                    "emptyArray": function(pickRandomItem) {
                        return exits.respond({
                            action: "respond_with_status",
                            status: 200
                        });

                    },
                    "success": function(pickRandomItem) {
                        return exits.respond({
                            data: {
                                appName: "Sockets",
                                description: pickRandomItem
                            },
                            action: "display_view",
                            status: 200,
                            view: "app/components/home/homeView"
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