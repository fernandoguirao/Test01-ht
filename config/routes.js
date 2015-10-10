module.exports.routes = {
  "get /user/fb-login": {
    "target": "UserController.fblogin"
  },
  "get /": {
    "target": "Home$Controller.find"
  },
  "post /user/new": {
    "target": "UserController.new"
  },
  "post /user/login": {
    "target": "UserController.login"
  },
  "get /user": {
    "target": "UserController.find"
  },
  "get /user/unlogged": {
    "target": "UserController.unlogged"
  },
  "post /room/join": {
    "target": "RoomController.join"
  },
  "post /room": {
    "target": "RoomController.create"
  },
  "get /hello": {
    "target": "HelloController.find"
  },
  "post /message": {
    "target": "MessageController.create"
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