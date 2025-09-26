import { Box, Flex, Text } from "@chakra-ui/react";
import MenuButton from "./Button/MenuButton";
import { IoMdClose } from "react-icons/io";

export default function AppBar() {
	const menuOptions = () => {};

	return (
		<>
			<Box w={"360px"} minH={"100vh"}>
				<Box
					px={"20px"}
					height={"72px"}
					borderBottom={"2px"}
					borderColor={"gray.200"}
				>
					<Box
						py={"12px"}
						h={"100%"}
						alignContent={"center"}
						justifyItems={"end"}
					>
						<Box p={"12px"}>
							<IoMdClose size={"28px"} />
						</Box>
					</Box>
				</Box>
				<Box p={"48px 20px"}>
					<MenuButton title={"Home"} link={"link"} />
					<MenuButton title={"Custom"} link={"link"} />
					<MenuButton title={"History"} link={"link"} />
					<MenuButton
						title={"About"}
						link={"link"}
						isBorder={false}
					/>
				</Box>
			</Box>
		</>
	);
}

// #1a7f37
