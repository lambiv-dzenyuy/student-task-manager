import { defineStore } from 'pinia';
import { Student } from 'src/components/models';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    /** @type {{ text: st} */
    auth: {
      token: '',
      authUser: null as Student | null
    }
  }),

  getters: {
    isAuthenticated(state) {
      return state.auth.token.length > 0;
    },
    authUser(state) {
      return state.auth.authUser;
    },
    token(state) {
      return state.auth.token;
    }
  },

  actions: {
    set(token: string, user: Student) {
      this.auth = { token: token, authUser: user };
    }
  }
});
