import {
    Box,
    Button,
    Center,
    Flex,
    Image,
    SimpleGrid,
    Spacer,
    Text,
} from "@chakra-ui/react";
import MainContainer from "../../Components/Container/MainContainer";

import { usePageStore } from "../../Store/usePageStore";
import AACCard from "../../Components/Card/AACCard";
import { useAACCardStore } from "../../Store/useAACCardStore";
import { fetchData } from "../../Actions/CRUD";
import { KARTU_URL } from "../../Settings/DatabaseURL";
import { useEffect, useState } from "react";
import SelectedCardBar from "./HomeBar/SelectedCardBar";

export default function HomeMain() {
    const pageStore = usePageStore();
    const aacCardStore = useAACCardStore();
    const [cardType, setCardType] = useState("");

    const initData = async () => {
        const data = await fetchData(KARTU_URL);

        const cards = data.map((item) => ({
            kartu_id: item.kartu_id,
            label: item.label,
            gambar: item.gambar,
            kategori: item.kategori,
        }));

        aacCardStore.setAACCard(cards);
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
            <MainContainer isHome={true}>
                {cardType === "" ? (
                    <HomeChoose onSelectType={setCardType} />
                ) : (
                    <HomeCardList
                        cardType={cardType}
                        setCardType={setCardType}
                        selectCard={selectCard}
                    />
                )}
            </MainContainer>
            <SelectedCardBar />
        </>
    );
}

export function HomeChoose({ onSelectType }) {
    return (
        <Flex align="center" justify="center" h="70vh" flexDir="column">
            <SimpleGrid columns={2} spacing={16}>
                <AACCard
                    card={{
                        label: "Default Cards",
                        gambar: "/default.png",
                    }}
                    style={{
                        h: "450px",
                        w: "360px",
                        cardH: "360px",
                        fontSize: "28px",
                    }}
                    onClick={() => onSelectType("default")}
                />
                <AACCard
                    card={{
                        label: "Custom Cards",
                        gambar: "/custom.png",
                    }}
                    style={{
                        h: "450px",
                        w: "360px",
                        cardH: "360px",
                        fontSize: "28px",
                    }}
                    onClick={() => onSelectType("custom")}
                />
            </SimpleGrid>
        </Flex>
    );
}

export function HomeCardList({ cardType, setCardType, selectCard }) {
    const pageStore = usePageStore();
    const aacCardStore = useAACCardStore();

    return (
        <Box>
            <SimpleGrid columns={pageStore.isOpen ? 5 : 7} p={4} spacing={4}>
                <AACCard
                    card={{
                        label: "Kembali",
                        gambar: "/back.svg",
                    }}
                    style={{
                        h: "300px",
                        w: "240px",
                        cardH: "220px",
                        fontSize: "24px",
                    }}
                    onClick={() => setCardType("")}
                />
                {aacCardStore.aacCard.length === 0 ? (
                    <Center>No cards available</Center>
                ) : (
                    aacCardStore.aacCard
                        .filter((item) => {
                            if (cardType === "custom") {
                                return item.kategori === "custom";
                            } else if (cardType === "default") {
                                return (
                                    item.kategori === "default" ||
                                    !item.kategori
                                );
                            }
                            return true;
                        })
                        .map((item, index) => (
                            <Box
                                position="relative"
                                display="flex"
                                onClick={() => selectCard(item)}
                            >
                                <AACCard
                                    key={index}
                                    card={item}
                                    style={{
                                        h: "300px",
                                        w: "240px",
                                        cardH: "220px",
                                        fontSize: "24px",
                                    }}
                                />
                            </Box>
                        ))
                )}
            </SimpleGrid>
            <Box h={"36px"} />
        </Box>
    );
}
