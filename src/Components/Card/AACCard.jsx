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

export default function AACCard({
	card,
	key,
	cardHeight,
	imageHeight,
	imageWidth,
	m,
	p,
	labelPt,
}) {
	return (
		<Card
			key={key}
			flexShrink={0}
			h={cardHeight ?? "248px"}
			m={m ?? "12px"}
			p={p ?? "10px"}
			border="2px solid"
			borderColor={colorList.borderGray}
			borderRadius="8px"
			cursor="pointer"
			_hover={{ borderColor: colorList.darkGreen }}
			_active={{ transform: "scale(0.995)" }}
			transition="ease-in-out 0.1s"
			onClick={() => console.log("Card clicked")}
		>
			<CardBody
				as={Center}
				w={imageWidth}
				h={imageHeight ?? "160px"}
				bg="#F5F7F6"
				borderRadius="8px"
				p={2}
			>
				<Image src={card["img"]} alt="..." w="100%" h="100%" />
			</CardBody>
			<CardFooter justify="center" pt={labelPt ?? "36px"}>
				<Text fontSize="18px" letterSpacing="2px" align="center">
					{card["label"]}
				</Text>
			</CardFooter>
		</Card>
	);
}
