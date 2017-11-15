var mongoose = require('mongoose');
var UserModel = require('../model/userModel.js');

var Schema = mongoose.Schema;
var userSchema = new Schema({
    username: { type: String, unique: true },
    password: { type: String },
    token: String,
    admin: Boolean,
    weixin: {
        openid: String,
        unionid: String,
        nickname: String,
        gender: String,
        city: String,
        province: String,
        country: String,
        avatarurl: String,
        access_token: String,
        expires_in: Number,
        refresh_token: String,
    },
    created_at: Date,
    updated_at: Date
});
var User = mongoose.model('User', userSchema);
module.exports = User;