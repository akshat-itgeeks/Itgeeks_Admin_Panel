import http from "../http-common";

class TutorialDataService {
  login(data)
  {
    return http.post('/auth/login',data)
  }
  resetPassword(data)
  {
    return http.post('/auth/reset-password',data)
  }
  forgotPassword(data,Id)
  {
    console.log(Id)
    return http.post(`/auth/forgot-password/${Id}`,data)
  }

}

export default new TutorialDataService();