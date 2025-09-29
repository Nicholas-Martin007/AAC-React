import { Button, Flex, Icon, Text } from "@chakra-ui/react";
import { colorList } from "../../Settings/ColorSetting";

export default function ActionButton({ title, icon }) {
	return (
		<Button
			w={"100%"}
			p={"48px 24px 24px 12px"}
			mx={"8px"}
			bg={colorList.green}
			boxShadow={`-2px 2px  ${colorList.darkGreen}`}
			_hover={{
				bg: colorList.darkGreen,
				color: "white",
				boxShadow: `-4px 4px ${colorList.green}`,
			}}
		>
			<Flex gap={2} alignItems={"center"}>
				<Text
					fontSize={"16px"}
					fontWeight="semibold"
					textTransform="uppercase"
					letterSpacing={1}
				>
					{title}
				</Text>
				<Icon as={icon} boxSize={5} filter="drop-shadow(0 0 black)" />
			</Flex>
		</Button>
	);
}
