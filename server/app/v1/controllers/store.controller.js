const service = require("../services/store.service.js");
const { sendResponse } = require("../utils/sendResponse.js");
const { SuccessMessage, ErrorMessage } = require("../constants/messages.js");
const statusCode = require("../constants/statusCodes.js");

// add store controller
exports.addStore = async (req, res) => {
    console.info('***************************************************Add Store Api************************************************');
    try {
        const details = req.body;
        // append createdAt 
        details.createdBy = req.currUser.id;
        // check store name already exist 
        const exist = await service.storeByName(details.name);
        if (exist) {
            return sendResponse(res, statusCode.BAD_REQUEST, false, `Store ${ErrorMessage.ALREADY_EXIST}`);
        }
        // check store valid or not 
        const validStore = await service.validStore(details);
        if (!validStore) {
            return sendResponse(res, statusCode.BAD_REQUEST, false, `Invalid Store.`);
        }
        // add new store
        const result = await service.addStore(details);
        return sendResponse(res, statusCode.OK, true, `Store ${SuccessMessage.CREATED}`, result);
    } catch (error) {
        console.error('Error in add store api : ', error);
        return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR, error?.errors);
    }
};

// store list controller
exports.storeList = async (req, res) => {
    console.info('***************************************************Store List Api************************************************');
    try {
        const params = req.body;
        const result = await service.storeList(params);
        return sendResponse(res, statusCode.OK, true, `Store ${SuccessMessage.LIST_FETCH}`, result);
    } catch (error) {
        console.error('Error in store list api : ', error);
        return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR, error?.errors);
    }
};

// store details by id controller
exports.storeById = async (req, res) => {
    console.info('***************************************************Store By Id Api************************************************');
    try {
        const id = req.params.id;
        // check updated store exist or not
        const result = await service.storeById(id);
        if (!result) {
            return sendResponse(res, statusCode.NOT_FOUND, false, `Store ${ErrorMessage.NOT_FOUND}`);
        }
        return sendResponse(res, statusCode.OK, true, `Store ${SuccessMessage.FETCH}`, result);
    } catch (error) {
        console.error('Error in store by id api : ', error);
        return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR, error?.errors);
    }
};

// store details update by id controller
exports.storeUpdate = async (req, res) => {
    console.info('***************************************************Store Update By Id Api************************************************');
    try {
        const id = req.params.id;
        const details = req.body;
        // check store exist or not
        const exist = await service.storeById(id);
        if (!exist) {
            return sendResponse(res, statusCode.NOT_FOUND, false, `Store ${ErrorMessage.NOT_FOUND}`);
        }
        // check store valid or not 
        const validStore = await service.validStore(details);
        if (!validStore) {
            return sendResponse(res, statusCode.BAD_REQUEST, false, `Invalid Store.`);
        }
        await service.storeUpdate(details, id);
        return sendResponse(res, statusCode.OK, true, `Store ${SuccessMessage.UPDATE}`);
    } catch (error) {
        console.error('Error in store update by id api : ', error);
        return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR, error?.errors);
    }
};

// store delete by id controller
exports.storeDelete = async (req, res) => {
    console.info('***************************************************Store Update By Id Api************************************************');
    try {
        const id = req.params.id;
        const exist = await service.storeById(id);
        if (!exist) {
            return sendResponse(res, statusCode.NOT_FOUND, false, `Store ${ErrorMessage.NOT_FOUND}`);
        }
        await service.storeDelete(id);
        return sendResponse(res, statusCode.OK, true, `Store ${SuccessMessage.DELETE}`);
    } catch (error) {
        console.error('Error in store update by id api : ', error);
        return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR, error?.errors);
    }
};
