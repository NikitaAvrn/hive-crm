import { defineComponent } from 'vue';
import BadgeTaskStatus from '../badges/BadgeTaskStatus.js';
import BadgeTaskPriority from '../badges/BadgeTaskPriority.js';
import DueDate from '../badges/DueDate.js';
import { formatDateRu } from '../../utils/date.js';

export default defineComponent({
    name: 'TaskCards',
    components: { BadgeTaskPriority, BadgeTaskStatus, DueDate },
    props: ['tasks'],
    emits: ['open-edit'],
    methods: {
        openEdit(taskId) {
            this.$emit('open-edit', taskId);
        }
    },
    setup(props) {
        return { props, formatDateRu }
    },
    template: /* html */ `

    <div 
        v-for="task in tasks"
        :key="task.id"
        class="card h-100 stat-card my-2 bg-body-tertiary"
        @click="openEdit(task.id)"
    >
        <div class="card-body d-flex flex-column">

            <div class="d-flex justify-content-between align-items-start mb-2">
                <badge-task-status :status="task.status" />
                <badge-task-priority :priority="task.priority" />
            </div>

            <h6 class="card-title fw-bold mb-2">{{ task.title }}</h6>

            <p class="card-text text-muted small mb-3 text-truncate">
                {{ task.description }}
            </p>

            <div class="mt-auto d-flex justify-content-between align-items-center small text-muted">
                <span class="d-inline-flex align-items-center gap-1">
                    <i class="bi bi-person"></i>
                    {{ task.assignee.name }}
                </span>
                <span class="d-inline-flex align-items-center gap-1">
                    <due-date :due-date="task.dueDate" :status="task.status" :show-hint="false"/>
                </span>
            </div>

        </div>
    </div>
    `
});