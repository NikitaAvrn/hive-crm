import { defineComponent, ref, computed } from 'vue';
import { useTasksStore } from '../store/index.js';
import TaskTable from '../components/tasks/TaskTable.js';
import TaskCards from '../components/tasks/TaskCards.js';
import TaskForm from '../components/tasks/TaskForm.js';
import AppModal from '../components/AppModal.js';
import TaskFilters from '../components/tasks/TaskFilters.js';

export default defineComponent({
    name: 'Tasks',
    components: { TaskTable, TaskCards, AppModal, TaskForm, TaskFilters },
    setup() {
        const store = useTasksStore();
        const isModalOpen = ref(false);
        const modalTitle = ref(false);
        const currentTask = ref(null);
        const filters = ref({ status: '', priority: '', assignee: '', find: '' });

        const tasks = computed(() => {
            let filteredTasks = store.items;
            const f = filters.value

            filteredTasks.sort((a, b) => a.dueDate.localeCompare(b.dueDate));

            if (f?.status)
                filteredTasks = filteredTasks.filter(t => t.status === f.status);
            if (f?.priority)
                filteredTasks = filteredTasks.filter(t => t.priority === f.priority);
            if (f?.assignee)
                filteredTasks = filteredTasks.filter(t => t.assignee?.name === f.assignee);
            if (f?.find) {
                const query = f.find.toLowerCase();
                filteredTasks = filteredTasks.filter(t =>
                    t.title?.toLowerCase().includes(query) ||
                    t.description?.toLowerCase().includes(query));
            }

            return filteredTasks;
        });

        const modalCancel = () => {
            isModalOpen.value = false;
        }

        const modalSubmit = (payload) => {
            store.fetchTaskSave(payload);
            modalCancel();
        }

        const openEdit = async (taskId) => {
            try {
                currentTask.value = await store.fetchTaskById(taskId)
                modalTitle.value = currentTask.value.title
            } catch (error) {
                console.error(error);
                modalTitle.value = 'Новая задача';
                currentTask.value = null;
            }
            isModalOpen.value = true
        }

        return { store, tasks, isModalOpen, modalTitle, openEdit, currentTask, modalCancel, modalSubmit, filters };
    },
    computed: {
        screenWidth() {
            return window.innerWidth;
        }
    },
    mounted() {
        this.store.fetchTasks();
    },
    template: /* html */`
    <div class="card">
        <div class="card-header bg-transparent">
            <!--<h5 class="card-title mb-0">Hoverable Table with Selection</h5>-->
            <div class="d-flex gap-2 justify-content-end">
                <!--<button class="btn btn-outline-secondary"><i class="bi bi-funnel me-1"></i>Filter</button>-->
                <button type="button" class="btn btn-primary" @click="openEdit"><i class="bi bi-plus me-1"></i>Новая задача</button>
            </div>
        </div>
        
        <div class="card-body border-bottom py-3">
            <task-filters v-model="filters" />
        </div>

        <div class="card-body p-0">
            <div v-if="(screenWidth > 992)" class="d-none d-lg-block">
                <task-table :tasks="tasks" @open-edit="openEdit" />
            </div>
            <div v-else class="d-block d-lg-none">
                <task-cards :tasks="tasks" @open-edit="openEdit" />
            </div>
        </div>
    </div>
    <app-modal :title="modalTitle" size="modal-fullscreen-lg-down modal-lg"  v-model:show="isModalOpen">
        <task-form :task="currentTask" :users="[{id: 1, name: 'Никита'}, {id: 2, name: 'Василий'}, {id: 4, name: 'Сергей'}]" @cancel="modalCancel" @submit="modalSubmit" />
    </app-modal>
    `
});