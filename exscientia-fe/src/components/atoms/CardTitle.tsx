import styled from "@emotion/styled";
import React from "react";

const ChemicalFormula = styled.strong`
	font-family: var(--font-body);
	text-decoration: underline;
`;

const PlaceholderTitle = styled.i`
	font-family: var(--font-body);
`;

interface CardTitleProps {
	text: string;
	isFormula: boolean;
}

const CardTitle: React.FC<CardTitleProps> = ({ text, isFormula }) =>
	isFormula ? (
		<p>
			<ChemicalFormula>{text}</ChemicalFormula>
		</p>
	) : (
		<p>
			<PlaceholderTitle>{text}</PlaceholderTitle>
		</p>
	);

export default CardTitle;
