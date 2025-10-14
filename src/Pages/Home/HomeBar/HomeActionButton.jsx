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
import { useSpeakStore } from "../../../Store/useSpeakStore";
import { AddIcon } from "@chakra-ui/icons";
import { uploadImages } from "../../../utils/uploadImages";
export function HomeActionButton({ isModalOpen, onModalOpen, onModalClose }) {
	const cardStore = useCardStore();
	const speakStore = useSpeakStore();
	const [isLoading, setIsLoading] = useState(false);

	const { speechStatus, start } = useSpeech({
		text: speakStore.text,
		pitch: 1,
		rate: 1,
		volume: 1,
		lang: "id-ID",
	});

	const readCard = () => {
		const text = cardStore.selectedCard.map((item) => item.label).join(" ");
		speakStore.setText(text);
		speakStore.setSpeaking(true);
	};

	const resetCard = () => {
		cardStore.setSelectedCard([]);
	};

	const generateStory = async () => {
		const cards = cardStore.selectedCard.map((card) => {
			return card.kartu_id;
		});
		const data = await fetch(GENERATE_URL, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ kartu_ids: cards }),
		});

		const result = await data.json();
		cardStore.setStory(result.output_text);
		if (result.kisah_id) {
			cardStore.setKisahId(result.kisah_id);
			console.log("Kisah ID saved:", result.kisah_id);
		}
	};

	useEffect(() => {
		if (speakStore.isSpeaking && speakStore.text) {
			start();
			speakStore.setSpeaking(false);
		}
	}, [speakStore.text, speakStore.isSpeaking]);

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
			{/* <Flex h="33%" justify="center" align="center">
				<ActionButton
					title={"Upload Cards"}
					icon={AddIcon}
					onClick={() => uploadImages()}
				/>
			</Flex> */}
			<Flex h="33%" justify="center" align="center">
				<ActionButton
					title={"Reset"}
					icon={MdRefresh}
					onClick={() => resetCard()}
				/>
			</Flex>
			<Flex h="33%" justify="center" align="center">
				<ActionButton
					title={"Dengarkan"}
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
						await generateStory();
						setIsLoading(false);
						onModalOpen();
					}}
				/>
			</Flex>
			<StoryModal isOpen={isModalOpen} onClose={onModalClose} />
		</Box>
	);
}
