import http from "../http-common";

class TutorialDataService {
  getAll() {
    return http.get("/tutorials");
  }
  login(data)
  {
    return http.post('/auth/login',data)
  }
  resetPassword(data)
  {
    return http.post('/auth/reset-password',data)
  }
  forgotPassword(data,email)
  {
    console.log(email)
    return http.post(`/auth/forgot-password?email=${email}`,data)
  }

}

export default new TutorialDataService();