import http from "../http-common";

class storeService {
    getStoreById = (Id) => {
        return console.log('HI')
        // return http.post(`/store/${Id}`)
    }
    updateStoreById = (body, Id) => {
        return console.log("Updating . .")
    }
    addStore= (data)=>
        {
            return console.log('Creating . .')
        }
}

export default new storeService;