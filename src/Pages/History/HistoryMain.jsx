import {
    Box,
    SimpleGrid,
    Text,
    Flex,
    Heading,
    Center,
    IconButton,
    Tooltip,
    Button,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import MainContainer from "../../Components/Container/MainContainer";
import { colorList } from "../../Settings/ColorSetting";
import { useEffect } from "react";
import { useSocialStoryStore } from "../../Store/useSocialStoryStore";
import AACCard from "../../Components/Card/AACCard";
export default function HistoryMain() {
    const socialStoryStore = useSocialStoryStore();

    useEffect(() => {
        socialStoryStore.fetchStories();
    }, [socialStoryStore.fetchStories]); // Add dependency`

    // Add loading state
    if (socialStoryStore.isLoading) {
        return (
            <MainContainer>
                <Box p={6}>
                    <Center>Loading...</Center>
                </Box>
            </MainContainer>
        );
    }

    return (
        <MainContainer>
            <Box p={6}>
                <Heading mb={6}>Riwayat</Heading>

                {/* Header */}
                <SimpleGrid
                    templateColumns="120px 2fr 2fr 80px"
                    spacing={4}
                    bg={colorList.darkGreen}
                    p={4}
                    borderRadius="md"
                    color="white"
                    fontWeight="bold"
                    mb={4}
                >
                    <Text fontSize="sm">Tanggal</Text>
                    <Text>Kartu yang Digunakan</Text>
                    <Text>Kisah yang Dihasilkan</Text>
                    <Text fontSize="sm">Detail</Text>
                </SimpleGrid>

                {!socialStoryStore.stories ||
                socialStoryStore.stories.length === 0 ? (
                    <Center>No stories available</Center>
                ) : (
                    socialStoryStore.stories.map((item, index) => (
                        <SimpleGrid
                            key={item.kisah_id}
                            templateColumns="120px 2fr 2fr 80px"
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
                            <Text>{item.date || "N/A"}</Text>
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
                                        <Text fontSize="14px" fontWeight="bold">
                                            ... ({item.kartu_list.length - 5}{" "}
                                            more)
                                        </Text>
                                    )}
                            </Flex>

                            <Text noOfLines={2}>
                                {item.output_text || "N/A"}
                            </Text>
                            <Box>
                                <IconButton
                                    icon={<ViewIcon />}
                                    colorScheme="green"
                                    variant="ghost"
                                    size="lg"
                                    aria-label="View details"
                                    title="View Details"
                                    onClick={() => {
                                        console.log(
                                            "View details for ID:",
                                            item.kisah_id
                                        );
                                    }}
                                />
                            </Box>
                        </SimpleGrid>
                    ))
                )}
            </Box>
        </MainContainer>
    );
}
