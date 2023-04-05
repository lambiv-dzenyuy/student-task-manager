import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    auth: {
      token : '',
      userId: 1
    }
  }),

  getters: {
    isAuthenticated (state) {
      return state.auth.token.length > 0 ;
    },
    currentUserId(state){
      return state.auth.userId
    }
  },

  actions: {
    set (token: string, userId: number) {
      this.auth = {token : token, userId  : userId};
    }
  }
});
