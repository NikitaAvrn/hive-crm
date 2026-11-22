import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
import { APP_CONFIG, MENU_ITEMS } from '../config.js';

export default defineComponent({
    name: 'AppSidebar',
    components: { RouterLink },
    setup() {
        return { config: APP_CONFIG, menu: MENU_ITEMS };
    },
    template: /* html */ `
        <aside class="sidebar bg-body-tertiary border-end z-1">
            <div class="d-flex flex-column h-100">

                <div class="d-flex align-items-center justify-content-between p-3 border-bottom">
                    <a href="./" class="d-flex align-items-center text-decoration-none">
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M3 11.5 12 4l9 7.5"/><path d="M5 10.5V20h14v-9.5"/><path d="M9.5 20v-5h5v5"/>
                        </svg>
                        <span class="fs-4 fw-semibold text-primary ms-2">{{ config.appName }}</span>
                    </a>
                    <button type="button" class="btn btn-link text-body d-lg-none p-0" data-dismiss="sidebar"
                        aria-label="Close sidebar">
                        <i class="bi bi-x-lg"></i>
                    </button>
                </div>

                <nav class="sidebar-nav flex-grow-1 p-3">
                    <ul class="nav flex-column gap-1">

                        <template
                            v-for="sector in menu"
                            :key="sector.title"
                        >
                            <li class="nav-header">{{ sector.title }}</li>

                            <li
                                v-for="item in sector.items"
                                :key="item.title"
                                class="nav-item">
                                <RouterLink class="nav-link d-flex" activeClass="active" :to="item.to">
                                    <i v-if="item.icon" :class="item.icon"></i>
                                    <span>{{ item.title }}</span>
                                    <span v-if="item.badge" class="badge bg-secondary ms-auto">{{ item.badge }}</span>
                                </RouterLink>
                            </li>
                        </template>

                    </ul>
                </nav>

                <div class="p-3 border-top">
                    <div class="d-flex align-items-center gap-3">
                        <div class="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                            style="width: 40px; height: 40px;">
                            <i class="bi bi-person-fill"></i>
                        </div>
                        <div class="flex-grow-1 min-w-0">
                            <div class="fw-medium text-truncate">Admin User</div>
                            <div class="small text-body-secondary text-truncate">admin@dashio.com</div>
                        </div>
                    </div>
                </div>

            </div>
        </aside>
    `
});