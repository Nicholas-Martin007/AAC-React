import { Center, Flex, Spinner, Text } from "@chakra-ui/react";
import { colorList } from "../../Settings/ColorSetting";

export default function Loading({ isLoading }) {
    if (!isLoading) return null;

    return (
        <Flex
            position="fixed"
            top="0"
            left="0"
            width="100vw"
            height="100vh"
            bg="rgba(0, 0, 0, 0.4)"
            zIndex="3"
            align="center"
            justify="center"
            color="white"
        >
            <Spinner size="xl" color={colorList.green} mb={4} mx={4} />
            <Text fontSize="xl"> Lagi buat...</Text>
        </Flex>
    );
}
