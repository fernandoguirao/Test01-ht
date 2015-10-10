var Machine = require("machine");
module.exports = {
    'fblogin': function(req, res) {
        Machine.build({
            inputs: {},
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                // Get access token
                sails.machines['c8d25931-bf1e-4997-be03-18e7c605d85a_1.1.0'].getAccessToken({
                    "appId": "545559668933267",
                    "appSecret": "61fac5e3cb34915ca880ed4cf7f0835c",
                    "code": "AQA38zOK_L5d2oATylLc2c-dxR3FzWT4hP9GttOKNiePwMIS5kvkKNJsiTKo73FUZEY7ULQ8CRK-pQ34_r-VjoCN3t6gb7UHylc40Vjp3UaSJKRpkmv36SM5_8BCXD9UnnEDn8YnxKZrY4clneNxStcHx03oJOGWhNuU0xnK4UZlKkl2dap20UA02M91uTqMX1XOzngcG0B-xwkatiiMiniitWCGE9NNZgioz-huD4zsNQy5_1n7_HLzm943_95Krc2CET2hJSdCNwtc-dt8uuVyp3KnldP2ObQXT3oc9Jx9R4Bz9WCBBsqPzv_7YkbItII#",
                    "callbackUrl": "http://bigband.me:1337/"
                }).exec({
                    "error": function(getAccessToken) {
                        return exits.error({
                            data: getAccessToken,
                            status: 500
                        });

                    },
                    "success": function(getAccessToken) {
                        // Get user by access token
                        sails.machines['c8d25931-bf1e-4997-be03-18e7c605d85a_1.1.0'].getUserByAccessToken({
                            "accessToken": (getAccessToken && getAccessToken.token)
                        }).exec({
                            "error": function(getUserByAccessToken) {
                                return exits.error({
                                    data: getUserByAccessToken,
                                    status: 500
                                });

                            },
                            "success": function(getUserByAccessToken) {
                                return exits.respond({
                                    data: getUserByAccessToken,
                                    action: "respond_with_result_and_status",
                                    status: 200
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