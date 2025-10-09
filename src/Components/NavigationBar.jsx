import { Box, Button, Flex } from "@chakra-ui/react";
import MenuButton from "./Button/MenuButton";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { usePageStore } from "../Store/usePageStore";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BsThreeDotsVertical } from "react-icons/bs";
import { colorList } from "../Settings/ColorSetting";

export default function NavigationBar() {
	const { page, isOpen, setPage, setIsOpen } = usePageStore();
	const [isButton, setIsButton] = useState(true);

	useEffect(() => {
		setPage([
			{ title: "Home", link: "/Home" },
			{ title: "Custom", link: "/Custom" },
			{ title: "History", link: "/History" },
			{ title: "About", link: "/About", isBorder: false },
		]);
	}, []);

	useEffect(() => {
		if (isOpen) {
			setIsButton(false);
		} else {
			const timer = setTimeout(() => {
				setIsButton(true);
			}, 250);
			return () => clearTimeout(timer);
		}
	}, [isOpen]);

	return (
		<>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ x: -360 }}
						animate={{ x: 0 }}
						exit={{ x: -360 }}
						transition={{ duration: 0.3, ease: "easeInOut" }}
						style={{
							position: "fixed",
							width: "360px",
							height: "100vh",
							backgroundColor: "white",
							borderRight: "2px solid #E2E8F0",
							zIndex: 2,
						}}
					>
						<Flex h={"72px"} align={"center"} justify={"flex-end"}>
							<Button
								py="36px"
								px="24px"
								borderRadius={0}
								onClick={() => setIsOpen(false)}
								bgColor={"transparent"}
							>
								<IoMdClose size="28px" />
							</Button>
						</Flex>
						<Box m={"48px 20px"}>
							{page.map((menu, i) => (
								<MenuButton
									key={i}
									title={menu.title}
									link={menu.link}
									isBorder={menu.isBorder}
								/>
							))}
						</Box>
					</motion.div>
				)}
			</AnimatePresence>
			{isButton && (
				<Button
					p={"36px 0px"}
					m={0}
					onClick={() => setIsOpen(true)}
					pos={"fixed"}
					borderRadius={0}
					borderRightRadius={"8px"}
					left={0}
					top="50%"
					bg={colorList.green}
					boxShadow={`-2px 2px  ${colorList.darkGreen}`}
					_hover={{
						bg: colorList.darkGreen,
						color: "white",
						boxShadow: `-4px 4px ${colorList.green}`,
					}}
					_active={{
						boxShadow: `inset -1px 2px 4px ${colorList.darkGreen}`,
						transform: "translateX(-1px) translateY(1px)",
						color: "black",
					}}
					zIndex={2}
				>
					<BsThreeDotsVertical size="36px" />
				</Button>
			)}
		</>
	);
}
