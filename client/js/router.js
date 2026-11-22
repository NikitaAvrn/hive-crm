import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import { APP_CONFIG } from './config.js';
import Tasks from './views/Tasks.js';
import Default from './layouts/Default.js';
import Empty from './layouts/Empty.js';
import Login from './views/Login.js';
import Register from './views/Register.js';

const routes = [
    {
        path: '/',
        component: Default,
        children: [
            {
                path: '',
                name: 'Today',
                component: Tasks,
                meta: { title: 'Сегодня' }
            },
            {
                path: 'tasks',
                name: 'Tasks',
                component: Tasks,
                meta: { title: 'Задачи' }
            },
        ]
    },
    {
        path: '/auth/login',
        name: 'Login',
        component: Login,
        meta: { title: 'Авторизация' }
    },
    {
        path: '/auth/register',
        name: 'Register',
        component: Register,
        meta: { title: 'Регистрация' }
    }

];

export const router = createRouter({
    history: createWebHashHistory(), //createWebHistory(),
    routes
});

router.afterEach((to) => {
    document.title = to.meta.title
        ? `${to.meta.title} — ${APP_CONFIG.appName}`
        : APP_CONFIG.appName;
});