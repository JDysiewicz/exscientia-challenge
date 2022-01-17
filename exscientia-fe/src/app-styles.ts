import styled from "@emotion/styled";

export const RootWrapper = styled.main`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 90vh;
`;

export const LayoutWrapper = styled.div`
	display: grid;
	grid-template-columns: 40% 60%;
	width: 100%;

	@media screen and (max-width: 1550px) {
		grid-template-columns: 50% 50%;
	}

	@media screen and (max-width: 1250px) {
		grid-template-columns: 65% 35%;
	}

	/* single column layout on small screens */
	@media screen and (max-width: 960px) {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
`;
