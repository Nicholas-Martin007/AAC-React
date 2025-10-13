import { Box, Flex, Spinner, useDisclosure } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useCardStore } from "../../../Store/useCardStore";
import ActionButton from "../../../Components/Button/ActionButton";
import StoryModal from "../../../Components/Modal/StoryModal";
import { colorList } from "../../../Settings/ColorSetting";
import { MdAutoStories, MdRefresh } from "react-icons/md";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { useSpeech } from "react-text-to-speech";
import { GENERATE_URL } from "../../../Settings/DatabaseURL";

export function HomeActionButton({ isModalOpen, onModalOpen, onModalClose }) {
	const [isLoading, setIsLoading] = useState(false);
	const [textToSpeak, setTextToSpeak] = useState("");
	const [shouldSpeak, setShouldSpeak] = useState(false);

	const cardStore = useCardStore();

	const resetCard = () => {
		cardStore.setSelectedCard([]);
	};

	const { speechStatus, start, pause, stop } = useSpeech({
		text: textToSpeak,
		pitch: 1,
		rate: 1,
		volume: 1,
		lang: "id-ID",
	});

	// Trigger speech when text updates
	useEffect(() => {
		if (shouldSpeak && textToSpeak) {
			start();
			setShouldSpeak(false);
		}
	}, [textToSpeak, shouldSpeak]);

	const readCard = () => {
		const textToRead = cardStore.selectedCard
			.map((item) => item.label)
			.join(" ");

		console.log(textToRead);
		setTextToSpeak(textToRead);
		setShouldSpeak(true);
	};
	const generateSocialStory = async () => {
		const cards = cardStore.selectedCard.map((card) => {
			return card.kartu_id;
		});

		console.log(cards);

		const result = await fetch(GENERATE_URL, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ kartu_ids: cards }),
		});
		const data = await result.json();
		console.log(data);

		cardStore.setStory(data.output_text);

		if (data.kisah_id) {
			cardStore.setKisahId(data.kisah_id);
			console.log("Kisah ID saved:", data.kisah_id);
		}
	};

	return (
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
				<ActionButton
					title={"Reset"}
					icon={MdRefresh}
					onClick={() => resetCard()}
				/>
			</Flex>
			<Flex h="33%" justify="center" align="center">
				<ActionButton
					title={"Suara"}
					onClick={() => readCard()}
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
						if (cardStore.kar) setIsLoading(true);
						await generateSocialStory();
						setIsLoading(false);
						onModalOpen();
					}}
				/>
			</Flex>
			<StoryModal isOpen={isModalOpen} onClose={onModalClose} />
		</Box>
	);
}
