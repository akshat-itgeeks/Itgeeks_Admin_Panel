const service = require("../services/auth.service");
const { sendResponse } = require("../utils/sendResponse.js");
const { SuccessMessage, ErrorMessage } = require("../constants/messages.js");
const statusCode = require("../constants/statusCodes.js");

// admin login 
exports.login = async (req, res) => {
    console.info('***************************************************Login Api************************************************');
    try {
        const details = req.body;
        const result = await service.login(details);
        if (!result) {
            return sendResponse(res, statusCode.BAD_REQUEST, false, ErrorMessage.INVALID_CREDENTIAL);
        }
        return sendResponse(res, statusCode.OK, true, SuccessMessage.LOGIN, result);
    } catch (error) {
        console.error('Error in login api : ', error);
        return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, error?.Error);
    }
};
