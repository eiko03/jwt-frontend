import axios from 'axios';
import { useStore } from "vuex";

const store = useStore();

const appClient = axios.create({
  baseURL: process.env.VUE_APP_BASE_API_URL,
});
// eslint-disable-next-line no-unused-vars
let header = {
  headers: {
    Authorization: store.getters["auth/jwt"],
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

class AuthService {
  login(payload) {
    return appClient.post( "auth/login", payload)
        .then( res =>{
      // console.log(res);
      localStorage.setItem("jwt", res?.data?.access_token);
      });
  }
  me() {
    return appClient.get( "auth/me", header);
  }

  logout() {
    localStorage.removeItem('user');
    return appClient.post("auth/logout",[], header).then( () =>
      localStorage.removeItem("jwt")
    );
  }

  register(payload) {
    return appClient.post("auth/register", payload);
  }
}

export default new AuthService();
