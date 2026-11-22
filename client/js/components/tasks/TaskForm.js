import { defineComponent } from 'vue';
import { STATUS_META, PRIORITY_META } from '../../constants/task.js';
import { metaToOptions } from '../../utils/meta.js';

export default defineComponent({
    name: 'TaskForm',
    props: {
        task: { type: Object, default: null },
        users: { type: Array, default: () => [] },
        parentTasks: { type: Array, default: () => [] }
    },
    emits: ['submit', 'cancel'],
    computed: {
        statusOptions() {
            return metaToOptions(STATUS_META);
        },
        priorityOptions() {
            return metaToOptions(PRIORITY_META);
        },
        isEdit() {
            return !!this.task && !!this.task.id;
        },
        parentOptions() {
            return this.parentTasks.filter(p => !this.task || p.id !== this.task.id);
        }
    },
    data() {
        const t = this.task || {};
        return {
            form: {
                title: t.title || '',
                description: t.description || '',
                status: t.status || 'todo',
                priority: t.priority || 'medium',
                dueDate: t.dueDate || '',
                assigneeId: t.assignee ? t.assignee.id : null,
                parentId: t.parentId ?? null,
                tags: Array.isArray(t.tags) ? [...t.tags] : [],
                comment: t.comment || ''
            },
            tagsInput: Array.isArray(t.tags) ? t.tags.join(', ') : '',
            errors: {}
        };
    },
    methods: {
        validate() {
            const e = {};
            if (!this.form.title.trim()) e.title = 'Введите заголовок';
            if (!this.form.dueDate) e.dueDate = 'Укажите срок';
            this.errors = e;
            return Object.keys(e).length === 0;
        },
        onSubmit() {
            if (!this.validate()) return;
            const tags = this.tagsInput
                .split(',')
                .map(s => s.trim())
                .filter(Boolean);

            const assignee = this.users.find(u => u.id === Number(this.form.assigneeId)) || null;

            const payload = {
                title: this.form.title.trim(),
                description: this.form.description.trim(),
                status: this.form.status,
                priority: this.form.priority,
                dueDate: this.form.dueDate,
                assignee: assignee,
                parentId: this.form.parentId ? Number(this.form.parentId) : null,
                tags: tags,
                comment: this.form.comment.trim()
            }

            if (this.isEdit) payload.id = this.task.id;

            this.$emit('submit', payload);
        },
        onCancel() {
            this.$emit('cancel');
        }
    },
    template: /* html */ `
    <form @submit.prevent="onSubmit" novalidate>
        <div class="mb-3">
            <label class="form-label">Заголовок <span class="text-danger">*</span></label>
            <input
            v-model="form.title"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.title }"
            placeholder="Например: Записаться к стоматологу"
            />
            <div v-if="errors.title" class="invalid-feedback">{{ errors.title }}</div>
        </div>

        <div class="mb-3">
            <label class="form-label">Описание</label>
            <textarea
            v-model="form.description"
            class="form-control"
            rows="3"
            placeholder="Детали задачи"
            ></textarea>
        </div>

        <div class="row g-3">
            <div class="col-12 col-md-6">
                <label class="form-label">Статус</label>
                <select v-model="form.status" class="form-select">
                    <option v-for="opt in statusOptions" :key="opt.value" :value="opt.value">
                    {{ opt.label }}
                    </option>
                </select>
            </div>

            <div class="col-12 col-md-6">
                <label class="form-label">Приоритет</label>
                <select v-model="form.priority" class="form-select">
                    <option v-for="opt in priorityOptions" :key="opt.value" :value="opt.value">
                    {{ opt.label }}
                    </option>
                </select>
            </div>

            <div class="col-12 col-md-6">
                <label class="form-label">Срок <span class="text-danger">*</span></label>
                <input
                    v-model="form.dueDate"
                    type="date"
                    class="form-control"
                    :class="{ 'is-invalid': errors.dueDate }"
                />
                <div v-if="errors.dueDate" class="invalid-feedback">{{ errors.dueDate }}</div>
            </div>

            <div class="col-12 col-md-6">
                <label class="form-label">Исполнитель</label>
                <select v-model="form.assigneeId" class="form-select">
                    <option :value="null">— Не назначен —</option>
                    <option v-for="u in users" :key="u.id" :value="u.id">
                    {{ u.name }}
                    </option>
                </select>
            </div>

            <div class="col-12">
                <label class="form-label">Родительская задача</label>
                <select v-model="form.parentId" class="form-select">
                    <option :value="null">— Нет (самостоятельная) —</option>
                    <option v-for="p in parentOptions" :key="p.id" :value="p.id">
                    #{{ p.id }} — {{ p.title }}
                    </option>
                </select>
            </div>

            <div class="col-12">
                <label class="form-label">Теги</label>
                <input
                    v-model="tagsInput"
                    type="text"
                    class="form-control"
                    placeholder="через пробел: здоровье звонки"
                />
                <div class="form-text">Разделяйте теги пробелом</div>
            </div>

            <div class="col-12">
                <label class="form-label">Комментарий</label>
                <textarea
                    v-model="form.comment"
                    class="form-control"
                    rows="3"
                    placeholder="Заметки по задаче"
                ></textarea>
            </div>
        </div>
        <div class="d-flex justify-content-end gap-2 mt-4 modal-footer">
            <button type="submit" class="btn btn-outline-success"><i class="bi bi-floppy"></i> {{ isEdit ? 'Сохранить' : 'Создать' }}</button>
            <button type="button" class="btn btn-outline-secondary" @click="onCancel"><i class="bi bi-x-circle"></i> Отмена</button>
        </div>
      </form>
    `
});