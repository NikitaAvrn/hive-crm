import { defineStore } from 'pinia';
import { apiRequest } from '../client.js';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        error: null,
        isLogin: false,
        isRegister: false
    }),

    getters: {
    },

    actions: {
        async register(registerForm) {
            console.log(registerForm);

            try {
                isRegister = await apiRequest('/account/register', { method: 'POST', body: registerForm });
                console.log(isRegister);

            } catch (e) {
                this.error = e.message
            }
        }
    }
});