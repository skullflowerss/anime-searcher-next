import { createContext, useState } from "react";
import "../styles/globals.css";

export const DataContext = createContext();

const DataState = (props) => {
	const [data, setData] = useState([]);

	return <DataContext.Provider value={{ data, setData }}>{props.children}</DataContext.Provider>;
};

function MyApp({ Component, pageProps }) {
	return (
		<>
			<DataState>
				<Component {...pageProps} />
			</DataState>
		</>
	);
}

export default MyApp;
