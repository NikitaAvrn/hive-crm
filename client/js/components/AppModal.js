import { defineComponent } from 'vue';

export default defineComponent({
    name: 'AppModal',
    props: {
        show: { type: Boolean, default: false },
        title: { type: String, default: 'Заголовок' },
        bodyComponent: { type: [Object, Function], default: null },
        bodyProps: { type: Object, default: () => ({}) },
        buttons: { type: Array, default: () => [] },
        size: { type: String, default: '' }
    },
    emits: ['update:show', 'action'],
    methods: {
        close() {
            this.$emit('update:show', false)
        },
        handleButtonClick(btn) {
            if (btn.action) {
                this.$emit('action', btn.action)
            } else {
                this.close()
            }
        }
    },
    template: /* html */`
    <div
        v-if="show"
        class="modal fade show d-block"
        tabindex="-1"
        role="dialog"
        style="background-color: rgba(0,0,0,0.5)"
    >
        <div class="modal-dialog" :class="size">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5">{{ title }}</h1>
                    <button type="button" class="btn-close" @click="close" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <component v-if="bodyComponent" v-bind="bodyProps" :is="bodyComponent" />
                    <slot></slot>
                </div>
                <div
                    v-if="buttons.length"
                    class="modal-footer"
                >
                    <button
                        v-for="(button, index) in buttons"
                        :key="button.index"
                        type="button"
                        class="btn"
                        :class="button.type"
                        @click="handleButtonClick(button)"
                    ><i v-if="button.icon" :class="button.icon"></i> {{ button.text }}</button>
                </div>
            </div>
        </div>
    </div>
    `
});