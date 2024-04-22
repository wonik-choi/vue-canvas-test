import Konva from "konva";

const useMountProblemImage = (imageSrc: string, problemLayer: Konva.Layer) => {
    const problemImage = new Image();
    problemImage.src = imageSrc;

    problemImage.onload = () => {
        const konvaImage = new Konva.Image({
            image: problemImage,
            width: 400,
            height: 300,
            x: 10,
            y: 10,
        });
        problemLayer.add(konvaImage);
    };
};

export default useMountProblemImage;
