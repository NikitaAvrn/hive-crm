import { defineComponent } from 'vue';
import { PRIORITY_META } from '../../constants/task.js';

export default defineComponent({
    name: 'BadgeTaskPriority',
    props: {
        priority: {
            type: String, default: 'todo'
        }
    },
    computed: {
        meta() {
            return PRIORITY_META[this.priority] ?? PRIORITY_META.medium;
        },
        badgeClass() {
            return `bg-${this.meta.color}-subtle text-${this.meta.color}`;
        }
    },
    template: /* html */`
    <span class="badge fs-6" :class="badgeClass">{{ meta.label }}</span>
  `
});