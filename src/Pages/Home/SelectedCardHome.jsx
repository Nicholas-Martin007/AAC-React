import { Box, Button, Flex, Icon, Spacer, Text } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { colorList } from "../../Settings/ColorSetting";
import { IoMdRefresh } from "react-icons/io";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { MdAutoStories, MdRefresh } from "react-icons/md";
import ActionButton from "../../Components/Button/ActionButton";
import AACCard from "../../Components/Card/AACCard";
import { usePageStore } from "../../Store/usePageStore";

export default function SelectedCardHome() {
	const { isOpen } = usePageStore();
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

	const handleEnd = () => setIsDragging(false);

	const handleBoxClick = () => {
		if (!isDragging) console.log("Box clicked!");
	};
	return (
		<Box
			pos="fixed"
			bottom="0"
			h="220px"
			w="100%"
			pl={isOpen && "360px"}
			borderTop="2px"
			borderColor={colorList.darkGreen}
			bgColor={colorList.white}
		>
			<Flex
				flexDir={"row"}
				ref={containerRef}
				overflowX="hidden"
				cursor={isDragging ? "grabbing" : "grab"}
				userSelect="none"
				onMouseDown={(e) => handleDrag(e.pageX)}
				onMouseMove={(e) => handleDragMove(e.pageX)}
				onMouseUp={handleEnd}
				onMouseLeave={handleEnd}
				onTouchStart={(e) => handleDrag(e.touches[0].clientX)}
				onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
				onTouchEnd={handleEnd}
				overflowY={"hidden"}
			>
				{Array.from({ length: 15 }).map((_, i) => (
					<AACCard
						key={i}
						card={{
							img: "/img/Halo.svg",
							label: "halo",
						}}
						cardHeight="200px"
						imageHeight="120px"
						imageWidth="120px"
						m="10px"
						p="10px"
						labelPt={"16px"}
					/>
				))}
				<Box w="276px" h="200px" flexShrink={0} />
				<Box
					w="276px"
					h="220px"
					pos="fixed"
					bottom="0"
					right="0"
					p={"4px"}
					borderLeft={"2px"}
					borderTop={"2px"}
					borderColor={colorList.darkGreen}
					bgColor={colorList.white}
				>
					<Flex h="33%" justify="center" align="center">
						<ActionButton title={"Reset"} icon={MdRefresh} />
					</Flex>
					<Flex h="33%" justify="center" align="center">
						<ActionButton
							title={"Suara"}
							icon={HiMiniSpeakerWave}
						/>
					</Flex>
					<Flex h="33%" justify="center" align="center">
						<ActionButton
							title={"Buat Kisah Sosial"}
							icon={MdAutoStories}
						/>
					</Flex>
				</Box>
			</Flex>
		</Box>
	);
}
