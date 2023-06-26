const bcrypt = require('bcrypt');

const hashPassword  = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

module.exports = { hashPassword };