import { Box, Button, Flex, Icon, Text } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { colorList } from "../../Settings/ColorSetting";
import { IoMdRefresh } from "react-icons/io";
import { padding } from "../../Settings/PaddignSetting";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { MdAutoStories, MdRefresh } from "react-icons/md";
import ActionButton from "../../Components/Button/ActionButton";

export default function SelectedCardHome() {
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
			h="210px"
			w="100%"
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
			>
				{Array.from({ length: 15 }).map((_, i) => (
					<Box
						key={i}
						m={"16px 4px 0px 16px"}
						h="172px"
						flexShrink={0}
						onClick={handleBoxClick}
					>
						<Flex
							w="100%"
							h="100%"
							bgColor={colorList.bgGray}
							borderRadius={8}
							flexDirection="column"
							justifyContent="flex-end"
							p={2}
						>
							<Box
								w={"120px"}
								h={"120px"}
								bgColor={colorList.white}
							></Box>
							<Box h="24px" />
							<Text
								align="center"
								fontSize="14px"
								letterSpacing="1px"
							>
								Tjokro Aminoto
							</Text>
						</Flex>
					</Box>
				))}
				<Box w="308px" h="200px" flexShrink={0} />
				<Box
					w="292px"
					h="210px"
					pos="fixed"
					bottom="0"
					right="0"
					pt={"16px"}
					pl={"8px"}
					gap={2}
					borderLeft={"2px"}
					borderTop={"2px"}
					borderColor={colorList.darkGreen}
					bgColor={colorList.white}
				>
					<Flex h="45%" justify="center" align="center">
						<ActionButton title={"Reset"} icon={MdRefresh} />
						<ActionButton
							title={"Suara"}
							icon={HiMiniSpeakerWave}
						/>
					</Flex>

					<Flex h="45%" justify="center" align="center">
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
