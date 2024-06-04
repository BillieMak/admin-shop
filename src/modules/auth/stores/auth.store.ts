import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { AuthStatus, type User } from '../interfaces';
import { useLocalStorage } from '@vueuse/core';
import { checkAuthAction, registerAction, loginAction } from '../actions';

export const useAuthStore = defineStore('auth', () => {
  //authenticated , unAuthenticated, checking
  const authStatus = ref<AuthStatus>(AuthStatus.Checking);
  const user = ref<User | undefined>();
  const token = ref(useLocalStorage('token', ''));

  const login = async (email: string, password: string) => {
    try {
      const loginRes = await loginAction(email, password);
      if (!loginRes.ok) return logout();
      user.value = loginRes.user;
      token.value = loginRes.token;
      authStatus.value = AuthStatus.Authenticated;
      return true;
    } catch (error) {
      //   console.log(error);
      return logout();
    }
  };

  const logout = () => {
    authStatus.value = AuthStatus.Unauthenticated;
    user.value = undefined;
    token.value = '';
    return false;
  };

  const register = async (fullName: string, email: string, password: string) => {
    try {
      const registerRes = await registerAction(fullName, email, password);
      if (!registerRes.ok) return logout();
      user.value = registerRes.user;
      token.value = registerRes.token;
      authStatus.value = AuthStatus.Authenticated;
      return true;
    } catch (error) {
      return logout();
    }
  };

  const checkAuthStatus = async (): Promise<boolean> => {
    try {
      const statusRes = await checkAuthAction();
      if (!statusRes.ok) {
        return logout();
      }
      user.value = statusRes.user;
      token.value = statusRes.token;
      authStatus.value = AuthStatus.Authenticated;
      return true;
    } catch (error) {
      logout();
      return false;
    }
  };

  return {
    user,
    token,
    authStatus,

    // getters

    isChecking: computed(() => authStatus.value === AuthStatus.Checking),
    isAuthenticated: computed(() => authStatus.value === AuthStatus.Authenticated),

    // getter to check is admin
    isAdmin: computed(() => user.value?.roles.includes('admin')),
    username: computed(() => user.value?.fullName),

    // actions
    login,
    logout,
    register,
    checkAuthStatus,
  };
});
