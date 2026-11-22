import { mapActions } from 'pinia';
import { defineComponent } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import { useAuthStore } from '../store/index.js ';
import { APP_CONFIG } from '../config.js';

export default defineComponent({
    name: 'Register',
    components: { RouterLink },
    data() {
        return {
            form: {
                email: '',
                password: '',
                checkPassword: ''
            },
            errors: {},
            isSubmitting: false,
            passwordInput: 'password',
            checkPasswordInput: 'password'
        }
    },
    methods: {
        ...mapActions(useAuthStore, ['register']),
        async onSubmit() {
            if (!this.validate()) return;
            if (this.isSubmitting) return;

            this.isSubmitting = true;
            try {
                console.log('request');

                await this.register({ email: this.form.email, password: this.form.password });
            } catch (err) {
                this.errors.general = err.message;
                console.error(err);
            } finally {
                this.isSubmitting = false;
            }
        },
        validate() {
            const e = {};

            if (this.form.password !== this.form.checkPassword) {
                e.checkPassword = 'Пароли не совпадают';
            }

            this.errors = e;

            return Object.keys(e).length === 0;
        },
        showPassword(e) {
            if (e.type === 'mousedown')
                this.passwordInput = 'text';
            if (e.type === 'mouseup')
                this.passwordInput = 'password';
        },
        showCheckPassword(e) {
            if (e.type === 'mousedown')
                this.checkPasswordInput = 'text';
            if (e.type === 'mouseup')
                this.checkPasswordInput = 'password';
        }
    },
    setup() {
        const router = useRouter();

        return { config: APP_CONFIG };
    },
    template: /* html */ `
    <div class="min-vh-100 d-flex align-items-center justify-content-center p-3">
        <div class="w-100" style="max-width: 400px;">
            <div class="text-center mb-4">
                <a href="../" class="d-inline-flex align-items-center text-decoration-none mb-3">
                    <span class="fs-3 fw-bold text-primary">{{ config.appName }}</span> <small>{{ config.version }}</small>
                </a>
                <h1 class="h4 mb-1">Добро пожаловать</h1>
                <p class="text-body-secondary">Создайте учетную запись, чтобы продолжить.</p>
            </div>
            <div class="card shadow-sm">
                <div class="card-body p-4">
                    <form @submit.prevent="onSubmit">

                        <div class="mb-3">
                            <label for="email" class="form-label">Электронная почта</label>
                            <div class="input-group">
                                <span class="input-group-text"><i class="bi bi-envelope"></i></span>
                                <input type="email" class="form-control" id="email" v-model="form.email" placeholder="name@example.ru" required>
                            </div>
                            <span class="text-danger" v-if="errors?.title"><small>{{ errors.title }}</small></span>
                        </div>
                        
                        <div class="mb-3">
                            <div class="d-flex justify-content-between align-items-center mb-1">
                                <label for="password" class="form-label mb-0">Пароль</label>
                            </div>
                            <div class="input-group">
                                <span class="input-group-text"><i class="bi bi-lock"></i></span>
                                <input :type="passwordInput" class="form-control" id="password" v-model="form.password" placeholder="Введите пароль" required>
                                <button class="btn btn-outline-secondary" type="button" @mousedown="showPassword" @mouseup="showPassword"><i class="bi bi-eye"></i></button>
                            </div>
                            <span class="text-danger" v-if="errors?.password"><small>{{ errors.password }}</small></span>
                        </div>
                        
                        <div class="mb-3">
                            <div class="d-flex justify-content-between align-items-center mb-1">
                                <label for="checkpassword" class="form-label mb-0">Повторите пароль</label>
                            </div>
                            <div class="input-group">
                                <span class="input-group-text"><i class="bi bi-lock"></i></span>
                                <input :type="checkPasswordInput" class="form-control" id="checkpassword" v-model="form.checkPassword" placeholder="Повторите пароль" required>
                                <button class="btn btn-outline-secondary" type="button" @mousedown="showCheckPassword" @mouseup="showCheckPassword"><i class="bi bi-eye"></i></button>
                            </div>
                            <span class="text-danger" v-if="errors?.checkPassword"><small>{{ errors.checkPassword }}</small></span>
                        </div>
                        
                        <button type="submit" class="btn btn-primary w-100 mb-3" :disbled="isSubmitting">Зарегистрироваться</button>
                    </form>
                </div>
            </div>


            <p class="text-center mt-4 mb-0 text-body-secondary">
                У вас есть учетная запись? <RouterLink to="/auth/login" class="text-decoration-none">Войдите</RouterLink>
            </p>
            
            <div class="text-center mt-4">
                <button type="button" class="btn btn-link text-body-secondary p-0" data-toggle="theme"><i class="bi bi-moon-fill me-1"></i><small>Переключить тему</small></button>
            </div>
        </div>
    </div>
    `
});