import logo from "./logo.svg";
import "./App.css";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { BrowserRouter, Navigate, Route, Router, Routes } from "react-router-dom";
import HomeMain from "./Pages/Home/HomeMain";

function App() {
	return (
		<ChakraProvider theme={theme}>
			<BrowserRouter basename={process.env.PUBLIC_URL}>
				<Routes>
					{/* immediately redirect to /Home */}
					<Route path="/" element={<Navigate to="/Home" replace />} /> 
					<Route path="/Home" element={<HomeMain />} />
					<Route path="/Custom" element={<HomeMain />} />
					<Route path="/History" element={<HomeMain />} />
					<Route path="/About" element={<HomeMain />} />
				</Routes>
			</BrowserRouter>
		</ChakraProvider>
	);
}

export default App;
