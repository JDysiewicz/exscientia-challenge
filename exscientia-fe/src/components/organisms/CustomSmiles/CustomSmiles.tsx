import React, { useState } from "react";
import { SectionTitle } from "../../../shared/styles";
import SmilesCard from "../../molecules/SmilesCard/SmilesCard";
import {
	CustomSmilesWrapper,
	SmilesCardContainer,
	SmilesInput,
} from "./styles";

const CustomSmiles: React.FC = () => {
	const [smilesInput, setSmilesInput] = useState("");

	return (
		<CustomSmilesWrapper>
			<SectionTitle>SMILES Parser</SectionTitle>

			<SmilesInput
				type="text"
				value={smilesInput}
				onChange={(e) => setSmilesInput(e.target.value)}
				placeholder={"c1ccccc1"}
			/>

			<SmilesCardContainer>
				<SmilesCard size={500} smilesInput={smilesInput} />
			</SmilesCardContainer>
		</CustomSmilesWrapper>
	);
};

export default CustomSmiles;
