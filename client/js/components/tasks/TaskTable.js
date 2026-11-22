import { defineComponent } from 'vue';
import BadgeTaskStatus from '../badges/BadgeTaskStatus.js';
import BadgeTaskPriority from '../badges/BadgeTaskPriority.js';
import DueDate from '../badges/DueDate.js';
import { formatDateRu } from '../../utils/date.js';

export default defineComponent({
    name: 'TaskTable',
    components: { BadgeTaskPriority, BadgeTaskStatus, DueDate },
    props: ['tasks'],
    emits: ['open-edit', 'delete'],
    methods: {
        openEdit(taskId) {
            this.$emit('open-edit', taskId);
        },
        delete(taskId) {
            this.$emit('open-edit', taskId);
        }
    },
    setup(props) {

        return { props, formatDateRu }
    },
    template: /* html */ `
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
            <thead class="table-light">
                <tr>
                <th scope="col" style="width: 40px;">
                    <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="selectAll">
                    </div>
                </th>
                <th scope="col">Задача ({{ tasks.length }})</th>
                <th scope="col">Статус</th>
                <th scope="col">Приоритет</th>
                <th scope="col">Исполнитель</th>
                <th scope="col">Срок</th>
                <th scope="col" class="text-end"></th>
                </tr>
            </thead>
            <tbody>
                <tr
                v-for="task in tasks"
                :key="task.id"
                >
                <td>
                    <div class="form-check">
                    <input class="form-check-input" type="checkbox">
                    </div>
                </td>
                <td>
                    <div>
                    <div class="fw-medium">{{ task.title }}</div>
                    <small class="text-body-secondary">{{ task.description }}</small>
                    </div>
                </td>
                <td><badge-task-status :status="task.status"></td>
                <td><badge-task-priority :priority="task.priority"></td>
                <td>{{ task.assignee.name }}</td>
                <td>
                    <due-date :due-date="task.dueDate" :status="task.status" />
                </td>
                <td class="text-end">
                    <button type="button" @click="openEdit(task.id)" class="btn btn-sm btn-outline-primary me-1"><i class="bi bi-pencil"></i></button>
                    <button type="button" @click="delete(task.id)" class="btn btn-sm btn-outline-danger"><i class="bi bi-trash"></i></button>
                </td>
                </tr>
                <tr>
            </tbody>
            </table>
        </div>
    `
});