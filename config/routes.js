module.exports.routes = {
  "post /user/new": {
    "target": "UserController.new"
  },
  "post /message": {
    "target": "MessageController.create"
  },
  "post /room/join": {
    "target": "RoomController.join"
  },
  "post /room": {
    "target": "RoomController.create"
  },
  "get /": {
    "target": "Home$Controller.find"
  },
  "get /user": {
    "target": "UserController.find"
  },
  "post /user/login": {
    "target": "UserController.login"
  },
  "get /hello": {
    "target": "HelloController.find"
  },
  "get /room/:hash": {
    "target": "RoomController.get_$hash",
    "skipAssets": true
  },
  "post /room/:hash": {
    "target": "RoomController.post_$hash",
    "skipAssets": true
  }
};