module.exports = {
  "inputs": {
    "criteria": {
      "friendlyName": "criteria",
      "typeclass": "dictionary",
      "description": "Waterline search criteria to use in retrieving Room instances"
    }
  },
  "exits": {
    "success": {
      "friendlyName": "then",
      "example": [{
        "hash": "asdasd2",
        "user02_id": 1,
        "user01_id": 23,
        "id": 123,
        "createdAt": "2015-10-06T10:56:15.940Z",
        "updatedAt": "2015-10-06T10:56:15.940Z"
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
    env.sails.models.room.destroy(inputs.criteria, env.sails.util.omit(env.sails.util.objCompact(inputs), 'criteria')).exec(function(err, records) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(records);
    });
  },
  "identity": "destroy_chatrooms"
};