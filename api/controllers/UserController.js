var Machine = require("machine");
module.exports = {
    '$id': function(req, res) {
        Machine.build({
            inputs: {
                "id": {
                    "example": "abc123",
                    "required": true
                }
            },
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                // Find One User
                sails.machines['_project_4053_0.0.2'].findOne_user({
                    "criteria": {
                        id: inputs.id
                    }
                }).setEnvironment({
                    sails: sails
                }).exec({
                    "success": function(findOneUser) {
                        return exits.respond({
                            data: findOneUser,
                            action: "respond_with_result_and_status",
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
    },
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
                },
                "picture": {
                    "example": "http://asdsad.jpg",
                    "required": true
                },
                "first_name": {
                    "example": "Fernando",
                    "required": true
                },
                "last_name": {
                    "example": "Guirao",
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
                        sails.machines['_project_4053_0.0.2'].create_user({
                            "email": inputs.email,
                            "password": encryptPassword,
                            "nickname": inputs.nickname,
                            "options_id": 0,
                            "picture": inputs.picture,
                            "first_name": inputs.first_name,
                            "last_name": inputs.last_name
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
    'unlogged': function(req, res) {
        Machine.build({
            inputs: {},
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                // Get Facebook login URL
                sails.machines['c8d25931-bf1e-4997-be03-18e7c605d85a_1.1.0'].getLoginUrl({
                    "appId": "545559668933267",
                    "callbackUrl": "http://bigband.me:1337/",
                    "permissions": ["user_friends", "email", "public_profile"]
                }).exec({
                    "error": function(getFacebookLoginURL) {
                        return exits.error({
                            data: getFacebookLoginURL,
                            status: 500
                        });

                    },
                    "success": function(getFacebookLoginURL) {
                        return exits.respond({
                            data: getFacebookLoginURL,
                            action: "respond_with_result_and_status",
                            status: 200
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
                sails.machines['_project_4053_0.0.2'].find_user({}).setEnvironment({
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
                sails.machines['_project_4053_0.0.2'].findOne_user({
                    "criteria": {
                        nickname: inputs.nickname
                    }
                }).setEnvironment({
                    sails: sails
                }).exec({
                    "success": function(findOneUser) {
                        return exits.respond({
                            data: findOneUser,
                            action: "respond_with_result_and_status",
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