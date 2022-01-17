import React from "react";
import ApiProvider from "./api/ApiProvider";
import CustomSmiles from "./components/organisms/CustomSmiles/CustomSmiles";
import ServerSmiles from "./components/organisms/ServerSmiles/ServerSmiles";
import Header from "./components/molecules/Header/Header";
import { LayoutWrapper, RootWrapper } from "./app-styles";

const App: React.FC = () => {
	return (
		<ApiProvider>
			<RootWrapper>
				<Header />
				<LayoutWrapper>
					<CustomSmiles />
					<ServerSmiles />
				</LayoutWrapper>
			</RootWrapper>
		</ApiProvider>
	);
};

export default App;
