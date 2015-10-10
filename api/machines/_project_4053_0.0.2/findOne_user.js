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
    },
    "notFound": {
      "void": true
    }
  },
  "sync": false,
  "cacheable": false,
  "defaultExit": undefined,
  "fn": function(inputs, exits, env) {
    env.sails.models.user.findOne(inputs.criteria, env.sails.util.omit(env.sails.util.objCompact(inputs), 'criteria')).exec(function(err, record) {
      if (err) {
        return exits.error(err);
      }
      if (!record) {
        return exits.notFound();
      }
      return exits.success(record);
    });
  },
  "identity": "findOne_user"
};