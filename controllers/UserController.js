const userService = require('../services/userService');

// Register user 
exports.registerUser = (req, res) => {
    userService.registerUser(req.body).then((response) => {
        const {firstname, lastname, username, createdAt} = response;
        res.json({ data: {firstname, lastname, username, createdAt}, status: "ok" });
    }).catch((err) => {
        if(err.code === 11000) {
            res.status(500).json({status:'error',error: 'Username already in use'})
        }
        res.status(500).json({status:'error', error: err });
    })
}

// login user
exports.loginUser = (req, res) => {
    userService.loginUser(req.body).then((response) => {
        res.json({ token: response, status: "ok" });
    }).catch((err) => {
        res.status(500).json({ status:'error', error: err });
    })
}