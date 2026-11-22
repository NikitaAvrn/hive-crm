import { defineComponent } from 'vue';
import { DUE_SOON_DAYS } from '../../constants/task.js';
import { formatDateRu, diffDays } from '../../utils/date.js';

export default defineComponent({
    name: 'DueDate',
    props: {
        dueDate: { type: String, default: '' },
        status: { type: String, default: 'todo' },
        soonDays: { type: Number, default: null },
        showHint: { type: Boolean, default: true },
        showIcon: { type: Boolean, default: true }
    },
    computed: {
        threshold() {
            return this.soonDays ?? DUE_SOON_DAYS ?? 5;
        },
        diff() {
            return diffDays(this.dueDate);
        },
        isDone() {
            return this.status === 'done';
        },
        // 'overdue' | 'today' | 'soon' | 'normal' | 'done' | 'empty'
        state() {
            if (!this.dueDate) return 'empty';
            if (this.isDone) return 'done';
            if (this.diff < 0) return 'overdue';
            if (this.diff === 0) return 'today';
            if (this.diff <= this.threshold) return 'soon';
            return 'normal';
        },
        cssClass() {
            return 'due-date due-date--' + this.state;
        },
        hint() {
            if (!this.showHint) return '';
            if (this.state === 'done' || this.state === 'empty' || this.state === 'normal') return '';
            if (this.diff < 0) return 'просрочено на ' + Math.abs(this.diff) + ' дн.';
            if (this.diff === 0) return 'сегодня';
            if (this.diff === 1) return 'завтра';
            return 'через ' + this.diff + ' дн.';
        },
        icon() {
            if (!this.showIcon) return '';
            if (this.state === 'overdue') return 'bi bi-exclamation-circle';
            if (this.state === 'today') return 'bi bi-clock';
            return 'bi bi-calendar-event';
        },
        label() {
            return formatDateRu(this.dueDate);
        },
        fullTitle() {
            if (!this.dueDate) return '';
            try {
                return new Date(this.dueDate + 'T00:00:00')
                    .toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric', weekday: 'long' });
            } catch (e) {
                return this.dueDate;
            }
        }
    },
    template: /* html */`
    <span :class="cssClass" :title="fullTitle">
        <i v-if="icon" :class="icon" class="me-1"></i>
        <span>{{ label }}</span><br />
        <small v-if="hint" class="due-date__hint ms-1">{{ hint }}</small>
    </span>
    `
});