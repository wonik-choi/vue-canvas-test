<script setup lang="ts">
import { computed, defineAsyncComponent } from "vue";

import type { ButtonProps, ButtonEmits } from "@/components/shared/BaseButtonModel";

const props = defineProps<ButtonProps>();
const emits = defineEmits<ButtonEmits>();

const iconComponent = computed(() => {
    return defineAsyncComponent(() => import(`@/components/shared/base/svgs/${props.icon}.vue`));
});

const customClass = computed(() => {
    const stylePerColor = {
        "bg-primary-red text-white cursor-pointer active:bg-secondary-red active:text-primary-red":
            props.color === "primary" && !props.disabled,
        "bg-white text-primary-red border border-primary-red cursor-pointer active:bg-primary-red active:text-white":
            props.color === "primary-border" && !props.disabled,
        "bg-white text-primary-black border border-secondary-gray cursor-pointer active:bg-secondary-gray active:border-primary-black":
            props.color === "normal" && !props.disabled,
    };

    const styleBase = {
        "px-[2rem] py-[1.05rem] text-base rounded-[0.8rem]": true,
    };

    const stylePerDisabled = {
        "bg-secondary-gray text-primary-gray": props.disabled,
    };

    return {
        ...stylePerColor,
        ...styleBase,
        ...stylePerDisabled,
    };
});

const handleClick = () => {
    emits("click");
};
</script>

<template>
    <button
        :type="type"
        class="flex items-center justify-center gap-[0.5rem] text-center transition-all font-pretended font-medium whitespace-nowrap"
        :class="customClass"
        :disabled="props.disabled || false"
        @click="handleClick"
    >
        <div v-if="icon" class="flex items-center justify-center">
            <component :is="iconComponent" />
        </div>
        {{ value }}
    </button>
</template>

<style scoped></style>
