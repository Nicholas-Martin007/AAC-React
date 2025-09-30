import { Box, Flex, Text } from "@chakra-ui/react";
import NavigationBar from "../NavigationBar";
import { usePageStore } from "../../Store/usePageStore";
import { colorList } from "../../Settings/ColorSetting";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function MainContainer({ title, children }) {
	const pageStore = usePageStore();
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 0);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);
	return (
		<>
			<Box pos={"fixed"} w={"100%"} bg={colorList.white} zIndex={1}>
				<Flex justify={"flex-end"} align={"center"} position="relative">
					<AnimatePresence>
						{isScrolled && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.3 }}
								style={{
									position: "absolute",
									bottom: 0,
									left: 0,
									right: 0,
									height: "2px",
									backgroundColor: "#E2E8F0", // gray.200
								}}
							/>
						)}
					</AnimatePresence>

					<Box
						bg={"gray.200"}
						p={"34px 48px 16px 12px"}
						mb={"2px"}
						bgColor={colorList.darkGreen}
					>
						<Text
							fontSize={"16px"}
							fontWeight={"semibold"}
							letterSpacing={"1px"}
							textTransform={"uppercase"}
							color={colorList.white}
						>
							AAC Application
						</Text>
					</Box>
				</Flex>
			</Box>
			<NavigationBar />

			<Box pl={pageStore.isOpen ? "360px" : "0px"} pt={"84px"}>
				{children}
			</Box>
		</>
	);
}
