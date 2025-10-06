import {
    Box,
    Center,
    Flex,
    Image,
    SimpleGrid,
    Spacer,
    Text,
} from "@chakra-ui/react";
import MainContainer from "../../Components/Container/MainContainer";

import SelectedCardHome from "./SelectedCardHome";
import { usePageStore } from "../../Store/usePageStore";
import AACCard from "../../Components/Card/AACCard";
import { useAACCardStore } from "../../Store/useAACCardStore";
import { fetchData } from "../../Actions/CRUD";
import { KARTU_URL } from "../../Settings/DatabaseURL";
import { useEffect } from "react";
export default function HomeMain() {
    const pageStore = usePageStore();
    const aacCardStore = useAACCardStore();

    const initData = async () => {
        const data = await fetchData(KARTU_URL);

        const cards = data.map((item) => ({
            kartu_id: item.kartu_id,
            label: item.label,
            gambar: item.gambar,
        }));

        aacCardStore.setAACCard(cards);
        console.log(cards[0]["gambar"]);
    };

    const selectCard = (card) => {
        console.log("Add card: ", card);
        aacCardStore.setSelectedAACCard([
            ...aacCardStore.selectedAACCard,
            card,
        ]);
    };

    useEffect(() => {
        initData();
    }, []);

    return (
        <>
            <MainContainer title="">
                <Box flexShrink={0}>
                    <SimpleGrid columns={pageStore.isOpen ? 6 : 8}>
                        {aacCardStore.aacCard.length === 0 ? (
                            <Center>No cards available</Center>
                        ) : (
                            aacCardStore.aacCard.map((item, index) => (
                                <Box onClick={() => selectCard(item)}>
                                    <AACCard
                                        key={index}
                                        card={item}
                                        cardSize="large"
                                    />
                                </Box>
                            ))
                        )}
                    </SimpleGrid>
                    <Box h={"36px"} />
                </Box>
            </MainContainer>
            <Box h={"200px"} />
            <SelectedCardHome />
        </>
    );
}
