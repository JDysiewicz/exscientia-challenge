import styled from "@emotion/styled";

export const ServerSimlesWrapper = styled.section`
	align-self: start;
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;

	@media screen and (max-width: 960px) {
		align-self: center;
	}
`;

interface SmilesCardGridProps {
	size: number;
}

export const SmilesCardGrid = styled.div<SmilesCardGridProps>`
	display: grid;
	grid-template-columns: ${(props) => `repeat(3, ${props.size}px)`};
	gap: 3rem 2rem;
	max-height: 80vh;
	overflow-y: scroll;
	overflow-x: hidden;
	padding: 0rem 2rem;

	@media screen and (max-width: 1550px) {
		grid-template-columns: ${(props) => `repeat(2, ${props.size}px)`};
		padding: 0rem 1.5rem;
	}

	@media screen and (max-width: 1250px) {
		grid-template-columns: ${(props) => `repeat(1, ${props.size}px)`};
		padding: 0rem 1rem;
	}

	/* In 1-column mobile layout, can fit 2 cards side-by-side so back to 2 columns of cards */
	@media screen and (max-width: 960px) {
		grid-template-columns: ${(props) => `repeat(2, ${props.size}px)`};
		padding: 0rem 1rem;
	}

	@media screen and (max-width: 620px) {
		grid-template-columns: ${(props) => `repeat(1, ${props.size}px)`};
		padding: 0rem 1rem;
	}
`;
