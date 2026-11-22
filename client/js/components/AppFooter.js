import { defineComponent } from 'vue';

export default defineComponent({
    name: 'AppFooter',
    template: /* html */ `
    <footer class="py-3 px-3 px-lg-4 border-top mt-auto">
        <div class="d-flex flex-wrap justify-content-between align-items-center gap-2">
            <div class="text-body-secondary small">
                &copy; 2026 Averyanov Nikita. All rights reserved.
            </div>
            <ul class="nav gap-3">
                <li class="nav-item"><a href="mailto:mel16bit@gmail.com" class="nav-link px-0 text-body-secondary small">Support</a>
                </li>
            </ul>
        </div>
    </footer>
    `
});