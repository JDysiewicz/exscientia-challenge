import React from "react";

interface SmilesCanvasProps {
	smilesRef: React.RefObject<HTMLCanvasElement>;
	size: number;
}

const SmilesCanvas: React.FC<SmilesCanvasProps> = ({ smilesRef, size }) => (
	<figure>
		<canvas ref={smilesRef} width={size} height={size}></canvas>{" "}
	</figure>
);

export default SmilesCanvas;
