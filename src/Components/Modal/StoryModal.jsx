import {
	Box,
	Button,
	Flex,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Text,
	Icon,
	HStack,
	VStack,
	Badge,
	Divider,
	useToast,
} from "@chakra-ui/react";
import { useCardStore } from "../../Store/useCardStore";
import { useEffect, useRef, useState } from "react";
import AACCard from "../Card/AACCard";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useSpeech } from "react-text-to-speech";
import { addRatings } from "../../utils/addRatings";

export default function StoryModal({
	isOpen,
	onClose,
	viewMode = false, // New prop: true for viewing history, false for creating
	historyData = null, // New prop: data from history
}) {
	const cardStore = useCardStore();
	const toast = useToast();
	const [isDragging, setIsDragging] = useState(false);
	const [startPos, setStartPos] = useState({ x: 0, scrollLeft: 0 });
	const containerRef = useRef(null);
	const [humanRating, setHumanRating] = useState(0);
	const [hoveredStar, setHoveredStar] = useState(0);

	// Use either history data or store data
	const displayData = viewMode
		? {
				cards: historyData?.kartu_list || [],
				socialStory: historyData?.output_text || "",
				perplexityScore: historyData?.perplexity_score || null,
				kisahId: historyData?.kisah_id || null,
				existingRating: historyData?.score_human || 0,
		  }
		: {
				cards: cardStore.selectedCard || [],
				socialStory: cardStore.socialStories || "",
				perplexityScore: cardStore.perplexityScore || null,
				kisahId: cardStore.kisahId || null,
				existingRating: 0,
		  };

	const handleDrag = (clientX) => {
		setIsDragging(true);
		const container = containerRef.current;
		setStartPos({
			x: clientX - container.offsetLeft,
			scrollLeft: container.scrollLeft,
		});
	};

	const handleDragMove = (clientX) => {
		if (!isDragging) return;
		const container = containerRef.current;
		const x = clientX - container.offsetLeft;
		const walk = (x - startPos.x) * 2;
		container.scrollLeft = startPos.scrollLeft - walk;
	};

	const handleEnd = () => setIsDragging(false);

	const [textToSpeak, setTextToSpeak] = useState("");
	const [shouldSpeak, setShouldSpeak] = useState(false);

	const { speechStatus, start, pause, stop } = useSpeech({
		text: textToSpeak,
		pitch: 1,
		rate: 1,
		volume: 1,
		lang: "id-ID",
	});

	const readStories = () => {
		const textToRead = displayData.socialStory;
		console.log(textToRead);
		setTextToSpeak(textToRead);
		setShouldSpeak(true);
	};

	useEffect(() => {
		if (shouldSpeak && textToSpeak) {
			start();
			setShouldSpeak(false);
		}
	}, [textToSpeak, shouldSpeak]);

	// Reset rating when modal opens
	useEffect(() => {
		if (isOpen) {
			setHumanRating(displayData.existingRating);
			setHoveredStar(0);
		}
	}, [isOpen, displayData.existingRating]);

	const handleStarClick = async (rating) => {
		if (!displayData.kisahId) {
			toast({
				title: "Error",
				description: "Kisah ID tidak ditemukan.",
				status: "error",
				duration: 3000,
				isClosable: true,
			});
			return;
		}

		setHumanRating(rating);

		try {
			const success = await addRatings({
				kisah_id: displayData.kisahId,
				ratings: rating,
			});

			if (success) {
				toast({
					title: "Berhasil!",
					description: `Penilaian ${rating} bintang telah disimpan.`,
					status: "success",
					duration: 3000,
					isClosable: true,
				});
			}
		} catch (error) {
			toast({
				title: "Gagal",
				description: "Gagal menyimpan penilaian.",
				status: "error",
				duration: 3000,
				isClosable: true,
			});
			console.error("Error:", error);
		}
	};

	const StarRating = () => (
		<HStack spacing={1}>
			{[1, 2, 3, 4, 5].map((star) => (
				<Icon
					key={star}
					as={
						star <= (hoveredStar || humanRating)
							? FaStar
							: FaRegStar
					}
					color={
						star <= (hoveredStar || humanRating)
							? "yellow.400"
							: "gray.300"
					}
					boxSize={6}
					cursor="pointer"
					transition="all 0.2s"
					_hover={{ transform: "scale(1.2)" }}
					onClick={() => handleStarClick(star)}
					onMouseEnter={() => setHoveredStar(star)}
					onMouseLeave={() => setHoveredStar(0)}
				/>
			))}
		</HStack>
	);

	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose} size="5xl">
				<ModalOverlay />
				<ModalContent>
					<ModalHeader
						fontSize="3xl"
						fontWeight="bold"
						textAlign="center"
						pb={2}
					>
						{viewMode ? "Detail Kisah Sosial" : "Kisah Sosial"}
					</ModalHeader>

					<ModalBody px={6}>
						<VStack align="stretch" spacing={4}>
							{/* Cards Section */}
							<Box>
								<Text
									fontSize="lg"
									fontWeight="semibold"
									mb={3}
									color="blue.600"
								>
									📚 Kartu yang Dipilih
								</Text>
								<Flex
									flexDir={"row"}
									ref={containerRef}
									overflowX="hidden"
									cursor={isDragging ? "grabbing" : "grab"}
									userSelect="none"
									onMouseDown={(e) => handleDrag(e.pageX)}
									onMouseMove={(e) => handleDragMove(e.pageX)}
									onMouseUp={handleEnd}
									onMouseLeave={handleEnd}
									onTouchStart={(e) =>
										handleDrag(e.touches[0].clientX)
									}
									onTouchMove={(e) =>
										handleDragMove(e.touches[0].clientX)
									}
									onTouchEnd={handleEnd}
									overflowY={"hidden"}
									p={2}
									bg="gray.50"
									borderRadius="lg"
									border="2px dashed"
									borderColor="gray.300"
								>
									<Box
										position="relative"
										display="flex"
										gap={4}
									>
										{displayData.cards.length === 0 ? (
											<Text
												color="gray.500"
												fontSize="md"
											>
												Belum ada kartu yang dipilih
											</Text>
										) : (
											displayData.cards.map(
												(card, index) => (
													<Box key={index}>
														<AACCard
															card={
																viewMode
																	? {
																			gambar: card.gambar,
																			label: card.label,
																	  }
																	: card
															}
														/>
													</Box>
												)
											)
										)}
									</Box>
								</Flex>
							</Box>

							<Divider />

							{/* Social Story Section */}
							<Box>
								<Flex
									justify="space-between"
									align="center"
									mb={3}
								>
									<Text
										fontSize="lg"
										fontWeight="semibold"
										color="purple.600"
									>
										📖 Cerita Sosial
									</Text>
									<Button
										leftIcon={<HiMiniSpeakerWave />}
										colorScheme="green"
										size="sm"
										onClick={() => readStories()}
										isDisabled={!displayData.socialStory}
									>
										Dengarkan
									</Button>
								</Flex>
								<Box
									w="100%"
									border="2px solid"
									borderColor="purple.200"
									borderRadius="lg"
									p={5}
									bg="purple.50"
									minH="150px"
								>
									{!displayData.socialStory ? (
										<Text color="gray.500" fontSize="md">
											Belum ada cerita sosial yang dibuat
										</Text>
									) : (
										<Text
											whiteSpace="pre-wrap"
											fontSize={"16px"}
											letterSpacing={0.5}
											lineHeight="tall"
											color="gray.700"
										>
											{displayData.socialStory}
										</Text>
									)}
								</Box>
							</Box>

							<Divider />

							{/* Evaluation Section */}
							<Box
								bg="gradient-to-r"
								bgGradient="linear(to-r, blue.50, purple.50)"
								borderRadius="lg"
								p={5}
								border="2px solid"
								borderColor="blue.200"
							>
								<VStack align="stretch" spacing={4}>
									<Text
										fontSize="lg"
										fontWeight="bold"
										color="blue.700"
										textAlign="center"
									>
										📊 Evaluasi Cerita
									</Text>

									{/* Perplexity Score */}
									<Box>
										<HStack justify="space-between" mb={2}>
											<Text
												fontSize="md"
												fontWeight="medium"
												color="gray.700"
											>
												Skor Perplexity:
											</Text>
											<Badge
												colorScheme="blue"
												fontSize="lg"
												px={3}
												py={1}
												borderRadius="full"
											>
												{displayData.perplexityScore?.toFixed(
													2
												) || "N/A"}
											</Badge>
										</HStack>
										<Text fontSize="xs" color="gray.600">
											Skor yang lebih rendah menunjukkan
											cerita yang lebih mudah dipahami
										</Text>
									</Box>

									<Divider borderColor="blue.300" />

									{/* Rating Section */}
									<Box>
										{humanRating === 0 ? (
											<Box>
												<Text
													fontSize="md"
													fontWeight="medium"
													color="gray.700"
													mb={3}
													textAlign="center"
												>
													⭐ Beri Penilaian Kamu:
												</Text>
												<Flex justify="center" mb={2}>
													<StarRating />
												</Flex>
												<Text
													fontSize="xs"
													color="gray.600"
													textAlign="center"
													mt={2}
												>
													Klik bintang untuk memberi
													penilaian
												</Text>
											</Box>
										) : (
											<Box>
												<Text
													fontSize="sm"
													color="green.600"
													textAlign="center"
													fontWeight="medium"
													mb={2}
												>
													{viewMode &&
													displayData.existingRating >
														0
														? `Penilaian sebelumnya: ${displayData.existingRating} bintang ⭐`
														: `Terima kasih! Kamu memberi ${humanRating} bintang ⭐`}
												</Text>
												<Flex justify="center">
													<StarRating />
												</Flex>
												<Text
													fontSize="xs"
													color="gray.600"
													textAlign="center"
													mt={2}
												>
													Klik bintang untuk mengubah
													penilaian
												</Text>
											</Box>
										)}
									</Box>
								</VStack>
							</Box>
						</VStack>
					</ModalBody>

					<Flex
						justify="flex-end"
						align="center"
						mt={4}
						px={6}
						py={4}
						borderTop="1px solid"
						borderColor="gray.200"
					>
						<Button
							colorScheme="red"
							variant="outline"
							onClick={onClose}
							size="lg"
						>
							Tutup
						</Button>
					</Flex>
				</ModalContent>
			</Modal>
		</>
	);
}
