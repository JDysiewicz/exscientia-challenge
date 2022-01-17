import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

interface ApiProviderProps {
	children: React.ReactNode;
}

// api provider for managing fetching, caching, updating
const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
};

export default ApiProvider;
