import { Box, Text } from "@chakra-ui/react";
import AppBar from "../AppBar";
import { usePageStore } from "../../Store/usePageStore";

export default function MainContainer({ title, children }) {
    const pageStore = usePageStore();
    return (
        <Box>
            <AppBar />
            <Box bg={"white"} pl={pageStore.isOpen ? "360px" : "0"}>
                {children}
            </Box>
        </Box>
    );
}
