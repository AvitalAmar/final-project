var userTable = require('../models/user');

const getAllUsers = (req, res) => {
    userTable.find({role: "user"}).then((result, err) => {
        res.json(result);
    });
};
  
module.exports = {
    getAllUsers,
};