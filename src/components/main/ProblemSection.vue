<script setup lang="ts">
import Problem from "@/components/main/Problem.vue";

defineProps<{
    problmes: number[];
    selectedIndex: number;
}>();

const emits = defineEmits<{
    (event: "emit-selected-index", value: number): void;
}>();

const emitSelectedIndex = (index: number) => {
    emits("emit-selected-index", index);
};
</script>

<template>
    <section
        class="flex flex-col justify-start items-center border bg-white w-fit border-primary-gray rounded-[1rem] p-[2rem] gap-[2rem]"
    >
        <Problem
            v-for="problem in problmes"
            :key="problem"
            :problemIndex="problem"
            :currentSelectIndex="selectedIndex"
            @emit-selected-index="emitSelectedIndex"
        />
    </section>
</template>
