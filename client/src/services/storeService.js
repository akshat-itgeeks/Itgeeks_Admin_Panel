import http from "../http-common";

class storeService {
    getStoreById = (Id) => {
        return console.log('HI')
        // return http.post(`/store/${Id}`)
    }
    updateStoreById = (body, Id) => {
        return console.log("Updating . .")
    }
    addStore = (data) => {
        return http.post('/store',data)
    }
    getStoreList = (body) => {
        return http.post('/store/list',body)
    }
}

export default new storeService;