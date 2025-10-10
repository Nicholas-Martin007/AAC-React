import {
	Box,
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	Icon,
	Image,
	Input,
	Text,
} from "@chakra-ui/react";

import { useState, useRef } from "react";
import { useCustomStore } from "../../../Store/useCustomStore";
import { colorList } from "../../../Settings/ColorSetting";
import { IoMdClose, IoMdImage } from "react-icons/io";

export default function CustomSelectImage({ fileInputRef }) {
	const customStore = useCustomStore();

	const handleImageSelect = (file) => {
		if (file && file.type.startsWith("image/")) {
			const reader = new FileReader();
			reader.onloadend = () => {
				customStore.setFormData({
					...customStore.formData,
					image: reader.result,
				});
				customStore.setErrors({ ...customStore.errors, image: "" });
			};
			reader.readAsDataURL(file);
		} else {
			customStore.setErrors({
				...customStore.errors,
				image: "Please select a valid image file",
			});
		}
	};

	const handleFileInput = (e) => {
		const file = e.target.files[0];
		handleImageSelect(file);
	};

	const handleRemoveImage = () => {
		customStore.setFormData({
			...customStore.formData,
			image: null,
		});
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	return (
		<>
			<FormControl isInvalid={customStore.errors.image}>
				<Box
					border="8px dashed"
					borderColor={
						customStore.errors.image ? "red.400" : "gray.400"
					}
					borderRadius="8px"
					h="550px"
					w="500px"
					display="flex"
					alignItems="center"
					justifyContent="center"
					color="gray.500"
					cursor="pointer"
					bgColor={colorList.white}
					_hover={{
						bg: "gray.50",
						borderColor: colorList.green,
					}}
					transition="all 0.2s"
					position="relative"
					overflow="hidden"
					onClick={() => fileInputRef.current?.click()}
				>
					<Input
						type="file"
						ref={fileInputRef}
						accept="image/*"
						onChange={handleFileInput}
						display="none"
					/>

					{customStore.formData.image ? (
						<>
							<Box w="100%" p="16px">
								<Image
									src={customStore.formData.image}
									alt="Preview"
									w="100%"
									h="auto"
									borderRadius="12px"
									objectFit="contain"
									p="8px"
									bg="gray.50"
								/>
							</Box>
							<Button
								position="absolute"
								top="16px"
								right="16px"
								w="64px"
								h="64px"
								bg="red.500"
								color="white"
								borderRadius="full"
								boxShadow="lg"
								display="flex"
								alignItems="center"
								justifyContent="center"
								transition="all 0.2s ease"
								_hover={{
									bg: "red.600",
									transform: "scale(1.05)",
									boxShadow: "xl",
								}}
								_active={{
									bg: "red.700",
									transform: "scale(0.95)",
								}}
								onClick={(e) => {
									e.stopPropagation();
									handleRemoveImage();
								}}
							>
								<IoMdClose size="36px" />
							</Button>
						</>
					) : (
						<Flex flexDir={"column"} align={"center"}>
							<Icon
								as={IoMdImage}
								fontSize="64px"
								color="gray.400"
							/>
							<Text fontSize="24px" fontWeight="medium">
								Select Image
							</Text>
						</Flex>
					)}
				</Box>
				{customStore.errors.image && (
					<FormErrorMessage fontSize="14px" mt={2}>
						{customStore.errors.image}
					</FormErrorMessage>
				)}
			</FormControl>
		</>
	);
}
