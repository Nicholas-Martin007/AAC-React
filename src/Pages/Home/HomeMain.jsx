import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import MainContainer from "../../Components/Container/MainContainer";
import { useRef, useState } from "react";

export default function HomeMain() {
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

    const handleBoxClick = () => {
        console.log("AAA");
        if (!isDragging) console.log("Box clicked!");
    };

    return (
        <>
            <MainContainer title="">
                <Box>
                    <SimpleGrid columns={5}>
                        {Array.from({ length: 48 }).map((_, i) => (
                            <Box
                                key={i}
                                border="1px"
                                borderColor="gray.200"
                                h="256px"
                                p="20px"
                            >
                                <Box
                                    w="100%"
                                    h="160px"
                                    bgColor="rebeccapurple"
                                />
                                <Box h="24px" />
                                <Text
                                    align="center"
                                    fontSize="20px"
                                    letterSpacing="2px"
                                >
                                    Tjokro Aminoto
                                </Text>
                            </Box>
                        ))}
                    </SimpleGrid>
                </Box>
            </MainContainer>

            <Box
                pos="fixed"
                bottom="0"
                h="200px"
                w="100%"
                borderTop="2px"
                borderColor="#346332"
                bgColor="#f2f5f3"
            >
                <Flex
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
                >
                    {Array.from({ length: 10 }).map((_, i) => (
                        <Box
                            key={i}
                            m={"16px 16px 0px 16px"}
                            w="160px"
                            h="160px"
                            bg="rebeccapurple"
                            flexShrink={0}
                            onClick={handleBoxClick}
                        />
                    ))}
                    <Box
                        w="240px"
                        h="200px"
                        bg="green"
                        flexShrink={0}
                        position="sticky"
                        right={0}
                    >
                        <Box w={"100%"} h={"50%"} bgColor={"red"}>
                            <Text>Reset</Text>
                        </Box>
                        <Box w={"100%"} h={"50%"} bgColor={"yellow"}>
                            <Text>Hasilkan Cerita</Text>
                        </Box>
                    </Box>
                </Flex>
            </Box>
        </>
    );
}
