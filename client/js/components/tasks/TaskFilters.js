import { defineComponent } from 'vue';
import { STATUS_META, PRIORITY_META } from '../../constants/task.js';
import { metaToOptions } from '../../utils/meta.js';

export default defineComponent({
    name: 'TaskFilters',
    data() {
        return {
            find: '',
            status: '',
            priority: '',
            assignee: ''
        }
    },
    props: {
        users: { type: Array, default: () => [] },
        modelValue: { type: Object, default: {} }
    },
    emits: ['update:modelValue'],
    methods: {
        onChangeFilters() {
            this.$emit('update:modelValue', {
                find: this.find,
                status: this.status,
                priority: this.priority,
                assignee: this.assignee
            })
        },
        reset() {
            this.find = '';
            this.status = '';
            this.priority = '';
            this.assignee = '';
            this.onChangeFilters();
        }
    },
    computed: {
        statusOptions() {
            return metaToOptions(STATUS_META);
        },
        priorityOptions() {
            return metaToOptions(PRIORITY_META);
        },
    },
    template: /* html */ `
    <div class="row g-2 align-items-center">
        <div class="col-12 col-md-4">
            <div class="input-group">
                <span class="input-group-text bg-transparent border-end-0"><i class="bi bi-search"></i></span>
                <input type="search" class="form-control border-start-0" v-model="find" @input="onChangeFilters" placeholder="Поиск по задачам..." >
            </div>
        </div>

        <div class="col-6 col-md-2">
            <select class="form-select" v-model="status" @change="onChangeFilters">
                <option value="">Все статусы</option>
                <option
                    v-for="opt in statusOptions"
                    :key="opt.value"
                    :value="opt.value"
                >{{ opt.label }}</option>
            </select>
        </div>

        <div class="col-6 col-md-2">
            <select class="form-select" v-model="priority" @change="onChangeFilters">
                <option value="">Все приоритеты</option>
                <option
                    v-for="opt in priorityOptions"
                    :key="opt.value"
                    :value="opt.value"
                >{{ opt.label }}</option>
            </select>
        </div>

        <div class="col-6 col-md-2">
            <select class="form-select" v-model="assignee" @change="onChangeFilters">
                <option value="">Все исполнители</option>
                <option>Анна</option>
                <option>Дмитрий</option>
            </select>
        </div>

        <div class="col-6 col-md-2 text-md-end">
            <button type="button" class="btn btn-outline-secondary w-100 w-md-auto" @click="reset"><i class="bi bi-x-lg me-1"></i>Сбросить</button>
        </div>
    </div>
    `
});