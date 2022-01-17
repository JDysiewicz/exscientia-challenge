import React, { useRef } from "react";
import { useDrawCanvas } from "../../../hooks";
import CardTitle from "../../atoms/CardTitle";
import SmilesCanvas from "../../atoms/SmilesCanvas";
import { SmilesCardWrapper } from "./styles";

interface SmilesCardProps {
	smilesInput: string;
	size: 100 | 250 | 500;
	molecularFormula?: string;
	molecularWeight?: number;
}

const SmilesCard: React.FC<SmilesCardProps> = ({
	smilesInput,
	size,
	molecularFormula,
	molecularWeight,
}) => {
	const smilesRef = useRef<HTMLCanvasElement>(null);

	const formula = useDrawCanvas(smilesRef, size, smilesInput, molecularFormula);

	return (
		<SmilesCardWrapper>
			{formula ? (
				<CardTitle text={formula} isFormula={true} />
			) : (
				<CardTitle
					text={"Enter a SMILES string to view the molecule"}
					isFormula={false}
				/>
			)}

			<SmilesCanvas smilesRef={smilesRef} size={size} />

			{molecularWeight && (
				<p>
					{" "}
					<i> Mr: {molecularWeight}</i>
				</p>
			)}
		</SmilesCardWrapper>
	);
};

export default SmilesCard;
