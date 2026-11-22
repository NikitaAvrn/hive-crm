import { defineComponent } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { APP_CONFIG } from '../config.js';

export default defineComponent({
    name: 'Layout',
    components: { RouterLink, RouterView },
    setup() {
        return { config: APP_CONFIG };
    },
    template: /* html */`
    <div class="min-vh-100 d-flex align-items-center justify-content-center p-3">
        <div class="w-100" style="max-width: 400px;">
            
            <RouterView />
        
        </div>
    </div>
    `
});