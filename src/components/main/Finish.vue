<script setup lang="ts">
import { Vue3Lottie } from "vue3-lottie";
import FinishAnimation from "../../../public/lotties/finish.json";
</script>

<template>
    <section class="w-full h-full flex flex-col justify-center items-center gap-[2rem]">
        <div class="w-full h-full">
            <Vue3Lottie :animation-data="FinishAnimation" :height="600" :width="600" />
        </div>
        <div class="flex items-center justify-center w-full h-auto">
            <p class="text-2xl font-pretended text-primary-black">제출을 완료하였습니다</p>
        </div>
    </section>
</template>
