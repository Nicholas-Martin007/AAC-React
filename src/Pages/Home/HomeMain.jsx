import {
	Box,
	Center,
	Flex,
	Image,
	SimpleGrid,
	Spacer,
	Text,
} from "@chakra-ui/react";
import MainContainer from "../../Components/Container/MainContainer";

import SelectedCardHome from "./SelectedCardHome";
import { colorList } from "../../Settings/ColorSetting";
import { usePageStore } from "../../Store/usePageStore";
import AACCard from "../../Components/Card/AACCard";

export default function HomeMain() {
	const pageStore = usePageStore();
	return (
		<>
			<MainContainer title="">
				<Box flexShrink={0}>
					<SimpleGrid columns={pageStore.isOpen ? 6 : 8}>
						{Array.from({ length: 48 }).map((_, i) => (
							<AACCard
								key={i}
								card={{
									img: "/img/Halo.svg",
									label: "halo",
								}}
							/>
						))}
					</SimpleGrid>
				</Box>
			</MainContainer>
			<Box h={"200px"} />
			<SelectedCardHome />
		</>
	);
}
