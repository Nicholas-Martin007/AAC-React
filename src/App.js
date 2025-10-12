
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

function App() {
	return (
		<ChakraProvider theme={theme}>
			<BrowserRouter basename={process.env.PUBLIC_URL}>
				<Routes>
					{/* immediately redirect to /Home */}
					<Route path="/" element={<Navigate to="/Home" replace />} />
					<Route path="/Home" element={<HomeMain />} />
					<Route path="/Custom" element={<CustomMain />} />
					<Route path="/History" element={<HistoryMain />} />
					<Route path="/About" element={<HomeMain />} />
				</Routes>
			</BrowserRouter>
		</ChakraProvider>
	);
}

export default App;
