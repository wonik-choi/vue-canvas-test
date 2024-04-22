<script setup lang="ts">
import BaseButton from "@/components/shared/BaseButton.vue";

const props = defineProps<{
    toolName: string;
}>();

const emits = defineEmits<{
    (event: "emit-tool-button-click", value: string): void;
}>();

const emitToolButtonClick = () => {
    emits("emit-tool-button-click", props.toolName);
};
</script>

<template>
    <div class="w-fit h-fit">
        <BaseButton
            :type="'button'"
            :color="'normal'"
            :value="toolName"
            @click="emitToolButtonClick"
        />
    </div>
</template>
