import { Box, Text } from "@chakra-ui/react";
import AppBar from "../AppBar";

export default function MainContainer({ title, children }) {
	return (
		<Box w="100%" h="100vh">
			{/* Sidebar */}
			<Box
				pos="fixed"
				h="100vh"
				w="360px"
				zIndex={5}
				borderRight={"2px"}
				borderColor={"gray.200"}
				bg={"white"}
			>
				<AppBar />
			</Box>
			<Box bg={"white"} h={"100vh"}>
				{children}
			</Box>
		</Box>
	);
}
