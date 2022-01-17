import { useCallback, useEffect, useMemo, useState } from "react";
import SmilesDrawer from "smiles-drawer";

// Not a big fan of this: 1. Would need a proper SmilesDrawer.d.ts file for use in prod, 2.
// molecular formula logic bleeds into this heavily; ideally would want
// 2 hooks, one effect-only which draws a canvas based on a ref and
// one which generates the molecular formula.
// However, formula logic is kind-of tied to the smiles re-drawing logic
// with this implementation so hard to separate.

// to test would need to render a dummy canvas element
// and use jest to spy that the `fill` function had been called.
// Could also test to check the chemical formulas returned are correct.
export const useDrawCanvas = (
	smilesRef: React.RefObject<HTMLCanvasElement>,
	size: number,
	smilesInput: string,
	molecularFormula?: string
): string => {
	const [formula, setFormula] = useState(molecularFormula);

	// memoize as to not recreate a new Drawer/functions on each render
	// new Drawer needed per molecule, else would reuse one drawer and pass in as a prop
	const smilesDrawer = useMemo(() => {
		return new SmilesDrawer.Drawer({ width: size, height: size });
	}, [size]);

	const drawTree = useCallback(
		(tree: any) => {
			// with more time would write appropriate type declaration file for this package
			smilesDrawer.draw(tree, smilesRef.current, "light", false);

			const form = smilesDrawer.getMolecularFormula();
			setFormula(form);
		},
		[smilesDrawer, smilesRef]
	);

	const resetCanvas = useCallback(
		(err: unknown) => {
			smilesRef.current?.getContext("2d")?.clearRect(0, 0, size, size);
			setFormula(undefined);
		},
		[size, smilesRef]
	);

	useEffect(() => {
		SmilesDrawer.parse(smilesInput, drawTree, resetCanvas); // input, onSucces, onError
	}, [drawTree, resetCanvas, smilesInput]);

	return formula || "";
};
