import React from "react";
import { useFetchMolecules } from "../../../hooks";
import { SectionTitle } from "../../../shared/styles";
import SmilesCard from "../../molecules/SmilesCard/SmilesCard";
import { ServerSimlesWrapper, SmilesCardGrid } from "./styles";

const ServerSmiles: React.FC = () => {
	const { isLoading, error, data } = useFetchMolecules();

	// this would be made some sort of environement variable
	// or passed in as a prop/in a store.
	const canvasSizePx = 250;

	const renderMolecules = () => {
		if (!data) return;
		return data.map((molecule, idx) => {
			return (
				<div key={idx}>
					<SmilesCard
						size={canvasSizePx}
						smilesInput={molecule.smiles}
						molecularFormula={molecule.molecularFormula}
						molecularWeight={molecule.molecularWeight}
					/>
				</div>
			);
		});
	};

	return (
		<ServerSimlesWrapper>
			{isLoading ? (
				<SectionTitle>Fetching server molecules...</SectionTitle>
			) : error || !data ? (
				<SectionTitle>Unable to fetch server molecules</SectionTitle>
			) : (
				<>
					<SectionTitle>Server Molecules</SectionTitle>
					<SmilesCardGrid size={canvasSizePx}>
						{renderMolecules()}
					</SmilesCardGrid>
				</>
			)}
		</ServerSimlesWrapper>
	);
};

export default ServerSmiles;
