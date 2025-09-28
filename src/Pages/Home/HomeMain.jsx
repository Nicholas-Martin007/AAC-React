import { Box, Flex, Text } from "@chakra-ui/react";
import MainContainer from "../../Components/Container/MainContainer";

export default function HomeMain() {
    return (
        <Box>
            <MainContainer title="">
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
            </MainContainer>
        </Box>
    );
}
