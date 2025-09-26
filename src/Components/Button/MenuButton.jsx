import { Box, Flex, Text } from "@chakra-ui/react";
import { IoIosArrowForward } from "react-icons/io";

export default function MenuButton({ title, link, isBorder = true }) {
	return (
		<Box
			py={"24px"}
			borderBottom={isBorder ? "2px" : ""}
			borderColor={"gray.200"}
		>
			<Flex flexDir={"row"}>
				<Flex flex={1} align={"center"}>
					<Text
						fontSize={"16px"}
						fontWeight={"semibold"}
						letterSpacing={"2px"}
						textTransform={"uppercase"}
					>
						{title}
					</Text>
				</Flex>
				<Flex align={"center"}>
					<IoIosArrowForward />
				</Flex>
			</Flex>
		</Box>
	);
}
