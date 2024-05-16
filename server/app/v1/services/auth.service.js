const { AdminDetails } = require("../constants/constants");
const { SuccessMessage, ErrorMessage } = require("../constants/messages.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const db = require("../models");
const Users = db.users;


// login service 
exports.login = async (details) => {
    // check email exist or not 
    const user = await Users.findOne({ where: { email: details.email } });
    if (!user) {
        return { status: false, message: `User ${ErrorMessage.NOT_FOUND}` };
    }
    // Compare password
    const isPasswordValid = await bcrypt.compare(details.password, user.password);
    if (!isPasswordValid) {
        return { status: false, message: `${ErrorMessage.INVALID_CREDENTIAL}` };
    }
    // create jwt token
    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET_KEY,
        { expiresIn: process.env.JWT_EXPIRE_TIME }
    );
    return { status: true, message: { accessToken: token } };
}

//  register service
exports.register = async (details) => {
    const userDetails = await Users.create(details);
    // remove password
    delete userDetails.dataValues.password;
    return userDetails;
}  