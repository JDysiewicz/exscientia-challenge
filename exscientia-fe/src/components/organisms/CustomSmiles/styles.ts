import styled from "@emotion/styled";

export const CustomSmilesWrapper = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	align-self: start;

	@media screen and (max-width: 960px) {
		align-self: center;
	}
`;

export const SmilesInput = styled.input`
	width: 60%;
	border-radius: 0.5rem;
	border: 1px solid var(--primary-blue);
	height: 3rem;
	font-size: 1rem;
	padding: 0.5rem;
	font-family: var(--font-body);
`;

export const SmilesCardContainer = styled.div`
	margin: 1rem 0rem;
`;
