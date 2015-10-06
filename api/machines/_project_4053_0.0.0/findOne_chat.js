module.exports = {
  "inputs": {
    "criteria": {
      "friendlyName": "criteria",
      "typeclass": "dictionary",
      "description": "Waterline search criteria to use in retrieving Chat instances"
    }
  },
  "exits": {
    "success": {
      "friendlyName": "then",
      "example": {
        "message": "hola esto",
        "room_id": 23,
        "user_id": 23,
        "id": 123,
        "createdAt": "2015-10-06T18:06:46.700Z",
        "updatedAt": "2015-10-06T18:06:46.700Z"
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
    env.sails.models.chat.findOne(inputs.criteria, env.sails.util.omit(env.sails.util.objCompact(inputs), 'criteria')).exec(function(err, record) {
      if (err) {
        return exits.error(err);
      }
      if (!record) {
        return exits.notFound();
      }
      return exits.success(record);
    });
  },
  "identity": "findOne_chat"
};