import {
    Box,
    Button,
    Flex,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { useAACCardStore } from "../../Store/useAACCardStore";

export default function SSModal({ isOpen, onClose }) {
    const aacCardStore = useAACCardStore();

    const listCards = aacCardStore.selectedAACCard
        .map((item) => `"${item.label}"`)
        .join(", ");

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size="5xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        fontSize="3xl"
                        fontWeight="bold"
                        textAlign="center"
                    >
                        Kisah Sosial
                    </ModalHeader>
                    <ModalBody>
                        <Flex flexDir="row" wrap="wrap" gap="2">
                            <Text>[{listCards}]</Text>
                        </Flex>

                        <Text>Output: {aacCardStore.socialStories}</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Tutup</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
