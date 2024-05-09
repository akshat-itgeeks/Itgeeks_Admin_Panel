const { AdminDetails } = require("../constants/constants");

// login service 
exports.login = async (details) => {
    if (details.email === AdminDetails.email && details.password === AdminDetails.password) {
        return true;
    }
    return false;
}  