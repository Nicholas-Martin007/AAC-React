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
} from "@chakra-ui/react";
import { useCardStore } from "../../Store/useCardStore";
import { useEffect, useRef, useState } from "react";
import AACCard from "../Card/AACCard";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useSpeech } from "react-text-to-speech";
import { addRatings } from "../../utils/addRatings";
import { colorList } from "../../Settings/ColorSetting";
import { useNToast } from "../../utils/Toast/NToast";

export default function StoryModal({
    isOpen,
    onClose,
    viewMode = false,
    historyData = null,
}) {
    const cardStore = useCardStore();
    const [humanRating, setHumanRating] = useState(0);
    const [hoveredStar, setHoveredStar] = useState(0);

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
              socialStory: cardStore.story || "",
              perplexityScore: cardStore.perplexityScore || null,
              kisahId: cardStore.kisahId || null,
              existingRating: 0,
          };

    const showToast = useNToast();

    // Reset rating on open
    useEffect(() => {
        if (isOpen) {
            setHumanRating(displayData.existingRating);
            setHoveredStar(0);
        }
    }, [isOpen, displayData.existingRating]);

    const handleStarClick = async (rating) => {
        setHumanRating(rating);
        try {
            console.log("display: ", JSON.stringify(displayData.kisahId));
            const success = await addRatings({
                kisahId: displayData.kisahId,
                ratings: rating,
            });

            if (success) {
                showToast({
                    title: "Berhasil!",
                    description: `Penilaian ${rating} bintang telah disimpan.`,
                    status: "success",
                });
                if (historyData) {
                    historyData.score_human = rating; // Update selected story
                }
            }
        } catch (error) {
            showToast({
                title: "Gagal",
                description: "Gagal menyimpan penilaian.",
                status: "error",
            });
            console.error(error);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="5xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader
                    fontSize="3xl"
                    fontWeight="bold"
                    textAlign="center"
                >
                    {viewMode ? "Detail Kisah Sosial" : "Kisah Sosial"}
                </ModalHeader>
                <ModalBody px={6}>
                    <VStack align="stretch" spacing={4}>
                        <CardSection
                            cards={displayData.cards}
                            viewMode={viewMode}
                        />
                        <Divider />
                        <SocialStorySection story={displayData.socialStory} />
                        <Divider />
                        <EvaluationSection
                            displayData={displayData}
                            humanRating={humanRating}
                            setHoveredStar={setHoveredStar}
                            hoveredStar={hoveredStar}
                            handleStarClick={handleStarClick}
                        />
                        <CloseButton onClose={onClose} />
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

function CardSection({ cards, viewMode }) {
    const containerRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, scrollLeft: 0 });

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

    return (
        <Box>
            <Text fontSize="lg" fontWeight="semibold" mb={3}>
                Kartu yang dipilih
            </Text>
            <Flex
                flexDir="row"
                ref={containerRef}
                overflowX="hidden"
                cursor={isDragging ? "grabbing" : "grab"}
                userSelect="none"
                onMouseDown={(e) => handleDrag(e.pageX)}
                onMouseMove={(e) => handleDragMove(e.pageX)}
                onMouseUp={handleEnd}
                onMouseLeave={handleEnd}
                onTouchStart={(e) => handleDrag(e.touches[0].clientX)}
                onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
                onTouchEnd={handleEnd}
                overflowY="hidden"
                p={2}
                bg="gray.50"
                borderRadius="lg"
                border="2px dashed"
                borderColor="gray.300"
            >
                <Box display="flex" gap={4}>
                    {cards.length === 0 ? (
                        <Text color="gray.500">
                            Belum ada kartu yang dipilih
                        </Text>
                    ) : (
                        cards.map((card, idx) => (
                            <AACCard
                                key={idx}
                                card={
                                    viewMode
                                        ? {
                                              gambar: card.gambar,
                                              label: card.label,
                                          }
                                        : card
                                }
                            />
                        ))
                    )}
                </Box>
            </Flex>
        </Box>
    );
}

function SocialStorySection({ story }) {
    const [textToSpeak, setTextToSpeak] = useState("");
    const [shouldSpeak, setShouldSpeak] = useState(false);
    const { start } = useSpeech({ text: textToSpeak, lang: "id-ID" });

    const readStories = () => {
        setTextToSpeak(story);
        setShouldSpeak(true);
    };

    useEffect(() => {
        if (shouldSpeak && textToSpeak) {
            start();
            setShouldSpeak(false);
        }
    }, [shouldSpeak, textToSpeak]);

    return (
        <Box>
            <Flex justify="space-between" align="center" mb={3}>
                <Text fontSize="lg" fontWeight="semibold">
                    Kisah Sosial
                </Text>
                <Button
                    w={"130px"}
                    rightIcon={<HiMiniSpeakerWave />}
                    colorScheme="green"
                    onClick={readStories}
                    isDisabled={!story}
                >
                    Dengarkan
                </Button>
            </Flex>
            <Box
                border="2px solid"
                borderColor="gray.300"
                borderRadius="lg"
                p={5}
                bg="gray.50"
                minH="150px"
            >
                <Text whiteSpace="pre-wrap" letterSpacing={1}>
                    {story}
                </Text>
            </Box>
        </Box>
    );
}

function EvaluationSection({
    displayData,
    humanRating,
    hoveredStar,
    setHoveredStar,
    handleStarClick,
}) {
    return (
        <>
            <Text fontSize="lg" fontWeight="bold" textAlign="start">
                Evaluasi Cerita
            </Text>
            <Box
                bg={"gray.50"}
                borderRadius="lg"
                p={5}
                border="2px solid"
                borderColor="gray.300"
            >
                <Text>
                    Skor Perplexity:{" "}
                    {displayData.perplexityScore?.toFixed(2) || "N/A"}
                </Text>
                <Text fontSize="xs" color="gray.600">
                    Skor rendah menunjukkan kisah sosial yang mudah dipahami
                </Text>
                <RatingSection
                    humanRating={humanRating}
                    hoveredStar={hoveredStar}
                    setHoveredStar={setHoveredStar}
                    handleStarClick={handleStarClick}
                    displayData={displayData}
                />
            </Box>
        </>
    );
}

function RatingSection({
    humanRating,
    hoveredStar,
    setHoveredStar,
    handleStarClick,
    displayData,
}) {
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
        <Box>
            {humanRating === 0 ? (
                <Box>
                    <Text mb={3} textAlign="center">
                        Beri Penilaian Kamu:
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
                        Klik bintang untuk memberi penilaian
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
                        {displayData.existingRating > 0
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
                        Klik bintang untuk mengubah penilaian
                    </Text>
                </Box>
            )}
        </Box>
    );
}

function CloseButton({ onClose }) {
    return (
        <Box>
            <Flex justify="flex-end">
                <Button
                    w="130px"
                    colorScheme="red"
                    bg={colorList.red}
                    onClick={onClose}
                >
                    <Text
                        textAlign={"center"}
                        fontSize="18px"
                        fontWeight="semibold"
                        letterSpacing={1}
                    >
                        Tutup
                    </Text>
                </Button>
            </Flex>
        </Box>
    );
}
