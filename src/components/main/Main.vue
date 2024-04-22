<script setup lang="ts">
import { ref } from "vue";

import DrawCanvas from "@/components/main/DrawCanvas.vue";
import ProblemSection from "@/components/main/ProblemSection.vue";
import Finish from "@/components/main/Finish.vue";

const selectedProblemIndex = ref(1);
const problems = ref([1, 2, 3]);
const isComplete = ref(false);

const changeSelectedIndex = (index: number) => {
    selectedProblemIndex.value = index;
};

const submitProblems = () => {
    alert("모든 문제를 풀었습니다.");
    isComplete.value = true;
};
</script>

<template>
    <section v-if="!isComplete" class="w-full flex justify-center items-stretch gap-[2rem]">
        <ProblemSection
            :problmes="problems"
            :selectedIndex="selectedProblemIndex"
            @emit-selected-index="changeSelectedIndex"
        />
        <DrawCanvas
            :selected-problem-index="selectedProblemIndex"
            @emit-selected-index="changeSelectedIndex"
            @emit-all-problem-solved="submitProblems"
        />
    </section>
    <section v-else class="w-full flex justify-center items-stretch gap-[2rem]">
        <Finish />
    </section>
</template>
