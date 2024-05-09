const schema = require("./schema/auth.schema.js");
const statusCode = require("../constants/statusCodes.js");

exports.login = async (req, res, next) => {
    const { error } = schema.loginSchema.validate(req.body);
    if (error) {
        res.status(statusCode.BAD_REQUEST).json({ error: error.details[0].message });
    } else {
        next();
    }
};
