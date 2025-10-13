import { Box, Flex, Text } from "@chakra-ui/react";
import NavigationBar from "../NavigationBar";
import { usePageStore } from "../../Store/usePageStore";
import { colorList } from "../../Settings/ColorSetting";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function MainContainer({ title, children, isHome = false }) {
	const pageStore = usePageStore();
	return (
		<>
			<NavigationBar />
			<Box
				pl={pageStore.isOpen ? "360px" : "0px"}
				pt={isHome ? "220px" : "0px"}
			>
				{children}
			</Box>
		</>
	);
}
