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
	key,
	card,
	onClick,
	style = {
		h: "196px",
		cardH: "150px",
		w: "150px",
		fontSize: "14px",
	},
}) {
	return (
		<Card
			key={key}
			h={style.h}
			w={style.w}
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
				h={style.cardH}
				bg="#F5F7F6"
				borderRadius="8px"
				p={4}
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
				fontSize={style.fontSize}
				letterSpacing="2px"
				align="center"
				noOfLines={2}
			>
				{card["label"]}
			</Text>
			<Box height={"12px"} />
		</Card>
	);
}
