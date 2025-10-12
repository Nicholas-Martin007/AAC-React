import { Box, Flex, Spinner, useDisclosure } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useAACCardStore } from "../../../Store/useAACCardStore";
import ActionButton from "../../../Components/Button/ActionButton";
import SocialStoryModel from "../../../Components/Modal/SocialStoryModel";
import { colorList } from "../../../Settings/ColorSetting";
import { MdAutoStories, MdRefresh } from "react-icons/md";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { useSpeech } from "react-text-to-speech";

export function HomeActionButton() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);
    const [textToSpeak, setTextToSpeak] = useState("");
    const [shouldSpeak, setShouldSpeak] = useState(false);

    const aacCardStore = useAACCardStore();

    const resetCard = () => {
        aacCardStore.setSelectedAACCard([]);
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
        const textToRead = aacCardStore.selectedAACCard
            .map((item) => item.label)
            .join(" ");

        console.log(textToRead);
        setTextToSpeak(textToRead);
        setShouldSpeak(true);
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
                        setIsLoading(true);
                        await generateSocialStory();
                        setIsLoading(false);
                        onOpen();
                    }}
                />
            </Flex>
            <SocialStoryModel isOpen={isOpen} onClose={onClose} />
        </Box>
    );
}
