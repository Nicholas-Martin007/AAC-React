import { Box, Flex, Text } from "@chakra-ui/react";
import NavigationBar from "../NavigationBar";
import { usePageStore } from "../../Store/usePageStore";

export default function MainContainer({ title, children }) {
    const pageStore = usePageStore();
    return (
        <>
            <Box>
                <Box pos={"fixed"} w={"100%"} bgColor={"white"}>
                    <Flex
                        borderBottom={"2px"}
                        borderColor={"gray.200"}
                        justify={"flex-end"}
                        align={"center"}
                    >
                        <Box
                            bg={"gray.200"}
                            pt={"34px"}
                            pl={"16px"}
                            pr={"16px"}
                            pb={"12px"}
                        >
                            <Text
                                fontSize={"16px"}
                                fontWeight={"semibold"}
                                letterSpacing={"1px"}
                                textTransform={"uppercase"}
                            >
                                AAC Application
                            </Text>
                        </Box>
                    </Flex>
                </Box>
                <NavigationBar />
            </Box>

            <Box pl={pageStore.isOpen ? "360px" : "0px"} pt={"72px"}>
                {children}
            </Box>
        </>
    );
}
