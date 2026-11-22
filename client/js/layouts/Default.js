import { defineComponent } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import AppSidebar from '../components/AppSidebar.js';
import AppFooter from '../components/AppFooter.js';
import AppHeader from '../components/AppHeader.js';

export default defineComponent({
    name: 'Default',
    components: { RouterLink, RouterView, AppSidebar, AppFooter, AppHeader },
    computed: {
        pageTitle() {
            return this.$route.meta.title || 'Default page';
        },
        spaceTitle() {
            return this.$route.meta.space || 'Default space';
        }
    },
    template: /* html */`
    <div class="wrapper">
    
        <app-sidebar />

        <div class="main-content">

            <app-header />

            <!-- Page Content -->
            <main class="p-3 p-lg-4">

                <!-- Page Header -->
                <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
                    <div>
                        <h1 class="h3 mb-1">{{ pageTitle}} <small class="text-secondary">{{ spaceTitle }}</small></h1>
                        <!-- <nav aria-label="breadcrumb">
                            <ol class="breadcrumb mb-0">
                                <li class="breadcrumb-item"><a href="./">Home</a></li>
                                <li class="breadcrumb-item active" aria-current="page">Dashboard</li>
                            </ol>
                        </nav> -->
                    </div>
                    <!--<div class="d-flex gap-2">
                        <button type="button" class="btn btn-outline-secondary">
                            <i class="bi bi-download me-1"></i> Export
                        </button>
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addOrderModal">
                            <i class="bi bi-plus-lg me-1"></i> Add New
                        </button>
                    </div>-->
                </div>

                <RouterView />

            </main>

            <app-footer />

        </div>
    </div>
    `
});