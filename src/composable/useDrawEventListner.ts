import { ref } from "vue";
import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";

const useDrawEventListener = (
    stage: Konva.Stage | null,
    lineLayer: Konva.Layer | null,
    brushMode: boolean,
    lineConfig: Pick<Konva.LineConfig, "stroke" | "strokeWidth">,
    objectDelete: boolean,
) => {
    const isPaint = ref(false);
    const lastLine = ref<Konva.Line | null>(null);

    const destoryLine = (e: KonvaEventObject<any>) => {
        const type = e.target;
        if (type instanceof Konva.Line) {
            type.destroy();
        }
        return;
    };

    const startDrawing = (e: KonvaEventObject<any>) => {
        isPaint.value = true;
        const pos = stage?.getPointerPosition();
        if (objectDelete && !brushMode) {
            if (!(e.target instanceof Konva.Stage)) destoryLine(e);
        } else {
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
        }
    };

    const stopDrawing = () => {
        isPaint.value = false;
    };

    const draw = (e: KonvaEventObject<any>) => {
        if (objectDelete && !brushMode) {
            if (!(e.target instanceof Konva.Stage)) destoryLine(e);
        } else {
            if (!isPaint.value) {
                return;
            }
            const pos = stage?.getPointerPosition();
            if (pos) {
                const newPoints = lastLine.value?.points().concat([pos?.x, pos.y]);
                lastLine.value?.points(newPoints as number[]);
            }
        }
    };

    if (stage) {
        stage.on("mousedown touchstart", (e) => startDrawing(e));
        stage.on("mouseup touchednd", stopDrawing);
        stage.on("mousemove touchmove", (e) => draw(e));
    }
};

export default useDrawEventListener;
