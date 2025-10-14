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

export default function HistoryMain() {
	const socialStoryStore = useSocialStoryStore();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [selectedStory, setSelectedStory] = useState(null);

	useEffect(() => {
		socialStoryStore.fetchStories();
	}, []);

	const handleViewDetails = (story) => {
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
				<Box p={6}>
					<Heading mb={6}>Riwayat</Heading>

					<SimpleGrid
						templateColumns="150px 2fr 2fr 50px"
						spacing={4}
						bg={colorList.darkGreen}
						p={4}
						borderRadius="md"
						color="white"
						fontWeight="bold"
						mb={4}
					>
						<Text fontSize="sm">Tanggal</Text>
						<Text>Kartu yang digunakan</Text>
						<Text>Kisah yang Dihasilkan</Text>
						<Text fontSize="sm">Detail</Text>
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
									key={item.kisah_id}
									templateColumns="150px 2fr 2fr 50px"
									spacing={4}
									p={4}
									bg={index % 2 === 0 ? "white" : "gray.50"}
									_hover={{
										bg: "green.50",
										boxShadow: "sm",
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
											: "N/A"}
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
													... (
													{item.kartu_list.length - 5}{" "}
													more)
												</Text>
											)}
									</Flex>

									<Text noOfLines={2}>
										{item.output_text || "N/A"}
									</Text>
									<Center>
										<Button
											onClick={() =>
												handleViewDetails(item)
											}
											aria-label="View details"
											title="View Details"
											color={"green"}
											bg="transparent"
											_hover={{
												bg: "transparent",
												transform: "scale(1.1)",
											}}
										>
											<ViewIcon boxSize={8} />
										</Button>
									</Center>
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
