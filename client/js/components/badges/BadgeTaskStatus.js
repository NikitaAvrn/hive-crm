import { defineComponent } from 'vue';
import { STATUS_META } from '../../constants/task.js';

export default defineComponent({
  name: 'BadgeTaskStatus',
  props: {
    status: {
      type: String, default: 'todo'
    }
  },
  computed: {
    meta() {
      return STATUS_META[this.status] ?? STATUS_META.todo;
    },
    badgeClass() {
      return `bg-${this.meta.color}-subtle text-${this.meta.color}`;
    }
  },
  template: /* html */`
    <span class="badge fs-6" :class="badgeClass">{{ meta.label }}</span>
  `
});