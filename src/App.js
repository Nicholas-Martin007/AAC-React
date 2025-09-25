import logo from "./logo.svg";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeMain from "./Pages/Home/HomeMain.tsx";

function App() {
	return (
		<ChakraProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/home" element={<HomeMain />} />
				</Routes>
			</BrowserRouter>
		</ChakraProvider>
	);
}

export default App;
