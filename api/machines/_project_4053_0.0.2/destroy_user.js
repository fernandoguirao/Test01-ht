module.exports = {
  "inputs": {
    "criteria": {
      "friendlyName": "criteria",
      "typeclass": "dictionary",
      "description": "Waterline search criteria to use in retrieving User instances"
    }
  },
  "exits": {
    "success": {
      "friendlyName": "then",
      "example": [{
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
      }]
    },
    "error": {
      "example": undefined
    }
  },
  "sync": false,
  "cacheable": false,
  "defaultExit": undefined,
  "fn": function(inputs, exits, env) {
    env.sails.models.user.destroy(inputs.criteria, env.sails.util.omit(env.sails.util.objCompact(inputs), 'criteria')).exec(function(err, records) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(records);
    });
  },
  "identity": "destroy_user"
};