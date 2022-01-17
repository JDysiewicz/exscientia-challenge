import axios from "axios";
import { Molecule } from "../shared/models";
import { useQuery } from "react-query";

// api response type, separate "Molecule" type used for business logic
// this hook converts CompoundsApiResponse to Molecule
// so business logic isolated from API implementation
interface CompoundsApiResponse {
	CompoundID: number;
	Smiles: string;
	MolWeight: number;
	MolFormula: string;
	AssayResults: AssayResultApiResponse[];
}

interface AssayResultApiResponse {
	ResultID: number;
	Operator: string;
	Result: string;
	Target: string;
	Unit: string;
	value: number;
}

export const useFetchMolecules = () => {
	const { isLoading, error, data } = useQuery("molecules", fetchMolecules);
	return { isLoading, error, data };
};

// to test this, would run this in test env with REACT_APP_API_URL
// set to testing API with set data, then verify function returns
// this data.
const fetchMolecules = async () => {
	const url = process.env.REACT_APP_API_URL;

	// would specify some fallback API
	if (!url) return;
	const { data } = await axios.get<CompoundsApiResponse[]>(url);
	const molecules = data.map((compound) => {
		const molecule: Molecule = {
			molecularFormula: compound.MolFormula,
			molecularWeight: compound.MolWeight,
			smiles: compound.Smiles,
		};
		return molecule;
	});
	return molecules;
};
