<script setup lang="ts">
import Konva from "konva";
import { ref, onMounted, watch, computed, onUpdated } from "vue";
import useDrawEventListner from "@/composable/useDrawEventListner";
import useMountProblemImage from "@/composable/useMountPloblemImage";

import BaseButton from "@/components/shared/BaseButton.vue";
import DrawCanvasTools from "./DrawCanvasTools.vue";

const props = defineProps<{
    selectedProblemIndex: number;
}>();

const emits = defineEmits<{
    (event: "emit-selected-index", value: number): void;
    (evnet: "emit-all-problem-solved"): void;
}>();

const mode = ref<boolean>(true);
const objectDelete = ref<boolean>(false);
const line = ref<Pick<Konva.LineConfig, "stroke" | "strokeWidth">>({
    stroke: "black",
    strokeWidth: 2,
});
const stage = ref<null | Konva.Stage>(null);
const layer = ref<null | Konva.Layer>(null);
const problemLayer = ref<null | Konva.Layer>(null);

const tools = ref([
    "펜",
    "지우개",
    "지우개방식변경", // "objectEraser" 로 변경
    "그리기Off",
    "그리기On",
    "undo",
    "redo",
    "+1 펜두께",
    "-1 펜두께",
    "빨간색",
    "파란색",
    "검정색",
    "모두삭제",
]);
const historyLines = ref<(Konva.Line | Konva.Line[])[]>([]);
const saveProblems = ref<number[]>([]);
const isAllProblemSolved = ref<boolean>(false);

// props 에 따른 문제 path 설정
const problemImagePath = computed(() => {
    return `/images/problem-${props.selectedProblemIndex}.png`;
});

// localStorage 내에서 데이터 존재여부 파악
const isCurrentProblemStudyDataExist = computed(() => {
    // return 문 내에 바로 조건을 넣어주면, 인식을 하지 못합니다..
    const storageCondition = localStorage.getItem(`study-step-${props.selectedProblemIndex}`);
    const saveProblemCondition = saveProblems.value.includes(props.selectedProblemIndex);
    return storageCondition && saveProblemCondition;
});

// 모든 문제가 풀렸다면, 상위 컴포넌트에게 emit
const checkAllProblemSolving = () => {
    const condition = [1, 2, 3].every(
        (index) => localStorage.getItem(`study-step-${index}`) !== null,
    );
    isAllProblemSolved.value = condition;
    return;
};

// 풀려있는 문제에 한하여 저장된 데이터를 불러옵니다.
const loadAllStudyStep = () => {
    [1, 2, 3].forEach((index) => {
        const existStudyData = localStorage.getItem(`study-step-${index}`);
        if (existStudyData) {
            saveProblems.value.push(index);
        }
    });
};

const adjustPenTool = () => {
    mode.value = true;
};

const adjustEraserTool = () => {
    mode.value = false;
};

const adjustOffDrawTool = () => {
    if (stage.value) {
        stage.value.off("mousedown touchstart");
        stage.value.off("mouseup touchednd");
        stage.value.off("mousemove touchmove");
    }
};

const adjustOnDrawTool = () => {
    if (stage.value) {
        useDrawEventListner(
            stage.value as Konva.Stage,
            layer.value as Konva.Layer,
            mode.value,
            line.value,
            objectDelete.value,
        );
    }
};

const adjustUndoTool = () => {
    if (layer.value?.children.length === 0) return;

    const lastLine = layer.value?.children.pop();

    if (Array.isArray(lastLine)) {
        lastLine.forEach((line) => {
            if (line instanceof Konva.Line) {
                historyLines.value.push(line);
            }
        });
    } else {
        if (lastLine instanceof Konva.Line) {
            historyLines.value.push(lastLine);
        }
    }

    layer.value?.draw();
};

const adjustRedoTool = () => {
    if (historyLines.value.length === 0) return;

    const firstRedoLine = historyLines.value.pop();

    if (Array.isArray(firstRedoLine)) {
        firstRedoLine.forEach((line) => {
            if (line instanceof Konva.Line) {
                layer.value?.children.push(line);
            }
        });
    } else {
        if (firstRedoLine instanceof Konva.Line) {
            layer.value?.children.push(firstRedoLine);
        }
    }

    layer.value?.draw();
};

const adjustPlusWidthTool = () => {
    if (!line.value.strokeWidth) return;
    if (line.value.strokeWidth < 10 && line.value.strokeWidth >= 2) {
        line.value.strokeWidth += 1;
    } else {
        line.value.strokeWidth = 10;
    }
};

const adjustMinusWidthTool = () => {
    if (!line.value.strokeWidth) return;
    if (line.value.strokeWidth <= 10 && line.value.strokeWidth > 2) {
        line.value.strokeWidth -= 1;
    } else {
        line.value.strokeWidth = 2;
    }
};

const adjustRedLineTool = () => {
    line.value.stroke = "red";
};

const adjustBlueLineTool = () => {
    line.value.stroke = "blue";
};

const adjustBlackLineTool = () => {
    line.value.stroke = "black";
};

const adjustClearTool = () => {
    const layerHistroies: Konva.Line[] = [];
    if (layer.value?.children.length) {
        layer.value?.children.forEach((child) => {
            if (child instanceof Konva.Line) {
                layerHistroies.push(child);
            }
        });
    }
    historyLines.value.push(layerHistroies); // 전체 배열을 저장합니다.
    layer.value?.destroyChildren();
};

const adjustObjectEraser = () => {
    objectDelete.value = !objectDelete.value;
};

const resetDrawListner = () => {
    console.log(objectDelete.value, mode.value);
    adjustOffDrawTool();
    adjustOnDrawTool();
};

const adjustDrawingTool = (toolName: string) => {
    switch (toolName) {
        case "펜":
            adjustPenTool();
            resetDrawListner();
            return;
        case "지우개":
            adjustEraserTool();
            resetDrawListner();
            return;
        case "그리기Off":
            adjustOffDrawTool();
            return;
        case "그리기On":
            adjustOnDrawTool();
            return;
        case "undo":
            adjustUndoTool();
            resetDrawListner();
            return;
        case "redo":
            adjustRedoTool();
            resetDrawListner();
            return;
        case "+1 펜두께":
            adjustPlusWidthTool();
            resetDrawListner();
            return;
        case "-1 펜두께":
            adjustMinusWidthTool();
            resetDrawListner();
            return;
        case "빨간색":
            adjustRedLineTool();
            resetDrawListner();
            return;
        case "파란색":
            adjustBlueLineTool();
            resetDrawListner();
            return;
        case "검정색":
            adjustBlackLineTool();
            resetDrawListner();
            return;
        case "모두삭제":
            adjustClearTool();
            resetDrawListner();
            return;
        case "지우개방식변경":
            adjustObjectEraser();
            resetDrawListner();
            return;
        default:
            return;
    }
};

const downloadURI = (uri: string, name: string) => {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    // delete link;
};

const downloadImage = () => {
    problemLayer.value?.hide();
    const dataURL = stage.value?.toDataURL({ pixelRatio: 3 });

    if (!dataURL) return;

    downloadURI(dataURL, "test-image.png");
    problemLayer.value?.show();
};

const saveStudyStep = () => {
    const data = layer.value?.toJSON();
    if (!data) return;

    localStorage.setItem(`study-step-${props.selectedProblemIndex}`, data);
    // index를 저장합니다.
    saveProblems.value.push(props.selectedProblemIndex);
    checkAllProblemSolving();
};

const loadStudyStep = () => {
    const data = localStorage.getItem(`study-step-${props.selectedProblemIndex}`);
    if (!data) return;

    // 원래는 Konva.Node.Create 를 통해서 data를 parsing 하지만, 이렇게 하니 Line 객체가 한개밖에 생성이 되지 않습니다
    // 따라서 먼저 data를 JSON.parse를 통해 parsing 한 후, children을 forEach로 돌면서 Line 객체를 생성합니다
    const newLayer = JSON.parse(data);

    newLayer.children.forEach((attrs: Konva.LineConfig) => {
        const child = new Konva.Line(attrs);
        layer.value?.add(child);
    });
};

const completeSolvingProblem = () => {
    downloadImage();
    layer.value?.destroyChildren(); // 현 layer 를 초기화 합니다.
    emits("emit-selected-index", props.selectedProblemIndex + 1); // 다음 단계로 넘어갑니다.
};

// localStorage 내 저장된 데이터를 삭제합니다.
const deleteStudyStep = () => {
    localStorage.removeItem(`study-step-${props.selectedProblemIndex}`);
    saveProblems.value.splice(props.selectedProblemIndex - 1, 1);
    checkAllProblemSolving();
};

// 모든 문제를 다 풀었다면 제출하기
const submitAllProblem = () => {
    [1, 2, 3].forEach((index) => {
        localStorage.removeItem(`study-step-${index}`);
    });
    emits("emit-all-problem-solved");
};

watch(
    () => mode.value,
    () => {
        adjustOffDrawTool(); // mode 가 변경될 때 마다 등록된 이벤트를 삭제합니다.
        adjustOnDrawTool(); // 이후 mode 가 변경된 이벤트를 재 등록 해줍니다.
    },
);

watch(
    () => props.selectedProblemIndex,
    () => {
        layer.value?.destroyChildren(); // 우선 현 layer 를 초기화 합니다.
        loadStudyStep(); // 이후 저장되어 있는 풀이 과정을 불러옵니다. (있다면)
        checkAllProblemSolving();
    },
);

onUpdated(() => {
    if (problemLayer.value) {
        // index 에 맞는 문제 이미지를 렌더링 합니다.
        useMountProblemImage(problemImagePath.value, problemLayer.value as Konva.Layer);
    }
});

onMounted(() => {
    stage.value = new Konva.Stage({
        container: "container",
        width: 500,
        height: 700,
    });

    layer.value = new Konva.Layer();
    problemLayer.value = new Konva.Layer();

    stage.value.add(layer.value as Konva.Layer);
    stage.value?.add(problemLayer.value as Konva.Layer);

    loadStudyStep(); // 첫 마운트 시 저장된 데이터를 불러옵니다.

    problemLayer.value.moveToBottom(); // 이미지 layer 를 맨 아래로 보냅니다.

    // drag start, drawing, end 이벤트를 등록합니다.
    useDrawEventListner(
        stage.value as Konva.Stage,
        layer.value as Konva.Layer,
        mode.value,
        line.value,
        objectDelete.value,
    );
    // index 에 맞는 문제 이미지를 렌더링 합니다. (첫 마운트 시)
    useMountProblemImage(problemImagePath.value, problemLayer.value as Konva.Layer);
    checkAllProblemSolving(); // 모든 문제가 풀렸는지 확인합니다.
    loadAllStudyStep(); // 저장된 데이터를 불러옵니다.

    stage.value.on("mouseenter", () => {
        useDrawEventListner(
            stage.value as Konva.Stage,
            layer.value as Konva.Layer,
            mode.value,
            line.value,
            objectDelete.value,
        );
    });

    stage.value.on("mouseleave", () => {
        if (stage.value) {
            stage.value.off("mousedown touchstart");
            stage.value.off("mouseup touchednd");
            stage.value.off("mousemove touchmove");
        }
    });
});
</script>

<template>
    <section class="flex items-stretch justify-start w-full h-full border gap-[2rem]">
        <div
            class="flex flex-col items-start justify-center border rounded-[2rem] border-primary-gray w-fit h-full gap-[2rem] p-[2rem] bg-white"
        >
            <div id="container" class="w-fit"></div>
            <div class="w-full h-auto flex justify-end items-center gap-[2rem]">
                <BaseButton
                    :type="'button'"
                    :value="'save'"
                    :color="'primary-border'"
                    @click="saveStudyStep"
                />
                <BaseButton
                    v-if="isCurrentProblemStudyDataExist"
                    :type="'button'"
                    :value="'delete'"
                    :color="'primary-border'"
                    @click="deleteStudyStep"
                />
                <BaseButton
                    v-if="selectedProblemIndex !== 3"
                    :type="'button'"
                    :value="'next'"
                    :color="'primary-border'"
                    @click="completeSolvingProblem"
                />
                <BaseButton
                    v-if="isAllProblemSolved"
                    :type="'button'"
                    :value="'submit'"
                    :color="'primary'"
                    @click="submitAllProblem"
                />
            </div>
        </div>
        <DrawCanvasTools :tools="tools" @emit-tool-button-click="adjustDrawingTool" />
    </section>
</template>

<style scoped></style>
