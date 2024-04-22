<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
    problemIndex: number;
    currentSelectIndex: number;
}>();

const emits = defineEmits<{
    (event: "emit-selected-index", value: number): void;
}>();

const selectedIndexCustomClass = computed(() => {
    return {
        "bg-secondary-gray text-primary-black border-primary-gray":
            props.problemIndex !== props.currentSelectIndex,
        "bg-secondary-red text-primary-red border-primary-red":
            props.problemIndex === props.currentSelectIndex,
    };
});

const emitSelectedIndex = () => {
    emits("emit-selected-index", props.problemIndex);
};
</script>

<template>
    <div
        class="flex items-center justify-center border rounded-[1rem] w-full h-auto p-[1.5rem] cursor-pointer hover:bg-secondary-red hover:shadow-md"
        :class="selectedIndexCustomClass"
        @click="emitSelectedIndex"
    >
        <p class="text-base font-medium font-pretended">{{ problemIndex }}</p>
    </div>
</template>
