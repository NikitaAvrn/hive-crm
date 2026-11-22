export const APP_CONFIG = {
    appName: 'Hive',
    version: '0.0.1'
}

//export const API_BASE_URL = 'http://localhost:9080/hive';
export const API_BASE_URL = '/api';

export const MENU_ITEMS = [
    {
        title: 'Работа',
        items: [
            {
                title: 'Задачи',
                icon: 'bi bi-check2-square',
                badge: '12',
                to: '/tasks',
                route: { name: 'Home' }
            },
            {
                title: 'Заметки',
                icon: 'bi bi-journals',
                badge: '',
                to: '/notes',
                route: {}
            },
            {
                title: 'Календарь',
                icon: 'bi bi-calendar2-week',
                badge: '6',
                to: '/calendar',
                route: {}
            },
            {
                title: 'Чат',
                icon: 'bi bi-chat-right-dots',
                badge: '4',
                to: '/chat',
                route: {}
            },
        ]
    },
    {
        title: 'Финансы',
        items: [
            {
                title: 'Счета',
                icon: 'bi bi-credit-card',
                badge: '',
                to: '/bills',
                route: {}
            },
            {
                title: 'План / Факт',
                icon: 'bi bi-bar-chart-line',
                badge: '',
                to: '/plan-fact',
                route: {}
            },
            {
                title: 'Прогноз баланса',
                icon: 'bi bi-graph-up',
                badge: '',
                to: '/balance',
                route: {}
            },
            {
                title: 'Кредиты',
                icon: '',
                badge: '',
                to: '/credit',
                route: {}
            },
        ]
    },
    {
        title: 'Ещё',
        items: [
            {
                title: 'Файлы',
                icon: 'bi bi-files',
                badge: '',
                to: '/files',
                route: {}
            },
            {
                title: 'Настройки',
                icon: 'bi bi-gear',
                badge: '',
                to: '/settings',
                route: {}
            },
            {
                title: 'Login',
                icon: 'bi bi-box-arrow-in-right',
                badge: '',
                to: '/auth/login',
                route: { name: 'Login' }
            }
        ]
    },
]