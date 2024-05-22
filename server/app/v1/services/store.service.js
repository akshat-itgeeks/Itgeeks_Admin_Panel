const axios = require('axios');

const db = require("../models/index.js");
const Stores = db.stores;


// get store details by name  
exports.storeByName = async (name) => {
    const storeDetails = await Stores.findOne({ where: { name } });
    return storeDetails;
}

// add new store 
exports.addStore = async (details) => {
    const storeDetails = await Stores.create(details);
    return storeDetails;
}

// return store list
exports.storeList = async (params) => {
    const storeList = await Stores.findAndCountAll({
        limit: params.limit,
        offset: params.offset
    });
    return storeList;
}

// return store details by id
exports.storeById = async (id) => {
    const storeDetail = await Stores.findOne({ where: { id } });
    return storeDetail;
}

// update store details by id
exports.storeUpdate = async (details, id) => {
    await Stores.update(details, { where: { id } });
    return true;
}

// delete store details by id
exports.storeDelete = async (id) => {
    await Stores.destroy({ where: { id } });
    return true;
}

// check given store is valid or not by graphql api 
exports.validStore = async (details) => {
    const data = JSON.stringify({
        query: `query { 
            shop { 
                name 
                currencyCode 
                checkoutApiSupported 
                taxesIncluded 
                resourceLimits 
                { 
                    maxProductVariants 
                }
                 } 
            }`,
        variables: {}
    });

    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://${details.name}/admin/api/2024-04/graphql.json`,
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': details.accessToken
        },
        data: data
    };

    try {
        const response = await axios.request(config);
        const storeDetails = JSON.stringify(response?.data);
        console.log('************************StoreDetails*************************', storeDetails);
        return true;
    } catch (err) {
        console.log('Error In Shop Details By Name Graphql', err.response?.data);
        return false;
    }
}