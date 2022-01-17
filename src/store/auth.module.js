import AuthService from '../services/auth.service';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,

  state: {
    initialState,
    user: null,
    status:{"loggedIn":false},
    isLoggedIn:false,
    jwt:""
  },

  getters: {
    get_self: (state) => {
      return state.user;
    },
    get_status: (state) => {
      return state.status.loggedIn;
    },
    jwt: (state) => {
      return state.jwt;
    },
  },





  actions: {
    login({ commit }, user) {
      return AuthService.login(user).then(
        res => {
          commit('loginSuccess',res);
          return Promise.resolve( res);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    self({ commit }) {
      return AuthService.me().then(
        res => {
          commit('self',res.data);
          return Promise.resolve( res.data);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
    },
    register({ commit }, user) {
      return AuthService.register(user).then(
        response => {
          commit('registerSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
    }
  },


  mutations: {
    loginSuccess(state,res) {
      state.status.loggedIn = true;
      state.jwt=res;
    },
    self(state, user) {
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    }
  }
};
