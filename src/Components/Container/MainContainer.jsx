import { Box, Flex, Text } from "@chakra-ui/react";
import NavigationBar from "../NavigationBar";
import { usePageStore } from "../../Store/usePageStore";
import { colorList } from "../../Settings/ColorSetting";
import { useEffect, useState } from "react";

export default function MainContainer({ title, children }) {
	const pageStore = usePageStore();
	// const [isScrolled, setIsScrolled] = useState(false);

	// useEffect(() => {
	// 	const handleScroll = () => {
	// 		setIsScrolled(window.scrollY > 0);
	// 	};
	// 	window.addEventListener("scroll", handleScroll);
	// 	return () => window.removeEventListener("scroll", handleScroll);
	// }, []);
	return (
		<>
			<Box>
				<Box pos={"fixed"} w={"100%"} bg={colorList.white}>
					<Flex
						borderBottom={"2px solid"}
						borderColor={"gray.200"}
						justify={"flex-end"}
						align={"center"}
					>
						<Box
							bg={"gray.200"}
							p={"34px 48px 16px 12px"}
							bgColor={colorList.darkGreen}
						>
							<Text
								fontSize={"16px"}
								fontWeight={"semibold"}
								letterSpacing={"1px"}
								textTransform={"uppercase"}
								color={colorList.white}
							>
								AAC Application
							</Text>
						</Box>
					</Flex>
				</Box>
				<NavigationBar />
			</Box>

			<Box pl={pageStore.isOpen ? "360px" : "0px"} pt={"72px"}>
				{children}
			</Box>
		</>
	);
}
