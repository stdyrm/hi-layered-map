import { useRef } from "react";
import Link from "next/link";
import {
	Box,
	Button,
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerCloseButton,
	Flex,
	IconButton,
	Text,
	useDisclosure,
} from "@chakra-ui/core";
import { GrHome, GrMenu } from "react-icons/gr";

const ControlPanel: React.FC = ({ children }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef();

	return (
		<>
			<Drawer
				placement="left"
				isOpen={isOpen}
				onClose={onClose}
				finalFocusRef={btnRef.current}
			>
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>
						<Link href="/">
							<a>
								<Text>
									<GrHome display="inline-block" /> Main Menu
								</Text>
							</a>
						</Link>
					</DrawerHeader>
					<Flex
						justify="space-evenly"
						direction="column"
						mt={4}
						px={4}
					>
						{children}
					</Flex>
				</DrawerContent>
			</Drawer>
			<Box
				textAlign="right"
			>
				<IconButton
					icon={GrMenu}
					ref={btnRef}
					onClick={onOpen}
					aria-label="Map Menu"
					variant="ghost"
					fontSize="2xl"
					m={4}
				/>
			</Box>
		</>
	);
};

export default ControlPanel;
