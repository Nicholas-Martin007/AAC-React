import { Box, Flex, Text } from "@chakra-ui/react";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { colorList } from "../../Settings/ColorSetting";

export default function MenuButton({ title, link, isBorder = true }) {
	const location = useLocation();
	const isActive = location.pathname === link;

	return (
		<Link to={link}>
			<Box
				py={"24px"}
				px={"8px"}
				borderBottom={"2px"}
				borderColor={
					isActive
						? "gray.500"
						: isBorder
						? "gray.200"
						: "transparent"
				}
				_hover={{
					borderColor: colorList.darkGreen,
				}}
				transition={"ease-in-out 0.2s"}
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
		</Link>
	);
}
