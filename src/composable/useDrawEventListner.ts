import { ref } from "vue";
import Konva from "konva";

const useDrawEventListener = (
    stage: Konva.Stage | null,
    lineLayer: Konva.Layer | null,
    brushMode: boolean,
    lineConfig: Pick<Konva.LineConfig, "stroke" | "strokeWidth">,
) => {
    const isPaint = ref(false);
    const lastLine = ref<Konva.Line | null>(null);

    const startDrawing = () => {
        isPaint.value = true;
        const pos = stage?.getPointerPosition();
        if (pos) {
            lastLine.value = new Konva.Line({
                ...lineConfig,
                globalCompositeOperation: brushMode ? "source-over" : "destination-out",
                lineCap: "round",
                lineJoin: "round",
                points: [pos.x, pos.y, pos.x, pos.y],
            });
            lineLayer?.add(lastLine.value as Konva.Line);
        }
    };

    const stopDrawing = () => {
        isPaint.value = false;
    };

    const draw = () => {
        if (!isPaint.value) {
            return;
        }

        const pos = stage?.getPointerPosition();
        if (pos) {
            const newPoints = lastLine.value?.points().concat([pos?.x, pos.y]);
            lastLine.value?.points(newPoints as number[]);
        }
    };

    if (stage) {
        stage.on("mousedown touchstart", startDrawing);
        stage.on("mouseup touchednd", stopDrawing);
        stage.on("mousemove touchmove", draw);
    }
};

export default useDrawEventListener;
