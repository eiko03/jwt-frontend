import axios from 'axios';

const appClient = axios.create({
  baseURL: process.env.VUE_APP_BASE_API_URL,
});
// eslint-disable-next-line no-unused-vars
let header = {
  headers: {
    Authorization: localStorage.getItem("jwt"),
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

class AuthService {
  login(payload) {
    let response = appClient.post("auth/login/", payload);
    localStorage.setItem("jwt", response?.data?.access_token);
    return response;
  }

  logout() {
    localStorage.removeItem('user');
    let response= appClient.post("auth/logout/", header);
    localStorage.removeItem("jwt");
    return response;
  }

  register(payload) {
    return appClient.post("auth/register/", payload);
  }
}

export default new AuthService();
