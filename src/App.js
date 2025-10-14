import "./App.css";
import { ChakraProvider, theme } from "@chakra-ui/react";
import {
	BrowserRouter,
	Navigate,
	Route,
	Router,
	Routes,
} from "react-router-dom";
import HomeMain from "./Pages/Home/HomeMain";
import CustomMain from "./Pages/Custom/CustomMain";
import HistoryMain from "./Pages/History/HistoryMain";
import AboutMain from "./Pages/About/AboutMain";

function App() {
	return (
		<ChakraProvider theme={theme}>
			<BrowserRouter basename={process.env.PUBLIC_URL}>
				<Routes>
					<Route path="/" element={<Navigate to="/Home" replace />} />
					<Route path="/Home" element={<HomeMain />} />
					<Route path="/Custom" element={<CustomMain />} />
					<Route path="/History" element={<HistoryMain />} />
					<Route path="/About" element={<AboutMain />} />
				</Routes>
			</BrowserRouter>
		</ChakraProvider>
	);
}

export default App;
