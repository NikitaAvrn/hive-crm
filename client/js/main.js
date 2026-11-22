import { createApp } from 'vue';
import { router } from './router.js';
import { pinia } from './store/index.js';

const App = {
    template: '<RouterView />'
};

const app = createApp(App);

app.use(router);
app.use(pinia);

app.mount('#app');