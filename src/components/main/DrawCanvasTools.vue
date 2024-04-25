<script setup lang="ts">
import DrawCanvasTool from "@/components/main/DrawCanvasTool.vue";

defineProps<{
    tools: string[];
}>();

const emits = defineEmits<{
    (event: "emit-tool-button-click", value: string): void;
}>();

const emitsToolButtonClick = (toolName: string) => {
    emits("emit-tool-button-click", toolName);
};
</script>

<template>
    <section
        class="w-fit bg-white border border-primary-gray rounded-[2rem] flex flex-col justify-start items-center p-[1.5rem] gap-[2rem]"
    >
        <DrawCanvasTool
            v-for="tool in tools"
            :key="tool"
            :toolName="tool"
            @emit-tool-button-click="emitsToolButtonClick"
        />
    </section>
</template>
