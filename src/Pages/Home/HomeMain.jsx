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
import { useCardStore } from "../../Store/useCardStore";
import { fetchData } from "../../Actions/CRUD";
import { KARTU_URL } from "../../Settings/DatabaseURL";
import { useEffect, useState } from "react";
import HomeBar from "./HomeBar/HomeBar";
import Loading from "../../Components/Loading/loading";

export default function HomeMain() {
    const cardStore = useCardStore();
    const [cardType, setCardType] = useState("");

    const initData = async () => {
        const data = await fetchData(KARTU_URL);

        const cards = data.map((item) => ({
            kartu_id: item.kartu_id,
            label: item.label,
            gambar: item.gambar,
            kategori: item.kategori,
        }));

        cardStore.setCards(cards);
    };

    const selectCard = (card) => {
        console.log("Add card: ", card);
        cardStore.setSelectedCard([...cardStore.selectedCard, card]);
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

            <Loading isLoading={cardStore.isLoading} />
            <HomeBar />
        </>
    );
}

export function HomeChoose({ onSelectType }) {
    return (
        <Flex align="center" justify="center" h="70vh" flexDir="column">
            <SimpleGrid columns={2} spacing={16}>
                <AACCard
                    card={{
                        label: "Kartu Standar",
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
                        label: "Kartu Kustom",
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
    const cardStore = useCardStore();

    const cards = cardStore.cards.filter((item) => {
        if (cardType === "custom") {
            return item.kategori === "custom";
        } else {
            return item.kategori === "default";
        }
    });

    return (
        <Box p={6} mx={!pageStore.isOpen ? "100px" : 0}>
            <SimpleGrid columns={5} p={4} spacing={4}>
                <Box position="relative" display="flex">
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
                </Box>
                {cards.length === 0 ? (
                    <Center>Tidak ada Kartu</Center>
                ) : (
                    cards.map((item, index) => (
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
