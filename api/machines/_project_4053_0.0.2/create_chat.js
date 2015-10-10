module.exports = {
  "inputs": {
    "message": {
      "example": "hola esto",
      "friendlyName": "message",
      "required": true
    },
    "room_id": {
      "example": 23,
      "friendlyName": "room_id",
      "required": true
    },
    "user_id": {
      "example": 23,
      "friendlyName": "user_id",
      "required": true
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
    }
  },
  "sync": false,
  "cacheable": false,
  "defaultExit": undefined,
  "fn": function(inputs, exits, env) {
    env.sails.models.chat.create(env.sails.util.objCompact(inputs)).exec(function(err, records) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(records);
    });
  },
  "identity": "create_chat"
};