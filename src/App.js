import logo from "./logo.svg";
import "./App.css";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import HomeMain from "./Pages/Home/HomeMain";

function App() {
	return (
		<ChakraProvider theme={theme}>
			<BrowserRouter basename={process.env.PUBLIC_URL}>
				<Routes>
					<Route path="/home" element={<HomeMain />} />
				</Routes>
			</BrowserRouter>
		</ChakraProvider>
	);
}

export default App;
