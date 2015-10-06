var Machine = require("machine");
module.exports = {
    'new': function(req, res) {
        Machine.build({
            inputs: {
                "password": {
                    "example": "l0lcatzz",
                    "required": true
                },
                "email": {
                    "example": "fernando@bueninvento.es",
                    "required": true
                },
                "nickname": {
                    "example": "fernando guirao",
                    "required": true
                }
            },
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                // Encrypt password
                sails.machines['e05a71f7-485d-443a-803e-029b84fe73a4_2.3.0'].encryptPassword({
                    "password": inputs.password
                }).exec({
                    "error": function(encryptPassword) {
                        return exits.error({
                            data: encryptPassword,
                            status: 500
                        });

                    },
                    "success": function(encryptPassword) {
                        // Create User
                        sails.machines['_project_4053_0.0.0'].create_user({
                            "email": inputs.email,
                            "password": encryptPassword,
                            "nickname": inputs.nickname,
                            "options_id": 0
                        }).setEnvironment({
                            sails: sails
                        }).exec({
                            "success": function(createUser) {
                                return exits.respond({
                                    data: createUser,
                                    action: "respond_with_result_and_status",
                                    status: 200
                                });

                            },
                            "error": function(createUser) {
                                return exits.error({
                                    data: createUser,
                                    status: 500
                                });

                            }
                        });

                    }
                });
            }
        }).configure(req.params.all(), {
            respond: res.response,
            error: res.negotiate
        }).exec();
    },
    'find': function(req, res) {
        Machine.build({
            inputs: {},
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                // List User
                sails.machines['_project_4053_0.0.0'].find_user({}).setEnvironment({
                    sails: sails
                }).exec({
                    "success": function(listUser) {
                        return exits.respond({
                            data: listUser,
                            action: "respond_with_result_and_status",
                            status: 200
                        });

                    },
                    "error": function(listUser) {
                        return exits.error({
                            data: listUser,
                            status: 500
                        });

                    }
                });
            }
        }).configure(req.params.all(), {
            respond: res.response,
            error: res.negotiate
        }).exec();
    },
    'login': function(req, res) {
        Machine.build({
            inputs: {
                "nickname": {
                    "example": "abc123"
                }
            },
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                // Find One User
                sails.machines['_project_4053_0.0.0'].findOne_user({
                    "criteria": {
                        nickname: inputs.nickname
                    }
                }).setEnvironment({
                    sails: sails
                }).exec({
                    "success": function(findOneUser) {
                        return exits.respond({
                            data: {
                                nickname: (findOneUser && findOneUser.nickname),
                                id: (findOneUser && findOneUser.id)
                            },
                            action: "respond_with_value_and_status",
                            status: 200
                        });

                    },
                    "error": function(findOneUser) {
                        return exits.error({
                            data: findOneUser,
                            status: 500
                        });

                    },
                    "notFound": function(findOneUser) {
                        return exits.error({
                            data: findOneUser,
                            status: 500
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