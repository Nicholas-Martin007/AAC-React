import {
	Box,
	SimpleGrid,
	Text,
	Flex,
	Heading,
	Center,
	Button,
	Spinner,
	useDisclosure,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import MainContainer from "../../Components/Container/MainContainer";
import { colorList } from "../../Settings/ColorSetting";
import { useEffect, useState } from "react";
import { useSocialStoryStore } from "../../Store/useSocialStoryStore";
import AACCard from "../../Components/Card/AACCard";
import StoryModal from "../../Components/Modal/StoryModal";
import { usePageStore } from "../../Store/usePageStore";

export default function HistoryMain() {
	const socialStoryStore = useSocialStoryStore();
	const pageStore = usePageStore();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [selectedStory, setSelectedStory] = useState(null);

	useEffect(() => {
		socialStoryStore.fetchStories();
	}, []);

	const checkDetail = (story) => {
		setSelectedStory(story);
		onOpen();
	};

	if (socialStoryStore.isLoading) {
		return (
			<MainContainer>
				<Center h={"100vh"}>
					<Spinner size="sm" color="green.500" /> Loading ...
				</Center>
			</MainContainer>
		);
	}

	return (
		<>
			<MainContainer>
				<Box p={6} mx={!pageStore.isOpen ? "100px" : 0}>
					<Heading mb={6}>Riwayat</Heading>

					<SimpleGrid
						templateColumns="150px 2fr 2fr"
						spacing={4}
						bg={colorList.darkGreen}
						p={4}
						borderRadius="md"
						color="white"
						fontWeight="bold"
						mb={4}
					>
						<Text letterSpacing={1}>Tanggal</Text>
						<Text letterSpacing={1}>Kartu yang digunakan</Text>
						<Text letterSpacing={1}>Kisah Sosial</Text>
					</SimpleGrid>

					{!socialStoryStore.stories ||
					socialStoryStore.stories.length === 0 ? (
						<Center>No stories available</Center>
					) : (
						socialStoryStore.stories
							.filter(
								(item) =>
									item.kartu_list &&
									item.kartu_list.length > 0
							)
							.map((item, index) => (
								<SimpleGrid
									onClick={() => checkDetail(item)}
									key={item.kisah_id}
									templateColumns="150px 2fr 2fr"
									spacing={4}
									p={4}
									bg={index % 2 === 0 ? "white" : "gray.50"}
									_hover={{
										bg: "green.50",
										boxShadow: "sm",
										cursor: "pointer",
									}}
									borderRadius="md"
									alignItems="center"
									mb={2}
								>
									<Text>
										{item.created_at
											? new Date(
													item.created_at
											  ).toLocaleString("id-ID", {
													day: "2-digit",
													month: "long",
													year: "numeric",
													hour: "2-digit",
													minute: "2-digit",
											  })
											: "-"}
									</Text>

									<Flex
										gap={2}
										w="100%"
										justify="flex-start"
										align="flex-start"
										wrap="wrap"
									>
										{(item.kartu_list || [])
											.slice(0, 5)
											.map((card, idx) => (
												<AACCard
													key={idx}
													card={{
														gambar: card.gambar,
														label: card.label,
													}}
													style={{
														h: "100px",
														cardH: "70px",
														w: "80px",
														fontSize: "12px",
													}}
												/>
											))}

										{item.kartu_list &&
											item.kartu_list.length > 5 && (
												<Text
													fontSize="14px"
													fontWeight="bold"
												>
													... masih ada{" "}
													{item.kartu_list.length - 5}{" "}
													lagi
												</Text>
											)}
									</Flex>
									<Text noOfLines={2}>
										{item.output_text || "-"}
									</Text>
								</SimpleGrid>
							))
					)}
				</Box>
			</MainContainer>

			<StoryModal
				isOpen={isOpen}
				onClose={onClose}
				viewMode={true}
				historyData={selectedStory}
			/>
		</>
	);
}
