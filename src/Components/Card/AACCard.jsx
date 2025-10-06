import {
    Box,
    Card,
    CardBody,
    CardFooter,
    Center,
    Flex,
    Image,
    Spacer,
    Text,
} from "@chakra-ui/react";
import { colorList } from "../../Settings/ColorSetting";

export default function AACCard({ key, card, onClick, cardSize = "small" }) {
    const m = cardSize == "small" ? "8px" : "12px";
    const p = cardSize == "small" ? "8px" : "10px";
    const h = cardSize == "small" ? "196px" : "248px";
    const w = cardSize == "small" ? "150px" : "160px";
    const fontSize = cardSize == "small" ? "16px" : "18px";

    return (
        <Card
            key={key}
            flexShrink={0}
            h={h}
            m={m}
            p={p}
            w={w}
            border="2px solid"
            borderColor={colorList.borderGray}
            borderRadius="8px"
            cursor="pointer"
            _hover={{ borderColor: colorList.darkGreen }}
            _active={{ transform: "scale(0.995)" }}
            transition="ease-in-out 0.1s"
            onClick={onClick}
            display="flex"
            flexDirection="column"
        >
            <CardBody
                as={Center}
                w={"100%"}
                h={"150px"}
                bg="#F5F7F6"
                borderRadius="8px"
                p={2}
                flex="0 0 auto"
            >
                <Image
                    src={card["gambar"]}
                    alt={"..."}
                    h="100%"
                    objectFit="contain"
                />
            </CardBody>
            <Spacer />
            <Text
                fontSize={fontSize}
                letterSpacing="2px"
                align="center"
                noOfLines={2}
            >
                {card["label"]}
            </Text>
        </Card>
    );
}
