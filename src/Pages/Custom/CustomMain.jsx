import {
	Box,
	Button,
	Card,
	Center,
	Flex,
	IconButton,
	SimpleGrid,
	Spacer,
	Text,
	useToast,
} from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import MainContainer from "../../Components/Container/MainContainer";
import { usePageStore } from "../../Store/usePageStore";
import { useCustomStore } from "../../Store/useCustomStore";
import CustomForm from "./Form/CustomForm";
import { useAACCardStore } from "../../Store/useAACCardStore";
import AACCard from "../../Components/Card/AACCard";
import { colorList } from "../../Settings/ColorSetting";

export default function CustomMain({ title, children }) {
	const customStore = useCustomStore();
	const pageStore = usePageStore();
	const aacCardStore = useAACCardStore();

	const fileInputRef = useRef(null);

	useEffect(() => {
		aacCardStore.fetchCards();
	}, []);

	useEffect(() => {
		aacCardStore.fetchCards();
	}, [customStore.mode]);

	return (
		<MainContainer>
			{customStore.mode === "view" ? (
				<Box flexShrink={0}>
					<SimpleGrid
						columns={pageStore.isOpen ? 6 : 8}
						gap={4}
						p={4}
					>
						{aacCardStore.aacCard.filter(
							(item) => item.kategori === "custom"
						).length === 0 ? (
							<Center>No cards available</Center>
						) : (
							aacCardStore.aacCard
								.filter((item) => item.kategori === "custom")
								.map((item, index) => (
									<Box
										key={index}
										position="relative"
										display="flex"
										justifyContent="center"
										alignItems="center"
									>
										<AACCard card={item} cardSize="large" />
										<Flex
											position="absolute"
											top="10px"
											right="10px"
											zIndex={1}
											gap={1}
										>
											<IconButton
												size="sm"
												icon={<EditIcon />}
												colorScheme="blue"
												aria-label="Edit"
												onClick={(e) => {
													e.stopPropagation();
													customStore.setMode("edit");
													console.log(
														"Edit",
														item.label
													);
												}}
											/>
											<IconButton
												size="sm"
												icon={<DeleteIcon />}
												colorScheme="red"
												aria-label="Delete"
												onClick={(e) => {
													e.stopPropagation();
													console.log(
														"Delete",
														item.label
													);
												}}
											/>
										</Flex>
									</Box>
								))
						)}
						<Card
							flexShrink={0}
							h={"240px"}
							w={"180px"}
							border="2px dashed"
							borderColor={colorList.borderGray}
							borderRadius="8px"
							cursor="pointer"
							bg="gray.50"
							_hover={{
								borderColor: colorList.darkGreen,
								borderStyle: "solid",
								bg: "green.50",
							}}
							_active={{ transform: "scale(0.98)" }}
							transition="all 0.2s ease"
							display="flex"
							flexDir="column"
							alignItems="center"
							justifyContent="center"
							gap={2}
							onClick={() => customStore.setMode("add")}
						>
							<Text
								fontSize="64px"
								fontWeight="200"
								color={colorList.darkGray}
							>
								+
							</Text>
							<Text
								fontSize="16px"
								fontWeight="500"
								color={colorList.darkGray}
							>
								Add New Card
							</Text>
						</Card>
					</SimpleGrid>
					<Box h={"36px"} />
				</Box>
			) : (
				<CustomForm
					fileInputRef={fileInputRef}
					onCancel={() => customStore.setMode("view")}
				/>
			)}
		</MainContainer>
	);
}
