import {
    Box,
    Button,
    Card,
    Center,
    Flex,
    IconButton,
    SimpleGrid,
    Spacer,
    Text,
    useToast,
} from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import MainContainer from "../../Components/Container/MainContainer";
import { usePageStore } from "../../Store/usePageStore";
import { useCustomStore } from "../../Store/useCustomStore";
import CustomForm from "./Form/CustomForm";
import { useAACCardStore } from "../../Store/useAACCardStore";
import AACCard from "../../Components/Card/AACCard";
import { colorList } from "../../Settings/ColorSetting";
import { deleteImage } from "../../utils/deleteImage";

export default function CustomMain({ title, children }) {
    const customStore = useCustomStore();
    const pageStore = usePageStore();
    const aacCardStore = useAACCardStore();

    const fileInputRef = useRef(null);

    useEffect(() => {
        aacCardStore.fetchCards();
    }, [aacCardStore.refresh, customStore.mode]);

    return (
        <MainContainer>
            {customStore.mode === "view" ? (
                <Box>
                    <SimpleGrid
                        columns={pageStore.isOpen ? 6 : 8}
                        p={4}
                        spacing={4}
                    >
                        {aacCardStore.aacCard.filter(
                            (item) => item.kategori === "custom"
                        ).length === 0 ? (
                            <Center>No cards available</Center>
                        ) : (
                            aacCardStore.aacCard
                                .filter((item) => item.kategori === "custom")
                                .map((item, index) => (
                                    <Box
                                        key={index}
                                        position="relative"
                                        display="flex"
                                        justifyContent="center"
                                    >
                                        <AACCard card={item} cardSize="large" />
                                        <Flex
                                            position="absolute"
                                            top="10px"
                                            right="10px"
                                            zIndex={1}
                                            gap={1}
                                        >
                                            <IconButton
                                                size="sm"
                                                icon={<EditIcon />}
                                                colorScheme="green"
                                                aria-label="Edit"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    customStore.setMode("edit");
                                                    customStore.setFormData({
                                                        label: item.label,
                                                        image: item.gambar,
                                                        id: item.kartu_id,
                                                    });
                                                }}
                                            />
                                            <IconButton
                                                size="sm"
                                                icon={<DeleteIcon />}
                                                colorScheme="red"
                                                aria-label="Delete"
                                                onClick={async (e) => {
                                                    e.stopPropagation();
                                                    console.log(
                                                        "Delete",
                                                        item.kartu_id
                                                    );
                                                    await deleteImage({
                                                        kartu_id: item.kartu_id,
                                                    });
                                                    aacCardStore.triggerRefresh();
                                                }}
                                            />
                                        </Flex>
                                    </Box>
                                ))
                        )}
                        <AddCardButton customStore={customStore} />
                    </SimpleGrid>
                    <Box h={"36px"} />
                </Box>
            ) : (
                <CustomForm
                    fileInputRef={fileInputRef}
                    onCancel={() => customStore.setMode("view")}
                />
            )}
        </MainContainer>
    );
}

export function AddCardButton({ customStore, onClick }) {
    return (
        <Box display="flex" justifyContent="center">
            <Card
                h={"240px"}
                w={"180px"}
                position="relative"
                border="2px dashed"
                borderColor={colorList.borderGray}
                borderRadius="8px"
                cursor="pointer"
                bg="gray.50"
                _hover={{
                    borderColor: colorList.darkGreen,
                    borderStyle: "solid",
                    bg: "green.50",
                }}
                _active={{ transform: "scale(0.98)" }}
                transition="all 0.2s ease"
                alignItems="center"
                justifyContent="center"
                onClick={() => customStore.setMode("add")}
            >
                <Text
                    fontSize="64px"
                    fontWeight="200"
                    color={colorList.darkGray}
                >
                    +
                </Text>
                <Text
                    fontSize="16px"
                    fontWeight="500"
                    color={colorList.darkGray}
                >
                    Add New Card
                </Text>
            </Card>
        </Box>
    );
}
