import { Box, Button, Flex, SimpleGrid, Spacer, Text } from "@chakra-ui/react";
import MainContainer from "../../Components/Container/MainContainer";

import SelectedCardHome from "./SelectedCardHome";
import { colorList } from "../../Settings/ColorSetting";
import { usePageStore } from "../../Store/usePageStore";

export default function HomeMain() {
	const pageStore = usePageStore();
	return (
		<>
			<MainContainer title="">
				<Box>
					<SimpleGrid columns={pageStore.isOpen ? 6 : 8}>
						{Array.from({ length: 48 }).map((_, i) => (
							<Flex
								key={i}
								flexDir="column"
								h="248px"
								m="12px"
								p="10px"
								border="2px"
								borderColor={colorList.borderGray}
								borderRadius="8px"
								cursor="pointer"
								_hover={{ borderColor: colorList.darkGreen }}
								_active={{ transform: "scale(0.995)" }}
								transition={"ease-in-out 0.1s"}
								onClick={() =>
									console.log("Flex button clicked")
								}
							>
								<Box w="100%" h="160px" bgColor="gray.100" />
								<Spacer />
								<Text
									align="center"
									fontSize="18px"
									letterSpacing="2px"
								>
									Tjokro Aminoto
								</Text>
							</Flex>
						))}
					</SimpleGrid>
				</Box>
			</MainContainer>
			<SelectedCardHome />
		</>
	);
}
