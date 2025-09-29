import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
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
							<Box
								key={i}
								borderRight="2px"
								borderBottom="2px"
								borderColor={colorList.borderGray}
								h="256px"
								p="20px"
							>
								<Box
									w="160px"
									h="160px"
									bgColor={colorList.bgGray}
								/>
								<Box h="24px" />
								<Text
									align="center"
									fontSize="18px"
									letterSpacing="2px"
								>
									Tjokro Aminoto
								</Text>
							</Box>
						))}
					</SimpleGrid>
				</Box>
			</MainContainer>
			<SelectedCardHome />
		</>
	);
}
