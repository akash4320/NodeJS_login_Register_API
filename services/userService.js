const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userModel = require("../models/User");

const JWT_secret = '4vnlj542n3b32h32hjb4h324 3h4b32hj4bh32j4 3b4hj32bndo2'

// Register user and store data in DB
exports.registerUser = (registerInfo) => {
    return new Promise(async (resolve, reject) => {
        registerInfo.password = await bcrypt.hash(registerInfo.password, 10);
        userModel.create(registerInfo)
            .then((response) => resolve(response))
            .catch((err) => reject(err))
    });
};

// Check user exist in DB and create a JWT token and login the user
exports.loginUser = (loginInfo) => {
    return new Promise((resolve, reject) => {

        userModel.findOne({ "username": loginInfo.username })
            .then(async (user) => {
                if (user && await bcrypt.compare(loginInfo.password, user.password)) {
                    const token = jwt.sign({ id: user._id, name: user.firstname, username: user.username }, JWT_secret);
                    resolve(token)
                } else {
                    reject('username / password is wrong')
                }
            })
            .catch((err) => reject(err))
    });
};