import {
	Box,
	Button,
	Flex,
	Icon,
	Spacer,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState, useEffect } from "react";
import { colorList } from "../../Settings/ColorSetting";
import { IoMdRefresh } from "react-icons/io";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { MdAutoStories, MdRefresh } from "react-icons/md";
import ActionButton from "../../Components/Button/ActionButton";
import AACCard from "../../Components/Card/AACCard";
import { usePageStore } from "../../Store/usePageStore";
import { uploadImages } from "../../utils/uploadImages";
import { useAACCardStore } from "../../Store/useAACCardStore";
import SSModal from "../../Components/Modal/SSModal";
import { Spinner } from "@chakra-ui/react";

export default function SelectedCardHome() {
	const pageStore = usePageStore();
	const aacCardStore = useAACCardStore();

	const { isOpen, onOpen, onClose } = useDisclosure(); // Social Stories Modal

	const [isDragging, setIsDragging] = useState(false);
	const [startPos, setStartPos] = useState({ x: 0, scrollLeft: 0 });
	const containerRef = useRef(null);

	const [isLoading, setIsLoading] = useState(false);

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

	const removeCard = (index) => {
		const result = aacCardStore.selectedAACCard.filter(
			(item, i) => i !== index
		);
		console.log("Result:");
		console.log(result);
		aacCardStore.setSelectedAACCard(result);
	};

	const generateSocialStory = async () => {
		const labels = aacCardStore.selectedAACCard.map((card) => {
			return card.label;
		});

		console.log(labels);

		const result = await fetch("http://localhost:8000/api/generate/", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ input: labels }),
		});
		const data = await result.json();
		console.log(data.story);

		aacCardStore.setSocialStories(data.story);
	};

	const [borderColor, setBorderColor] = useState("transparent");

	useEffect(() => {
		const handleScroll = () => {
			const scrollY = window.scrollY;
			const opacity = Math.min(scrollY / 100, 1); // smooth fade
			setBorderColor(`rgba(0, 100, 0, ${opacity})`); // adjust RGB to your dark green
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

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
				onMouseDown={(e) => handleDrag(e.pageX)}
				onMouseMove={(e) => handleDragMove(e.pageX)}
				onMouseUp={handleEnd}
				onMouseLeave={handleEnd}
				onTouchStart={(e) => handleDrag(e.touches[0].clientX)}
				onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
				onTouchEnd={handleEnd}
				overflowY={"hidden"}
			>
				{aacCardStore.selectedAACCard.map((card, index) => (
					<AACCard
						key={index}
						card={card}
						onClick={() => !isDragging && removeCard(index)}
					/>
				))}
				<Box w="276px" h="200px" flexShrink={0} />
				<Box
					w="276px"
					h="218px"
					pos="fixed"
					top="0"
					right="0"
					p={"4px"}
					borderLeft={"2px"}
					borderColor={colorList.darkGreen}
					bgColor={colorList.white}
				>
					<Flex h="33%" justify="center" align="center">
						<ActionButton title={"Reset"} icon={MdRefresh} />
					</Flex>
					<Flex h="33%" justify="center" align="center">
						<ActionButton
							title={"Suara"}
							onClick={() => uploadImages()}
							icon={HiMiniSpeakerWave}
						/>
					</Flex>
					<Flex h="33%" justify="center" align="center">
						<ActionButton
							title={
								isLoading ? (
									<Flex align="center" gap={2}>
										<Spinner size="sm" color="green.500" />
										Loading...
									</Flex>
								) : (
									"Buat Kisah Sosial"
								)
							}
							icon={MdAutoStories}
							onClick={async () => {
								setIsLoading(true);
								await generateSocialStory();
								setIsLoading(false);
								onOpen();
							}}
						/>
					</Flex>
					<SSModal isOpen={isOpen} onClose={onClose} />
				</Box>
			</Flex>
		</Box>
	);
}
