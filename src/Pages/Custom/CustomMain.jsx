import {
	Box,
	Button,
	Center,
	Flex,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Input,
	SimpleGrid,
	Text,
	VStack,
	Icon,
	Image,
	useToast,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import MainContainer from "../../Components/Container/MainContainer";
import { usePageStore } from "../../Store/usePageStore";
import { colorList } from "../../Settings/ColorSetting";
import { IoMdAdd, IoMdImage, IoMdClose } from "react-icons/io";
import CustomSelectImage from "./CustomSelectImage";
import { useCustomStore } from "../../Store/useCustomStore";

export default function CustomMain({ title, children }) {
	const pageStore = usePageStore();
	const customStore = useCustomStore();
	const toast = useToast();
	const fileInputRef = useRef(null);

	const validateForm = () => {
		const newErrors = {};

		if (!customStore.formData.label.trim()) {
			newErrors.label = "Label is required";
		}

		if (!customStore.formData.image) {
			newErrors.image = "Please select an image";
		}

		customStore.setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = () => {
		if (validateForm()) {
			console.log("Form submitted:", customStore.formData);
			toast({
				position: "top-right",
				title: "Success!",
				description: "Item added successfully",
				status: "success",
				duration: 1000,
				isClosable: true,
			});

			customStore.setFormData({
				label: "",
				image: null,
				imagePreview: null,
			});
			if (fileInputRef.current) {
				fileInputRef.current.value = "";
			}
		}
	};

	return (
		<MainContainer>
			<Center>
				<Box
					p="32px"
					my={"32px"}
					mx={pageStore.isOpen ? "64px " : "196px"}
					bgColor={colorList.bgGray}
					borderRadius="8px"
				>
					<SimpleGrid columns={2} spacing={8} h="100%">
						<CustomSelectImage fileInputRef={fileInputRef} />

						<Box
							bg={colorList.white}
							h="600px"
							borderRadius="12px"
							p="32px"
							display="flex"
							flexDir="column"
							gap="24px"
							boxShadow="md"
						>
							<Text fontSize="36px" fontWeight="bold">
								Add New Card
							</Text>

							<FormControl
								isInvalid={customStore.errors.label}
								flex={1}
							>
								<FormLabel
									fontSize="18px"
									fontWeight="semibold"
									mb={3}
								>
									Label
								</FormLabel>
								<Input
									placeholder="Enter label"
									size="lg"
									fontSize="20px"
									h="56px"
									p="16px"
									borderRadius="8px"
									borderWidth="2px"
									value={customStore.formData.label}
									onChange={(e) => {
										customStore.setFormData({
											...customStore.formData,
											label: e.target.value,
										});
										if (customStore.errors.label) {
											customStore.setErrors({
												...customStore.errors,
												label: "",
											});
										}
									}}
									_focus={{
										borderColor: colorList.green,
										boxShadow: `0 0 0 1px ${colorList.green}`,
									}}
								/>
								{customStore.errors.label && (
									<FormErrorMessage fontSize="14px">
										{customStore.errors.label}
									</FormErrorMessage>
								)}
							</FormControl>

							<Button
								justifyContent="center"
								w="100%"
								h="64px"
								bg={colorList.green}
								boxShadow={`-2px 2px ${colorList.darkGreen}`}
								_hover={{
									bg: colorList.darkGreen,
									color: "white",
									boxShadow: `-4px 4px ${colorList.green}`,
								}}
								_active={{
									boxShadow: `inset -1px 2px 4px ${colorList.darkGreen}`,
									transform:
										"translateX(-1px) translateY(1px)",
									bg: colorList.green,
								}}
								onClick={handleSubmit}
								leftIcon={<IoMdAdd size="24px" />}
							>
								<Text
									fontSize="24px"
									fontWeight="semibold"
									textTransform="uppercase"
									letterSpacing={1}
								>
									Add Card
								</Text>
							</Button>
						</Box>
					</SimpleGrid>
				</Box>
			</Center>
		</MainContainer>
	);
}
