module.exports.routes = {
  "post /user/login": {
    "target": "UserController.login"
  },
  "get /user": {
    "target": "UserController.find"
  },
  "post /room": {
    "target": "RoomController.create"
  },
  "post /room/join": {
    "target": "RoomController.join"
  },
  "post /user/new": {
    "target": "UserController.new"
  },
  "get /": {
    "target": "Home$Controller.find"
  },
  "post /message": {
    "target": "MessageController.create"
  },
  "get /user/unlogged": {
    "target": "UserController.unlogged"
  },
  "get /user/:id": {
    "target": "UserController.$id",
    "skipAssets": true
  },
  "post /room/:hash": {
    "target": "RoomController.post_$hash",
    "skipAssets": true
  },
  "get /room/:hash": {
    "target": "RoomController.get_$hash",
    "skipAssets": true
  }
};