import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';

export default defineComponent({
    name: 'AppHeader',
    components: { RouterLink },
    template: /* html */ `
    <header class="bg-body border-bottom"> <!-- sticky-top -->
        <div class="d-flex align-items-center justify-content-between px-3 px-lg-4 py-2">

            <!-- Mobile menu toggle -->
            <button type="button" class="btn btn-link text-body d-lg-none p-0 me-3" data-toggle="sidebar"
                aria-label="Toggle sidebar">
                <i class="bi bi-list fs-4"></i>
            </button>

            <!-- Search -->
            <div class="flex-grow-1 me-3" style="max-width: 400px;">
                <div class="input-group">
                    <span class="input-group-text bg-transparent border-end-0">
                        <i class="bi bi-search"></i>
                    </span>
                    <input type="search" class="form-control border-start-0" placeholder="Поиск...">
                </div>
            </div>

            <!-- Right side items -->
            <div class="d-flex align-items-center gap-2">

                <!-- Color switcher (demo mode only) -->
                <div class="dropdown color-switcher-dropdown">
                    <button type="button" class="btn btn-link text-body p-2" data-bs-toggle="dropdown"
                        aria-expanded="false" title="Изменить цвет">
                        <i class="bi bi-palette"></i>
                    </button>
                    <div class="dropdown-menu dropdown-menu-end p-3" style="min-width: 200px;">
                        <div class="small fw-medium mb-2">Primary Color</div>
                        <div class="d-flex flex-wrap gap-2" id="colorSwitcher">
                            <button type="button" class="btn p-0 border-2 rounded-circle color-swatch active"
                                data-color="#4f46e5" style="width: 28px; height: 28px; background: #4f46e5;"
                                title="Indigo"></button>
                            <button type="button" class="btn p-0 border-2 rounded-circle color-swatch"
                                data-color="#0d9488" style="width: 28px; height: 28px; background: #0d9488;"
                                title="Teal"></button>
                            <button type="button" class="btn p-0 border-2 rounded-circle color-swatch"
                                data-color="#e11d48" style="width: 28px; height: 28px; background: #e11d48;"
                                title="Rose"></button>
                            <button type="button" class="btn p-0 border-2 rounded-circle color-swatch"
                                data-color="#059669" style="width: 28px; height: 28px; background: #059669;"
                                title="Emerald"></button>
                            <button type="button" class="btn p-0 border-2 rounded-circle color-swatch"
                                data-color="#ea580c" style="width: 28px; height: 28px; background: #ea580c;"
                                title="Orange"></button>
                            <button type="button" class="btn p-0 border-2 rounded-circle color-swatch"
                                data-color="#7c3aed" style="width: 28px; height: 28px; background: #7c3aed;"
                                title="Violet"></button>
                            <button type="button" class="btn p-0 border-2 rounded-circle color-swatch"
                                data-color="#2563eb" style="width: 28px; height: 28px; background: #2563eb;"
                                title="Blue"></button>
                            <button type="button" class="btn p-0 border-2 rounded-circle color-swatch"
                                data-color="#475569" style="width: 28px; height: 28px; background: #475569;"
                                title="Slate"></button>
            
                        </div>
                    </div>
                </div>

                <!-- Theme toggle -->
                <button type="button" class="btn btn-link text-body p-2" data-toggle="theme"
                    data-bs-toggle="tooltip" data-bs-placement="bottom" title="Переключить тему">
                    <i class="bi bi-moon-fill"></i>
                </button>

                <!-- Notifications -->
                <div class="dropdown">
                    <button type="button" class="btn btn-link text-body p-2 position-relative"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="bi bi-bell"></i>
                        <span
                            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                            style="font-size: 0.65rem;">
                            3
                        </span>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end" style="min-width: 300px;">
                        <li>
                            <h6 class="dropdown-header">Уведомления</h6>
                        </li>
                        <li><hr class="dropdown-divider"></li>
                        <li>
                            <a class="dropdown-item d-flex gap-2 py-2" href="#">
                                <i class="bi bi-person-plus text-primary"></i>
                                <div>
                                    <div class="fw-medium">New user registered</div>
                                    <small class="text-body-secondary">2 minutes ago</small>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a class="dropdown-item d-flex gap-2 py-2" href="#">
                                <i class="bi bi-cart-check text-success"></i>
                                <div>
                                    <div class="fw-medium">New order placed</div>
                                    <small class="text-body-secondary">15 minutes ago</small>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a class="dropdown-item d-flex gap-2 py-2" href="#">
                                <i class="bi bi-exclamation-triangle text-warning"></i>
                                <div>
                                    <div class="fw-medium">Server load high</div>
                                    <small class="text-body-secondary">1 hour ago</small>
                                </div>
                            </a>
                        </li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item text-center" href="#">Показать все уведомления</a></li>
                    </ul>
                </div>

                <!-- Profile dropdown -->
                <div class="dropdown">
                    <button type="button" class="btn btn-link p-0" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <div class="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style="width: 36px; height: 36px;">
                            <i class="bi bi-person-fill"></i>
                        </div>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li><a class="dropdown-item" href="#"><i class="bi bi-person me-2"></i>Профиль</a></li>
                        <li><a class="dropdown-item" href="#"><i class="bi bi-gear me-2"></i>Настройки</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="./pages/login.html"><i class="bi bi-box-arrow-right me-2"></i>Выход</a></li>
                    </ul>
                </div>

            </div>
        </div>
    </header>
    `
});