import { Button } from "@chakra-ui/core";
import { CSSProperties } from "react";

interface IProps {
	id: string;
	onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	style?: CSSProperties | undefined;
}

const ControlPanelButton: React.FC<IProps> = ({
	id,
	onClick,
	style,
	children,
}) => {
	return (
		<Button id={id} onClick={onClick} style={style} mt={2}>
			{children}
		</Button>
	);
};

export default ControlPanelButton;
