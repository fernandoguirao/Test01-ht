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
      "example": {
        "hash": "asdasd2",
        "user02_id": 1,
        "user01_id": 23,
        "id": 123,
        "createdAt": "2015-10-06T10:56:15.940Z",
        "updatedAt": "2015-10-06T10:56:15.940Z"
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
    env.sails.models.room.findOne(inputs.criteria, env.sails.util.omit(env.sails.util.objCompact(inputs), 'criteria')).exec(function(err, record) {
      if (err) {
        return exits.error(err);
      }
      if (!record) {
        return exits.notFound();
      }
      return exits.success(record);
    });
  },
  "identity": "findOne_chatrooms"
};