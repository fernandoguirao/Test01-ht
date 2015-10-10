module.exports = {
  "inputs": {
    "email": {
      "example": "fernando@bueninvento.es",
      "friendlyName": "email",
      "required": true
    },
    "password": {
      "example": "232easdasd2",
      "friendlyName": "password",
      "required": true
    },
    "nickname": {
      "example": "fernando guirao",
      "friendlyName": "nickname",
      "required": true
    },
    "options_id": {
      "example": 12,
      "friendlyName": "options_id",
      "required": true
    },
    "picture": {
      "example": "http://asdsad.jpg",
      "friendlyName": "picture",
      "required": true
    },
    "first_name": {
      "example": "Fernando",
      "friendlyName": "first_name",
      "required": true
    },
    "last_name": {
      "example": "Guirao",
      "friendlyName": "last_name",
      "required": true
    }
  },
  "exits": {
    "success": {
      "friendlyName": "then",
      "example": {
        "email": "fernando@bueninvento.es",
        "password": "232easdasd2",
        "nickname": "fernando guirao",
        "options_id": 12,
        "picture": "http://asdsad.jpg",
        "first_name": "Fernando",
        "last_name": "Guirao",
        "id": 123,
        "createdAt": "2015-10-10T09:22:12.416Z",
        "updatedAt": "2015-10-10T09:22:12.416Z"
      }
    },
    "error": {
      "example": undefined
    }
  },
  "sync": false,
  "cacheable": false,
  "defaultExit": undefined,
  "fn": function(inputs, exits, env) {
    env.sails.models.user.create(env.sails.util.objCompact(inputs)).exec(function(err, records) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(records);
    });
  },
  "identity": "create_user"
};