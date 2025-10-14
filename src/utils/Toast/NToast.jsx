// utils/NToast.js
import { useToast } from "@chakra-ui/react";

export const useNToast = () => {
	const toast = useToast();

	const show = ({ title = "Info", description = "", status = "info" }) => {
		toast({
			title,
			description,
			status,
			duration: 3000,
			isClosable: true,
		});
	};

	return show;
};
