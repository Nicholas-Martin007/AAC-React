import {
    Box,
    Button,
    Flex,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { useAACCardStore } from "../../Store/useAACCardStore";
import { useEffect, useRef, useState } from "react";
import AACCard from "../Card/AACCard";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import ActionButton from "../Button/ActionButton";
import { useSpeech } from "react-text-to-speech";

export default function SocialStoryModel({ isOpen, onClose }) {
    const aacCardStore = useAACCardStore();
    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, scrollLeft: 0 });
    const containerRef = useRef(null);

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
        const textToRead = aacCardStore.socialStories;

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

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size="5xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        fontSize="3xl"
                        fontWeight="bold"
                        textAlign="center"
                    >
                        Kisah Sosial
                    </ModalHeader>
                    <ModalBody>
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
                        >
                            <Box position="relative" display="flex" gap={4}>
                                {aacCardStore.selectedAACCard.map(
                                    (card, index) => (
                                        <Box key={index}>
                                            <AACCard card={card} />
                                        </Box>
                                    )
                                )}
                            </Box>
                        </Flex>

                        <Box
                            w="100%"
                            border="2px solid"
                            borderColor="gray.300"
                            borderRadius="md"
                            p={4}
                            mt={4}
                            bg="gray.50"
                        >
                            <Text
                                whiteSpace="pre-wrap"
                                fontSize={"16px"}
                                letterSpacing={1}
                            >
                                {aacCardStore.socialStories}
                            </Text>
                        </Box>
                    </ModalBody>
                    <Flex
                        justify="space-between"
                        align="center"
                        mt={6}
                        px={6}
                        py={4}
                        borderBottomRadius="md"
                    >
                        <Button
                            leftIcon={<HiMiniSpeakerWave />}
                            colorScheme="green"
                            onClick={() => readStories()}
                        >
                            Dengarkan
                        </Button>

                        <Button
                            colorScheme="red"
                            variant="outline"
                            onClick={onClose}
                        >
                            Tutup
                        </Button>
                    </Flex>
                </ModalContent>
            </Modal>
        </>
    );
}
