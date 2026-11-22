import { defineComponent } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import { APP_CONFIG } from '../config.js';

export default defineComponent({
    name: 'Login',
    components: { RouterLink },
    setup() {
        const router = useRouter();
        const goToHome = () => {
            router.push('/');
        };

        return { goToHome, config: APP_CONFIG };
    },
    template: /* html */ `
    <div class="min-vh-100 d-flex align-items-center justify-content-center p-3">
        <div class="w-100" style="max-width: 400px;">
    <div class="text-center mb-4">
        <a href="../" class="d-inline-flex align-items-center text-decoration-none mb-3">
        <span class="fs-3 fw-bold text-primary">{{ config.appName }}</span> <small>{{ config.version }}</small>
        </a>
        <h1 class="h4 mb-1">Добро пожаловать</h1>
        <p class="text-body-secondary">Войдите в свою учетную запись, чтобы продолжить.</p>
    </div>
    <div class="card shadow-sm">
        <div class="card-body p-4">
            <form>
                
                <div class="mb-3">
                    <label for="email" class="form-label">Электронная почта</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-envelope"></i></span>
                        <input type="email" class="form-control" id="email" placeholder="name@example.com" required>
                    </div>
                </div>
                
                <div class="mb-3">
                    <div class="d-flex justify-content-between align-items-center mb-1">
                        <label for="password" class="form-label mb-0">Пароль</label>
                        <a href="#" class="small text-decoration-none">Забыли пароль?</a>
                    </div>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-lock"></i></span>
                        <input type="password" class="form-control" id="password" placeholder="Введите пароль" required>
                        <button class="btn btn-outline-secondary" type="button" id="togglePassword"><i class="bi bi-eye"></i></button>
                    </div>
                </div>
                
                <div class="mb-4">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="rememberMe">
                        <label class="form-check-label" for="rememberMe">Запомнить меня</label>
                    </div>
                </div>
                
                <button type="button" class="btn btn-primary w-100 mb-3" @click="goToHome">Войти</button>
            </form>
        </div>
    </div>

    <p class="text-center mt-4 mb-0 text-body-secondary">
        У вас нет учетной записи? <RouterLink to="/auth/register" class="text-decoration-none">Зарегистрируйтесь</RouterLink>
    </p>
    
    <div class="text-center mt-4">
        <button type="button" class="btn btn-link text-body-secondary p-0" data-toggle="theme"><i class="bi bi-moon-fill me-1"></i><small>Переключить тему</small></button>
    </div>
    </div>
    </div>
    `
});