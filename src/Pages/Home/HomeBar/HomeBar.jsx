import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import { useRef, useState, useEffect } from "react";
import { colorList } from "../../../Settings/ColorSetting";
import AACCard from "../../../Components/Card/AACCard";
import { usePageStore } from "../../../Store/usePageStore";
import { useCardStore } from "../../../Store/useCardStore";
import { HomeActionButton } from "./HomeActionButton";
import { useLocation } from "react-router-dom";

export default function HomeBar() {
	const pageStore = usePageStore();
	const cardStore = useCardStore();

	const { isOpen, onOpen, onClose } = useDisclosure();
	const { pathname } = useLocation();

	const [isDragging, setIsDragging] = useState(false);
	const [startPos, setStartPos] = useState({ x: 0, scrollLeft: 0 });
	const containerRef = useRef(null);

	const handleDrag = (clientX) => {
		setIsDragging(true);
		const container = containerRef.current;
		setStartPos({
			x: clientX - container.offsetLeft,
			scrollLeft: container.scrollLeft,
		});
	};

	const handleDragMove = (clientX) => {
		if (!isDragging) return;
		const container = containerRef.current;
		const x = clientX - container.offsetLeft;
		const walk = (x - startPos.x) * 2;
		container.scrollLeft = startPos.scrollLeft - walk;
	};

	const handleEnd = () => {
		setIsDragging(false);
	};

	const removeCard = (index) => {
		const result = cardStore.selectedCard.filter((item, i) => i !== index);
		console.log("Result:");
		console.log(result);
		cardStore.setSelectedCard(result);
	};

	useEffect(() => {
		cardStore.setSelectedCard([]);
	}, [pathname]);

	return (
		<Box
			pos="fixed"
			top="0"
			h="220px"
			w="100%"
			pl={pageStore.isOpen && "360px"}
			borderBottom="2px"
			borderColor={colorList.darkGreen}
			bgColor={colorList.white}
		>
			<Flex
				flexDir={"row"}
				ref={containerRef}
				overflowX="hidden"
				cursor={isDragging ? "grabbing" : "grab"}
				userSelect="none"
				onMouseDown={(e) => {
					if (isOpen) return; // block drag
					handleDrag(e.pageX);
				}}
				onMouseMove={(e) => handleDragMove(e.pageX)}
				onMouseUp={handleEnd}
				onMouseLeave={handleEnd}
				onTouchStart={(e) => handleDrag(e.touches[0].clientX)}
				onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
				onTouchEnd={handleEnd}
				overflowY={"hidden"}
				p={2}
			>
				<Box position="relative" display="flex" gap={4}>
					{cardStore.selectedCard.map((card, index) => (
						<Box key={index}>
							<AACCard
								card={card}
								onClick={() => !isDragging && removeCard(index)}
							/>
						</Box>
					))}
				</Box>
				<Box w="276px" h="200px" flexShrink={0} />
				<HomeActionButton
					isModalOpen={isOpen}
					onModalOpen={onOpen}
					onModalClose={onClose}
				/>
			</Flex>
		</Box>
	);
}
