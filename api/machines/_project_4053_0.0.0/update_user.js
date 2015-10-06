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
        "id": 123,
        "createdAt": "2015-10-06T21:29:57.663Z",
        "updatedAt": "2015-10-06T21:29:57.663Z"
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
    env.sails.models.user.update(inputs.criteria, env.sails.util.omit(env.sails.util.objCompact(inputs), 'criteria')).exec(function(err, records) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(records);
    });
  },
  "identity": "update_user"
};