import { createPinia } from 'pinia';

export const pinia = createPinia();

export { useTasksStore } from './tasks.js'
export { useAuthStore } from './auth.js';