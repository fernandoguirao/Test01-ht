var Machine = require("machine");
module.exports = {
    'post_$hash': function(req, res) {
        Machine.build({
            inputs: {
                "hash": {
                    "example": "abc123",
                    "required": true
                },
                "message": {
                    "example": "*",
                    "required": true
                },
                "author": {
                    "example": "*"
                },
                "recipient": {
                    "example": "*"
                }
            },
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                // Send to all
                sails.machines['9e74ee33-0e44-4494-bbd3-addd4b36573f_1.2.1'].blast({
                    "eventName": inputs.hash,
                    "data": {
                        message: inputs.message,
                        author: inputs.author,
                        recipient: inputs.recipient
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
                        // Find One User
                        sails.machines['_project_4053_0.0.0'].findOne_user({
                            "criteria": {
                                nickname: inputs.author
                            }
                        }).setEnvironment({
                            sails: sails
                        }).exec({
                            "success": function(findOneUser) {
                                // Find One Room
                                sails.machines['_project_4053_0.0.0'].findOne_chatrooms({
                                    "criteria": {
                                        hash: inputs.hash
                                    }
                                }).setEnvironment({
                                    sails: sails
                                }).exec({
                                    "success": function(findOneRoom) {
                                        // Create Chat
                                        sails.machines['_project_4053_0.0.0'].create_chat({
                                            "message": inputs.message,
                                            "room_id": (findOneRoom && findOneRoom.id),
                                            "user_id": (findOneUser && findOneUser.id)
                                        }).setEnvironment({
                                            sails: sails
                                        }).exec({
                                            "success": function(createChat) {
                                                return exits.respond({
                                                    data: createChat,
                                                    action: "respond_with_result_and_status",
                                                    status: 200
                                                });

                                            },
                                            "error": function(createChat) {
                                                return exits.error({
                                                    data: createChat,
                                                    status: 500
                                                });

                                            }
                                        });

                                    },
                                    "error": function(findOneRoom) {
                                        return exits.error({
                                            data: findOneRoom,
                                            status: 500
                                        });

                                    },
                                    "notFound": function(findOneRoom) {
                                        return exits.error({
                                            data: findOneRoom,
                                            status: 500
                                        });

                                    }
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
                });
            }
        }).configure(req.params.all(), {
            respond: res.response,
            error: res.negotiate
        }).exec();
    },
    'get_$hash': function(req, res) {
        Machine.build({
            inputs: {
                "hash": {
                    "example": "abc123",
                    "required": true
                }
            },
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                // Find One Room
                sails.machines['_project_4053_0.0.0'].findOne_chatrooms({
                    "criteria": {
                        hash: inputs.hash
                    }
                }).setEnvironment({
                    sails: sails
                }).exec({
                    "success": function(findOneRoom) {
                        // List Chat
                        sails.machines['_project_4053_0.0.0'].find_chat({
                            "criteria": {
                                room_id: (findOneRoom && findOneRoom.id)
                            }
                        }).setEnvironment({
                            sails: sails
                        }).exec({
                            "success": function(listChat) {
                                return exits.respond({
                                    data: listChat,
                                    action: "respond_with_result_and_status",
                                    status: 200
                                });

                            },
                            "error": function(listChat) {
                                return exits.error({
                                    data: listChat,
                                    status: 500
                                });

                            }
                        });

                    },
                    "error": function(findOneRoom) {
                        return exits.error({
                            data: findOneRoom,
                            status: 500
                        });

                    },
                    "notFound": function(findOneRoom) {
                        return exits.error({
                            data: findOneRoom,
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
    'join': function(req, res) {
        Machine.build({
            inputs: {
                "user01_id": {
                    "example": "abc123",
                    "required": true
                },
                "user02_id": {
                    "example": "abc123",
                    "required": true
                }
            },
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                // Find One Room
                sails.machines['_project_4053_0.0.0'].findOne_chatrooms({
                    "criteria": {
                        user01_id: inputs.user01_id,
                        user02_id: inputs.user02_id
                    }
                }).setEnvironment({
                    sails: sails
                }).exec({
                    "success": function(findOneRoom) {
                        return exits.respond({
                            data: {
                                hashRoom: (findOneRoom && findOneRoom.hash)
                            },
                            action: "respond_with_value_and_status",
                            status: 200
                        });

                    },
                    "error": function(findOneRoom) {
                        return exits.error({
                            data: findOneRoom,
                            status: 500
                        });

                    },
                    "notFound": function(findOneRoom) {
                        // Parse number
                        sails.machines['a8ddb9a2-a8f2-417b-b5b3-6feee5b2b142_1.2.0'].parse({
                            "string": inputs.user01_id
                        }).exec({
                            "error": function(parseNumber2) {
                                return exits.error({
                                    data: parseNumber2,
                                    status: 500
                                });

                            },
                            "notANumber": function(parseNumber2) {
                                return exits.respond({
                                    action: "respond_with_status",
                                    status: 200
                                });

                            },
                            "success": function(parseNumber2) {
                                // Parse number
                                sails.machines['a8ddb9a2-a8f2-417b-b5b3-6feee5b2b142_1.2.0'].parse({
                                    "string": inputs.user02_id
                                }).exec({
                                    "error": function(parseNumber) {
                                        return exits.error({
                                            data: parseNumber,
                                            status: 500
                                        });

                                    },
                                    "notANumber": function(parseNumber) {
                                        return exits.respond({
                                            action: "respond_with_status",
                                            status: 200
                                        });

                                    },
                                    "success": function(parseNumber) {
                                        // Hash
                                        sails.machines['0ccd2b47-a58e-4f8c-a3fd-d5a4ec77bfd5_5.1.1'].hash({
                                            "value": parseNumber2 + parseNumber
                                        }).exec({
                                            "error": function(hash) {
                                                return exits.error({
                                                    data: hash,
                                                    status: 500
                                                });

                                            },
                                            "success": function(hash) {
                                                // Create Room
                                                sails.machines['_project_4053_0.0.0'].create_chatrooms({
                                                    "hash": " " + hash,
                                                    "user02_id": parseNumber,
                                                    "user01_id": parseNumber2
                                                }).setEnvironment({
                                                    sails: sails
                                                }).exec({
                                                    "success": function(createRoom) {
                                                        return exits.respond({
                                                            data: {
                                                                hashRoom: hash
                                                            },
                                                            action: "respond_with_value_and_status",
                                                            status: 200
                                                        });

                                                    },
                                                    "error": function(createRoom) {
                                                        return exits.error({
                                                            data: createRoom,
                                                            status: 500
                                                        });

                                                    }
                                                });

                                            }
                                        });

                                    }
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
    'create': function(req, res) {
        Machine.build({
            inputs: {},
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                return exits.respond({
                    action: 'compiler_error'
                });
            }
        }).configure(req.params.all(), {
            respond: res.response,
            error: res.negotiate
        }).exec();
    }
};