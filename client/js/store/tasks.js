import { defineStore } from 'pinia';
import { MOCK_TASKS } from '../mocks/tasks.js';

export const useTasksStore = defineStore('tasks', {
    state: () => ({
        items: [],
        isLoading: false,
        error: null
    }),

    getters: {
        count: (state) => state.items.length
    },

    actions: {
        async fetchTasks() {
            this.isLoading = true;
            this.error = null;

            try {
                const data = await fakeRequest(MOCK_TASKS);
                this.items = data;
            } catch (e) {
                this.error = e.message;
            } finally {
                this.isLoading = false;
            }
        },

        async fetchTaskById(id) {
            this.isLoading = true;
            try {
                const data = await fakeRequest(
                    MOCK_TASKS.find(t => t.id === id)
                );
                return data;
            } finally {
                this.isLoading = false;
            }
        },

        fetchTaskUpdate(task) {
            this.isLoading = true;
            try {
                const index = this.items.findIndex(t => t.id === task.id);
                if (index !== -1) this.items[index] = task;
            } finally {
                this.isLoading = false;
            }
        },

        fetchTaskCreate(task) {
            this.isLoading = true;
            try {
                this.items.push(task);
            } finally {
                this.isLoading = false;
            }
        },

        fetchTaskSave(task) {
            if (task && task.id && task.id > 0) {
                this.fetchTaskUpdate(task);
            } else {
                this.fetchTaskCreate(task);
            }
        }
    }
});

function fakeRequest(data, delay = 400) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!data) {
                reject(new Error('Не найдено'));
            } else {
                resolve(JSON.parse(JSON.stringify(data)));
            }
        }, delay);
    });
}