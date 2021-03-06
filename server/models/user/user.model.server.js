var mongoose = require('mongoose');
var UserSchema = require('./user.schema.server');
var UserModel = mongoose.model("UserModel", UserSchema);

UserModel.findUserById = findUserById;
UserModel.createUser = createUser;
UserModel.findAllUsers = findAllUsers;
UserModel.findUserByCredentials = findUserByCredentials;
UserModel.findUserByUsername = findUserByUsername;
UserModel.findUserByFacebookId = findUserByFacebookId;
UserModel.updateUser = updateUser;
UserModel.deleteUser = deleteUser;

module.exports = UserModel;

function createUser(user) {
  user.roles = ['USER'];
  return UserModel.create(user);
}

function findAllUsers() {
  return UserModel.find();
}

function findUserById(userId) {
  return UserModel.findById(userId);
}

function findUserByCredentials(username, password) {
  return UserModel.findOne({username: username, password: password});
}

function findUserByUsername(username) {
  return UserModel.findOne({username: username});
}

function findUserByFacebookId(facebookId) {
  return UserModel.findOne({'facebook.id': facebookId});
}


function updateUser(userId, user) {
  return UserModel.update({_id: userId}, user);
}

function deleteUser(userId) {
  return UserModel.deleteOne({_id: userId});
}
